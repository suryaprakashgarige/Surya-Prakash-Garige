export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  outcome?: string;
}

export const projects: Project[] = [
  {
    id: "tap-dash-game",
    title: "Tap Dash Game",
    category: "Game Dev",
    description:
      "A fast-paced hyper-casual mobile game testing reflexes and timing. Built with optimized rendering loops and responsive touch controls for a smooth 60FPS gaming experience across devices.",
    tags: ["Game Development", "Mobile", "Interactive", "Casual"],
    outcome:
      "Achieved high user retention through addictive gameplay loops and polished UI with haptic feedback.",
  },
  {
    id: "3d-flight-simulator",
    title: "3D Flight Simulator",
    category: "Aerospace & WebGL",
    description:
      "An immersive browser-based flight simulator combining Three.js physics with real aerodynamic principles. Users pilot aircraft through procedurally generated 3D environments with realistic controls.",
    tags: ["Three.js", "React Three Fiber", "Physics", "Aerospace"],
    outcome:
      "Demonstrated complex aerodynamic physics calculations in the browser running at a consistent 60FPS.",
  },
  {
    id: "aircraft-neuralfoil",
    title: "Aircraft Analysis with NeuralFoil",
    category: "Aerospace AI",
    description:
      "Integrated NeuralFoil — a physics-informed neural network — to predict airfoil aerodynamics in seconds rather than hours, drastically reducing CFD simulation time for preliminary design.",
    tags: ["AI", "Aerodynamics", "Python", "CFD", "Machine Learning"],
    outcome:
      "Accurate drag and lift prediction that accelerates the preliminary aircraft design phase by 100x.",
  },
  {
    id: "laptop-voice-assistant",
    title: "Laptop Voice Assistant",
    category: "AI Automation",
    description:
      "A desktop voice assistant capable of executing system commands, searching the web, and managing workflow automation using speech recognition and natural language processing.",
    tags: ["Python", "NLP", "Speech Recognition", "Automation"],
    outcome:
      "Hands-free system control improving productivity for power users with voice-driven workflows.",
  },
  {
    id: "ai-code-explainer",
    title: "AI Code Explainer",
    category: "Developer Tools",
    description:
      "An intelligent tool that parses complex codebases and generates human-readable explanations, documentation, and optimization suggestions powered by large language models.",
    tags: ["LLM", "Next.js", "AI", "DevTools"],
    outcome:
      "Helps developers understand legacy code 10x faster with automated documentation generation.",
  },
  {
    id: "course-learning-website",
    title: "Course Learning Global Platform",
    category: "EdTech",
    description:
      "A scalable e-learning platform featuring video streaming, progress tracking, and interactive quizzes. Designed with a focus on accessibility, engagement, and mobile-first responsive design.",
    tags: ["Full Stack", "Next.js", "Education", "Database"],
    outcome:
      "Seamless learning experience with robust architecture supporting concurrent users.",
  },
  {
    id: "ai-agent-cad",
    title: "AI Agent for CAD Design",
    category: "Generative Design",
    description:
      "An autonomous agent that interfaces with CAD software to generate 3D models from natural language prompts, bridging the gap between design intent and engineering geometry.",
    tags: ["Generative AI", "CAD", "Engineering", "Python"],
    outcome:
      "Automates repetitive drafting tasks and enables rapid prototyping directly from text descriptions.",
  },
];

export const personalInfo = {
  name: "Surya Prakash Garige",
  role: "Aeronautical Engineer & Full-Stack Creator",
  location: "Domara Pocham Pally, Telangana, India",
  tagline:
    "Aeronautical engineering student crafting cinematic web experiences, AI tools, and interactive digital products as a solo creator.",
  skills: [
    "Aeronautical Engineering",
    "CAD & 3D",
    "MATLAB",
    "Python",
    "JavaScript",
    "React/Next.js",
    "AI & ML",
    "Video Editing",
  ],
  socials: {
    github: "https://github.com/suryaprakashgarige-28",
    linkedin: "https://www.linkedin.com/in/surya-prakash-garige/",
    email: "mailto:suryaprakashgarige009@gmail.com",
    emailText: "suryaprakashgarige009@gmail.com",
  },
};
