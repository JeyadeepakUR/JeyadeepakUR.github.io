"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">About Me</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[var(--color-accent-1)] to-[var(--color-accent-2)] rounded-full"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-8 md:p-12"
            >
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6 text-lg text-[var(--color-text-secondary)]">
                        <p>
                            Passionate Software Engineer specializing in <span className="text-white font-medium">Generative AI</span> and <span className="text-white font-medium">Full-Stack Development</span>. Dedicated to architecting robust, scalable solutions and crafting polished, high-performance user experiences.
                        </p>
                        <p>
                            I thrive on turning complex technical challenges into elegant, intuitive products. My toolkit spans modern frontend frameworks to advanced backend logic and AI model integrations.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white">Core Competencies</h3>
                        <div className="flex flex-wrap gap-3">
                            {[
                                "Full-Stack Development",
                                "Generative AI",
                                "System Architecture",
                                "UI/UX Engineering",
                                "Multi-Agent Systems",
                                "Machine Learning",
                                "React / Next.js",
                                "Python / FastAPI"
                            ].map(skill => (
                                <span key={skill} className="px-4 py-2 bg-white/5 border border-[var(--color-border-glass)] rounded-lg text-sm transition-colors hover:bg-white/10 hover:border-white/20">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
