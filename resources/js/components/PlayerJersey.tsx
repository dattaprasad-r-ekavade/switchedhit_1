import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface PlayerJerseyProps {
    teamName?: string;
    playerName?: string;
    jerseyNumber?: number | string;
    primaryColor?: string;
    secondaryColor?: string;
    view?: 'front' | 'back';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

interface JerseyCanvasProps {
    width: number;
    height: number;
    primary: string;
    secondary: string;
    view: 'front' | 'back';
    className?: string;
    tilt?: number;
    children?: React.ReactNode;
}

interface JerseySceneOptions {
    width: number;
    height: number;
    primary: string;
    secondary: string;
    view: 'front' | 'back';
    tilt: number;
}

const SIZE_CONFIG = {
    sm: { width: 120, height: 150 },
    md: { width: 180, height: 220 },
    lg: { width: 240, height: 290 },
} as const;

function sanitizeColor(color: string | undefined, fallback: string): string {
    if (!color) {
        return fallback;
    }

    try {
        const parsed = new THREE.Color(color);
        return `#${parsed.getHexString()}`;
    } catch {
        try {
            const parsedFallback = new THREE.Color(fallback);
            return `#${parsedFallback.getHexString()}`;
        } catch {
            return '#000000';
        }
    }
}

function splitNameIntoLines(name: string | undefined, maxPerLine: number): string[] {
    const safe = (name ?? '').trim();
    if (!safe) {
        return ['TEAM'];
    }

    const words = safe.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return ['TEAM'];
    }

    if (words.length === 1) {
        return [words[0].slice(0, maxPerLine).toUpperCase()];
    }

    const lines: string[] = [];
    let current = '';

    words.forEach((word) => {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length > maxPerLine && current) {
            lines.push(current.toUpperCase());
            current = word;
        } else {
            current = candidate;
        }
    });

    if (current) {
        lines.push(current.toUpperCase());
    }

    return lines.slice(0, 3).map((line) => line.slice(0, maxPerLine).toUpperCase());
}

function extractLastName(name: string | undefined, maxLength: number): string {
    const safe = (name ?? '').trim();
    if (!safe) {
        return 'PLAYER';
    }

    const parts = safe.split(/\s+/).filter(Boolean);
    const value = parts.length > 0 ? parts[parts.length - 1] : safe;
    return value.slice(0, maxLength).toUpperCase();
}

function useThreeJersey(canvasRef: React.RefObject<HTMLCanvasElement | null>, options: JerseySceneOptions) {
    const { width, height, primary, secondary, view, tilt } = options;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const dispose = initializeThreeJersey(canvas, { width, height, primary, secondary, view, tilt });
        return () => {
            dispose();
        };
    }, [canvasRef, width, height, primary, secondary, view, tilt]);
}

function initializeThreeJersey(canvas: HTMLCanvasElement, options: JerseySceneOptions) {
    const { width, height, primary, secondary, view, tilt } = options;

    canvas.width = width;
    canvas.height = height;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0.4, 0);
    scene.add(camera);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
    keyLight.position.set(6, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.bias = -0.0002;
    keyLight.shadow.mapSize.set(1024, 1024);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
    rimLight.position.set(-6, 4, -4);

    const fillLight = new THREE.PointLight(0xffffff, 0.25, 20, 2);
    fillLight.position.set(0, 2, -4);

    scene.add(ambient);
    scene.add(keyLight);
    scene.add(rimLight);
    scene.add(fillLight);

    const jerseyGroup = new THREE.Group();
    jerseyGroup.rotation.x = tilt;
    jerseyGroup.position.y = -0.3;
    scene.add(jerseyGroup);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const primaryColor = new THREE.Color(primary);
    const secondaryColor = new THREE.Color(secondary);

    const bodyGeometry = new THREE.BoxGeometry(3.3, 4.3, 1.25, 16, 16, 8);
    const bodyPositions = bodyGeometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let index = 0; index < bodyPositions.count; index += 1) {
        vertex.fromBufferAttribute(bodyPositions, index);
        const taper = vertex.y > 1.4 ? 1.08 : vertex.y < -1.6 ? 0.78 : 1;
        vertex.x *= taper;
        vertex.z *= taper * 0.95;
        bodyPositions.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }

    bodyGeometry.computeVertexNormals();
    geometries.push(bodyGeometry);

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.45,
        metalness: 0.15,
    });
    materials.push(bodyMaterial);

    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    jerseyGroup.add(bodyMesh);

    const sleeveColor = primaryColor.clone();
    sleeveColor.offsetHSL(0, 0, 0.08);

    const sleeveMaterial = new THREE.MeshStandardMaterial({
        color: sleeveColor,
        roughness: 0.5,
        metalness: 0.12,
    });
    materials.push(sleeveMaterial);

    const sleeveGeometry = new THREE.BoxGeometry(1.45, 1.3, 1.3, 8, 8, 6);
    geometries.push(sleeveGeometry);

    const leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    leftSleeve.position.set(-2.25, 0.8, 0);
    leftSleeve.rotation.z = 0.35;
    leftSleeve.castShadow = true;
    jerseyGroup.add(leftSleeve);

    const rightSleeve = leftSleeve.clone();
    rightSleeve.position.x = 2.25;
    rightSleeve.rotation.z = -0.35;
    jerseyGroup.add(rightSleeve);

    const cuffMaterial = new THREE.MeshStandardMaterial({
        color: secondaryColor,
        roughness: 0.38,
        metalness: 0.22,
    });
    materials.push(cuffMaterial);

    const cuffGeometry = new THREE.BoxGeometry(1.48, 0.34, 1.32, 4, 4, 4);
    geometries.push(cuffGeometry);

    const leftCuff = new THREE.Mesh(cuffGeometry, cuffMaterial);
    leftCuff.position.set(-2.33, 0.1, 0.02);
    leftCuff.rotation.z = 0.35;
    jerseyGroup.add(leftCuff);

    const rightCuff = leftCuff.clone();
    rightCuff.position.x = 2.33;
    rightCuff.rotation.z = -0.35;
    jerseyGroup.add(rightCuff);

    const stripeMaterial = new THREE.MeshStandardMaterial({
        color: secondaryColor,
        roughness: 0.3,
        metalness: 0.28,
        transparent: true,
        opacity: 0.95,
    });
    materials.push(stripeMaterial);

    const chestStripeGeometry = new THREE.BoxGeometry(3.3, 0.45, 1.32, 8, 2, 6);
    geometries.push(chestStripeGeometry);

    const frontStripe = new THREE.Mesh(chestStripeGeometry, stripeMaterial);
    frontStripe.position.set(0, 1.05, 0.62);
    jerseyGroup.add(frontStripe);

    const backStripe = frontStripe.clone();
    backStripe.position.z = -0.62;
    backStripe.rotation.y = Math.PI;
    jerseyGroup.add(backStripe);

    const sideStripeGeometry = new THREE.BoxGeometry(0.22, 3.8, 1.28, 4, 12, 6);
    geometries.push(sideStripeGeometry);

    const leftSideStripe = new THREE.Mesh(sideStripeGeometry, stripeMaterial);
    leftSideStripe.position.set(-1.68, -0.2, 0);
    jerseyGroup.add(leftSideStripe);

    const rightSideStripe = leftSideStripe.clone();
    rightSideStripe.position.x = 1.68;
    jerseyGroup.add(rightSideStripe);

    const collarMaterial = new THREE.MeshStandardMaterial({
        color: secondaryColor,
        roughness: 0.25,
        metalness: 0.3,
    });
    materials.push(collarMaterial);

    const collarGeometry = new THREE.TorusGeometry(0.78, 0.12, 22, 64, Math.PI * 1.6);
    geometries.push(collarGeometry);
    const collarMesh = new THREE.Mesh(collarGeometry, collarMaterial);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.rotation.z = Math.PI / 2;
    collarMesh.position.set(0, 2.25, 0.05);
    jerseyGroup.add(collarMesh);

    const collarBack = collarMesh.clone();
    collarBack.position.z = -0.05;
    jerseyGroup.add(collarBack);

    const floorGeometry = new THREE.CircleGeometry(3.3, 32);
    geometries.push(floorGeometry);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#000000'),
        transparent: true,
        opacity: 0.18,
        roughness: 1,
        metalness: 0,
    });
    materials.push(floorMaterial);

    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.55;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const baseRotation = view === 'front' ? 0 : Math.PI;

    let frameId = 0;
    const start = typeof performance !== 'undefined' ? performance.now() : 0;

    const animate = (now: number) => {
        const elapsed = (now - start) / 1000;
        const wobble = Math.sin(elapsed * 1.2) * 0.18;
        const float = Math.sin(elapsed * 1.5) * 0.08;

        jerseyGroup.rotation.y = baseRotation + wobble;
        jerseyGroup.position.y = -0.3 + float;

        keyLight.position.x = 6 * Math.cos(elapsed * 0.6);
        keyLight.position.z = 6 * Math.sin(elapsed * 0.6);

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(frameId);
        renderer.dispose();

        geometries.forEach((geometry) => {
            geometry.dispose();
        });

        materials.forEach((material) => {
            material.dispose();
        });

        scene.clear();
    };
}

export function PlayerJersey({
    teamName = 'TEAM',
    playerName = 'PLAYER',
    jerseyNumber = '00',
    primaryColor = '#000000',
    secondaryColor = '#FFFFFF',
    view = 'front',
    size = 'md',
    className = '',
}: PlayerJerseyProps) {
    const config = SIZE_CONFIG[size];
    const primary = useMemo(() => sanitizeColor(primaryColor, '#000000'), [primaryColor]);
    const secondary = useMemo(() => sanitizeColor(secondaryColor, '#FFFFFF'), [secondaryColor]);
    const jerseyLabel = useMemo(() => `${jerseyNumber ?? '00'}`, [jerseyNumber]);
    const teamLines = useMemo(() => splitNameIntoLines(teamName, 12), [teamName]);
    const lastName = useMemo(() => extractLastName(playerName, 12), [playerName]);

    const frontNameFont = config.width * 0.16;
    const frontNumberFont = config.width * 0.36;
    const backNumberFont = config.width * 0.58;
    const backNameFont = config.width * 0.2;

    return (
        <JerseyCanvas
            width={config.width}
            height={config.height}
            primary={primary}
            secondary={secondary}
            view={view}
            className={className}
            tilt={-0.18}
        >
            <div className="pointer-events-none absolute inset-0">
                {view === 'front' ? (
                    <>
                        <div className="absolute left-0 right-0 flex flex-col items-center gap-1" style={{ top: '30%' }}>
                            {teamLines.map((line, index) => (
                                <span
                                    key={index}
                                    className="uppercase font-extrabold tracking-[0.25em]"
                                    style={{
                                        color: secondary,
                                        fontSize: `${frontNameFont}px`,
                                        lineHeight: 1.05,
                                        textShadow: '0 3px 8px rgba(0,0,0,0.45)',
                                    }}
                                >
                                    {line}
                                </span>
                            ))}
                        </div>
                        <div className="absolute left-0 right-0 text-center font-black" style={{ top: '58%' }}>
                            <span
                                style={{
                                    color: secondary,
                                    fontSize: `${frontNumberFont}px`,
                                    letterSpacing: '0.08em',
                                    textShadow: '0 4px 12px rgba(0,0,0,0.55)',
                                }}
                            >
                                {jerseyLabel}
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="absolute left-0 right-0 text-center font-black" style={{ top: '44%' }}>
                            <span
                                style={{
                                    color: secondary,
                                    fontSize: `${backNumberFont}px`,
                                    letterSpacing: '0.05em',
                                    textShadow: '0 4px 14px rgba(0,0,0,0.6)',
                                }}
                            >
                                {jerseyLabel}
                            </span>
                        </div>
                        <div className="absolute left-0 right-0 text-center uppercase font-extrabold" style={{ top: '74%' }}>
                            <span
                                className="tracking-[0.32em]"
                                style={{
                                    color: secondary,
                                    fontSize: `${backNameFont}px`,
                                    textShadow: '0 3px 8px rgba(0,0,0,0.45)',
                                }}
                            >
                                {lastName}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </JerseyCanvas>
    );
}

function JerseyCanvas({
    width,
    height,
    primary,
    secondary,
    view,
    className = '',
    tilt = -0.18,
    children,
}: JerseyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useThreeJersey(canvasRef, { width, height, primary, secondary, view, tilt });

    return (
        <div
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ width, height }}
        >
            <canvas ref={canvasRef} width={width} height={height} className="h-full w-full" />
            {children}
        </div>
    );
}

export function PlayerBust({
    teamName = 'TEAM',
    primaryColor = '#000000',
    secondaryColor = '#FFFFFF',
    className = '',
}: {
    teamName?: string;
    primaryColor?: string;
    secondaryColor?: string;
    className?: string;
}) {
    const width = 120;
    const height = 150;

    const primary = useMemo(() => sanitizeColor(primaryColor, '#000000'), [primaryColor]);
    const secondary = useMemo(() => sanitizeColor(secondaryColor, '#FFFFFF'), [secondaryColor]);
    const teamLines = useMemo(() => splitNameIntoLines(teamName, 10), [teamName]);

    const fontSize = width * 0.18;

    return (
        <JerseyCanvas
            width={width}
            height={height}
            primary={primary}
            secondary={secondary}
            view="front"
            className={className}
            tilt={-0.12}
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-0 right-0 flex flex-col items-center gap-[2px]" style={{ top: '63%' }}>
                    {teamLines.map((line, index) => (
                        <span
                            key={index}
                            className="uppercase font-semibold tracking-[0.2em]"
                            style={{
                                color: secondary,
                                fontSize: `${fontSize}px`,
                                lineHeight: 1.05,
                                textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                            }}
                        >
                            {line}
                        </span>
                    ))}
                </div>
            </div>
        </JerseyCanvas>
    );
}
