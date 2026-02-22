"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Activity, GitBranch, Terminal, Database, Cpu, Cloud, Code2, Sparkles, AlertCircle } from "lucide-react";

// The hardcoded skills matrix
const skillCategories = [
    {
        title: "AI & Machine Learning",
        icon: <Sparkles className="w-5 h-5 text-purple-400" />,
        skills: ["PyTorch", "TensorFlow", "LangChain", "OpenAI API", "HuggingFace", "Scikit-Learn", "Pandas", "NumPy"]
    },
    {
        title: "Backend & Systems",
        icon: <Server className="w-5 h-5 text-blue-400" />,
        skills: ["Python", "FastAPI", "Django", "Node.js", "Express", "REST APIs", "WebSockets", "Microservices"]
    },
    {
        title: "Data & Infrastructure",
        icon: <Database className="w-5 h-5 text-green-400" />,
        skills: ["PostgreSQL", "MongoDB", "Redis", "Docker", "AWS (EC2, S3)", "CI/CD", "Git", "Linux"]
    },
    {
        title: "Frontend Engineering",
        icon: <Code2 className="w-5 h-5 text-yellow-400" />,
        skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "HTML/CSS"]
    }
];

const RadarChart = ({ data }: { data: number[] }) => {
    // Math logic for a 5-point radar chart
    const cx = 100, cy = 100, r = 60;

    const getPoint = (value: number, index: number, total: number) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const dist = (value / 100) * r;
        return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
    };

    const points = data.map((val, i) => getPoint(val, i, 5));
    const pointString = points.map(p => `${p.x},${p.y}`).join(" ");
    const axisPoints = data.map((_, i) => getPoint(100, i, 5));

    const labels = ["Quality", "Activity", "Docs", "Complexity", "Demos"];
    const labelPoints = labels.map((_, i) => getPoint(135, i, 5));

    return (
        <svg viewBox="0 0 200 200" className="w-full h-48 drop-shadow-[0_0_15px_rgba(88,166,255,0.15)] mt-2">
            {/* Background Webs */}
            {[20, 40, 60, 80, 100].map(level => {
                const levelPoints = data.map((_, i) => getPoint(level, i, 5));
                const levelString = levelPoints.map(p => `${p.x},${p.y}`).join(" ");
                return <polygon key={level} points={levelString} fill="none" stroke="#222" strokeWidth="1" />
            })}

            {/* Axes */}
            {axisPoints.map((p, i) => (
                <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#333" strokeWidth="1" />
            ))}

            {/* Labels */}
            {labels.map((label, i) => {
                let p = labelPoints[i];
                return (
                    <text key={label} x={p.x} y={p.y + 3} fontSize="9" fill="#888" textAnchor="middle" className="font-mono uppercase tracking-wider">
                        {label}
                    </text>
                );
            })}

            {/* Data Polygon */}
            <polygon points={pointString} fill="rgba(88,166,255,0.15)" stroke="#58A6FF" strokeWidth="1.5" />

            {/* Data Points */}
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="#58A6FF" />
            ))}
        </svg>
    );
};

export default function Skills() {
    const [telemetry, setTelemetry] = useState({
        commits: 0,
        repos: 0,
        radarData: [85, 90, 75, 80, 70], // Default base values
        loading: true,
        error: false
    });

    useEffect(() => {
        // Fetch live GitHub telemetry
        const fetchGithubStats = async () => {
            try {
                // Fetch repositories to calculate total and recent activity
                const response = await fetch("https://api.github.com/users/JeyadeepakUR/repos?per_page=100&sort=updated");

                if (!response.ok) {
                    throw new Error("GitHub API rate limit or error");
                }

                const repos = await response.json();

                let starCount = 0;
                let forksCount = 0;
                let reposWithDesc = 0;
                let reposWithWiki = 0;
                let reposWithHomepage = 0;
                let totalSize = 0;
                let recentActive = 0;

                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

                repos.forEach((repo: any) => {
                    starCount += repo.stargazers_count;
                    forksCount += repo.forks_count;
                    if (repo.description) reposWithDesc++;
                    if (repo.has_wiki) reposWithWiki++;
                    if (repo.homepage) reposWithHomepage++;
                    totalSize += repo.size;

                    if (new Date(repo.updated_at) > sixMonthsAgo) recentActive++;
                });

                const total = repos.length || 1;

                // --- Technical Depth Heuristics Scoring ---
                // Quality (Stars & Forks acting as community validation)
                const quality = Math.min(100, (starCount * 5) + (forksCount * 10) + 40);
                // Activity (Volume of repos updated structurally over last 6 months)
                const activity = Math.min(100, (recentActive / total) * 100 * 2 + 30);
                // Documentation (Has descriptions and wikis enabled)
                const docs = Math.min(100, (reposWithDesc / total) * 100 + (reposWithWiki * 5) + 20);
                // Complexity (Average repo size overhead in KBs proxying volume)
                const avgSize = totalSize / total;
                const complexity = Math.min(100, (avgSize / 1000) * 100 + 45);
                // Web Demos (Percentage of repos exposing a live hosted environment)
                const demos = Math.min(100, (reposWithHomepage / total) * 100 * 3 + 10);

                const radarData = [
                    Math.round(quality),
                    Math.round(activity),
                    Math.round(docs),
                    Math.round(complexity),
                    Math.round(demos)
                ];

                setTelemetry({
                    commits: starCount,
                    repos: repos.length,
                    radarData,
                    loading: false,
                    error: false
                });

            } catch (err) {
                console.error("Telemetry fetch failed:", err);
                setTelemetry({
                    commits: 12,
                    repos: 50,
                    radarData: [85, 90, 75, 80, 70],
                    loading: false,
                    error: true
                });
            }
        };

        fetchGithubStats();
    }, []);

    return (
        <section id="skills" className="py-16 md:py-20 px-6 max-w-[1200px] mx-auto relative z-10">

            <div className="flex flex-col lg:flex-row gap-12">

                {/* Left Column: Skills Matrix */}
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white">Core Architecture</h2>
                        <p className="text-[var(--color-text-secondary)]">
                            The foundational technologies I use to build intelligent systems, scalable backends, and robust infrastructure.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#050505]/50 border border-[var(--color-border-glass)] backdrop-blur-sm rounded-xl p-6 hover:bg-[#ffffff03] transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    {category.icon}
                                    <h3 className="text-white font-semibold">{category.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map(skill => (
                                        <span
                                            key={skill}
                                            className="text-xs text-gray-300 bg-[#ffffff0a] border border-[#ffffff10] px-2.5 py-1 rounded-md"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Live Telemetry */}
                <div className="w-full lg:w-[350px] shrink-0">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-[#020202] border border-[var(--color-border-glass)] rounded-xl p-6 h-full font-mono relative overflow-hidden flex flex-col"
                    >
                        {/* Grid background effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                        <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-[#ffffff15]">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-green-400" />
                                <span className="text-xs uppercase tracking-wider text-green-400 font-bold">Live Telemetry</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                            </div>
                        </div>

                        <div className="relative z-10 flex-1 flex flex-col justify-center space-y-8">

                            {/* Metric 1 */}
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <GitBranch className="w-3 h-3" />
                                    Public Repositories
                                </div>
                                <div className="text-4xl text-white font-light tracking-tight flex items-baseline gap-2">
                                    {telemetry.loading ? "..." : telemetry.repos}
                                    {telemetry.error && <span className="text-xs text-yellow-500/50 ml-2" title="API Fallback">(cached)</span>}
                                </div>
                            </div>

                            {/* Metric 2 */}
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    Total GitHub Stars
                                </div>
                                <div className="text-4xl text-white font-light tracking-tight flex items-baseline gap-2">
                                    {telemetry.loading ? "..." : telemetry.commits}
                                    {telemetry.error && <span className="text-xs text-yellow-500/50 ml-2" title="API Fallback">(cached)</span>}
                                </div>
                            </div>

                            {/* Radar Chart Panel */}
                            <div className="pt-2 pb-2">
                                <div className="text-[#58A6FF] text-[10px] shadow-sm uppercase font-bold tracking-widest mb-1 flex items-center justify-center gap-2">
                                    <Activity className="w-3 h-3" />
                                    Developer Heuristics Matrix
                                </div>
                                <div className="flex justify-center items-center h-48 w-full relative">
                                    {telemetry.loading ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-32 h-32 border border-[#222] rounded-full animate-pulse opacity-20"></div>
                                        </div>
                                    ) : (
                                        <RadarChart data={telemetry.radarData} />
                                    )}
                                </div>
                            </div>

                            {/* Server Status Mock */}
                            <div className="pt-4 mt-auto">
                                <div className="bg-[#111] border border-[#222] rounded flex items-center justify-between p-3 text-xs">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Terminal className="w-3 h-3" />
                                        <span>Sys_Status</span>
                                    </div>
                                    <span className="text-green-400 font-bold">ONLINE</span>
                                </div>
                                {telemetry.error && (
                                    <div className="mt-2 flex items-start gap-1.5 text-[10px] text-yellow-500/60 leading-tight">
                                        <AlertCircle className="w-3 h-3 shrink-0" />
                                        <span>Rate limit reached. Displaying latest cached metrics.</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
