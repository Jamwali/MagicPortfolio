import { Icons } from "@/components/icons";
import { HomeIcon, FileTextIcon } from "lucide-react";

export const DATA = {
  name: "Ishaan Jamwal",
  initials: "IJ",
  url: "https://aquamarine-kataifi-e281d7.netlify.app",
  location: "Hamilton, ON, Canada",
  locationLink: "https://www.google.com/maps/place/hamilton+ontario",
  description:
    "Computer Science Co-op Student at McMaster University. Passionate about software development, automation, and solving complex technical challenges.",
  summary:
    "Currently pursuing a Bachelor of Computer Science Co-op at McMaster University with hands-on experience in technical support, software development, and automation. I've worked at Cooperators as an Associate Technical Support Specialist and interned as a Software Developer at MoMacMo, developing geophysical data visualization tools on AWS. I'm passionate about creating efficient solutions and optimizing processes through automation.",
  avatarUrl: "/me.png",
  skills: [
    "Python",
    "Java",
    "C/C++",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "Haskell",
    "Elm",
    "Assembly",
    "LaTeX",
    "Prolog",
    "PowerShell",
    "React",
    "AWS",
    "Linux",
    "GitHub",
    "MongoDB",
    "Figma",
    "Bootstrap",
    "NumPy",
    "SciPy",
    "Matplotlib",
    "Jupyter Notebook",
    "Git",
    "VS Code",
    "IntelliJ IDEA",
    "ServiceNow API",
    "Power Automate",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "https://mega.nz/file/cQhDwCqa#6bFCV321T9qXZp62pkZlepygYS42UBasc1KOwQyD7kk", icon: FileTextIcon, label: "Resume" },
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
      logoUrl: "C",
      start: "Sep 2024",
      end: "Aug 2025",
      description:
        "• Resolved 100+ 2nd level support tickets monthly across Windows/macOS with 95% SLA resolution rate\n• Automated key support tasks using PowerShell, ServiceNow API, and Power Automate, reducing manual workload by 40%\n• Authored 25+ internal documentation articles, reducing repeat inquiries by 25%",
    },
    {
      company: "MoMacMo",
      href: "https://www.momacmo.org/",
      badges: ["Internship", "Remote"],
      location: "Houston, TX",
      title: "Software Developer Intern",
      logoUrl: "M",
      start: "Jun 2023",
      end: "Dec 2023",
      description:
        "• Deployed geophysical datasets on Microscopium using AWS, enabling graphing of data points to enhance visualization\n• Engineered and deployed Microscopium using Python and Matplotlib with ngrok for online platform transition\n• Achieved 25% increase in processing speed and 35% cost reduction through strategic AWS resource management",
    },
  ],
  education: [
    {
      school: "McMaster University",
      href: "https://www.mcmaster.ca",
      degree: "Bachelor of Computer Science Co-op",
      logoUrl: "M",
      start: "Sep 2021",
      end: "Present",
      description: "• Computer Science Co-op program with experience at working at The Co-operators and MoMacMo\n• Core coursework includes Data Structures and Algorithms, Database Systems, Computational Thinking, Logical Reasoning for Computer Science\n• Additional courses: Introduction to Software Development, Software Design Using Web Programming, and Principles of Programming Languages\n• Developing strong foundations in software engineering, problem-solving, and modern programming paradigms",
    },
  ],
  projects: [
    {
      title: "Personal Portfolio",
      href: "https://aquamarine-kataifi-e281d7.netlify.app/",
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
          href: "https://aquamarine-kataifi-e281d7.netlify.app/",
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
