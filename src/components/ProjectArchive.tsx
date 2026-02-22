"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Folder, Github, TerminalSquare, Calendar, Tag, Search, Star, GitFork, Activity } from "lucide-react";

const allProjects = [
    { id: "workflow", year: "2024", name: "workflow-engine", domain: "Data Pipes", builtWith: ["Python", "SQLite"], description: "A scalable workflow engine designed for automated execution of complex AI/ML data pipelines with fault tolerance and retries.", link: "https://github.com/JeyadeepakUR/workflow-engine", tags: ["mlops", "data engineering", "automation", "backend", "orchestration", "pipeline"] },
    { id: "hive", year: "2026", name: "hive", domain: "Agents", builtWith: ["TypeScript", "AI"], description: "Outcome driven agent development framework that autonomously evolves to fix its own bugs and adapt to new API changes.", link: "https://github.com/JeyadeepakUR/hive", tags: ["llm", "ai agent", "autonomous", "generative ai", "framework", "auto-fixing", "langchain", "reasoning"] },
    { id: "modex", year: "2024", name: "modex", domain: "Web Platform", builtWith: ["TypeScript", "Next.js", "Tailwind"], description: "Modern data exchange tooling for synchronizing real-time streams across distributed clients using WebSockets.", link: "https://github.com/JeyadeepakUR/modex", tags: ["real-time", "websockets", "streaming", "frontend", "full-stack", "sync", "platform", "web"] },
    { id: "loan", year: "2024", name: "MCP_Loan_approval", domain: "Data Science", builtWith: ["Python", "Scikit", "Pandas"], description: "Machine Learning model for real-time loan approval prediction, integrated with an active MCP pipeline for continuous evaluation.", link: "https://github.com/JeyadeepakUR/MCP_Loan_approval", tags: ["machine learning", "ml", "classification", "predictive model", "finance", "mcp", "analytics", "data model"] },
    { id: "fact", year: "2024", name: "FactSenseAPI", domain: "NLP", builtWith: ["Python", "FastAPI", "Transformers"], description: "A fast semantic fact-checking API that cross-references text claims against verified knowledge graphs using vector embeddings.", link: "https://github.com/JeyadeepakUR/FactSenseAPI", tags: ["nlp", "natural language processing", "rag", "vector search", "embeddings", "api", "backend", "semantic"] },
    { id: "addna", year: "2023", name: "Ad-DNA", domain: "Analytics", builtWith: ["TypeScript", "React", "Chart.js"], description: "Marketing analytics platform generating insights from cross-channel advertising data, presenting actionable metrics via dashboards.", link: "https://github.com/JeyadeepakUR/Ad-DNA", tags: ["dashboard", "data visualization", "metrics", "frontend", "marketing", "analytics", "ui"] },
    { id: "cs50", year: "2023", name: "CS50AI-Projects", domain: "AI Core", builtWith: ["Python", "NLTK"], description: "Implementation of Search, Knowledge, Uncertainty, Optimization, and Learning algorithms from Harvard's CS50AI curriculum.", link: "https://github.com/JeyadeepakUR/CS50AI-Projects", tags: ["algorithms", "foundations", "ai", "search", "learning", "harvard", "theory", "computer science"] },
];

export default function ProjectArchive() {
    const [searchQuery, setSearchQuery] = useState("");
    const [githubRepos, setGithubRepos] = useState<typeof allProjects>([]);
    const [isLoadingRepos, setIsLoadingRepos] = useState(false);

    // Fetch all public GitHub repositories to allow searching beyond the highlighted ones
    useEffect(() => {
        setIsLoadingRepos(true);
        fetch("https://api.github.com/users/JeyadeepakUR/repos?per_page=100&sort=updated")
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) return;

                const formattedRepos = data.map((repo: any) => ({
                    id: repo.name,
                    year: repo.created_at ? new Date(repo.created_at).getFullYear().toString() : "N/A",
                    name: repo.name,
                    domain: repo.language || "Other",
                    builtWith: repo.topics && repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : []),
                    description: repo.description || "No description provided.",
                    link: repo.html_url,
                    tags: repo.topics || []
                }));

                // Filter out projects that are already in the highlighted `allProjects` array
                const existingNames = new Set(allProjects.map(p => p.name.toLowerCase()));
                const newRepos = formattedRepos.filter(r => !existingNames.has(r.name.toLowerCase()));

                setGithubRepos(newRepos);
                setIsLoadingRepos(false);
            })
            .catch(err => {
                console.error("Failed to fetch GitHub repositories:", err);
                setIsLoadingRepos(false);
            });
    }, []);

    // Client-side Semantic Intent Algorithmic Search
    const filteredProjects = useMemo(() => {
        // Pool both highlighted and fetched hidden projects
        const combinedProjects = [...allProjects, ...githubRepos];

        if (!searchQuery.trim()) return allProjects; // Default view only shows highlighted

        // Break query into distinct intent terms, discarding short filler words
        const queryTerms = searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 2);

        // Fallback to basic search if terms are too short
        if (queryTerms.length === 0) {
            const query = searchQuery.toLowerCase();
            return combinedProjects.filter((p) => {
                const searchString = `${p.name} ${p.domain} ${p.description} ${p.builtWith.join(" ")} ${p.tags?.join(" ")}`.toLowerCase();
                return searchString.includes(query);
            });
        }

        // Score based matching
        return combinedProjects.map(p => {
            let score = 0;
            const searchString = `${p.name} ${p.domain} ${p.description} ${p.builtWith.join(" ")} ${p.tags?.join(" ")}`.toLowerCase();

            queryTerms.forEach(term => {
                // Exact word match
                if (new RegExp(`\\b${term}\\b`).test(searchString)) score += 3;
                // Partial string match
                else if (searchString.includes(term)) score += 1;

                // High priority match: Domain, specific tech, or specialized tags
                if (p.domain.toLowerCase().includes(term) ||
                    p.builtWith.some(tech => tech.toLowerCase() === term) ||
                    p.tags?.some(tag => tag.toLowerCase() === term)) {
                    score += 5;
                }
            });
            return { project: p, score };
        })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score) // Rank highest intent matches first
            .map(item => item.project);

    }, [searchQuery]);

    const [activeProject, setActiveProject] = useState(allProjects[0]);

    // Live Telemetry State for Active Project
    const [repoStats, setRepoStats] = useState<{
        stars: number | null;
        forks: number | null;
        languages: Record<string, number> | null;
        activity: number[] | null;
        loading: boolean;
    }>({ stars: null, forks: null, languages: null, activity: null, loading: false });

    // Fetch deep technical metrics when a project is selected
    useEffect(() => {
        if (!activeProject.link.includes("github.com")) return;

        const repoPath = activeProject.link.split("github.com/")[1];
        if (!repoPath) return;

        let isMounted = true;
        setRepoStats({ stars: null, forks: null, languages: null, activity: null, loading: true });

        const fetchMetrics = async () => {
            try {
                const [repoRes, langRes, activityRes] = await Promise.all([
                    fetch(`https://api.github.com/repos/${repoPath}`),
                    fetch(`https://api.github.com/repos/${repoPath}/languages`),
                    // Fetch weekly commit bounds across past 52 weeks
                    fetch(`https://api.github.com/repos/${repoPath}/stats/participation`)
                ]);

                const repoData = repoRes.ok ? await repoRes.json() : null;
                const langData = langRes.ok ? await langRes.json() : null;
                const activityData = activityRes.ok ? await activityRes.json() : null;

                if (isMounted) {
                    setRepoStats({
                        stars: repoData?.stargazers_count ?? null,
                        forks: repoData?.forks_count ?? null,
                        languages: langData ?? null,
                        activity: activityData?.all ?? null,
                        loading: false
                    });
                }
            } catch (err) {
                console.error("Telemetry fetch failed:", err);
                if (isMounted) setRepoStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchMetrics();
        return () => { isMounted = false; };
    }, [activeProject]);

    // Sparkline SVG Generator
    const renderSparkline = (data: number[]) => {
        if (!data || data.length === 0) return null;
        const max = Math.max(...data, 1);
        const width = 200;
        const height = 40;
        const pts = data.map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (val / max) * height;
            return `${x},${y}`;
        }).join(" ");

        return (
            <svg viewBox={`0 -5 ${width} ${height + 10}`} className="w-full h-12 stroke-[#58A6FF] fill-none" preserveAspectRatio="none">
                <polyline points={pts} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    };

    return (
        <section id="archive" className="py-16 md:py-24 px-6 max-w-6xl mx-auto relative z-10 flex flex-col justify-center">
            <div className="w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <TerminalSquare className="w-8 h-8 text-[#58A6FF] opacity-80" />
                            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight">Project Archive</h2>
                        </div>
                        <a
                            href="https://github.com/JeyadeepakUR?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 md:mt-2 px-4 py-1.5 rounded-full border border-[var(--color-border-glass)] text-sm text-[var(--color-accent-1)] bg-[#58A6FF]/10 hover:bg-[#58A6FF]/20 transition-colors flex items-center gap-2 group"
                        >
                            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold tracking-wide">View Full Archive on GitHub</span>
                        </a>
                    </div>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                        A focused look into my minor repositories and specialized experiments.
                    </p>
                </motion.div>

                {/* Master-Detail Layout */}
                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 border border-[#222] bg-[#0A0A0B] rounded-2xl overflow-hidden shadow-2xl min-h-[500px]">

                    {/* Master List (Left Column) */}
                    <div className="w-full md:w-1/3 lg:w-[350px] border-b md:border-b-0 md:border-r border-[#222] bg-[#050505] flex flex-col h-[400px] md:h-auto">
                        {/* Search Bar */}
                        <div className="p-4 border-b border-[#222]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)] opacity-70" />
                                <input
                                    type="text"
                                    placeholder="Search by intent, tech, or domain..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#111] border border-[#333] rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[#58A6FF] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto custom-scrollbar flex-1 relative">
                            {isLoadingRepos && searchQuery.trim() && (
                                <div className="absolute top-0 left-0 right-0 bg-blue-500/10 text-blue-400 text-xs text-center py-1 border-b border-blue-500/20">
                                    Fetching full GitHub archive...
                                </div>
                            )}
                            {filteredProjects.length === 0 ? (
                                <div className="p-6 text-center text-[var(--color-text-secondary)] text-sm">
                                    No projects matching your search intent.
                                </div>
                            ) : (
                                filteredProjects.map((project) => {
                                    const isActive = activeProject.id === project.id;

                                    return (
                                        <button
                                            key={project.id}
                                            onClick={() => setActiveProject(project)}
                                            className={`w-full text-left px-5 py-4 border-b border-[#222]/50 transition-all flex items-center justify-between group ${isActive
                                                ? 'bg-[#111112] border-l-4 border-l-[#58A6FF]'
                                                : 'bg-transparent border-l-4 border-l-transparent hover:bg-[#0A0A0B]'
                                                }`}
                                        >
                                            <div>
                                                <h3 className={`font-semibold text-base mb-1 transition-colors ${isActive ? 'text-[#58A6FF]' : 'text-gray-300 group-hover:text-white'}`}>
                                                    {project.name}
                                                </h3>
                                                <div className="text-xs text-gray-500 font-mono tracking-wider">
                                                    {project.year} — {project.domain}
                                                </div>
                                            </div>
                                            <Folder className={`w-4 h-4 transition-colors ${isActive ? 'text-[#58A6FF]' : 'text-gray-600 group-hover:text-gray-400'}`} />
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Detail View (Right Column) */}
                    <div className="flex-1 p-6 md:p-10 relative bg-[#0A0A0B] flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col"
                            >
                                {/* Detail Header */}
                                <div className="mb-8">
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 mb-4">
                                        <span className="flex items-center gap-1.5 bg-[#ffffff05] border border-[#ffffff10] px-3 py-1 rounded-md">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {activeProject.year}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-[#ffffff05] border border-[#ffffff10] px-3 py-1 rounded-md">
                                            <Tag className="w-3.5 h-3.5" />
                                            {activeProject.domain}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                        {activeProject.name}
                                    </h2>
                                </div>

                                {/* Detail Body */}
                                <div className="flex-1">
                                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl">
                                        {activeProject.description}
                                    </p>

                                    {/* Architectural Telemetry Dashboard */}
                                    <div className="bg-[#111112] border border-[#222] rounded-xl p-5 mb-8">
                                        <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-4">
                                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-[#58A6FF]" />
                                                Repository Telemetry
                                            </h4>
                                            {repoStats.loading && <div className="text-xs text-blue-400 animate-pulse font-mono">Connecting payload...</div>}
                                            {!repoStats.loading && repoStats.stars !== null && (
                                                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                                                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {repoStats.stars}</span>
                                                    <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {repoStats.forks}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Languages Breakdown */}
                                            <div>
                                                <h5 className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">Architecture</h5>
                                                {repoStats.loading ? (
                                                    <div className="h-4 bg-[#222] rounded w-1/2 animate-pulse mt-1"></div>
                                                ) : repoStats.languages && Object.keys(repoStats.languages).length > 0 ? (
                                                    <div className="space-y-2">
                                                        {(() => {
                                                            const total = Object.values(repoStats.languages).reduce((a, b) => a + b, 0);
                                                            return Object.entries(repoStats.languages).slice(0, 4).map(([lang, bytes]) => (
                                                                <div key={lang} className="flex items-center justify-between text-sm">
                                                                    <span className="text-gray-300 font-mono">{lang}</span>
                                                                    <span className="text-gray-500 font-mono text-xs">{((bytes / total) * 100).toFixed(1)}%</span>
                                                                </div>
                                                            ));
                                                        })()}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs font-mono text-gray-500">Telemetry unavailable.</div>
                                                )}
                                            </div>

                                            {/* Commit Sparkline */}
                                            <div className="flex flex-col justify-end">
                                                <h5 className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider">Commit Activity (52-Wk)</h5>
                                                <div className="h-16 flex items-end border-b border-l border-[#222] pb-1 pl-1 opacity-80">
                                                    {repoStats.loading ? (
                                                        <div className="w-full h-full bg-[#222] animate-pulse rounded-md"></div>
                                                    ) : repoStats.activity ? (
                                                        renderSparkline(repoStats.activity)
                                                    ) : (
                                                        <div className="text-xs text-gray-600 font-mono mt-auto m-2">Activity timeline untracked.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">Base Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {activeProject.builtWith.map(tech => (
                                                <span key={tech} className="text-sm px-4 py-1.5 rounded-full bg-[#111112] text-gray-200 border border-[#333]">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Detail Footer */}
                                <div className="mt-12 pt-8 border-t border-[#222] flex justify-start">
                                    <a
                                        href={activeProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        View Repository
                                        <ArrowUpRight className="w-4 h-4 opacity-60 ml-1" />
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
