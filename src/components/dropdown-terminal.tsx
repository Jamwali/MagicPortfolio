"use client";

import React, { useState } from "react";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const commands: Record<string, string> = {
  whoami: "Ishaan Jamwal - Full Stack Developer & ML Engineer",
  skills: "Python, JavaScript, React, TensorFlow, AWS, Docker...",
  experience:
    "Support Specialist @ Cooperators (2024)\nMoMacMo Intern (2023)\nMcMaster University Student (2021-Present)",
  contact: "Email: ishaan@example.com\nGitHub: github.com/Jamwali\nLinkedIn: linkedin.com/in/ishaanjamwal",
  github: "GitHub: https://github.com/Jamwali",
  linkedin: "LinkedIn: https://linkedin.com/in/ishaanjamwal",
  location: "📍 Hamilton, Ontario, Canada",
  "ls -la projects/": "NexDerm/          (Deep Learning, TensorFlow, Node.js)\nCityLab/          (UX Design, SharePoint, React)\nStockPredictor/   (ML, Data Analysis, Streamlit)",
  projects: "NexDerm/          (Deep Learning, TensorFlow, Node.js)\nCityLab/          (UX Design, SharePoint, React)\nStockPredictor/   (ML, Data Analysis, Streamlit)",
  help: "Available commands:\n  whoami        - Who you are\n  skills        - Display technical skills\n  experience    - View work experience\n  contact       - Get in touch\n  github        - GitHub profile\n  linkedin      - LinkedIn profile\n  location      - Your location\n  projects      - Show portfolio projects\n  theme         - Toggle dark/light theme\n  download-cv   - Download resume",
  theme: "Theme toggled! (Light/Dark mode switching enabled)",
  "download-cv": "DOWNLOAD",
  "": "",
};

export function DropdownTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "command" | "output"; text: string }[]>([
    { type: "output", text: "Welcome to my portfolio terminal! Type 'help' for commands." },
  ]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.toLowerCase().trim();
      const newHistory = [...history];

      // Add command to history
      newHistory.push({ type: "command", text: `${input}` });

      // Get output
      if (command === "clear") {
        setHistory([]);
        setInput("");
        return;
      }

      // Handle download-cv command
      if (command === "download-cv") {
        const link = document.createElement("a");
        link.href = "/Ishaan_Jamwal_Coop_Resume.pdf";
        link.download = "Ishaan_Jamwal_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        newHistory.push({ type: "output", text: "✓ Resume downloaded successfully!" });
        setHistory(newHistory);
        setInput("");
        return;
      }

      // Handle theme toggle
      if (command === "theme") {
        const html = document.documentElement;
        html.classList.toggle("dark");
        newHistory.push({ type: "output", text: "✓ Theme toggled! (Light/Dark mode)" });
        setHistory(newHistory);
        setInput("");
        return;
      }

      const output = commands[command] || `Command not found: ${command}. Type 'help' for available commands.`;
      newHistory.push({ type: "output", text: output });

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4 group"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">$</span>
          <span>Interactive Terminal</span>
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        <div className="border-border bg-background z-0 h-full max-h-[400px] w-full rounded-xl border overflow-y-auto flex flex-col">
          <div className="border-border flex flex-col gap-y-2 border-b p-4">
            <div className="flex flex-row gap-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <pre className="p-6 flex-1 overflow-auto font-['Fira_Code',monospace] text-sm leading-relaxed">
            <code className="grid gap-y-1 pl-4">
              {history.map((item, idx) => (
                <div key={idx} className={item.type === "command" ? "text-foreground font-semibold" : "text-muted-foreground whitespace-pre-wrap"}>
                  {item.type === "command" ? (
                    <>
                      <span className="text-green-500">&gt; </span>
                      <TypingAnimation duration={20} startOnView={false}>
                        {item.text}
                      </TypingAnimation>
                    </>
                  ) : (
                    <TypingAnimation duration={30} startOnView={false} className="text-muted-foreground">
                      {item.text}
                    </TypingAnimation>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-1">
                <span className="text-green-500">&gt; </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  placeholder="Type a command..."
                  autoFocus={isOpen}
                  className="bg-transparent outline-none flex-1 text-foreground placeholder-muted-foreground font-['Fira_Code',monospace] text-sm"
                />
              </div>
            </code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
