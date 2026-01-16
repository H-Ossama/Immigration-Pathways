"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Helper to convert lat/long to 3D coordinates
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
}

// Single animated route component
function AnimatedRoute({ start, end, radius, index }: { start: THREE.Vector3; end: THREE.Vector3; radius: number; index: number }) {
    const geometry = useMemo(() => {
        // Create a taller arc
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distance = start.distanceTo(end);
        mid.add(mid.clone().normalize().multiplyScalar(distance * 0.5));

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return new THREE.TubeGeometry(curve, 32, 0.003, 8, false);
    }, [start, end]);

    // Create a moving particle
    const particleRef = useRef<THREE.Mesh>(null);
    const curve = useMemo(() => {
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distance = start.distanceTo(end);
        mid.add(mid.clone().normalize().multiplyScalar(distance * 0.5));
        return new THREE.QuadraticBezierCurve3(start, mid, end);
    }, [start, end]);

    useFrame(({ clock }) => {
        if (particleRef.current) {
            const t = (clock.getElapsedTime() * 0.5 + index * 0.1) % 1;
            const pos = curve.getPoint(t);
            particleRef.current.position.copy(pos);
        }
    });

    return (
        <group>
            {/* The Track */}
            <mesh geometry={geometry}>
                <meshBasicMaterial color="#1e40af" transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
            {/* The Moving Particle */}
            <mesh ref={particleRef}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial color="#60a5fa" toneMapped={false} />
                <pointLight distance={0.5} intensity={2} color="#60a5fa" />
            </mesh>
        </group>
    );
}

function MigrationLines({ radius }: { radius: number }) {
    const routes = useMemo(() => {
        const locations = [
            { lat: 34.0522, lon: -118.2437 }, // LA
            { lat: 40.7128, lon: -74.0060 }, // NY
            { lat: 51.5074, lon: -0.1278 }, // London
            { lat: 48.8566, lon: 2.3522 }, // Paris
            { lat: 52.5200, lon: 13.4050 }, // Berlin
            { lat: 55.7558, lon: 37.6173 }, // Moscow
            { lat: 35.6762, lon: 139.6503 }, // Tokyo
            { lat: -33.8688, lon: 151.2093 }, // Sydney
            { lat: 19.0760, lon: 72.8777 }, // Mumbai
            { lat: 1.3521, lon: 103.8198 }, // Singapore
            { lat: -23.5505, lon: -46.6333 }, // Sao Paulo
            { lat: 25.2048, lon: 55.2708 }, // Dubai
            { lat: -26.2041, lon: 28.0473 }, // Johannesburg
        ];

        // Fixed pairs instead of random (avoids hydration issues)
        const pairs = [
            { from: 0, to: 2 }, // LA to London
            { from: 1, to: 3 }, // NY to Paris
            { from: 2, to: 4 }, // London to Berlin
            { from: 3, to: 5 }, // Paris to Moscow
            { from: 4, to: 6 }, // Berlin to Tokyo
            { from: 5, to: 7 }, // Moscow to Sydney
            { from: 6, to: 8 }, // Tokyo to Mumbai
            { from: 7, to: 9 }, // Sydney to Singapore
            { from: 8, to: 10 }, // Mumbai to Sao Paulo
            { from: 9, to: 11 }, // Singapore to Dubai
            { from: 10, to: 12 }, // Sao Paulo to Johannesburg
            { from: 11, to: 0 }, // Dubai to LA
            { from: 12, to: 1 }, // Johannesburg to NY
            { from: 0, to: 6 }, // LA to Tokyo
            { from: 2, to: 7 }, // London to Sydney
            { from: 8, to: 4 }, // Mumbai to Berlin
        ];

        return pairs.map(p => ({
            start: latLongToVector3(locations[p.from].lat, locations[p.from].lon, radius),
            end: latLongToVector3(locations[p.to].lat, locations[p.to].lon, radius)
        }));
    }, [radius]);

    return (
        <group>
            {routes.map((route, i) => (
                <AnimatedRoute key={i} start={route.start} end={route.end} radius={radius} index={i} />
            ))}
        </group>
    );
}

export function Earth() {
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Load textures
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
    ]);

    useFrame(({ clock, mouse }) => {
        const elapsedTime = clock.getElapsedTime();

        // Continuous rotation
        if (earthRef.current) {
            earthRef.current.rotation.y = elapsedTime / 20;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = elapsedTime / 18;
        }

        // Gentle tilt based on mouse position
        if (groupRef.current) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                mouse.y * 0.2,
                0.05
            );
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                mouse.x * 0.2,
                0.05
            );
        }
    });

    return (
        <group ref={groupRef}>
            {/* Ambient Light */}
            <ambientLight intensity={1} />

            {/* Directional Light (Sun) */}
            <directionalLight position={[5, 3, 5]} intensity={3} color="#ffffff" />

            {/* Make sure the dark side isn't too dark */}
            <pointLight position={[-5, -2, -5]} intensity={0.5} color="#223355" />

            {/* Earth Sphere */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    shininess={10}
                />
            </mesh>

            {/* Cloud Layer */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.015, 64, 64]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.4}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Connection Lines */}
            <MigrationLines radius={1} />

            {/* Atmospheric Glow - Improved for visibility */}
            <mesh>
                <sphereGeometry args={[1.15, 64, 64]} />
                <meshPhongMaterial
                    color="#60a5fa"
                    transparent={true}
                    opacity={0.2}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
            <mesh>
                {/* Inner Glow to make it pop against the dark background */}
                <sphereGeometry args={[1.02, 64, 64]} />
                <meshBasicMaterial
                    color="#93c5fd"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}
