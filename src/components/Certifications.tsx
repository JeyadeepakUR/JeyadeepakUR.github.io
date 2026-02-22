"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, BadgeCheck } from "lucide-react";

// Flat list for a dense marquee layout, grouped by visual importance / category
const certifications = [
    { name: "National Conference Publication", issuer: "NCCDCE 25", category: "Research", icon: Trophy, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", shadow: "shadow-[0_0_15px_rgba(251,191,36,0.2)]" },
    { name: "Bolt Build Session - 3rd Prize", issuer: "Bolt.new & Nyx Wolves", category: "Competition", icon: Trophy, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]" },
    { name: "Samsung Prism Presentation", issuer: "Samsung Prism", category: "Innovation", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", shadow: "shadow-[0_0_15px_rgba(251,191,36,0.2)]" },
    { name: "Machine Learning Specialization", issuer: "DeepLearning.AI", category: "AI & ML", icon: Trophy, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", shadow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]" },
    { name: "Data Analyst Pro Certificate", issuer: "IBM", category: "Data Science", icon: Award, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
    { name: "Intro to Generative AI", issuer: "Google Cloud", category: "Gen AI", icon: Award, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", shadow: "shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
    { name: "Azure for AI & ML", issuer: "Microsoft", category: "Cloud & Sec", icon: ShieldCheck, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30", shadow: "shadow-[0_0_15px_rgba(14,165,233,0.2)]" },
    { name: "CS50W: Web Programming", issuer: "CS50", category: "Software Eng", icon: BadgeCheck, color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30", shadow: "shadow-[0_0_15px_rgba(148,163,184,0.2)]" },
    { name: "Intro to LLMs", issuer: "Google Cloud", category: "NLP", icon: Award, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]" },
    { name: "Foundations of AI & ML", issuer: "Microsoft", category: "AI & ML", icon: BadgeCheck, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", shadow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]" },
    { name: "Prompt Design in Vertex AI", issuer: "Google Cloud", category: "Gen AI", icon: Trophy, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", shadow: "shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
    { name: "Hackathon Genesis 1.0", issuer: "TPH X SRMIST", category: "Competition", icon: Trophy, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]" },
    { name: "AWS Cloud 101", issuer: "AWS", category: "Cloud & Sec", icon: ShieldCheck, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30", shadow: "shadow-[0_0_15px_rgba(14,165,233,0.2)]" },
    { name: "Python for Data Science", issuer: "IBM", category: "Data Science", icon: BadgeCheck, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
    { name: "Responsible AI", issuer: "Google Cloud", category: "Cloud & Sec", icon: ShieldCheck, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30", shadow: "shadow-[0_0_15px_rgba(14,165,233,0.2)]" },
    { name: "Transformer & BERT", issuer: "Google", category: "NLP", icon: BadgeCheck, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]" },
    { name: "Applying AI Principles", issuer: "Google Cloud", category: "Gen AI", icon: ShieldCheck, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", shadow: "shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
    { name: "Troubleshooting Agents", issuer: "Microsoft", category: "AI & ML", icon: BadgeCheck, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", shadow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]" },
    { name: "AI & ML Algorithms", issuer: "Microsoft", category: "AI & ML", icon: BadgeCheck, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", shadow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]" },
    { name: "Encoder & Decoder", issuer: "Google", category: "Gen AI", icon: BadgeCheck, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", shadow: "shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
    { name: "Attention Mechanism", issuer: "Google", category: "Gen AI", icon: BadgeCheck, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", shadow: "shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
    { name: "Python for ML", issuer: "Great Learning", category: "AI & ML", icon: BadgeCheck, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", shadow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]" },
    { name: "NLP & Text Mining", issuer: "Simplilearn", category: "NLP", icon: BadgeCheck, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]" },
    { name: "Image Captioning", issuer: "Google", category: "NLP", icon: BadgeCheck, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]" }
];

export default function Certifications() {
    // Split into top/bottom rows for dual scrolling
    const topRow = certifications.slice(0, Math.ceil(certifications.length / 2));
    const bottomRow = certifications.slice(Math.ceil(certifications.length / 2));

    return (
        <section id="certifications" className="py-24 relative overflow-hidden flex flex-col justify-center min-h-[900px] bg-[#020202]">
            <div className="max-w-7xl mx-auto px-6 mb-20 relative z-20 text-center w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <Award className="w-8 h-8 text-indigo-400 opacity-80" />
                        <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tighter">Accolades Stream</h2>
                    </div>
                    <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed font-light">
                        A continuous flow of specialized achievements across AI, Data Science, and Systems Architecture.
                    </p>
                </motion.div>
            </div>

            {/* 3D Isometric Viewport Container */}
            <div className="relative w-full overflow-hidden pause-on-hover" style={{ perspective: '1200px' }}>

                {/* 
                  Isometric Transformation wrapper:
                  Rotated slightly on X axis to lean backwards, Z axis to tilt diagonally.
                */}
                <div
                    className="flex flex-col gap-8 w-[200vw] lg:w-[150vw] left-1/2 -ml-[100vw] lg:-ml-[75vw] relative py-12"
                    style={{
                        transform: 'rotateX(30deg) rotateZ(-10deg) rotateY(10deg) scale(1.1)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Shadow/Glow under the stream */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                    {/* TOP ROW - Scrolls Left */}
                    {/* We use double width (w-[max-content]) to ensure it has enough space to hold the duplicated content without wrapping */}
                    <div className="w-[fit-content] flex">
                        <motion.div
                            className="flex"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: topRow.length * 3.5, repeat: Infinity }}
                            style={{ width: "max-content" }}
                        >
                            {/* Duplicate the array twice so it loops seamlessly */}
                            {[...topRow, ...topRow].map((cert, i) => {
                                const Icon = cert.icon;
                                return (
                                    <div key={`top-${i}`} className="w-[320px] flex-shrink-0 px-4">
                                        <div className={`
                                            h-[140px] flex flex-col justify-between p-6 rounded-2xl border ${cert.border} ${cert.bg} 
                                            backdrop-blur-xl ${cert.shadow} hover:-translate-y-4 hover:bg-black/60 transition-all duration-300 cursor-pointer
                                        `}>
                                            <div className="flex items-start justify-between mb-2">
                                                <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-black/50 ${cert.color}`}>
                                                    {cert.category}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-bold text-white mb-1 leading-snug tracking-wide">{cert.name}</h3>
                                                <div className="flex items-center gap-1.5 opacity-70">
                                                    <Icon className={`w-3.5 h-3.5 ${cert.color}`} />
                                                    <p className="text-[11px] text-[var(--color-text-secondary)] font-semibold tracking-widest uppercase">{cert.issuer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* BOTTOM ROW - Scrolls Right */}
                    <div className="w-[fit-content] flex">
                        <motion.div
                            className="flex"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ ease: "linear", duration: bottomRow.length * 3.5, repeat: Infinity }}
                            style={{ width: "max-content" }}
                        >
                            {[...bottomRow, ...bottomRow].map((cert, i) => {
                                const Icon = cert.icon;
                                return (
                                    <div key={`bottom-${i}`} className="w-[320px] flex-shrink-0 px-4">
                                        <div className={`
                                            h-[140px] flex flex-col justify-between p-6 rounded-2xl border ${cert.border} ${cert.bg} 
                                            backdrop-blur-xl ${cert.shadow} hover:-translate-y-4 hover:bg-black/60 transition-all duration-300 cursor-pointer
                                        `}>
                                            <div className="flex items-start justify-between mb-2">
                                                <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-black/50 ${cert.color}`}>
                                                    {cert.category}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-bold text-white mb-1 leading-snug tracking-wide">{cert.name}</h3>
                                                <div className="flex items-center gap-1.5 opacity-70">
                                                    <Icon className={`w-3.5 h-3.5 ${cert.color}`} />
                                                    <p className="text-[11px] text-[var(--color-text-secondary)] font-semibold tracking-widest uppercase">{cert.issuer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                </div>

                {/* Edge Fades for smooth entry/exit */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#020202] to-transparent pointer-events-none z-30"></div>
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#020202] to-transparent pointer-events-none z-30"></div>
            </div>
        </section>
    );
}
