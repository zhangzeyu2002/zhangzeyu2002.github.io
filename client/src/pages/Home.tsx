import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ExternalLink, Code2, BookOpen, Zap } from "lucide-react";
import { useState } from "react";

/**
 * Minimalist Techno Design System
 * Dark theme with neon blue accents (#00D9FF)
 * IBM Plex Mono for headings, Inter for body
 * Focus on content hierarchy and tech aesthetic
 */

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"about" | "research" | "projects">("about");

  const projects: Project[] = [
    {
      title: "Neural Network Optimization",
      description: "Developed efficient training algorithms for large-scale neural networks, achieving 40% reduction in training time.",
      tags: ["PyTorch", "CUDA", "Optimization"],
      link: "#"
    },
    {
      title: "Computer Vision Pipeline",
      description: "Built end-to-end vision system for object detection and segmentation using transformer architectures.",
      tags: ["Vision Transformers", "OpenCV", "TensorFlow"],
      link: "#"
    },
    {
      title: "NLP Model Fine-tuning",
      description: "Fine-tuned large language models for domain-specific tasks with improved performance metrics.",
      tags: ["Transformers", "NLP", "BERT"],
      link: "#"
    }
  ];

  const experiences: Experience[] = [
    {
      title: "AI Research Intern",
      organization: "Tech Research Lab",
      period: "2023 - Present",
      description: "Conducting research on efficient deep learning models and contributing to peer-reviewed publications."
    },
    {
      title: "Machine Learning Engineer",
      organization: "AI Startup",
      period: "2022 - 2023",
      description: "Developed and deployed ML models for production systems, optimizing inference performance."
    }
  ];

  const skills = [
    "Deep Learning", "PyTorch", "TensorFlow", "Computer Vision",
    "NLP", "Python", "CUDA", "Data Analysis", "Research"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="font-mono text-lg font-bold glow-text">
            &lt;AI_Researcher /&gt;
          </div>
          <div className="flex gap-8 items-center">
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#research" className="text-sm hover:text-primary transition-colors">Research</a>
            <a href="#projects" className="text-sm hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663276187372/A35tzBEcGYzj6ngyYZW9UU/hero-background-WDyuygKrtupyLEJGrgWmRy.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl animate-slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              AI Researcher & Engineer
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Passionate about advancing artificial intelligence through research and development. 
              Specializing in deep learning, computer vision, and efficient model optimization.
            </p>
            <div className="flex gap-4">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                View My Work
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>
        <div className="section-divider" />
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-12 border-b border-border pb-4">
            {["about", "research", "projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 font-mono text-sm transition-all ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="grid md:grid-cols-3 gap-8 animate-slide-in-up">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">About Me</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a Master's student in Artificial Intelligence with a passion for pushing the boundaries 
                    of what's possible with machine learning. My research focuses on efficient deep learning models 
                    and their real-world applications.
                  </p>
                  <p>
                    With hands-on experience in both research and industry, I combine theoretical knowledge with 
                    practical implementation skills. I'm particularly interested in optimizing neural networks for 
                    resource-constrained environments and developing interpretable AI systems.
                  </p>
                </div>

                {/* Experience */}
                <h3 className="text-xl font-bold mt-12 mb-6">Experience</h3>
                <div className="space-y-6">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="tech-card">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-mono font-bold text-primary">{exp.title}</h4>
                        <span className="text-xs text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{exp.organization}</p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Sidebar */}
              <div>
                <h3 className="text-lg font-bold mb-6">Skills</h3>
                <div className="glow-box p-6 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-primary/10 border border-primary/30 rounded text-primary hover:bg-primary/20 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 space-y-4">
                  <div className="code-block">
                    <div className="text-primary/70">Publications</div>
                    <div className="text-2xl font-bold text-primary">5+</div>
                  </div>
                  <div className="code-block">
                    <div className="text-primary/70">Projects</div>
                    <div className="text-2xl font-bold text-primary">15+</div>
                  </div>
                  <div className="code-block">
                    <div className="text-primary/70">Experience</div>
                    <div className="text-2xl font-bold text-primary">3+ yrs</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Research Tab */}
          {activeTab === "research" && (
            <div className="animate-slide-in-up">
              <h2 className="text-2xl font-bold mb-8">Research Interests</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Model Efficiency",
                    description: "Developing techniques for training and deploying efficient neural networks with reduced computational requirements."
                  },
                  {
                    icon: Code2,
                    title: "Computer Vision",
                    description: "Advancing visual understanding through novel architectures and training methodologies for object detection and segmentation."
                  },
                  {
                    icon: BookOpen,
                    title: "Natural Language Processing",
                    description: "Exploring transformer-based models and their applications in understanding and generating human language."
                  },
                  {
                    icon: Zap,
                    title: "Interpretability",
                    description: "Making AI systems more transparent and understandable through explainable AI techniques and visualization methods."
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="tech-card group">
                      <Icon className="w-8 h-8 text-primary mb-4 group-hover:animate-glow-pulse" />
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Research Image */}
              <div className="mt-12">
                <div className="relative rounded-lg overflow-hidden glow-box">
                  <img 
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663276187372/A35tzBEcGYzj6ngyYZW9UU/ai-research-visual-g37pdnwWRf55KMpcgVq2UZ.webp"
                    alt="AI Research Visualization"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="animate-slide-in-up">
              <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
              <div className="grid gap-6">
                {projects.map((project, idx) => (
                  <div key={idx} className="tech-card group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      {project.link && (
                        <ExternalLink className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 text-xs bg-primary/10 border border-primary/30 rounded text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-border">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          <p className="text-center text-muted-foreground mb-12">
            I'm always interested in discussing research, collaboration opportunities, or just connecting with fellow AI enthusiasts.
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            <a href="mailto:your.email@example.com" className="tech-card p-4 hover:scale-105 transition-transform">
              <Mail className="w-6 h-6 text-primary" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="tech-card p-4 hover:scale-105 transition-transform">
              <Github className="w-6 h-6 text-primary" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tech-card p-4 hover:scale-105 transition-transform">
              <Linkedin className="w-6 h-6 text-primary" />
            </a>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 AI Researcher. Built with React + Tailwind CSS.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
