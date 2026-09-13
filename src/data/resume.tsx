import { Icons } from "@/components/icons";
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
    "Computer science graduate from McMaster University (B.A.Sc., 2026). I work on computer vision, language models, and the production systems behind them.",
  summary:
    "I'm a Computer Science graduate from McMaster University (B.A.Sc., 2026). I work across the machine-learning stack: training computer-vision and language models, building the full-stack services that serve them, and automating the operational work around them. Recently: a skin-disease classifier trained on 36.7k images, a fully-local RAG chatbot with sub-2s responses, and PowerShell + ServiceNow automation at Cooperators that cut manual processing time by 40%.",
  avatarUrl: "/me.png",
  skills: {
    Languages: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "SQL",
      "HTML",
      "CSS",
      "PowerShell",
      "Bash",
    ],
    "Developer tools": [
      "Git",
      "GitHub",
      "VS Code",
      "JupyterHub",
      "AWS",
      "Docker",
      "Postman",
      "Jira",
      "Power BI",
      "ServiceNow",
      "Linux",
    ],
    Frameworks: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "React",
      "Node.js",
      "Tailwind CSS",
      "LangChain",
      "REST APIs",
      "PostgreSQL",
    ],
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "/Ishaan_Jamwal_Coop_Resume.pdf",
      icon: FileTextIcon,
      label: "Resume",
    },
  ],
  contact: {
    email: "officialishaanjamwal@gmail.com",
    tel: "+13658884860",
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
      badges: ["Burlington, ON"],
      location: "Burlington, ON",
      title: "Associate Technical Support Analyst",
      logoUrl: "/Co-operators-Emblem.png",
      start: "Sep 2024 – Aug 2025, Jun 2026 – present",
      end: "",
      metric: "40% less manual processing",
      description:
        "Resolved 80+ Windows and macOS tickets a month in ServiceNow at 95% SLA compliance, ranking among top performers while supporting executive stakeholders.\nRan incident and problem management, including troubleshooting and root-cause analysis with cross-functional teams and vendors, cutting resolution time by 20%.\nWrote PowerShell automation against the ServiceNow API to streamline ticket processing, reducing manual processing time by 40%.\nAuthored 25+ knowledge-base articles for self-service troubleshooting, reducing recurring incidents by 25%.",
    },
    {
      company: "MoMacMo",
      href: "https://www.momacmo.org/",
      badges: ["Remote"],
      location: "Remote, Canada",
      title: "Software Developer Intern",
      logoUrl: "/MoMacMo Logo.png",
      start: "Jun 2023 – Dec 2023",
      end: "",
      metric: "30% faster visualization",
      description:
        "Deployed and optimized large-scale geophysical datasets on the Python-based Microscopium platform on AWS, improving visualization performance by 30%.\nProvisioned AWS EC2 infrastructure with TigerVNC remote access and ngrok tunneling, cutting environment setup time by 50%.\nDocumented deployment workflows and system configuration for reproducibility, speeding onboarding by 40%.",
    },
  ],
  education: [
    {
      school: "McMaster University",
      href: "https://www.mcmaster.ca",
      degree: "B.A.Sc. Computer Science",
      logoUrl: "/McMaster-logo.png",
      start: "Sep 2021",
      end: "Apr 2026",
      description:
        "Relevant coursework: Data Structures and Algorithms, Operating Systems, Databases, Machine Learning, Natural Language Processing.",
    },
  ],
  projects: [
    {
      title: "NexDerm",
      href: "https://github.com/NexSpend/NexDerm",
      dates: "Sep 2025 – Apr 2026",
      active: true,
      logoUrl: "brain",
      tagline: "AI skin-disease classifier",
      metric: { value: 36.7, suffix: "k", decimals: 1 },
      metricCaption: "dermatology images trained, 80% validation accuracy",
      focus: "Computer vision / full-stack",
      description:
        "Trained CLIP, DenseNet and ResNet models in PyTorch on McMaster HPC for multi-class skin-disease classification on a 10+ GB dataset, reaching 80% validation accuracy on 36.7k dermatology images. Built the full pipeline (preprocessing, augmentation, hyperparameter tuning, training and evaluation) plus a production full-stack app with Node.js and PostgreSQL REST APIs for secure uploads and real-time inference.",
      technologies: [
        "PyTorch",
        "FastAPI",
        "PostgreSQL",
        "React Native",
        "Docker",
        "AWS",
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
      title: "Local RAG Chatbot",
      href: "https://github.com/Jamwali",
      dates: "Oct 2025 – Jan 2026",
      active: true,
      logoUrl: "brain",
      tagline: "Offline retrieval-augmented Q&A",
      metric: { value: 2, suffix: "s" },
      metricCaption: "sub-2-second answers, running fully offline",
      focus: "LLMs / retrieval",
      description:
        "A retrieval-augmented chatbot running entirely on-device: llama3.2 via Ollama answering questions over restaurant reviews, with semantic search over vector embeddings in ChromaDB. LangChain drives a top-5 similarity retrieval pipeline and prompt templating for grounded answers, holding sub-2-second latency with no data leaving the machine.",
      technologies: ["LangChain", "Ollama", "llama3.2", "ChromaDB", "Python"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Jamwali",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "US Accident Dataset",
      href: "https://github.com/Jamwali/US-Accident-Dataset",
      dates: "Sep 2025 – Dec 2025",
      active: true,
      logoUrl: "brain",
      tagline: "Gradient-boosting benchmark on US crash data",
      metric: { value: 3, suffix: "" },
      metricCaption: "boosting models benchmarked, tuned with Optuna",
      focus: "ML research / model benchmarking",
      description:
        "A comparative study of gradient-boosting models (XGBoost, LightGBM and a stacked ensemble) across regression and classification on a US traffic-accident dataset. Hyperparameters were searched with Optuna's TPE sampler, with regularization and class-weight balancing for the imbalanced severity labels; models were scored on accuracy, F1, RMSE and R².",
      technologies: ["XGBoost", "LightGBM", "Optuna", "scikit-learn", "Pandas"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Jamwali/US-Accident-Dataset",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "CityLab",
      href: "",
      dates: "Sep 2025 – Dec 2025",
      active: true,
      logoUrl: "hamilton",
      tagline: "City of Hamilton SharePoint rebuild",
      metric: { value: 30, suffix: "+" },
      metricCaption: "municipal staff, 30% faster navigation",
      focus: "UX research / design",
      description:
        "Partnered with the City of Hamilton to rebuild SharePoint Online for 30+ municipal staff, improving navigation efficiency by 30%. Ran 15+ user interviews, surveys and workflow analyses to find collaboration bottlenecks, then delivered modern UX-driven layouts that the organization adopted smoothly.",
      technologies: ["SharePoint Online", "UX Research", "Figma"],
      links: [],
      image: "",
      video: "",
    },
  ],
  alsoBuilt: [
    {
      title: "Stock Predictor",
      description: "ML stock-trend forecasting with a Streamlit front end.",
      href: "https://github.com/Jamwali/StockPrediction",
    },
    {
      title: "URL Shortener",
      description: "FastAPI + SQLite service with custom codes and Redis caching.",
      href: "https://github.com/Jamwali/URL-Shortner",
    },
    {
      title: "Password Manager",
      description: "Encrypted desktop password vault in Python.",
      href: "https://github.com/Jamwali/Password-Manager",
    },
  ],
} as const;
