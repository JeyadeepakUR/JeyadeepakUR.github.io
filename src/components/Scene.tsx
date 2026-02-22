"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleBackground() {
    const count = 3000;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const light = useRef<THREE.PointLight>(null);

    // Generate random positions
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            let x = (Math.random() - 0.5) * 20;
            let y = (Math.random() - 0.5) * 20;
            let z = (Math.random() - 0.5) * 10;
            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        return positions;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const mousePos = useRef({ x: 0, y: 0 });
    const targetMousePos = useRef({ x: 0, y: 0 });
    const scrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to +1 range
            targetMousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        // Smoothly interpolate mouse position for fluid effect utilizing global target
        mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, targetMousePos.current.x, 0.05);
        mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, targetMousePos.current.y, 0.05);

        // Rotation from time
        const time = state.clock.elapsedTime;

        // Base slow rotation + influence from scroll
        const scrollRotationX = scrollY.current * 0.0005;
        const scrollRotationY = scrollY.current * 0.0002;

        mesh.current.rotation.y = time * 0.05 + scrollRotationY + mousePos.current.x * 0.5;
        mesh.current.rotation.x = time * 0.02 + scrollRotationX - mousePos.current.y * 0.5;

        // Pulse slightly
        const s = Math.sin(time * 0.5) * 0.1 + 1;
        mesh.current.scale.set(s, s, s);

        // Make the point light follow the smoothly lerped mouse
        if (light.current) {
            light.current.position.x = mousePos.current.x * (state.viewport.width / 2);
            light.current.position.y = mousePos.current.y * (state.viewport.height / 2);
        }
    });

    useEffect(() => {
        if (!mesh.current || !particlesPosition) return;
        for (let i = 0; i < count; i++) {
            dummy.position.set(
                particlesPosition[i * 3],
                particlesPosition[i * 3 + 1],
                particlesPosition[i * 3 + 2]
            );
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    }, [particlesPosition, dummy, count]);

    return (
        <>
            <pointLight
                ref={light}
                position={[0, 0, 5]}
                distance={15}
                intensity={50}
                color="#8b5cf6"
            />
            <ambientLight intensity={0.2} />

            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.02, 0]} />
                <meshPhysicalMaterial
                    color="#3b82f6"
                    emissive="#1e3a8a"
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </instancedMesh>
        </>
    );
}

export default function Scene() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black bg-opacity-90 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: false, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={["#050505", 2, 10]} />
                <Suspense fallback={null}>
                    <ParticleBackground />
                </Suspense>
            </Canvas>
            {/* Fallback gradient glow for styling */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,rgba(139,92,246,0.05)_40%,rgba(5,5,5,0)_70%)] blur-3xl opacity-50 pointer-events-none"></div>
        </div>
    );
}
