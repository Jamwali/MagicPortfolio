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
      logoUrl: "/cooperators.png",
      start: "Sep 2024",
      end: "Aug 2025",
      description:
        "Resolved 100+ 2nd level support tickets monthly across Windows/macOS with 95% SLA resolution rate. Automated key support tasks using PowerShell, ServiceNow API, and Power Automate, reducing manual workload by 40%. Authored 25+ internal documentation articles, reducing repeat inquiries by 25%.",
    },
    {
      company: "MoMacMo",
      href: "https://www.momacmo.org/",
      badges: ["Internship", "Remote"],
      location: "Houston, TX",
      title: "Software Developer Intern",
      logoUrl: "/momacmo.png",
      start: "Jun 2023",
      end: "Dec 2023",
      description:
        "Deployed geophysical datasets on Microscopium using AWS, enabling graphing of data points to enhance visualization. Engineered and deployed Microscopium using Python and Matplotlib with ngrok for online platform transition. Achieved 25% increase in processing speed and 35% cost reduction through strategic AWS resource management.",
    },
  ],
  education: [
    {
      school: "McMaster University",
      href: "https://www.mcmaster.ca",
      degree: "Bachelor of Computer Science Co-op",
      logoUrl: "/mcmaster.png",
      start: "Sep 2021",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "Food Recipe Finder",
      href: "https://recipe-finder-demo.netlify.app/",
      dates: "Jan 2023 - Mar 2023",
      active: true,
      description:
        "Interactive Recipe Finder using React with multiple integrated components for a seamless user experience. Utilized React Router for smooth navigation and integrated Spoonacular API to dynamically fetch and display recipes. Leveraged Bootstrap for fully responsive design across all devices.",
      technologies: [
        "React",
        "JavaScript",
        "Bootstrap",
        "React Router",
        "Spoonacular API",
        "Responsive Design",
      ],
      links: [
        {
          type: "Website",
          href: "https://recipe-finder-demo.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Jamwali/FoodRecipeFinder",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "London Subway Pathfinding Algorithm",
      href: "https://subway-pathfinding.netlify.app/",
      dates: "Jan 2023 - Apr 2023",
      active: true,
      description:
        "Advanced graph representation modeling London subway stations as nodes for comprehensive algorithmic analysis. Implemented location-based heuristics for Dijkstra's, Bellman-Ford's, and A* algorithms, significantly improving efficiency. Conducted thorough performance evaluations focusing on execution time, accuracy, and real-world applications.",
      technologies: [
        "Python",
        "Matplotlib",
        "Graph Algorithms",
        "Dijkstra's Algorithm",
        "A* Algorithm",
        "Data Structures",
      ],
      links: [
        {
          type: "Website",
          href: "https://subway-pathfinding.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Jamwali/LondonSubwayPathfinding",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
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
      href: "https://password-manager-secure.netlify.app/",
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
          type: "Website",
          href: "https://password-manager-secure.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Jamwali/PasswordManager",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Cybersecurity Tool",
      href: "https://cybersecurity-scanner.netlify.app/",
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
          type: "Website",
          href: "https://cybersecurity-scanner.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Jamwali/CybersecurityTool",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
} as const;
