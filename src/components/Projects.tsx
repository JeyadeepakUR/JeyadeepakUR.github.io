"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const FedMarlIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8V16M24 32V40M16 24H8M40 24H32" stroke="url(#fedmarl-grad)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="8" stroke="url(#fedmarl-grad)" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="24" cy="24" r="3" fill="#3b82f6" />
        <circle cx="8" cy="24" r="3" fill="#8b5cf6" />
        <circle cx="40" cy="24" r="3" fill="#8b5cf6" />
        <circle cx="24" cy="8" r="3" fill="#8b5cf6" />
        <circle cx="24" cy="40" r="3" fill="#8b5cf6" />
        <path d="M12.686 12.686L18.343 18.343M29.657 29.657L35.314 35.314M35.314 12.686L29.657 18.343M18.343 29.657L12.686 35.314" stroke="url(#fedmarl-grad)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
        <circle cx="12.686" cy="12.686" r="2" fill="#3b82f6" fillOpacity="0.6" />
        <circle cx="35.314" cy="12.686" r="2" fill="#3b82f6" fillOpacity="0.6" />
        <circle cx="12.686" cy="35.314" r="2" fill="#3b82f6" fillOpacity="0.6" />
        <circle cx="35.314" cy="35.314" r="2" fill="#3b82f6" fillOpacity="0.6" />
        <defs>
            <linearGradient id="fedmarl-grad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
    </svg>
);

const ArisIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24" stroke="url(#aris-grad)" strokeWidth="2" strokeDasharray="8 4" />
        <path d="M24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="24" cy="24" r="4" fill="#3b82f6" />
        <path d="M24 20v-4M24 32v-4M20 24h-4M32 24h-4M21.171 21.171l-2.828-2.828M29.656 29.656l-2.828-2.828M29.656 18.343l-2.828 2.828M21.171 29.656l-2.828-2.828" stroke="url(#aris-grad)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="22" y="10" width="4" height="4" rx="1" fill="#8b5cf6" />
        <rect x="22" y="34" width="4" height="4" rx="1" fill="#8b5cf6" />
        <rect x="10" y="22" width="4" height="4" rx="1" fill="#3b82f6" />
        <rect x="34" y="22" width="4" height="4" rx="1" fill="#3b82f6" />
        <defs>
            <linearGradient id="aris-grad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
        </defs>
    </svg>
);

const OpusIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8L6 16L24 24L42 16L24 8Z" stroke="url(#opus-grad-1)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 24L24 32L42 24" stroke="url(#opus-grad-2)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 32L24 40L42 32" stroke="url(#opus-grad-3)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 14L16 18L24 22L32 18L24 14Z" fill="#8b5cf6" fillOpacity="0.8" />
        <circle cx="24" cy="8" r="2" fill="#3b82f6" />
        <circle cx="6" cy="16" r="2" fill="#8b5cf6" />
        <circle cx="42" cy="16" r="2" fill="#8b5cf6" />
        <circle cx="24" cy="24" r="2" fill="#3b82f6" />
        <circle cx="24" cy="32" r="2" fill="#8b5cf6" />
        <circle cx="24" cy="40" r="2" fill="#3b82f6" />
        <defs>
            <linearGradient id="opus-grad-1" x1="6" y1="8" x2="42" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="opus-grad-2" x1="6" y1="24" x2="42" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="opus-grad-3" x1="6" y1="32" x2="42" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
    </svg>
);

const projects = [
    {
        title: "FED-MARL",
        description: "A Federated Multi-Agent Reinforcement Learning framework built for scalable AI training across distributed edge clients without compromising privacy.",
        tech: ["PyTorch", "Federated Learning", "RL", "Python"],
        github: "https://github.com/JeyadeepakUR/federated-marl",
        icon: FedMarlIcon
    },
    {
        title: "ARIS",
        description: "Autonomous Research Intelligence System featuring semantic FAISS vector search, NetworkX knowledge graph visualization, and streaming LLM Q&A via FastAPI and React.",
        tech: ["FAISS", "FastAPI", "React", "Ollama"],
        github: "https://github.com/JeyadeepakUR/ARIS",
        icon: ArisIcon
    },
    {
        title: "Opus Project",
        description: "An advanced Phase-Based Reasoning Engine integrating multi-source knowledge (Drive, Web) using FAISS and LLMs with a Universal Exploration Playbook for dynamic problem-solving.",
        tech: ["LLM Agents", "Vector Search", "Python", "Next.js"],
        github: "https://github.com/JeyadeepakUR/opus",
        icon: OpusIcon
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Featured Work</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[var(--color-accent-1)] to-[var(--color-accent-2)] mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass-panel group relative overflow-hidden flex flex-col h-full hover:border-white/20 transition-colors"
                    >
                        {/* Top gradient glow inside card */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>

                        <div className="p-8 flex-grow flex flex-col relative z-10">
                            <div className="mb-6"><project.icon /></div>

                            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                            <p className="text-[var(--color-text-secondary)] mb-6 flex-grow">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map(t => (
                                    <span key={t} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[var(--color-text-secondary)]">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 mt-auto">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-accent-1)] transition-colors">
                                    <Github className="w-4 h-4" /> Source Code
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
