"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isInside, setIsInside] = useState(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false);

    return (
        <section
            id="home"
            className="relative min-h-screen w-full text-white overflow-hidden cursor-none"
            onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
            onMouseEnter={() => setIsInside(true)}
            onMouseLeave={() => setIsInside(false)}
        >
            {/* Contextual Custom Cursor */}
            {isInside && (
                <motion.div
                    className="fixed top-0 left-0 w-32 h-32 rounded-full border border-white/20 pointer-events-none z-50 flex items-center justify-center backdrop-blur-md bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    animate={{
                        x: mousePos.x - 64,
                        y: mousePos.y - 64,
                        scale: isHoveringLink ? 1.2 : 1,
                        backgroundColor: isHoveringLink ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.05)",
                        borderColor: isHoveringLink ? "transparent" : "rgba(255,255,255,0.2)"
                    }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
                >
                    {isHoveringLink && <span className="text-black text-[10px] font-bold tracking-[0.2em] uppercase pl-1">View</span>}
                </motion.div>
            )}

            {/* Top Navigation */}
            <nav className="absolute top-0 left-0 w-full px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center z-40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 gap-4 md:gap-0">
                <div className="text-white font-bold tracking-[0.3em] pl-2 md:pl-0">JEYADEEPAK UR</div>
                <div className="flex gap-8 md:gap-16">
                    <a href="#projects" className="hover:text-white transition-colors" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Playbook</a>
                    <a href="#skills" className="hover:text-white transition-colors" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Skills</a>
                    <a href="#contact" className="hover:text-white transition-colors" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Contacts</a>
                </div>
            </nav>

            {/* Ambient Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] bg-[#2E4A6F]/25 rounded-full blur-[100px] pointer-events-none"></div>

            {/* 
              Massive Typography Composition 
              Replicates the asymmetrical "Creative visual designer" brutalist layout 
            */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center min-h-screen px-4 md:px-0 pt-20 pb-32">
                <div className="max-w-7xl w-full flex flex-col">

                    {/* Top Word */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50, rotate: 2 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[14vw] md:text-[9rem] lg:text-[13rem] font-medium tracking-tighter leading-[0.8] text-white ml-[0%] md:ml-[5%]"
                    >
                        Jeyadeepak
                    </motion.h1>

                    {/* Middle Stylized Injection */}
                    <div className="w-full flex justify-center md:justify-end md:pr-[20%] mt-6 md:-mt-8">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 tracking-tight leading-[0.7] drop-shadow-[0_0_20px_rgba(99,102,241,0.2)] relative z-20"
                        >
                            Software
                        </motion.span>
                    </div>

                    {/* Bottom Word */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50, rotate: -2 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[14vw] md:text-[9rem] lg:text-[13rem] font-medium tracking-tighter leading-[0.8] text-white flex justify-end md:pr-[5%] mt-6 md:-mt-8"
                    >
                        developer
                    </motion.h1>

                </div>
            </div>

            {/* Bottom Screen Data Clusters */}
            <div className="absolute bottom-12 md:bottom-16 left-6 md:left-12 flex flex-col md:flex-row gap-8 md:gap-32 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gray-400 z-10">
                <div className="flex flex-col gap-4 md:gap-6">
                    <p className="leading-relaxed">
                        SDE / Full Stack <br /> / AI-ML Developer
                    </p>
                    <p className="text-gray-200 font-medium tracking-[0.2em]">
                        Currently available <br /> for software engineering roles <br /> in India
                    </p>
                </div>
                <div className="flex flex-col gap-4 md:gap-6">
                    <p className="leading-relaxed">
                        Based <br /> in Chennai, India
                    </p>
                    <p className="text-gray-200 font-medium">
                        B.Tech CSE <br /> SRM Institute
                    </p>
                </div>
            </div>

            {/* Minimalist Geometry Scroll Prompt */}
            <motion.a
                href="#about"
                className="hidden md:flex absolute bottom-12 right-12 w-24 h-24 rounded-full border border-white/10 flex-col items-center justify-center backdrop-blur-sm z-20 cursor-none"
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
                animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-[1px] h-8 bg-gray-400 mb-2"></div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Scroll</span>
            </motion.a>

        </section>
    );
}
