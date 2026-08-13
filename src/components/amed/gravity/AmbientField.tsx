"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDynamicColors, type Role } from "./palette";
import { PALETTES, type PaletteKey } from "./shared";

/* ------------------------------------------------------------------
   Ambient sphere field for the /b section pages: the same material
   and lighting language as the home gravity scene, reduced to a
   drifting float state with cursor repulsion. No loader, no scroll
   modes — spheres fly in from far on mount and settle around
   scattered home points.
   ------------------------------------------------------------------ */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function AmbientField({
  palette = "cyan",
  count,
}: {
  palette?: PaletteKey;
  count?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ballColor = PALETTES[palette].ball;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = false;

    const hemiLight = new THREE.HemisphereLight(0xffffff, new THREE.Color(ballColor), 1.6);
    scene.add(hemiLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(-6, 10, 8);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.25);
    rimLight.position.set(8, 7, -8);
    scene.add(rimLight);
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.4);
    frontLight.position.set(0, 0, 11);
    scene.add(frontLight);

    let viewportWidth = 10;
    let viewportHeight = 6;
    const updateFrustumBounds = () => {
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      viewportHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      viewportWidth = viewportHeight * (container.clientWidth / container.clientHeight);
    };
    updateFrustumBounds();

    const isMobile = window.innerWidth < 768;
    const ballCount = count ?? (isMobile ? 16 : 28);

    const pal = getDynamicColors(ballColor);

    const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);
    type Ball = {
      id: number;
      radius: number;
      mass: number;
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      home: THREE.Vector3;
      meshGroup: THREE.Group;
      material: THREE.MeshPhongMaterial;
      isGlass: boolean;
    };
    const balls: Ball[] = [];

    for (let i = 0; i < ballCount; i++) {
      let radius = 0.3;
      const rand = Math.random();
      if (rand < 0.3) radius = 0.22 + Math.random() * 0.1;
      else if (rand < 0.8) radius = 0.36 + Math.random() * 0.16;
      else radius = 0.58 + Math.random() * 0.18;
      const mass = Math.pow(radius, 3);

      const isGlass = Math.random() < 0.22;
      let sphereMat: THREE.MeshPhongMaterial;
      if (isGlass) {
        sphereMat = new THREE.MeshPhongMaterial({
          color: pal.glass,
          transparent: true,
          opacity: 0.62,
          shininess: 110,
          specular: new THREE.Color("#ffffff"),
          emissive: pal.glass,
          emissiveIntensity: 0.16,
        });
      } else {
        const roles: Role[] = ["pastel", "light", "medium", "deep"];
        const r = Math.random();
        const role = r < 0.25 ? roles[0] : r < 0.55 ? roles[1] : r < 0.85 ? roles[2] : roles[3];
        const chosen = pal[role];
        sphereMat = new THREE.MeshPhongMaterial({
          color: chosen,
          transparent: true,
          shininess: 42,
          specular: new THREE.Color("#9a9a9a"),
          emissive: chosen,
          emissiveIntensity: 0.08,
        });
      }

      const group = new THREE.Group();
      const mesh = new THREE.Mesh(sphereGeometry, sphereMat);
      mesh.scale.setScalar(radius);
      group.add(mesh);
      scene.add(group);

      balls.push({
        id: i,
        radius,
        mass,
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        home: new THREE.Vector3(),
        meshGroup: group,
        material: sphereMat,
        isGlass,
      });
    }

    const assignHomes = () => {
      for (const b of balls) {
        b.home.set(
          (Math.random() - 0.5) * viewportWidth * 0.9,
          (Math.random() - 0.5) * viewportHeight * 0.9,
          (Math.random() - 0.5) * 2
        );
      }
    };
    assignHomes();

    // warm-up placement inside the frustum so programs compile immediately
    for (const b of balls) {
      b.position.copy(b.home);
      b.meshGroup.position.copy(b.position);
    }

    const scatterFar = () => {
      const R = Math.max(viewportWidth, viewportHeight) * 1.5;
      for (const b of balls) {
        const a = Math.random() * Math.PI * 2;
        b.position.set(Math.cos(a) * R * 1.25, Math.sin(a) * R * 0.85, (Math.random() - 0.5) * 3);
        b.meshGroup.position.copy(b.position);
        b.velocity
          .copy(b.home)
          .sub(b.position)
          .normalize()
          .multiplyScalar(0.09 + Math.random() * 0.05);
      }
    };

    const mouse = { x: 99, y: 99 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove);

    const mouseProjVec = new THREE.Vector3();
    const mouseWorld3D = new THREE.Vector3();
    const updateMouse3D = () => {
      mouseProjVec.set(mouse.x, mouse.y, 0.5);
      mouseProjVec.unproject(camera);
      const dir = mouseProjVec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouseWorld3D.copy(camera.position).add(dir.multiplyScalar(distance));
    };

    let compiled = false;
    let entranceStarted = false;
    let entranceStart = 0;
    let raf = 0;
    const timeOrigin = performance.now();

    renderer
      .compileAsync(scene, camera)
      .then(() => {
        compiled = true;
      })
      .catch(() => {
        compiled = true;
      });

    const diffVec = new THREE.Vector3();
    const collideDiff = new THREE.Vector3();
    const relVel = new THREE.Vector3();
    const deltaPos = new THREE.Vector3();
    const rotAxis = new THREE.Vector3();

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const time = (performance.now() - timeOrigin) / 1000;
      if (!compiled) return;
      if (!entranceStarted) {
        entranceStarted = true;
        entranceStart = time;
        scatterFar();
        if (container) {
          container.style.opacity = "1";
        }
      }
      updateMouse3D();

      const entranceT = easeOutCubic(Math.min(1, (time - entranceStart) / 2.4));
      const homePull = 0.0035 + 0.012 * (1 - entranceT);
      const isMouseInteracting = Math.abs(mouse.x) < 0.99 || Math.abs(mouse.y) < 0.99;

      for (const b of balls) {
        b.velocity.x += Math.sin(time * 0.4 + b.id * 1.5) * 0.0004 * b.radius;
        b.velocity.y += Math.cos(time * 0.5 + b.id * 1.2) * 0.0004 * b.radius;
        b.velocity.z += Math.sin(time * 0.35 + b.id) * 0.0001;

        b.velocity.x += (b.home.x - b.position.x) * homePull;
        b.velocity.y += (b.home.y - b.position.y) * homePull;
        b.velocity.z += (b.home.z - b.position.z) * homePull * 1.4;

        if (isMouseInteracting) {
          diffVec.subVectors(b.position, mouseWorld3D);
          const rawDist = diffVec.length();
          if (rawDist < 4.4 && rawDist > 0.0001) {
            const ratio = rawDist / 4.4;
            const smoothFactor = 1.0 - ratio * ratio * (3.0 - 2.0 * ratio);
            diffVec.normalize();
            diffVec.z *= 0.12;
            diffVec.normalize();
            b.velocity.addScaledVector(diffVec, smoothFactor * 0.05);
          }
        }

        b.velocity.multiplyScalar(0.91);
        b.position.addScaledVector(b.velocity, 1);
      }

      for (let step = 0; step < 2; step++) {
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            collideDiff.subVectors(b2.position, b1.position);
            const dist = collideDiff.length();
            const minDist = b1.radius + b2.radius;
            if (dist < minDist && dist > 0.001) {
              const overlap = minDist - dist;
              collideDiff.multiplyScalar(1 / dist);
              const totalMass = b1.mass + b2.mass;
              b1.position.addScaledVector(collideDiff, -overlap * (b2.mass / totalMass) * 0.28);
              b2.position.addScaledVector(collideDiff, overlap * (b1.mass / totalMass) * 0.28);
              relVel.subVectors(b2.velocity, b1.velocity);
              const velAlongNormal = relVel.dot(collideDiff);
              if (velAlongNormal < -0.0001) {
                const impulse = (-1.02 * velAlongNormal) / (1 / b1.mass + 1 / b2.mass);
                b1.velocity.addScaledVector(collideDiff, -impulse / b1.mass);
                b2.velocity.addScaledVector(collideDiff, impulse / b2.mass);
              }
            }
          }
        }
      }

      for (const b of balls) {
        deltaPos.copy(b.position).sub(b.meshGroup.position);
        if (deltaPos.lengthSq() > 0.000001) {
          rotAxis.set(deltaPos.y, -deltaPos.x, 0);
          if (rotAxis.lengthSq() > 0.000001) {
            rotAxis.normalize();
            b.meshGroup.rotateOnWorldAxis(rotAxis, (deltaPos.length() / b.radius) * 0.95);
          }
        }
        b.meshGroup.position.copy(b.position);
      }

      renderer.render(scene, camera);
    };
    loop();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateFrustumBounds();
      assignHomes();
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      sphereGeometry.dispose();
      balls.forEach((b) => b.material.dispose());
      renderer.dispose();
    };
  }, [palette, count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0, transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
