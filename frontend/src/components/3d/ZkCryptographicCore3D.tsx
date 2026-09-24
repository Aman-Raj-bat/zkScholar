import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ZkCryptographicCore3DProps {
  className?: string;
  interactive?: boolean;
}

export const ZkCryptographicCore3D: React.FC<ZkCryptographicCore3DProps> = ({
  className = '',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f5ff, 4, 20);
    cyanLight.position.set(4, 3, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 4.5, 20);
    violetLight.position.set(-4, -3, 3);
    scene.add(violetLight);

    const coreLight = new THREE.PointLight(0x6366f1, 2, 10);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Group for everything to rotate together
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. Central Zero-Knowledge Crystal (Icosahedron)
    const innerGeom = new THREE.IcosahedronGeometry(1.4, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      emissive: 0x312e81,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
      wireframe: false,
    });
    const innerCrystal = new THREE.Mesh(innerGeom, innerMat);
    rootGroup.add(innerCrystal);

    // Wireframe Cage for the crystal
    const wireGeom = new THREE.IcosahedronGeometry(1.48, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireCage = new THREE.Mesh(wireGeom, wireMat);
    rootGroup.add(wireCage);

    // Inner Glowing Core (Octahedron)
    const coreGeom = new THREE.OctahedronGeometry(0.7, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    rootGroup.add(coreMesh);

    // 4. Midnight Orbital Cryptographic Rings
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    // Ring 1 (Cyan)
    const ring1Geom = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x00f5ff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    ringGroup.add(ring1);

    // Ring 2 (Neon Violet)
    const ring2Geom = new THREE.TorusGeometry(2.7, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // Ring 3 (Outer Thin Golden/Sky Ring)
    const ring3Geom = new THREE.TorusGeometry(3.1, 0.015, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.x = Math.PI / 2;
    ringGroup.add(ring3);

    // 5. Zero-Knowledge Witness Particles Field
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f5ff);
    const violetColor = new THREE.Color(0xa855f7);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? cyanColor : i % 3 === 1 ? violetColor : whiteColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // 6. Interaction logic
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();

      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isMouseDown && interactive) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        rootGroup.rotation.y += deltaX * 0.01;
        rootGroup.rotation.x += deltaY * 0.01;
        prevMouseX = clientX;
        prevMouseY = clientY;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isMouseDown = true;
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    if (interactive) {
      container.addEventListener('mousemove', onPointerMove);
      container.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mouseup', onPointerUp);
      container.addEventListener('touchmove', onPointerMove, { passive: true });
      container.addEventListener('touchstart', onPointerDown, { passive: true });
      window.addEventListener('touchend', onPointerUp);
    }

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous rotation
      if (!isMouseDown) {
        targetRotationY += 0.006;
        targetRotationX = Math.sin(time * 0.5) * 0.15 + (mouseY * 0.4);
        const lerpFactor = 0.05;
        rootGroup.rotation.y += (targetRotationY + (mouseX * 0.5) - rootGroup.rotation.y) * lerpFactor;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * lerpFactor;
      }

      // Independent ring rotations
      ring1.rotation.z += 0.012;
      ring2.rotation.z -= 0.015;
      ring3.rotation.z += 0.008;

      // Crystal counter-rotations
      innerCrystal.rotation.y += 0.008;
      innerCrystal.rotation.x += 0.004;
      wireCage.rotation.y += 0.008;
      wireCage.rotation.x += 0.004;
      coreMesh.rotation.y -= 0.018;

      // Particle subtle pulsation
      particles.rotation.y = time * 0.04;

      // Breathing light
      coreLight.intensity = 2.0 + Math.sin(time * 3) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      if (interactive) {
        container.removeEventListener('mousemove', onPointerMove);
        container.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mouseup', onPointerUp);
        container.removeEventListener('touchmove', onPointerMove);
        container.removeEventListener('touchstart', onPointerDown);
        window.removeEventListener('touchend', onPointerUp);
      }

      renderer.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      ring3Geom.dispose();
      ring3Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full h-full min-h-[340px] sm:min-h-[420px] cursor-grab active:cursor-grabbing transition-transform duration-500 ${
          isDragging ? 'scale-98' : ''
        }`}
      />

      {/* Floating 3D Telemetry HUD (21st.dev aesthetic) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-lg shadow-cyan-950/50">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-bold">ZK-SNARK CORE</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300">DRAG TO ROTATE 3D</span>
      </div>

      {/* Ambient background bloom behind 3D core */}
      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-500/15 via-violet-600/15 to-transparent blur-3xl" />
      </div>
    </div>
  );
};

export default ZkCryptographicCore3D;
