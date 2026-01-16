"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./Earth";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";

export function GlobeScene() {
    return (
        <div className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] relative cursor-grab active:cursor-grabbing overflow-hidden">
            {/* Space Background - Smooth radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.7)_35%,rgba(2,6,23,0.3)_55%,transparent_70%)] pointer-events-none" />

            {/* Soft Edge Fade - Makes the globe "float" with no hard edges */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 80% at center, transparent 50%, white 100%),
                        linear-gradient(to top, white 0%, transparent 15%),
                        linear-gradient(to bottom, white 0%, transparent 15%),
                        linear-gradient(to left, white 0%, transparent 10%),
                        linear-gradient(to right, white 0%, transparent 10%)
                    `,
                    mixBlendMode: 'normal'
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

            {/* Subtle glow behind the globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/10 blur-[80px] rounded-full -z-10 pointer-events-none" />
        </div>
    );
}
