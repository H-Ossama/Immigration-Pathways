"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./Earth";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";

export function GlobeScene() {
    return (
        <div className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] relative cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl">
            {/* Space Background - Theme-aware with smooth radial gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100/50 to-transparent dark:from-slate-950/80 dark:via-slate-900/40 dark:to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.02)_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0%,rgba(15,23,42,0.6)_35%,rgba(2,6,23,0.8)_55%,rgba(2,6,23,0.95)_80%)] pointer-events-none" />

            {/* Soft Edge Fade - Theme-aware to make the globe "float" seamlessly */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: `
                        radial-gradient(ellipse 75% 75% at center, transparent 45%, var(--background) 100%),
                        linear-gradient(to top, var(--background) 0%, transparent 12%),
                        linear-gradient(to bottom, var(--background) 0%, transparent 12%),
                        linear-gradient(to left, var(--background) 0%, transparent 8%),
                        linear-gradient(to right, var(--background) 0%, transparent 8%)
                    `,
                }}
            />

            <Canvas dpr={[1, 2]} className="!absolute inset-0">
                <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={45} />
                <OrbitControls
                    enableZoom={false}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    rotateSpeed={0.5}
                    enablePan={false}
                />

                <Stars
                    radius={100}
                    depth={50}
                    count={3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                <Suspense fallback={null}>
                    <Earth />
                </Suspense>
            </Canvas>

            {/* Subtle glow behind the globe - theme-aware */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 dark:bg-blue-500/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
        </div>
    );
}
