export type SystemStage = {
  label: string;
  detail: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  dates: string;
  role: string;
  outcome: string;
  accent: string;
  technologies: readonly string[];
  source?: string;
  challenge: string;
  approach: string;
  decisions: readonly {
    title: string;
    detail: string;
  }[];
  stages: readonly SystemStage[];
  proof: readonly {
    value: string;
    label: string;
  }[];
  caveat: string;
  next: string;
};

export const CASE_STUDIES = [
  {
    slug: "nexderm",
    title: "NexDerm",
    eyebrow: "Computer vision · Full-stack product",
    summary:
      "A 36.7k-image classification pipeline carried all the way from training on McMaster HPC to secure uploads and real-time inference.",
    dates: "Sep 2025 – Apr 2026",
    role: "Model training, evaluation and end-to-end product engineering",
    outcome: "80% validation accuracy across a 10+ GB dermatology dataset",
    accent: "hsl(350 75% 45%)",
    technologies: [
      "PyTorch",
      "FastAPI",
      "PostgreSQL",
      "React Native",
      "Docker",
      "AWS",
    ],
    source: "https://github.com/NexSpend/NexDerm",
    challenge:
      "The useful problem was larger than model selection. The data had to be prepared consistently, experiments had to be comparable, and a prediction needed a dependable path from a user upload to the interface.",
    approach:
      "I treated the classifier and the product around it as one system: preprocessing, augmentation, tuning, training and evaluation on the modelling side; uploads, APIs, persistence and inference on the product side.",
    decisions: [
      {
        title: "Compare architectures before committing",
        detail:
          "CLIP, DenseNet and ResNet were trained and evaluated instead of assuming one family would fit the dataset best.",
      },
      {
        title: "Make the experiment pipeline repeatable",
        detail:
          "Preprocessing, augmentation and hyperparameter tuning were part of the pipeline rather than one-off notebook steps.",
      },
      {
        title: "Design the delivery path with the model",
        detail:
          "The application included secure uploads, database-backed APIs and real-time inference so the result could be used outside a training environment.",
      },
    ],
    stages: [
      { label: "Image", detail: "A secure user upload enters the pipeline." },
      { label: "Prepare", detail: "Preprocessing matches the training path." },
      { label: "Infer", detail: "The selected PyTorch model scores classes." },
      { label: "API", detail: "The service returns a structured prediction." },
      { label: "Explain", detail: "The interface presents the result clearly." },
    ],
    proof: [
      { value: "36.7k", label: "training images" },
      { value: "10+ GB", label: "dataset" },
      { value: "80%", label: "validation accuracy" },
    ],
    caveat:
      "The 80% figure is validation accuracy from a project dataset—not clinical validation. NexDerm is a software and machine-learning project, not a diagnostic device or a substitute for medical advice.",
    next:
      "The next meaningful step would be a deeper error analysis across classes and skin tones, followed by calibrated confidence and specialist review—not simply another headline accuracy point.",
  },
  {
    slug: "local-rag-chatbot",
    title: "Local RAG Chatbot",
    eyebrow: "Language models · Private retrieval",
    summary:
      "An on-device question-answering system over restaurant reviews, with semantic retrieval and sub-two-second responses.",
    dates: "Oct 2025 – Jan 2026",
    role: "Retrieval architecture, local model integration and application engineering",
    outcome: "Grounded answers in under two seconds with no data leaving the machine",
    accent: "hsl(265 65% 50%)",
    technologies: ["LangChain", "Ollama", "llama3.2", "ChromaDB", "Python"],
    source: "https://github.com/Jamwali",
    challenge:
      "The goal was to make useful natural-language search work without a hosted model or remote data transfer, while keeping retrieval fast enough to feel conversational.",
    approach:
      "Restaurant reviews are represented as embeddings in ChromaDB. LangChain retrieves the five most similar pieces of context, templates them with the question and sends the grounded prompt to llama3.2 through Ollama.",
    decisions: [
      {
        title: "Keep the complete path local",
        detail:
          "Ollama and ChromaDB let both generation and retrieval run on-device, making privacy a system property rather than a policy promise.",
      },
      {
        title: "Retrieve before generating",
        detail:
          "Top-five semantic retrieval narrows the context to relevant review material instead of asking the model to answer without evidence.",
      },
      {
        title: "Treat latency as product quality",
        detail:
          "The pipeline was kept under two seconds because a technically correct answer still feels broken if the interaction drags.",
      },
    ],
    stages: [
      { label: "Question", detail: "The user asks in natural language." },
      { label: "Embed", detail: "The query becomes a searchable vector." },
      { label: "Retrieve", detail: "ChromaDB returns the top five matches." },
      { label: "Ground", detail: "Context and question become one prompt." },
      { label: "Answer", detail: "llama3.2 responds locally through Ollama." },
    ],
    proof: [
      { value: "<2s", label: "response time" },
      { value: "Top 5", label: "retrieved matches" },
      { value: "0", label: "remote data transfers" },
    ],
    caveat:
      "A grounded pipeline can still retrieve weak or incomplete context. Response quality depends on the source corpus and whether the relevant evidence appears in the top results.",
    next:
      "I would add a small retrieval evaluation set, expose source snippets beside each answer and measure both retrieval hit rate and answer faithfulness.",
  },
  {
    slug: "us-accident-dataset",
    title: "US Accident Dataset",
    eyebrow: "Machine learning · Comparative study",
    summary:
      "A controlled benchmark of gradient-boosting approaches across classification and regression on US traffic-accident data.",
    dates: "Sep 2025 – Dec 2025",
    role: "Experiment design, model development and comparative evaluation",
    outcome: "Three boosting approaches compared with tuning and imbalance-aware evaluation",
    accent: "hsl(35 90% 34%)",
    technologies: ["XGBoost", "LightGBM", "Optuna", "scikit-learn", "Pandas"],
    source: "https://github.com/Jamwali/US-Accident-Dataset",
    challenge:
      "Accident severity is imbalanced, and the project included both classification and regression. A single score would hide too much of the models’ behaviour.",
    approach:
      "I compared XGBoost, LightGBM and a stacked ensemble, used Optuna’s TPE sampler for hyperparameter search, and evaluated results with metrics suited to both prediction tasks.",
    decisions: [
      {
        title: "Benchmark, don’t crown a favourite early",
        detail:
          "XGBoost, LightGBM and a stacked ensemble were put through a shared evaluation rather than judged from isolated runs.",
      },
      {
        title: "Tune systematically",
        detail:
          "Optuna’s TPE sampler explored hyperparameters while regularization helped control model complexity.",
      },
      {
        title: "Use more than accuracy",
        detail:
          "F1, RMSE and R² joined accuracy so class imbalance and regression error remained visible.",
      },
    ],
    stages: [
      { label: "Data", detail: "Traffic records enter a common preparation path." },
      { label: "Balance", detail: "Class weights address severity imbalance." },
      { label: "Tune", detail: "Optuna searches the parameter space." },
      { label: "Compare", detail: "Three boosting strategies run side by side." },
      { label: "Evaluate", detail: "Task-appropriate metrics expose trade-offs." },
    ],
    proof: [
      { value: "3", label: "model strategies" },
      { value: "4", label: "reported metrics" },
      { value: "2", label: "prediction tasks" },
    ],
    caveat:
      "Benchmark results describe this dataset and split. They should not be read as a guarantee that the same model ranking will hold across regions, time periods or reporting practices.",
    next:
      "The next pass would add temporal and geographic holdouts so the comparison measures how each approach generalizes beyond a random split.",
  },
  {
    slug: "citylab",
    title: "CityLab",
    eyebrow: "UX research · Civic technology",
    summary:
      "A research-led SharePoint rebuild for more than 30 City of Hamilton staff, shaped by interviews, surveys and workflow analysis.",
    dates: "Sep 2025 – Dec 2025",
    role: "User research, workflow analysis and interface design",
    outcome: "30% faster navigation across the adopted experience",
    accent: "hsl(165 75% 26%)",
    technologies: ["SharePoint Online", "UX Research", "Figma"],
    challenge:
      "The problem was not a missing feature. Staff needed a clearer way through existing information and collaboration workflows, with enough continuity for the organization to adopt the result smoothly.",
    approach:
      "I used interviews, surveys and workflow analysis to locate collaboration bottlenecks before translating the findings into modern SharePoint layouts.",
    decisions: [
      {
        title: "Research the workflow before the interface",
        detail:
          "More than 15 interviews, surveys and workflow analysis established where navigation and collaboration were breaking down.",
      },
      {
        title: "Work within the organization’s platform",
        detail:
          "The solution improved SharePoint Online rather than introducing an unfamiliar system staff would have to maintain.",
      },
      {
        title: "Measure the everyday task",
        detail:
          "Navigation efficiency—not visual novelty—was the outcome used to judge the redesign.",
      },
    ],
    stages: [
      { label: "Listen", detail: "Staff describe real collaboration friction." },
      { label: "Map", detail: "Workflows reveal repeated bottlenecks." },
      { label: "Prioritize", detail: "High-friction navigation paths come first." },
      { label: "Design", detail: "Layouts are shaped inside SharePoint." },
      { label: "Adopt", detail: "The organization moves into the new structure." },
    ],
    proof: [
      { value: "30+", label: "staff supported" },
      { value: "15+", label: "user interviews" },
      { value: "30%", label: "faster navigation" },
    ],
    caveat:
      "There is no public repository for this stakeholder project. The case study therefore focuses on the research process and measured outcome rather than publishing internal City materials.",
    next:
      "A longer follow-up would pair navigation timing with search analytics and recurring staff feedback to see where the information architecture needs to evolve.",
  },
] as const satisfies readonly CaseStudy[];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getCaseStudyForTitle(title: string) {
  return CASE_STUDIES.find((study) => study.title === title);
}
