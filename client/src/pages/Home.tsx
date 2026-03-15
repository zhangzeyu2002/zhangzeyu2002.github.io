import { Mail, Github, MapPin, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  link?: string;
}

interface NewsItem {
  date: string;
  content: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"about" | "publications">("about");

  const publications: Publication[] = [
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
  ];

  const news: NewsItem[] = [
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
  ];

  const researchInterests = [
    "Machine Learning",
    "Computer Vision",
    "Efficient Fine-tuning of Large Models"
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container flex items-center justify-between h-14">
          <div className="font-semibold text-lg">Zeyu Zhang</div>
          <div className="flex gap-6 items-center text-sm">
            <button
              onClick={() => setActiveTab("about")}
              className={activeTab === "about" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"}
            >
              about
            </button>
            <button
              onClick={() => setActiveTab("publications")}
              className={activeTab === "publications" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"}
            >
              publications
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-12">
        {activeTab === "about" && (
          <div className="max-w-3xl">
            <div className="mb-8 flex gap-8 items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">Zeyu Zhang (张泽宇)</h1>
                <p className="text-gray-600 mb-4">School of Intelligence Science and Technology, Nanjing University</p>
                <p className="text-sm text-gray-600 mb-3">zhangzeyu0910@163.com</p>
                <div className="flex gap-4 text-sm flex-wrap">
                  <a href="mailto:zhangzeyu0910@163.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <div className="flex items-center gap-2 text-blue-600">
                    <MapPin className="w-4 h-4" />
                    Suzhou, China
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="/avatar.png" 
                  alt="Zeyu Zhang" 
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="mb-8 leading-relaxed">
              <p className="mb-4">
                I am a Master's student in Artificial Intelligence at the School of Intelligence Science and Technology, 
                Nanjing University, advised by Prof. Qi Fan. I received my Bachelor's degree in Data Science and Big Data Technology 
                from the University of Electronic Science and Technology of China in 2025.
              </p>
              <p className="mb-4">
                My research interests include machine learning, computer vision, and efficient fine-tuning of large models. 
                I am currently focused on developing scalable approaches for adapting large-scale neural networks to downstream tasks.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Research Interests</h2>
              <div className="flex flex-wrap gap-2">
                {researchInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded text-gray-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2>news</h2>
              <div className="space-y-3 mt-4">
                {news.map((item, idx) => (
                  <div key={idx} className="flex gap-6 text-sm">
                    <span className="text-gray-600 whitespace-nowrap">{item.date}</span>
                    <span>{item.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "publications" && (
          <div className="max-w-3xl">
            <h2>selected publications</h2>
            <div className="space-y-8 mt-6">
              {publications.map((pub, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="mb-2">
                    {pub.link ? (
                      <a href={pub.link} className="text-base font-medium hover:text-blue-600 flex items-center gap-2">
                        {pub.title}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <h3 className="text-base font-medium">{pub.title}</h3>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {pub.authors.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {pub.venue}, {pub.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="container text-center text-xs text-gray-600">
          <p>© 2025 Zeyu Zhang. Last updated: March 2025.</p>
        </div>
      </footer>
    </div>
  );
}
