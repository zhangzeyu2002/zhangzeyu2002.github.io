import { Mail, Github, MapPin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface Publication {
  title: string;
  authors: (string | { name: string; isBold?: boolean; hasStar?: boolean })[];
  venue: string;
  year: number;
  link?: string;
  highlight?: boolean;
}

interface NewsItem {
  date: string;
  content: string;
}

interface ProfileData {
  basic: {
    name: string;
    nameZh: string;
    school: string;
    email: string;
    github: string;
    location: string;
    avatar: string;
    footerYear: number;
    lastUpdated: string;
  };
  about: string[];
  researchInterests: string[];
  news: NewsItem[];
  publications: Publication[];
}

const defaultProfile: ProfileData = {
  basic: {
    name: "Zeyu Zhang",
    nameZh: "张泽宇",
    school: "School of Intelligence Science and Technology, Nanjing University",
    email: "zhangzeyu0910@163.com",
    github: "https://github.com/zhangzeyu2002",
    location: "Suzhou, China",
    avatar: "/avatar.jpg",
    footerYear: 2025,
    lastUpdated: "March 2025"
  },
  about: [
    "I am a Master's student in Artificial Intelligence at the School of Intelligence Science and Technology, Nanjing University, advised by Prof. Qi Fan. I received my Bachelor's degree in Data Science and Big Data Technology from the University of Electronic Science and Technology of China in 2025.",
    "My research interests include machine learning, computer vision, and efficient fine-tuning of large models. I am currently focused on developing scalable approaches for adapting large-scale neural networks to downstream tasks."
  ],
  researchInterests: [
    "Machine Learning",
    "Computer Vision",
    "Efficient Fine-tuning of Large Models"
  ],
  news: [
    {
      date: "Mar 05, 2026",
      content: "Paper accepted to CVPR 2026 as co-first author"
    },
    {
      date: "Sep 01, 2025",
      content: "Started Master's program in Artificial Intelligence at Nanjing University"
    },
    {
      date: "Jun 15, 2025",
      content: "Graduated with Bachelor's degree in Data Science and Big Data Technology from UESTC"
    }
  ],
  publications: [
    {
      title: "Efficient Fine-tuning of Large Language Models",
      authors: ["Zeyu Zhang", "Qi Fan", "Collaborator 1"],
      venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      year: 2026,
      link: "#"
    },
    {
      title: "Novel Approaches to Neural Network Training",
      authors: ["Zeyu Zhang", "Collaborator 2"],
      venue: "International Conference on Learning Representations (ICLR)",
      year: 2023,
      link: "#"
    }
  ]
};

export default function Home() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ponies = Array.from(document.querySelectorAll<HTMLElement>(".cursor-pony"));
    const positions = ponies.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
    let animationFrame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      positions[0] = { x: event.clientX, y: event.clientY };
    };

    const animatePonies = () => {
      positions.forEach((position, index) => {
        if (index > 0) {
          const previous = positions[index - 1];
          position.x += (previous.x - position.x) * 0.07;
          position.y += (previous.y - position.y) * 0.07;
        }

        const bob = Math.sin(Date.now() / 360 + index) * 3;
        ponies[index].style.transform = `translate3d(${position.x - 18}px, ${position.y - 18 + bob}px, 0) rotate(${index % 2 === 0 ? -4 : 4}deg)`;
      });
      animationFrame = window.requestAnimationFrame(animatePonies);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animationFrame = window.requestAnimationFrame(animatePonies);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        const response = await fetch("/profile.json", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as ProfileData;
        if (!ignore) {
          setProfile(data);
        }
      } catch {
        // Keep default data when profile.json is unavailable.
      }
    }

    loadProfile();
    return () => {
      ignore = true;
    };
  }, []);

  const renderTextWithLinks = (text: string) => {
    const parts = text.split(/(Qi Fan)/g);
    return parts.map((part, idx) => 
      part === "Qi Fan" ? (
        <a key={idx} href="https://fanq15.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
          Qi Fan
        </a>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <div className="site-shell min-h-screen bg-white text-gray-900">
      <div className="cursor-flock" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((pony) => (
          <img
            key={pony}
            className="cursor-pony"
            src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f434.svg"
            alt=""
          />
        ))}
      </div>
      <nav className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container flex items-center justify-between h-14">
          <div className="font-semibold text-lg">{profile.basic.name}</div>
          <div className="flex gap-6 items-center text-sm">
            <a
              href="#about-section"
              className="nav-link text-gray-900 font-medium hover:text-gray-700"
            >
              about
            </a>
            <a
              href="#publications-section"
              className="nav-link text-gray-600 hover:text-gray-900"
            >
              publications
            </a>
          </div>
        </div>
      </nav>

      <main className="container py-12">
        <div id="about-section" className="max-w-3xl scroll-mt-20">
            <div className="mb-8 flex gap-8 items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{profile.basic.name} ({profile.basic.nameZh})</h1>
                <p className="text-gray-600 mb-4">{profile.basic.school}</p>
                <p className="text-sm text-gray-600 mb-3">{profile.basic.email}</p>
                <div className="flex gap-4 text-sm flex-wrap">
                  <a href={`mailto:${profile.basic.email}`} className="interactive-link flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a href={profile.basic.github} target="_blank" rel="noopener noreferrer" className="interactive-link flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <div className="flex items-center gap-2 text-blue-600">
                    <MapPin className="w-4 h-4" />
                    {profile.basic.location}
                  </div>
                </div>
              </div>
              <div className="profile-photo flex-shrink-0">
                <img 
                  src={profile.basic.avatar}
                  alt={profile.basic.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="mb-8 leading-relaxed">
              {profile.about.map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {renderTextWithLinks(paragraph)}
                </p>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Research Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.researchInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="interest-chip px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded text-gray-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2>news</h2>
              <div className="space-y-3 mt-4">
                {profile.news.map((item, idx) => (
                  <div key={idx} className="flex gap-6 text-sm">
                    <span className="text-gray-600 whitespace-nowrap">{item.date}</span>
                    <span>{item.content}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="publications-section" className="mb-12 scroll-mt-20">
            <h2>publications</h2>
            <div className="space-y-8 mt-6">
              {profile.publications.map((pub, idx) => (
                <div key={idx} className="publication-row border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="mb-2">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="interactive-link text-base font-medium hover:text-blue-600 flex items-center gap-2">
                        {pub.title}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <h3 className="text-base font-medium">{pub.title}</h3>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {pub.authors.map((authorData, authorIdx) => {
                      const author = typeof authorData === "string" ? { name: authorData } : authorData;
                      const authorName = author.name;
                      const isQiFan = authorName === "Qi Fan";
                      
                      return (
                        <span key={authorIdx}>
                          {isQiFan ? (
                            <a href="https://fanq15.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                              {author.isBold ? <strong>{authorName}</strong> : authorName}
                            </a>
                          ) : (
                            <>
                              {author.isBold ? <strong>{authorName}</strong> : <span>{authorName}</span>}
                              {author.hasStar && <span>*</span>}
                            </>
                          )}
                          {authorIdx < pub.authors.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {pub.highlight && <span className="font-semibold text-blue-600 mr-1">[Highlight]</span>}
                    {pub.venue}, {pub.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="container text-center text-xs text-gray-600">
          <p>© {profile.basic.footerYear} {profile.basic.name}. Last updated: {profile.basic.lastUpdated}.</p>
        </div>
      </footer>
    </div>
  );
}
