import { Icons } from "@/components/icons";
import { SizeIcon } from "@radix-ui/react-icons";
import { HomeIcon, FileTextIcon } from "lucide-react";

export interface ProjectLink {
  type: string;
  href: string;
  icon?: React.ReactNode;
}

export interface Project {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  logoUrl?: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  image: string;
  video: string;
}

export const DATA = {
  name: "Ishaan Jamwal",
  initials: "IJ",
  url: "https://ishaanjamwal.netlify.app/",
  location: "Hamilton, ON, Canada",
  locationLink: "https://www.google.com/maps/place/hamilton+ontario",
  description:
    "Computer Science Co-op Student at McMaster University. Passionate about AI/ML, NLP, automation, and solving complex technical challenges.",
  summary:
    "Currently pursuing a Bachelor of Computer Science Co-op at McMaster University with hands-on experience in technical support, software development, and automation. I've worked at Cooperators as an Associate Technical Support Specialist and interned as a Software Developer at MoMacMo, developing geophysical data visualization tools on AWS. I'm passionate about creating efficient solutions and optimizing processes through automation.",
  avatarUrl: "/me.png",
  skills: [
    "Python",
    "Java",
    "C++",
    "JavaScript", 
    "TypeScript",
    "SQL",
    "HTML",
    "CSS",
    "PowerShell",
    "Bash",
    "Git",
    "GitHub",
    "VS Code",
    "IntelliJ IDEA",
    "PyCharm",
    "Jupyter",
    "AWS",
    "Linux",
    "Docker",
    "Kubernetes",
    "Entra/Azure ID",
    "Intune",
    "Homebrew",
    "ngrok",
    "Postman",
    "Jira",
    "Confluence",
    "NumPy",
    "Pandas",
    "scikit-learn",
    "PyTorch",
    "TensorFlow",
    "React",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Figma",
    "Workflow Automation",
    "RESTful API",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/Ishaan_Jamwal_Coop_Resume.pdf", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "officialishaanjamwal@gmail.com",
    tel: "+1234567890",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Jamwali",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jamwali/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:officialishaanjamwal@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Cooperators",
      href: "https://www.cooperators.ca",
      badges: ["Co-op", "2nd Level Support"],
      location: "Burlington, ON",
      title: "Associate Technical Support Specialist",
      logoUrl: "/Co-operators-Emblem.png",
      start: "Sep 2024",
      end: "Aug 2025",
      description:
        "• Resolved 100+ Windows/macOS support tickets monthly with a 95% SLA, consistently ranking as a top ticket resolver and handling on-call escalations with professionalism for senior staff and Board Members.\n• Collaborated with cross-functional teams and external vendors to proactively resolve issues, improving resolution time by 20% and earning recognition multiple times for strong teamwork and relationship-building.\n• Automated key support tasks using PowerShell, ServiceNow API, and Power Automate, reducing manual workload by 40% and boosting team efficiency.\n• Authored 25+ internal documentation articles, reducing repeat inquiries by 25% and being recognized for clear communication and knowledge sharing.",
    },
    {
      company: "MoMacMo",
      href: "https://www.momacmo.org/",
      badges: ["Internship", "Remote"],
      location: "Houston, TX",
      title: "Software Developer Intern",
      logoUrl: "/MoMacMo Logo.png",
      start: "Jun 2023",
      end: "Dec 2023",
      description:
        "• Deployed geophysical datasets on Microscopium using AWS, enabling the graphing of data points to enhance visualization and simplify the analysis of complex geophysical information.\n• Engineered and deployed Microscopium on AWS using Python and Matplotlib, leveraging ngrok to transition from local development to a fully operational online platform, while optimizing AWS for high-performance computation and fostering innovation.\n• Achieved a 25% increase in processing speed and a 35% cost reduction through strategic AWS resource management, resulting in a 30% improvement in project timelines.",
    },
  ],
  education: [
    {
      school: "McMaster University",
      href: "#",
      degree: "Bachelor of Computer Science Co-op",
      logoUrl: "/McMaster-logo.png", 
      start: "Sep 2021",
      end: "Present",
      description: "• Computer Science Co-op program with experience at working at The Co-operators and MoMacMo\n• Core coursework includes Data Structures and Algorithms, Database Systems, Computational Thinking, Logical Reasoning for Computer Science\n• Additional courses: Introduction to Software Development, Software Design Using Web Programming, and Principles of Programming Languages\n• Developing strong foundations in software engineering, problem-solving, and modern programming paradigms",
    },
  ],
  projects: [
    {
      title: "NexDerm - Skin Disease Detection App",
      href: "",
      dates: "September 2025 - Present",
      active: true,
      logoUrl: "brain",
      description:
        "Deep learning CNN model for skin disease classification trained on 15+ GB of dermatology data. Features Node.js backend with REST APIs and Docker containerization for scalable deployment.",
      technologies: [
        "EfficientNetV2",
        "TensorFlow",
        "Node.js",
        "Docker",
        "Deep Learning",
        "CNN",
        "REST API",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/NexSpend/NexDerm",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "CityLab - City of Hamilton SharePoint Optimization Project",
      href: "",
      dates: "September 2025 - Present",
      active: true,
      logoUrl: "hamilton",
      description:
        "Redesigned SharePoint Online for City of Hamilton to enhance usability and accessibility. Conducted user research and deployed modern UX-driven layouts with comprehensive documentation.",
      technologies: [
        "SharePoint Online",
        "UX Research",
        "Human-Centered Design",
        "User Research",
        "Workflow Analysis",
        "Accessibility",
      ],
      links: [
        {
          type: "Website",
          href: "",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Personal Portfolio",
      href: "https://ishaanjamwal.netlify.app/",
      dates: "2024",
      active: true,
      description:
        "Modern portfolio website featuring dark mode, mobile optimization, and responsive design showcasing projects and skills.",
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Responsive Design",
        "Dark Mode",
      ],
      links: [
        {
          type: "Website",
          href: "https://ishaanjamwal.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Jamwali/MagicPortfolio",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Stock Predictor",
      href: "https://stockprediction-nnbylue6ajcemujyqiegpc.streamlit.app",
      dates: "2024",
      active: true,
      description:
        "AI-powered tool to predict stock market trends and opportunities using machine learning algorithms and data analysis.",
      technologies: [
        "Python",
        "Machine Learning",
        "Data Analysis",
        "Streamlit",
        "NumPy",
        "Pandas",
      ],
      links: [
        {
          type: "Website",
          href: "https://stockprediction-nnbylue6ajcemujyqiegpc.streamlit.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Jamwali/StockPrediction",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Password Manager",
      href: "",
      dates: "2024",
      active: false,
      description:
        "A desktop password manager built with Python, featuring a Pygame GUI and strong encryption to keep your passwords safe. This project demonstrates secure password storage, encryption best practices, and GUI development.",
      technologies: [
        "Python",
        "Tkinter",
        "Cryptography",
        "Security",
        "Desktop App",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Jamwali/Password-Manager",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "URL Shortener",
      href: "",
      dates: "2024",
      active: false,
      description:
        "A modern, high-performance URL shortener built with FastAPI and SQLite providing a clean API for creating short URLs, custom short codes, and optional Redis integration for caching and rate limiting.",
      technologies: [
        "Python",
        "FastAPI",
        "SQLite",
        "Redis",
        "API Development",
        "Web Development",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Jamwali/URL-Shortner",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
} as const;
