"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

export type CrystalBallCanvasProps = {
  modelPath?: string;
  className?: string;
  glowColors?: string[];
};

export default function CrystalBallCanvas({ modelPath = "/CrystalBall/crystal_ball.glb", className, glowColors = [] }: CrystalBallCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 1, 7.5);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        group.add(model);

        const bbox = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        bbox.getSize(size);
        bbox.getCenter(center);

        group.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.6;
        camera.position.set(0, maxDim * 0.2, cameraZ);
        camera.near = cameraZ / 100;
        camera.far = cameraZ * 100;
        camera.updateProjectionMatrix();
      },
      undefined,
      (error) => {
        console.error('Failed to load GLB', error);
      }
    );

    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      group.rotation.y += dt * 0.3;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      if (model) {
        group.remove(model);
      }
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose?.();
        const material = (mesh as any).material as THREE.Material | THREE.Material[] | undefined;
        if (material) {
          if (Array.isArray(material)) {
            material.forEach(m => m.dispose?.());
          } else {
            material.dispose?.();
          }
        }
      });
    };
  }, [modelPath]);

  return (
    <div className={`relative min-h-0 ${className ?? ''}`}>
      <div className="absolute inset-0 -z-10 pointer-events-none mix-blend-plus-lighter translate-y-10">
        {glowColors.map((color, idx) => (
          <div
            key={idx}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${color} 0%, rgba(0,0,0,0) 70%)`,
              opacity: 0.35,
              filter: 'blur(32px)'
            }}
          />
        ))}
      </div>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}