"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Code } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-border-glass)] text-sm text-[var(--color-accent-1)] bg-blue-500/10 mb-6 tracking-widest uppercase">
                    B.Tech CSE @ SRM
                </span>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight font-heading leading-tight">
                    Crafting Intelligent <br />
                    <span className="text-gradient">Systems & Interfaces</span>
                </h1>

                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
                    Generative AI Engineer & Full-Stack Developer
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <a href="#projects" className="px-8 py-3 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Explore Work
                    </a>
                    <a href="#contact" className="px-8 py-3 rounded-full font-bold bg-transparent border border-[var(--color-border-glass)] hover:bg-white/5 transition-colors backdrop-blur-sm">
                        Get in Touch
                    </a>
                </div>

                <div className="flex items-center justify-center gap-6 mb-16">
                    <a href="https://github.com/JeyadeepakUR" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/jeyadeepak-u-r" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="https://codolio.com/profile/Jeyadeepak" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                        <Code className="w-6 h-6" />
                    </a>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#about"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-label="Scroll to About section"
            >
                <div className="w-[24px] h-[36px] border-2 border-[var(--color-text-secondary)] rounded-full flex justify-center pt-2">
                    <div className="w-[4px] h-[4px] bg-[var(--color-text-secondary)] rounded-full"></div>
                </div>
            </motion.a>
        </section>
    );
}
