import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Ishaan Jamwal",
  initials: "IJ",
  url: "https://aquamarine-kataifi-e281d7.netlify.app",
  location: "Hamilton, ON, Canada",
  locationLink: "https://www.google.com/maps/place/hamilton+ontario",
  description:
    "Computer Science Student & Software Developer. Passionate about automation, API development, and full-stack web applications.",
  summary:
    "Fourth-year Computer Science student at McMaster University with co-op experience at The Cooperators. Specialized in automation, API development, and full-stack web applications using modern technologies like Python, JavaScript, and PowerShell. I enjoy building efficient solutions and have experience with API integration, database management, and automation systems.",
  avatarUrl: "/me.png",
  skills: [
    "Python",
    "JavaScript",
    "PowerShell",
    "React",
    "HTML5",
    "CSS3",
    "Java",
    "C/C++",
    "SQL",
    "AWS",
    "Git",
    "MongoDB",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
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
      company: "The Cooperators",
      href: "https://www.cooperators.ca",
      badges: ["Co-op"],
      location: "Remote/Hamilton, ON",
      title: "Software Development Co-op",
      logoUrl: "/cooperators.png",
      start: "2023",
      end: "2024",
      description:
        "Developed PowerShell automation scripts and worked with ServiceNow to streamline business processes. Created API integrations and automated workflows that improved operational efficiency.",
    },
  ],
  education: [
    {
      school: "McMaster University",
      href: "https://www.mcmaster.ca",
      degree: "Bachelor of Applied Science in Computer Science",
      logoUrl: "/mcmaster.png",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "Personal Portfolio",
      href: "https://aquamarine-kataifi-e281d7.netlify.app/",
      dates: "2024",
      active: true,
      description:
        "Responsive portfolio website with dark mode and mobile optimization. Built with modern web technologies to showcase my projects and skills.",
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
          href: "https://github.com/Jamwali/PersonalP",
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
      href: "#",
      dates: "2024",
      active: false,
      description:
        "Secure password management application with encryption and auto-fill capabilities. Built with Python and Tkinter for desktop use.",
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
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Cybersecurity Tool",
      href: "#",
      dates: "2024",
      active: false,
      description:
        "Network security scanner with vulnerability assessment features. Developed to help identify security vulnerabilities in network infrastructure.",
      technologies: [
        "Python",
        "Nmap",
        "Scapy",
        "Network Security",
        "Vulnerability Assessment",
      ],
      links: [
        {
          type: "Source",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Personal Finance Tracker",
      href: "#",
      dates: "Upcoming",
      active: false,
      description:
        "Comprehensive personal finance management and budgeting application. Will feature expense tracking, budget planning, and financial insights.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Financial APIs",
      ],
      links: [
        {
          type: "Source",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Capstone Project",
      href: "#",
      dates: "2025",
      active: false,
      description:
        "Final year computer science capstone project. Details to be announced as the project develops throughout the academic year.",
      technologies: [
        "TBD",
        "Computer Science",
        "Final Year Project",
      ],
      links: [
        {
          type: "Source",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
} as const;
