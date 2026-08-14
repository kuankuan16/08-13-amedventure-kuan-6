"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import { RX_HERO, RX_MAILTO, RX_PHILOSOPHY } from "@/lib/amed/rx-content";
import {
  RxLogoBand,
  RxGlance,
  RxFocusCards,
  RxStoryList,
} from "@/components/amed/rx/sections";
import {
  MONO,
  SERIF,
  WHITE_BG,
  RX_WHITE,
  INK,
  SANS,
  Reveal,
  GravityHeader,
  GravityFooter,
  useSmoothScroll,
  BRAND_BLUE,
} from "./shared";
import { getDynamicColors, ROLES, type Role } from "./palette";
import { PhilosophyStack } from "./PhilosophyStack";

/* ------------------------------------------------------------------
   Version B — "Gravity" proposal.
   Same content architecture as /v2, rebuilt around a scroll-driven
   Three.js gravity field (float → drop → heart → release) with an
   AMED palette morph: cyan → royal blue → rose.
   ------------------------------------------------------------------ */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---------------- main component ---------------------------------- */

export function GravityB() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef({ progress: 0, started: false });
  const mouseRef = useRef({ x: 99, y: 99, isDown: false });
  const readyRef = useRef(false);
  const wordLeftRef = useRef<HTMLHeadingElement>(null);
  const wordRightRef = useRef<HTMLSpanElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroMediaInnerRef = useRef<HTMLDivElement>(null);

  const [bgStage, setBgStage] = useState(0);
  const [loaderValue, setLoaderValue] = useState(0);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const [pageIn, setPageIn] = useState(false);

  /* ---- smooth scroll + progress ---- */
  const onScrollFrame = useCallback((progress: number) => {
    controlRef.current.progress = progress;
    setBgStage(progress > 1.55 ? 2 : progress > 0.7 ? 1 : 0);
    // wordmark contracts 1.3 -> 1 across the first ~0.56 of a screen
    const k = clamp01(progress / 0.56);
    const s = 1.3 - 0.3 * k;
    const t = `scale(${s.toFixed(4)})`;
    if (wordLeftRef.current) wordLeftRef.current.style.transform = t;
    if (wordRightRef.current) wordRightRef.current.style.transform = t;
    // the media contracts out of full bleed on the same curve
    if (heroMediaRef.current) {
      heroMediaRef.current.style.padding = `${(k * 4).toFixed(2)}vh ${(k * 5).toFixed(2)}vw`;
    }
    if (heroMediaInnerRef.current) {
      heroMediaInnerRef.current.style.borderRadius = `${(k * 28).toFixed(1)}px`;
    }
  }, []);
  useSmoothScroll(onScrollFrame);

  /* ---- pointer tracking for the repulsion field ---- */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onDown = () => (mouseRef.current.isDown = true);
    const onUp = () => (mouseRef.current.isDown = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  /* ---- loader progress ---- */
  useEffect(() => {
    let value = 0;
    let last = performance.now();
    let raf = 0;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    let doneTimer: ReturnType<typeof setTimeout> | null = null;
    let finished = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ready = readyRef.current;
      if (!ready) {
        value += (92 - value) * 1.7 * dt;
      } else {
        value += (100 - value) * 6 * dt;
        if (value >= 99.4) value = 100;
      }
      setLoaderValue(value);
      if (value >= 99.9 && ready && !finished) {
        finished = true;
        leaveTimer = setTimeout(() => setLoaderLeaving(true), 140);
        doneTimer = setTimeout(() => {
          controlRef.current.started = true;
          setLoaderGone(true);
          setPageIn(true);
        }, 140 + 520);
        cancelAnimationFrame(raf);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (leaveTimer) clearTimeout(leaveTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, []);

  /* ---- Three.js scene (per spec) ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ballColor = "#00A8D0";
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
    // No shadow maps and no physical/transmission materials anywhere in this
    // scene: those shader variants wedge ANGLE/Metal compilation for minutes
    // on Apple GPUs, freezing the whole renderer process.
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
    const sideBounceLight = new THREE.DirectionalLight(0xffffff, 0.3);
    sideBounceLight.position.set(-9, -2, 4);
    scene.add(sideBounceLight);

    let viewportWidth = 10;
    let viewportHeight = 6;
    const updateFrustumBounds = () => {
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      viewportHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      viewportWidth = viewportHeight * (container.clientWidth / container.clientHeight);
    };
    updateFrustumBounds();

    const isMobile = window.innerWidth < 768;
    const ballCount = isMobile ? 54 : 96;

    const palette = getDynamicColors(ballColor);
    const isBlack = false;
    const palHero = palette;
    const palLime = getDynamicColors("#2F69FF"); // AMED morph: royal blue mid-stage
    const palPink = getDynamicColors("#FFC5C2");
    const curPal: Record<Role, THREE.Color> = {
      pastel: new THREE.Color(),
      light: new THREE.Color(),
      medium: new THREE.Color(),
      deep: new THREE.Color(),
      glass: new THREE.Color(),
    };

    const sphereGeometry = new RoundedBoxGeometry(1.72, 1.72, 1.72, 5, 0.36);
    type Ball = {
      id: number;
      radius: number;
      mass: number;
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      meshGroup: THREE.Group;
      sphere: THREE.Mesh;
      material: THREE.MeshPhongMaterial;
      role: Role;
      isGlass: boolean;
      baseOpacity: number;
      visualScale: number;
      shapeTarget: THREE.Vector3;
    };
    const balls: Ball[] = [];

    for (let i = 0; i < ballCount; i++) {
      let radius = 0.33;
      const rand = Math.random();
      if (rand < 0.3) radius = 0.27 + Math.random() * 0.12;
      else if (rand < 0.8) radius = 0.42 + Math.random() * 0.18;
      else radius = 0.66 + Math.random() * 0.21;
      const mass = Math.pow(radius, 3);

      let role: Role = "medium";
      let sphereMat: THREE.MeshPhongMaterial;
      let baseOpacity = 1;
      const isGlass = Math.random() < 0.22 && !isBlack;

      if (isGlass) {
        // "Glass" without transmission: translucent phong with a hot white
        // specular — reads as glossy glass at this scale, compiles instantly.
        baseOpacity = 0.62;
        sphereMat = new THREE.MeshPhongMaterial({
          color: palette.glass,
          transparent: true,
          opacity: baseOpacity,
          shininess: 110,
          specular: new THREE.Color("#ffffff"),
          emissive: palette.glass,
          emissiveIntensity: 0.16,
        });
        role = "glass";
      } else {
        let chosenColor = palette.medium;
        const colorRand = Math.random();
        if (colorRand < 0.25) {
          chosenColor = palette.pastel;
          role = "pastel";
        } else if (colorRand < 0.55) {
          chosenColor = palette.light;
          role = "light";
        } else if (colorRand < 0.85) {
          chosenColor = palette.medium;
          role = "medium";
        } else {
          chosenColor = palette.deep;
          role = "deep";
        }
        sphereMat = new THREE.MeshPhongMaterial({
          color: chosenColor,
          transparent: true,
          shininess: 42,
          specular: new THREE.Color("#9a9a9a"),
          emissive: chosenColor,
          emissiveIntensity: 0.08,
        });
      }

      const group = new THREE.Group();
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMat);
      sphereMesh.scale.setScalar(radius);
      group.add(sphereMesh);
      scene.add(group);

      balls.push({
        id: i,
        radius,
        mass,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(),
        meshGroup: group,
        sphere: sphereMesh,
        material: sphereMat,
        role,
        isGlass,
        baseOpacity,
        visualScale: radius,
        shapeTarget: new THREE.Vector3(),
      });
    }

    const meanRadius = balls.reduce((s, b) => s + b.radius, 0) / balls.length;
    let shapeScale = 1;

    const inHeart = (x: number, y: number) => {
      const a = x * x + y * y - 1;
      return a * a * a - x * x * y * y * y <= 0;
    };
    const assignHeartTargets = () => {
      const S = Math.min(viewportWidth * 0.3, viewportHeight * 0.27);
      const baseCY = -viewportHeight * 0.03;
      shapeScale = Math.max(0.3, Math.min(1, (S * 0.45) / 2.3 / meanRadius));
      for (let i = 0; i < balls.length; i++) {
        let x = 0,
          y = 0,
          tries = 0;
        do {
          x = (Math.random() * 2 - 1) * 1.25;
          y = Math.random() * 2.55 - 1.4;
          tries++;
        } while (!inHeart(x, y) && tries < 60);
        balls[i].shapeTarget.set(x * S, (y + 0.12) * S + baseCY, (Math.random() - 0.5) * 0.35);
      }
    };
    assignHeartTargets();

    const scatterFar = (withInwardVelocity: boolean) => {
      const R = Math.max(viewportWidth, viewportHeight) * 1.5;
      for (const b of balls) {
        const a = Math.random() * Math.PI * 2;
        const px = Math.cos(a) * R * 1.25;
        const py = Math.sin(a) * R * 0.85;
        const pz = (Math.random() - 0.5) * 4;
        b.position.set(px, py, pz);
        b.meshGroup.position.copy(b.position);
        if (withInwardVelocity) {
          b.velocity.set(-px, -py, -pz).normalize().multiplyScalar(0.08 + Math.random() * 0.05);
        } else {
          b.velocity.set(0, 0, 0);
        }
      }
    };

    // Warm-up placement: every ball inside the frustum while the loader covers
    // the canvas, so all shader programs (incl. the transmission pass) compile
    // during the pre-roll instead of stalling mid-entrance.
    for (const b of balls) {
      b.position.set(
        (Math.random() - 0.5) * viewportWidth * 0.8,
        (Math.random() - 0.5) * viewportHeight * 0.8,
        (Math.random() - 0.5) * 2
      );
      b.meshGroup.position.copy(b.position);
    }
    let compiled = false;
    renderer
      .compileAsync(scene, camera)
      .then(() => {
        compiled = true;
      })
      .catch(() => {
        compiled = true;
      });

    const params = {
      gravity: 0,
      rebound: -0.3,
      mouseRepelForce: 0.05,
      mouseRepelRadius: 4.4,
      damping: 0.91,
      centerAttractForce: 0.0035,
      bounciness: 0.02,
    };

    const mouseProjVec = new THREE.Vector3();
    const mouseWorld3D = new THREE.Vector3();
    const updateMouse3D = () => {
      const m = mouseRef.current;
      mouseProjVec.set(m.x, m.y, 0.5);
      mouseProjVec.unproject(camera);
      const dir = mouseProjVec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouseWorld3D.copy(camera.position).add(dir.multiplyScalar(distance));
    };

    let animationFrameId = 0;
    const timeOrigin = performance.now();
    let localStarted = false;
    let entranceStart = 0;
    let warmupFrames = 0;

    const diffVec = new THREE.Vector3();
    const collideDiff = new THREE.Vector3();
    const relVel = new THREE.Vector3();
    const deltaPos = new THREE.Vector3();
    const rotAxis = new THREE.Vector3();
    const prevMouseWorld = new THREE.Vector3();
    let mouseSpeed = 0;

    const simulateAndRender = () => {
      animationFrameId = requestAnimationFrame(simulateAndRender);
      const time = (performance.now() - timeOrigin) / 1000;
      updateMouse3D();

      const ctrl = controlRef.current;
      if (ctrl.started && !localStarted) {
        localStarted = true;
        entranceStart = time;
        scatterFar(true);
      }
      if (!localStarted) {
        if (compiled) {
          renderer.render(scene, camera);
          warmupFrames++;
          if (warmupFrames >= 3) readyRef.current = true;
        }
        return;
      }

      // Once the field has flown past the lens and the /v2 content covers the
      // canvas, stop simulating entirely — the long content below stays smooth.
      if ((ctrl.progress ?? 0) > 5.0) return;

      const progress = ctrl.progress ?? 0;

      // Three screens: 0–1 float, 1–2 gravity drop, 2–3 heart. Past 3 the
      // field flies through the lens and hands off to the /v2 content.
      const heroF = 1 - smoothstep(0.35, 0.9, progress);
      const dropRaw = smoothstep(0.55, 1.15, progress);
      const flyF = smoothstep(2.92, 3.58, progress);
      const shapeF = smoothstep(1.95, 2.6, progress) * (1 - smoothstep(2.88, 3.3, progress));
      const dropF = dropRaw * (1 - smoothstep(1.8, 2.3, progress));

      const bLime = smoothstep(0.6, 1.3, progress);
      const bPink = smoothstep(1.9, 2.6, progress);
      for (const role of ROLES) {
        curPal[role].copy(palHero[role]).lerp(palLime[role], bLime).lerp(palPink[role], bPink);
      }
      hemiLight.groundColor.copy(curPal.medium);

      const entranceT = easeOutCubic(clamp01((time - entranceStart) / 2.2));
      const attractionBoost = lerp(7.5, 1, entranceT);

      const m = mouseRef.current;
      const isMouseInteracting = Math.abs(m.x) < 0.99 || Math.abs(m.y) < 0.99;
      mouseSpeed = isMouseInteracting ? mouseWorld3D.distanceTo(prevMouseWorld) : 0;
      if (mouseSpeed > 3) mouseSpeed = 3;
      prevMouseWorld.copy(mouseWorld3D);

      let damping = 0.91;
      damping = lerp(damping, 0.992, dropF);
      damping = lerp(damping, 0.9, shapeF);
      damping = lerp(damping, 0.985, flyF);

      const camZ = camera.position.z;
      const clusterActive = Math.max(heroF, entranceT < 1 ? 1 : 0);

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        if (heroF > 0.01) {
          b.velocity.x += Math.sin(time * 0.4 + b.id * 1.5) * 0.0004 * b.radius * heroF;
          b.velocity.y += Math.cos(time * 0.5 + b.id * 1.2) * 0.0004 * b.radius * heroF;
          b.velocity.z += Math.sin(time * 0.35 + b.id) * 0.0001 * heroF;
        }
        const clusterStrength = params.centerAttractForce * attractionBoost * clusterActive;
        if (clusterStrength > 0.00001) {
          b.velocity.x += (0 - b.position.x) * clusterStrength * 0.38;
          b.velocity.y += (0 - b.position.y) * clusterStrength * 1.85;
          b.velocity.z += (0 - b.position.z) * clusterStrength * 1.8;
        }
        if (dropF > 0.001) b.velocity.y -= 0.011 * dropF;
        if (shapeF > 0.001) {
          const k = 0.06 * shapeF;
          b.velocity.x += (b.shapeTarget.x - b.position.x) * k;
          b.velocity.y += (b.shapeTarget.y - b.position.y) * k;
          b.velocity.z += (b.shapeTarget.z - b.position.z) * k;
        }
        if (flyF > 0.001) {
          const stagger = (b.id * 0.6180339887) % 1;
          const local = smoothstep(stagger * 0.55, stagger * 0.55 + 0.45, flyF);
          b.velocity.z += 0.05 * local;
          b.velocity.x += b.position.x * 0.006 * local;
          b.velocity.y += b.position.y * 0.006 * local;
        }
        if (isMouseInteracting) {
          diffVec.subVectors(b.position, mouseWorld3D);
          const rawDist = diffVec.length();
          const down = m.isDown;
          const activeRepelRadius = down ? params.mouseRepelRadius * 1.4 : params.mouseRepelRadius;
          const activeRepelForce = down ? params.mouseRepelForce * 1.7 : params.mouseRepelForce;
          if (rawDist < activeRepelRadius && rawDist > 0.0001) {
            const ratio = rawDist / activeRepelRadius;
            const smoothFactor = 1.0 - ratio * ratio * (3.0 - 2.0 * ratio);
            const speedBoost = 1 + mouseSpeed * 3.2;
            const push = smoothFactor * activeRepelForce * speedBoost;
            diffVec.normalize();
            diffVec.z *= 0.12;
            diffVec.normalize();
            b.velocity.addScaledVector(diffVec, push);
          }
        }

        b.velocity.multiplyScalar(damping);
        b.position.addScaledVector(b.velocity, 1);

        const c = b.isGlass ? curPal.glass : curPal[b.role];
        b.material.color.copy(c);
        b.material.emissive.copy(c);
        b.material.opacity =
          b.baseOpacity *
          (flyF > 0.001 ? 1 - smoothstep(camZ - 2.6, camZ - 0.3, b.position.z) : 1);

        const targetVis = b.radius * (1 - (1 - shapeScale) * shapeF);
        b.visualScale += (targetVis - b.visualScale) * 0.12;
        b.sphere.scale.setScalar(b.visualScale);
      }

      const collideScale = 0.28 * (1 - 0.93 * shapeF) * (1 - flyF);
      const subSteps = 4;
      for (let step = 0; step < subSteps; step++) {
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            collideDiff.subVectors(b2.position, b1.position);
            const dist = collideDiff.length();
            const minDist = b1.visualScale + b2.visualScale;
            if (dist < minDist && dist > 0.001) {
              const overlap = minDist - dist;
              collideDiff.multiplyScalar(1 / dist);
              const totalMass = b1.mass + b2.mass;
              const ratio1 = b2.mass / totalMass;
              const ratio2 = b1.mass / totalMass;
              b1.position.addScaledVector(collideDiff, -overlap * ratio1 * collideScale);
              b2.position.addScaledVector(collideDiff, overlap * ratio2 * collideScale);
              relVel.subVectors(b2.velocity, b1.velocity);
              const velAlongNormal = relVel.dot(collideDiff);
              if (velAlongNormal < -0.0001) {
                const impulse =
                  (-(1 + params.bounciness) * velAlongNormal) / (1 / b1.mass + 1 / b2.mass);
                b1.velocity.addScaledVector(collideDiff, -impulse / b1.mass);
                b2.velocity.addScaledVector(collideDiff, impulse / b2.mass);
              }
            }
          }
        }
      }

      const borderPad = 0.2;
      const xBound = viewportWidth / 2 - borderPad;
      const topY = viewportHeight / 2 - 0.05;
      const floorY = -viewportHeight / 2 + 0.05;
      const zBound = 2.0;
      const restitution = 0.3 + 0.35 * dropF;
      const contain = flyF < 0.5;
      const zContain = flyF < 0.02;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const r = b.visualScale;
        if (contain) {
          if (b.position.x < -xBound - r) {
            b.position.x = -xBound - r;
            b.velocity.x *= params.rebound;
          } else if (b.position.x > xBound + r) {
            b.position.x = xBound + r;
            b.velocity.x *= params.rebound;
          }
          if (b.position.y - r < floorY) {
            b.position.y = floorY + r;
            if (b.velocity.y < 0) b.velocity.y = -b.velocity.y * restitution;
            if (dropF > 0.3) {
              b.velocity.x *= 0.86;
              b.velocity.z *= 0.86;
            }
          }
          if (b.position.y + r > topY) {
            b.position.y = topY - r;
            if (b.velocity.y > 0) b.velocity.y *= params.rebound;
          }
        }
        if (zContain) {
          if (b.position.z < -zBound) {
            b.position.z = -zBound;
            b.velocity.z *= params.rebound;
          } else if (b.position.z > zBound) {
            b.position.z = zBound;
            b.velocity.z *= params.rebound;
          }
        }
        deltaPos.copy(b.position).sub(b.meshGroup.position);
        if (deltaPos.lengthSq() > 0.000001) {
          rotAxis.set(deltaPos.y, -deltaPos.x, 0);
          // pure-z motion gives a zero axis — normalizing it would inject NaN
          if (rotAxis.lengthSq() > 0.000001) {
            rotAxis.normalize();
            const rotAngle = (deltaPos.length() / b.radius) * 0.55;
            b.meshGroup.rotateOnWorldAxis(rotAxis, rotAngle);
          }
        }
        b.meshGroup.position.copy(b.position);
      }

      renderer.render(scene, camera);
    };
    simulateAndRender();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateFrustumBounds();
      assignHeartTargets();
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      sphereGeometry.dispose();
      balls.forEach((b) => b.material.dispose());
      renderer.dispose();
    };
  }, []);

  /* ---- background: white throughout; the spheres carry the colour ---- */
  const gradients = [WHITE_BG, WHITE_BG, WHITE_BG];

  const heroIn = (delay: number) =>
    ({
      opacity: pageIn ? 1 : 0,
      transform: pageIn ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }) as const;

  return (
    <div style={{ color: "#1a1a1a" }}>
      {/* background gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          background: gradients[bgStage],
          transition: "background 1.2s cubic-bezier(0.65,0,0.35,1)",
        }}
      />

      {/* WebGL canvas */}
      <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      {/* loader — dark ground, centred wordmark, then a curtain wipes up */}
      {!loaderGone && (
        <div className="fixed inset-0 z-[100] overflow-hidden" style={{ pointerEvents: loaderLeaving ? "none" : "auto" }}>
          {/* dark stage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "#0b0c0e" }}>
            <div
              style={{
                opacity: loaderLeaving ? 0 : 1,
                transform: loaderLeaving ? "translateY(-10px)" : "translateY(0)",
                transition:
                  "opacity 0.42s cubic-bezier(0.65,0,0.35,1), transform 0.42s cubic-bezier(0.65,0,0.35,1)",
              }}
            >
              <Image
                src={asset("/amed/brand/amed-logo-dark.png")}
                alt="AMED Ventures"
                width={1999}
                height={452}
                priority
                style={{ height: "clamp(28px, 4.2vw, 52px)", width: "auto" }}
              />
            </div>
            <p
              className="absolute"
              style={{
                bottom: "clamp(28px, 6vh, 56px)",
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.5)",
                fontVariantNumeric: "tabular-nums",
                opacity: loaderLeaving ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              {String(Math.floor(loaderValue)).padStart(3, "0")}
            </p>
          </div>
          {/* curtain: wipes up over the dark stage and hands off to the white site */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "100%",
              background: "#ffffff",
              transform: loaderLeaving ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.95s cubic-bezier(0.76,0,0.24,1) 0.18s",
            }}
          />
        </div>
      )}

      {/* header */}
      <GravityHeader visible={pageIn} onMedia />

      {/* 01 — HERO: full-bleed media that contracts into a card on scroll,
          with the wordmark riding the same 1.3 -> 1 curve (Studio Aton). */}
      <section className="pointer-events-none relative z-10 min-h-[100svh] overflow-hidden">
        <div ref={heroMediaRef} className="absolute inset-0" style={{ padding: 0 }}>
          <div
            ref={heroMediaInnerRef}
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 0 }}
          >
            <Image
              src={asset("/amed/images/hero-b-01.jpg")}
              alt="A founder and a clinician in conversation across a sunlit table"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(12,14,17,0.18) 0%, rgba(12,14,17,0.34) 58%, rgba(12,14,17,0.26) 100%)",
              }}
            />
          </div>
        </div>

        {/* wordmark, seated low in the frame */}
        <div
          className="absolute inset-x-0 flex items-baseline justify-between px-4 md:px-6"
          style={{ top: "58%", ...heroIn(0.2) }}
        >
          <h1
            ref={wordLeftRef}
            className="whitespace-nowrap"
            style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 9.4vw, 13rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              transformOrigin: "left center",
              transform: "scale(1.3)",
              willChange: "transform",
            }}
          >
            AMED
          </h1>
          <span
            ref={wordRightRef}
            aria-hidden
            className="whitespace-nowrap"
            style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 9.4vw, 13rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              transformOrigin: "right center",
              transform: "scale(1.3)",
              willChange: "transform",
            }}
          >
            Ventures
          </span>
        </div>

        <p
          className="absolute inset-x-0 text-center"
          style={{
            bottom: "clamp(28px, 5vh, 56px)",
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.75)",
            ...heroIn(0.5),
          }}
        >
          ( Scroll down )
        </p>
      </section>

      {/* 02 — DROP / the studio statement */}
      <section className="rx-frame pointer-events-none relative z-10 flex min-h-[100svh] items-center px-6 py-32 md:px-10 md:py-40">
        <div className="pointer-events-auto w-full">
          <Reveal>
            <p
              className="uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.25em",
                color: BRAND_BLUE,
              }}
            >
              AMED Ventures ®
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-8 text-[2.4rem] leading-[1.0] tracking-tight sm:text-5xl md:text-[64px] md:leading-[0.98]"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
            >
              {RX_HERO.title[0]}
              <br />
              {RX_HERO.title[1]}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="mt-9 max-w-[52rem] text-[1.15rem] leading-[1.45] sm:text-[1.35rem] md:text-[1.6rem] md:leading-[1.42]"
              style={{ color: "#3a3a3e" }}
            >
              AMED Ventures ® — a MedTech venture firm investing across the United States and
              Taiwan. Backing the medical technologies that change what a clinician can actually
              do, on an ordinary Tuesday morning, in a real hospital.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
              <a
                href={RX_MAILTO}
                className="group inline-flex items-center gap-3.5 rounded-full border border-black/10 py-2 pl-6 pr-2 transition-colors hover:border-black/25"
              >
                <span className="text-[15px] font-medium">Let&apos;s talk</span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-0.5"
                  style={{ background: INK }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
              <p
                className="uppercase"
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "#8a8a8a",
                }}
              >
                ( 26© ) — {RX_HERO.chip}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — SHAPE / heart. Taller than a screen so the heart holds, then the
          field flies through the lens as the section exits. */}
      <section className="pointer-events-none relative z-10 min-h-[170svh]">
        <div className="rx-frame sticky top-0 flex h-[100svh] flex-col justify-between px-6 py-32 md:px-10 md:py-36">
        <div className="pointer-events-auto">
          <Reveal>
            <p
              className="uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.25em",
                color: BRAND_BLUE,
              }}
            >
              03 — Portfolio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-6 max-w-[54rem] text-[2.6rem] leading-[1.0] tracking-tight sm:text-6xl md:text-[80px] md:leading-[0.95]"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
            >
              Every company we back represents lives that will be touched.
            </h2>
          </Reveal>
        </div>
        <div className="pointer-events-auto max-w-sm self-end text-left md:text-right">
          <Reveal delay={0.15}>
            <p className="text-base leading-[1.55] text-neutral-700 md:text-[19px]">
              {RX_PHILOSOPHY.items[3].desc}
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <span
              className="mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-neutral-700"
              style={{
                border: "1px solid rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.35)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 4l7 16 2-7 7-2L4 4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em" }}>
                MOVE THROUGH IT
              </span>
            </span>
          </Reveal>
        </div>
        </div>
      </section>

      {/* handoff — the field flies through the lens and the /v2 content arrives */}
      <div
        className="relative z-10 rx-root"
        style={{ ...RX_WHITE, background: "transparent" }}
      >
        <div style={{ background: "#ffffff" }}>
          <RxLogoBand fullBleed />
          <RxGlance cards="panel" cta={{ label: "More about AMED", href: "/b/about" }} />
          <RxFocusCards />
          <PhilosophyStack />
          <RxStoryList limit={3} />
        </div>
      </div>

      <GravityFooter />
    </div>
  );
}
