import {
  Mail,
  Github,
  MapPin,
  ExternalLink,
  GraduationCap,
  Sparkles,
  FileText,
  BookOpen,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/* =============================================================================
   Types — mirrors client/public/profile.json
   ============================================================================= */

interface Author {
  name: string;
  isBold?: boolean;
  hasStar?: boolean;
}

interface Publication {
  title: string;
  authors: (string | Author)[];
  venue: string;
  year: number;
  link?: string;
  highlight?: boolean;
}

interface NewsItem {
  date: string;
  content: string;
}

interface BasicInfo {
  name: string;
  nameZh: string;
  school: string;
  email: string;
  github: string;
  location: string;
  avatar: string;
  footerYear: number;
  lastUpdated: string;
}

interface ProfileData {
  basic: BasicInfo;
  about: string[];
  researchInterests: string[];
  news: NewsItem[];
  publications: Publication[];
}

/**
 * Minimal fallback used only while `profile.json` is loading or if the fetch
 * fails. Intentionally NOT a second copy of the real content — the real
 * content lives in client/public/profile.json and nowhere else.
 */
const fallbackProfile: ProfileData = {
  basic: {
    name: "Zeyu Zhang",
    nameZh: "张泽宇",
    school: "",
    email: "",
    github: "",
    location: "",
    avatar: "/avatar.jpg",
    footerYear: new Date().getFullYear(),
    lastUpdated: "",
  },
  about: [],
  researchInterests: [],
  news: [],
  publications: [],
};

/* =============================================================================
   Helpers
   ============================================================================= */

const ADVISOR_LINKS: Record<string, string> = {
  "Qi Fan": "https://fanq15.github.io/",
};

/** Renders a paragraph, turning known people names into links. */
function renderTextWithLinks(text: string) {
  const names = Object.keys(ADVISOR_LINKS);
  if (names.length === 0) return text;

  const pattern = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, idx) =>
    ADVISOR_LINKS[part] ? (
      <a
        key={idx}
        href={ADVISOR_LINKS[part]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium"
      >
        {part}
      </a>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

/** Derives a compact venue label, e.g. "IEEE/CVF Conference on ... (CVPR)" -> "CVPR". */
function venueShortName(venue: string): string {
  const parenthesized = venue.match(/\(([^)]+)\)\s*$/);
  if (parenthesized) return parenthesized[1].trim();
  const acronym = venue.match(/\b[A-Z]{3,6}\b/);
  if (acronym) return acronym[0];
  return venue;
}

/** Splits "Mar 05, 2026" into a scannable { month, day, year }. */
function parseNewsDate(raw: string): { label: string; year: string } {
  const match = raw.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),\s*(\d{4})$/);
  if (match) {
    return { label: `${match[1].slice(0, 3)} ${match[2]}`, year: match[3] };
  }
  return { label: raw, year: "" };
}

const NAV_SECTIONS = [
  { id: "about-section", label: "About" },
  { id: "news-section", label: "News" },
  { id: "publications-section", label: "Publications" },
];

/* =============================================================================
   Page
   ============================================================================= */

export default function Home() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ---- Cursor companion: one lightweight SVG instead of a remote flock ---- */
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const node = document.querySelector<HTMLElement>(".cursor-companion");
    if (!node) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;
    let visible = false;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        node.style.opacity = "1";
      }
    };

    const handlePointerLeave = () => {
      visible = false;
      node.style.opacity = "0";
    };

    const animate = () => {
      // Critically-damped-ish follow; runs in transform space only.
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      const bob = Math.sin(Date.now() / 420) * 2.5;
      node.style.transform = `translate3d(${currentX + 16}px, ${currentY + 16 + bob}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  /* ---- Active-section highlighting ---- */
  useEffect(() => {
    const nodes = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (n): n is HTMLElement => n !== null
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [loaded]);

  /* ---- Scroll progress bar ---- */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* ---- Content load ---- */
  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        const response = await fetch("/profile.json", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as ProfileData;
        if (!ignore) {
          setProfile({
            ...fallbackProfile,
            ...data,
            basic: { ...fallbackProfile.basic, ...data.basic },
            about: data.about ?? [],
            researchInterests: data.researchInterests ?? [],
            news: data.news ?? [],
            publications: data.publications ?? [],
          });
        }
      } catch {
        // Keep the fallback shell when profile.json is unavailable.
      } finally {
        if (!ignore) setLoaded(true);
      }
    }

    loadProfile();
    return () => {
      ignore = true;
    };
  }, []);

  const interests = useMemo(
    () => profile.researchInterests.filter(Boolean),
    [profile.researchInterests]
  );

  const { basic } = profile;

  return (
    <div className="site-shell min-h-screen bg-white text-ink-900">
      <div className="page-backdrop" aria-hidden="true" />

      {/* Cursor companion — decorative only */}
      <svg
        className="cursor-companion pointer-events-none fixed left-0 top-0 z-[60] h-7 w-7 opacity-0"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 3px 6px rgba(30,41,59,0.18))" }}
      >
        <path
          d="M12 2.6c.7 0 1.3.5 1.5 1.2l.9 3.1 3.1.9c1.4.4 1.4 2.4 0 2.8l-3.1.9-.9 3.1c-.4 1.4-2.4 1.4-2.8 0l-.9-3.1-3.1-.9c-1.4-.4-1.4-2.4 0-2.8l3.1-.9.9-3.1A1.6 1.6 0 0 1 12 2.6Z"
          fill="#2563eb"
          fillOpacity="0.9"
        />
        <circle cx="18.6" cy="5.4" r="1.5" fill="#93c5fd" />
        <circle cx="5.2" cy="18.8" r="1.1" fill="#bfdbfe" />
      </svg>

      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent" aria-hidden="true">
        <div
          className="h-full origin-left bg-gradient-to-r from-brand-600 to-sky-400"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* ---------------- Navigation ---------------- */}
      <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-white/80 backdrop-blur-md">
        <nav className="container flex h-16 items-center justify-between" aria-label="Main">
          <a
            href="#top"
            className="text-[0.95rem] font-semibold tracking-tight text-ink-900 no-underline hover:text-brand-600"
          >
            {basic.name}
          </a>
          <div className="flex items-center gap-6 text-sm">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                data-active={activeSection === section.id}
                aria-current={activeSection === section.id ? "true" : undefined}
                className={`nav-link no-underline ${
                  activeSection === section.id
                    ? "font-semibold text-brand-700"
                    : "font-medium text-ink-600 hover:text-ink-900"
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className="container pb-4 pt-14">
        {/* ---------------- Hero / About ---------------- */}
        <section id="about-section" className="scroll-mt-24" aria-labelledby="about-heading">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:gap-10">
            <div className="min-w-0 flex-1">
              <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand-600">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Personal Homepage
              </p>
              <h1
                id="about-heading"
                className="text-[2rem] font-bold leading-tight tracking-tight sm:text-[2.5rem]"
              >
                {basic.name}
                {basic.nameZh ? (
                  <span className="ml-3 align-middle text-lg font-medium text-ink-500 sm:text-xl">
                    {basic.nameZh}
                  </span>
                ) : null}
              </h1>

              {basic.school ? (
                <p className="mt-4 flex items-start gap-2.5 text-[0.95rem] text-ink-600">
                  <GraduationCap
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                    aria-hidden="true"
                  />
                  <span>{basic.school}</span>
                </p>
              ) : null}

              {/* Contact actions */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {basic.email ? (
                  <a
                    href={`mailto:${basic.email}`}
                    className="lift inline-flex items-center gap-2 rounded-lg bg-ink-900 px-3.5 py-2 text-sm font-medium text-white no-underline shadow-sm hover:bg-ink-700 hover:text-white"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email
                  </a>
                ) : null}
                {basic.github ? (
                  <a
                    href={basic.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lift inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 no-underline hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                ) : null}
                {basic.location ? (
                  <span className="chip chip-hover lift">
                    <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                    {basic.location}
                  </span>
                ) : null}
              </div>

              {basic.email ? (
                <p className="meta-label mt-3 break-all">{basic.email}</p>
              ) : null}
            </div>

            {/* Avatar */}
            <div className="avatar-ring shrink-0 self-start rounded-full bg-gradient-to-br from-brand-200 via-brand-500 to-sky-400 p-[3px] shadow-card">
              <img
                src={basic.avatar}
                alt={basic.name}
                width={144}
                height={144}
                loading="eager"
                className="h-28 w-28 rounded-full bg-ink-100 object-cover sm:h-36 sm:w-36"
              />
            </div>
          </div>

          {/* Bio */}
          {profile.about.length > 0 ? (
            <div className="mt-10 space-y-4 text-[0.95rem] leading-[1.85] text-ink-700">
              {profile.about.map((paragraph, idx) => (
                <p key={idx}>{renderTextWithLinks(paragraph)}</p>
              ))}
            </div>
          ) : null}

          {/* Research interests */}
          {interests.length > 0 ? (
            <div className="mt-10">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink-500">
                Research Interests
              </h2>
              <ul className="flex flex-wrap gap-2.5">
                {interests.map((interest) => (
                  <li key={interest}>
                    <span className="chip chip-hover lift">
                      <BookOpen className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                      {interest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {/* ---------------- News ---------------- */}
        {profile.news.length > 0 ? (
          <section
            id="news-section"
            className="mt-16 scroll-mt-24"
            aria-labelledby="news-heading"
          >
            <div className="section-heading">
              <span className="section-index">01</span>
              <h2 id="news-heading">News</h2>
            </div>

            <ol className="relative space-y-1 border-l border-ink-200 pl-0">
              {profile.news.map((item, idx) => {
                const { label, year } = parseNewsDate(item.date);
                const isLatest = idx === 0;
                return (
                  <li
                    key={`${item.date}-${idx}`}
                    className="timeline-item group relative flex gap-4 rounded-lg py-2.5 pl-6 pr-3 transition-colors hover:bg-ink-50/70"
                  >
                    <span
                      className={`timeline-dot absolute -left-[5px] top-[1.05rem] h-2.5 w-2.5 rounded-full ring-4 ring-white ${
                        isLatest ? "bg-brand-600" : "bg-ink-200"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="meta-label w-[5.5rem] shrink-0 pt-0.5">
                      {label}
                      {year ? <span className="ml-1 text-ink-400">{year}</span> : null}
                    </span>
                    <span className="min-w-0 flex-1 text-[0.925rem] text-ink-700">
                      {item.content}
                      {isLatest ? (
                        <span className="ml-2 inline-flex translate-y-[-1px] items-center rounded-full bg-brand-50 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-brand-700">
                          New
                        </span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}

        {/* ---------------- Publications ---------------- */}
        {profile.publications.length > 0 ? (
          <section
            id="publications-section"
            className="mt-16 scroll-mt-24"
            aria-labelledby="publications-heading"
          >
            <div className="section-heading">
              <span className="section-index">02</span>
              <h2 id="publications-heading">Publications</h2>
            </div>

            <div className="space-y-4">
              {profile.publications.map((pub, idx) => {
                const shortVenue = venueShortName(pub.venue);
                return (
                  <article
                    key={`${pub.title}-${idx}`}
                    className={`card card-hover group relative overflow-hidden p-5 pl-6 ${
                      pub.highlight ? "border-brand-200 bg-brand-50/40" : ""
                    }`}
                  >
                    {pub.highlight ? (
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-500 to-sky-400"
                        aria-hidden="true"
                      />
                    ) : null}

                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="venue-badge">{shortVenue}</span>
                      <span className="meta-label">{pub.year}</span>
                      {pub.highlight ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-white">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          Highlight
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-[1.02rem] font-semibold leading-snug text-ink-900">
                      {pub.link ? (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-start gap-1.5 text-ink-900 no-underline hover:text-brand-700"
                        >
                          <span>{pub.title}</span>
                          <ExternalLink
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        pub.title
                      )}
                    </h3>

                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-600">
                      {pub.authors.map((authorData, authorIdx) => {
                        const author: Author =
                          typeof authorData === "string" ? { name: authorData } : authorData;
                        const advisorHref = ADVISOR_LINKS[author.name];

                        const inner = (
                          <>
                            {author.isBold ? (
                              <strong className="font-semibold text-ink-900">
                                {author.name}
                              </strong>
                            ) : (
                              <span>{author.name}</span>
                            )}
                            {author.hasStar ? (
                              <span className="text-brand-600" title="Equal contribution">
                                *
                              </span>
                            ) : null}
                          </>
                        );

                        return (
                          <span key={authorIdx}>
                            {advisorHref ? (
                              <a
                                href={advisorHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-underline hover:underline"
                              >
                                {inner}
                              </a>
                            ) : (
                              inner
                            )}
                            {authorIdx < pub.authors.length - 1 ? (
                              <span className="text-ink-400">, </span>
                            ) : null}
                          </span>
                        );
                      })}
                    </p>

                    <p className="mt-2 text-[0.8125rem] italic text-ink-500">{pub.venue}</p>

                    {pub.link ? (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3.5 inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-600 no-underline hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                      >
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        PDF
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>

            {profile.publications.some((p) =>
              p.authors.some((a) => typeof a !== "string" && a.hasStar)
            ) ? (
              <p className="meta-label mt-4">* Equal contribution</p>
            ) : null}
          </section>
        ) : null}
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="mt-20 border-t border-ink-200 bg-ink-50/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-xs text-ink-500 sm:flex-row">
          <p>
            © {basic.footerYear} {basic.name}
            {basic.lastUpdated ? ` · Last updated: ${basic.lastUpdated}` : ""}
          </p>
          <div className="flex items-center gap-4">
            {basic.email ? (
              <a
                href={`mailto:${basic.email}`}
                className="inline-flex items-center gap-1.5 no-underline hover:text-brand-600"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Email
              </a>
            ) : null}
            {basic.github ? (
              <a
                href={basic.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 no-underline hover:text-brand-600"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
}
