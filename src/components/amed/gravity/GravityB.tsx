"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import {
  RX_NAV,
  RX_MAILTO,
  RX_HERO,
  RX_ABOUT,
  RX_CTA,
  RX_FOOTER,
} from "@/lib/amed/rx-content";

/* ------------------------------------------------------------------
   Version B — "Gravity" proposal.
   Same content architecture as /v2, rebuilt around a scroll-driven
   Three.js gravity field (float → drop → heart → release) with an
   AMED palette morph: cyan → royal blue → rose.
   ------------------------------------------------------------------ */

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SERIF = "var(--font-fraunces), Georgia, serif";
const ACCENT = "#0E7FA5";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---------------- Reveal (IntersectionObserver, once, 45%) -------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(42px)",
        filter: seen ? "blur(0)" : "blur(8px)",
        transition: `opacity 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- palette helpers (per spec, AMED-tuned) ---------- */

function getDynamicColors(baseColor: string) {
  const hex = baseColor.toLowerCase();
  if (hex === "#00a8d0") {
    return {
      pastel: new THREE.Color("#EAF7FB"),
      light: new THREE.Color("#9FE0F0"),
      medium: new THREE.Color("#00A8D0"),
      deep: new THREE.Color("#006E92"),
      glass: new THREE.Color("#33C0E2"),
    };
  }
  if (hex === "#2f69ff") {
    return {
      pastel: new THREE.Color("#ECEFFF"),
      light: new THREE.Color("#A8C1FF"),
      medium: new THREE.Color("#2F69FF"),
      deep: new THREE.Color("#0A33BF"),
      glass: new THREE.Color("#4D80FF"),
    };
  }
  if (hex === "#ffc5c2") {
    return {
      pastel: new THREE.Color("#FFF5F4"),
      light: new THREE.Color("#FFECEB"),
      medium: new THREE.Color("#FFA6B3"),
      deep: new THREE.Color("#FF4D6D"),
      glass: new THREE.Color("#FFA6B3"),
    };
  }
  const c = new THREE.Color(baseColor);
  return {
    pastel: c.clone().offsetHSL(0, -0.15, 0.25),
    light: c.clone().offsetHSL(0, -0.05, 0.12),
    medium: c.clone(),
    deep: c.clone().offsetHSL(0.01, 0.1, -0.12),
    glass: c.clone(),
  };
}

type Role = "pastel" | "light" | "medium" | "deep" | "glass";
const ROLES: Role[] = ["pastel", "light", "medium", "deep", "glass"];

/* ---------------- main component ---------------------------------- */

export function GravityB() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef({ progress: 0, started: false });
  const mouseRef = useRef({ x: 99, y: 99, isDown: false });
  const readyRef = useRef(false);

  const [bgStage, setBgStage] = useState(0);
  const [loaderValue, setLoaderValue] = useState(0);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const [pageIn, setPageIn] = useState(false);

  /* ---- smooth scroll + progress + pointer ---- */
  useEffect(() => {
    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY));
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    const onNativeScroll = () => {
      // keep in sync if scrolled by other means (keyboard, drag)
      if (Math.abs(window.scrollY - current) > 2) {
        target = current = window.scrollY;
      }
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      current += (target - current) * 0.09;
      if (Math.abs(target - current) > 0.1) {
        window.scrollTo(0, current);
      }
      const vh = window.innerHeight || 1;
      const progress = window.scrollY / vh;
      controlRef.current.progress = progress;
      setBgStage(progress > 1.55 ? 2 : progress > 0.7 ? 1 : 0);
    };
    raf = requestAnimationFrame(tick);

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
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
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

    const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);
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

      const progress = ctrl.progress ?? 0;

      const heroF = 1 - smoothstep(0.3, 0.8, progress);
      const dropRaw = smoothstep(0.4, 0.95, progress);
      const flyF = smoothstep(2.7, 3.45, progress);
      const shapeF = smoothstep(1.4, 2.05, progress) * (1 - smoothstep(2.55, 3.0, progress));
      const dropF = dropRaw * (1 - smoothstep(1.25, 1.75, progress));

      const bLime = smoothstep(0.55, 1.05, progress);
      const bPink = smoothstep(1.4, 1.95, progress);
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
            const rotAngle = (deltaPos.length() / b.radius) * 0.95;
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

  /* ---- background gradients (AMED morph) ---- */
  const gradients = [
    "radial-gradient(circle at center, #ffffff 0%, #ecf8fc 35%, #bfe8f4 100%)",
    "radial-gradient(circle at center, #ffffff 0%, #ecefff 38%, #c2d1ff 100%)",
    "radial-gradient(circle at center, #ffffff 0%, #fff0f1 38%, #ffd1d5 100%)",
  ];

  const heroIn = (delay: number) =>
    ({
      opacity: pageIn ? 1 : 0,
      transform: pageIn ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }) as const;

  const marqueeWords = [
    "Capital that reaches the bedside",
    "Beyond capital",
    "Lives that will be touched",
    "Evidence, execution, endurance",
  ];

  return (
    <div style={{ color: "#1a1a1a" }}>
      {/* fontshare for Satoshi (UI) */}
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
      />

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

      {/* loader */}
      {!loaderGone && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            gap: 26,
            background:
              "radial-gradient(circle at 50% 42%, #ffffff 0%, #eef8fb 45%, #d5eef7 100%)",
            opacity: loaderLeaving ? 0 : 1,
            transition: "opacity 0.55s cubic-bezier(0.65,0,0.35,1)",
            pointerEvents: loaderLeaving ? "none" : "auto",
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#5b7f8f",
            }}
          >
            {loaderValue < 100 ? "Calibrating gravity field" : "Entering orbit"}
          </p>
          <div
            style={{
              width: "clamp(180px, 32vw, 280px)",
              height: 2,
              background: "rgba(14,127,165,0.14)",
              borderRadius: 99,
            }}
          >
            <div
              style={{
                width: `${loaderValue}%`,
                height: "100%",
                borderRadius: 99,
                background: "linear-gradient(90deg, #33c0e2 0%, #0e7fa5 100%)",
                boxShadow: "0 0 14px rgba(0,168,208,0.55)",
                transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.1em",
              color: ACCENT,
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(Math.floor(loaderValue)).padStart(3, "0")}%
          </p>
        </div>
      )}

      {/* header */}
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-30 flex h-20 items-center justify-between px-6 md:h-24 md:px-12"
        style={{
          opacity: pageIn ? 1 : 0,
          transform: pageIn ? "translateY(0)" : "translateY(-16px)",
          transition:
            "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Link href="/v2" className="pointer-events-auto">
          <Image
            src={asset("/amed/brand/amed-logo-light.png")}
            alt="AMED Ventures"
            width={1999}
            height={452}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>
        <nav className="pointer-events-auto hidden items-center gap-10 md:flex">
          {RX_NAV.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={RX_MAILTO}
          className="group pointer-events-auto flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 md:pl-6"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,255,255,0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.85)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "inset 0 1.5px 2px rgba(255,255,255,0.7), 0 8px 30px rgba(0,0,0,0.04)",
          }}
        >
          <span className="text-[13px] font-medium md:text-sm">Contact us</span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform group-hover:scale-105"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, #33c0e2 0%, #0e7fa5 55%, #043243 100%)",
            }}
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
      </header>

      {/* 01 — HERO */}
      <section className="pointer-events-none relative z-10 flex min-h-[100svh] items-end">
        <div className="flex w-full flex-col justify-between gap-8 px-6 pb-12 md:flex-row md:items-end md:px-12 md:pb-14">
          <div className="pointer-events-auto flex flex-col items-start gap-3.5">
            <p
              className="mb-4 text-xs font-medium uppercase md:mb-6 md:text-[14px]"
              style={{ color: ACCENT, letterSpacing: "0.05em", ...heroIn(0.15) }}
            >
              [ {RX_HERO.chip} ]
            </p>
            <h1
              className="text-[2.6rem] leading-[0.98] tracking-tight sm:text-6xl md:text-[90px] md:leading-none"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a", ...heroIn(0.28) }}
            >
              {RX_HERO.title[0]}
              <br />
              {RX_HERO.title[1]}
            </h1>
          </div>
          <div className="pointer-events-auto md:w-[280px]" style={heroIn(0.45)}>
            <p className="text-[15px] font-medium leading-[1.4]">{RX_HERO.support}</p>
            <p
              className="mt-5 uppercase"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: "#737373" }}
            >
              © 2026 — MedTech venture capital
            </p>
            <div className="mt-4 hidden animate-pulse items-center gap-2 text-neutral-500 md:flex">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 5v14m0 0l-6-6m6 6l6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em" }}>SCROLL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — DROP / firm highlights */}
      <section className="pointer-events-none relative z-10 flex min-h-[100svh] items-center px-6 pb-40 pt-32 md:px-12 md:pt-40">
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="pointer-events-auto lg:col-span-7">
            <Reveal>
              <p
                className="uppercase"
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: "rgba(14,127,165,0.8)",
                }}
              >
                [ 02 — The Firm ]
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mt-6 text-[2.6rem] leading-[1.0] tracking-tight sm:text-6xl md:text-[80px] md:leading-[0.95]"
                style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
              >
                Breakthroughs matter
                <br />
                when patients feel
                <br />
                the difference.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-base leading-[1.55] text-neutral-700 md:text-[19px]">
                {RX_ABOUT.body}
              </p>
            </Reveal>
          </div>
          <div className="pointer-events-auto lg:col-span-5 lg:pt-3">
            <Reveal delay={0.25}>
              <div className="flex flex-col gap-3.5">
                {RX_ABOUT.highlights.slice(0, 3).map((card, i) => (
                  <div
                    key={card.title}
                    className="rounded-[1.4rem] p-px transition-transform hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                      boxShadow: "0 14px 40px -12px rgba(14,127,165,0.18)",
                    }}
                  >
                    <div
                      className="rounded-[1.35rem] px-6 py-5"
                      style={{
                        background: "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span style={{ fontFamily: MONO, fontSize: 10 }}>
                          0{i + 1}
                        </span>
                        <span
                          className="uppercase text-neutral-400"
                          style={{ fontFamily: MONO, fontSize: 10 }}
                        >
                          Highlights
                        </span>
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle at 35% 30%, #33c0e2, #0e7fa5)",
                            boxShadow: "0 0 8px rgba(0,168,208,0.6)",
                          }}
                        />
                      </div>
                      <p className="mt-3 text-lg font-semibold" style={{ fontFamily: SERIF }}>
                        {card.title}
                      </p>
                      <p className="mt-1 text-[13px] text-neutral-500">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — SHAPE / heart */}
      <section className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-between px-6 py-36 md:px-12 md:py-44">
        <div className="pointer-events-auto">
          <Reveal>
            <p
              className="uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.25em",
                color: "rgba(14,127,165,0.8)",
              }}
            >
              [ 03 — Portfolio ]
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-6 max-w-2xl text-[2.6rem] leading-[1.0] tracking-tight sm:text-6xl md:text-[80px] md:leading-[0.95]"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
            >
              Every company we back represents lives that will be touched.
            </h2>
          </Reveal>
        </div>
        <div className="pointer-events-auto max-w-sm self-end text-left md:text-right">
          <Reveal delay={0.15}>
            <p className="text-base leading-[1.55] text-neutral-700 md:text-[19px]">
              Out of free-fall, the field reassembles — sixteen companies and the people they serve,
              finding their place in a single shape. Move your cursor through it and watch the order
              ripple, scatter, and recover.
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
                SWIPE THROUGH IT
              </span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* 04 — RELEASE */}
      <section className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-36 text-center md:px-12 md:py-44">
        <div className="pointer-events-auto mx-auto max-w-3xl">
          <Reveal>
            <p
              className="uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.25em",
                color: "rgba(14,127,165,0.8)",
              }}
            >
              [ 04 — Release ]
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2
              className="mt-7 text-[2.8rem] leading-[1.0] sm:text-7xl md:text-[88px] md:leading-[0.95]"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
            >
              Tomorrow&apos;s
              <br />
              global impact.
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-8 max-w-md text-base leading-[1.55] text-neutral-700 md:text-[19px]">
              With the right support, today&apos;s pioneering idea lifts off — every sphere
              accelerating into the lens until nothing remains but light.
            </p>
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="relative z-10 overflow-hidden rounded-t-[2.5rem] bg-neutral-950 text-white md:rounded-t-[4rem]">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, #33c0e266 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-48 -left-48 h-[32rem] w-[32rem] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, #0e7fa544 0%, transparent 65%)" }}
        />

        {/* marquee */}
        <div className="overflow-hidden border-b border-white/10 py-5">
          <div
            className="inline-flex whitespace-nowrap"
            style={{ animation: "gravity-marquee 26s linear infinite" }}
          >
            {[0, 1].map((copy) => (
              <span key={copy} className="inline-flex items-center">
                {marqueeWords.map((w) => (
                  <span key={`${copy}-${w}`} className="inline-flex items-center">
                    <span
                      className="px-8 text-white/90"
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 500,
                        fontSize: "clamp(28px, 6vw, 64px)",
                      }}
                    >
                      {w}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#33c0e2" }} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 pb-10 pt-16 md:px-12 md:pt-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p
                  className="uppercase text-white/40"
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.25em" }}
                >
                  [ {RX_CTA.chip} ]
                </p>
                <h2
                  className="mt-6 text-4xl leading-[0.98] md:text-6xl"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {RX_CTA.title[0]}
                  <br />
                  {RX_CTA.title[1]}
                </h2>
                <a
                  href={RX_MAILTO}
                  className="group mt-8 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/5 py-2 pl-7 pr-2 transition-colors hover:bg-white/10"
                >
                  <span className="text-base font-medium md:text-lg">{RX_CTA.email}</span>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 30%, #33c0e2 0%, #0e7fa5 55%, #043243 100%)",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform duration-300 group-hover:rotate-45"
                      aria-hidden
                    >
                      <path
                        d="M7 17L17 7M17 7H9M17 7v8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                {[
                  { title: "Studio", links: RX_NAV.slice(0, 4) },
                  {
                    title: "Offices",
                    links: [
                      { label: RX_CTA.offices[0], href: RX_MAILTO },
                      { label: RX_CTA.offices[1], href: RX_MAILTO },
                      { label: "Contact", href: "/v2/contact" },
                    ],
                  },
                  {
                    title: "Versions",
                    links: [
                      { label: "Proposal A", href: "/v2" },
                      { label: "Proposal B", href: "/b" },
                    ],
                  },
                ].map((col, i) => (
                  <Reveal key={col.title} delay={i * 0.08}>
                    <p
                      className="uppercase text-white/40"
                      style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.25em" }}
                    >
                      {col.title}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="text-[15px] text-white/75 transition-colors hover:text-white"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-7 md:mt-28 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <Image
                src={asset("/amed/brand/amed-logo-dark.png")}
                alt="AMED Ventures"
                width={1999}
                height={452}
                className="h-6 w-auto"
              />
              <span className="h-2 w-2 rounded-full" style={{ background: "#33c0e2" }} />
              <span
                className="text-white/40"
                style={{ fontFamily: MONO, fontSize: 11 }}
              >
                {RX_FOOTER.copyright} — {RX_FOOTER.tagline}
              </span>
            </div>
          </div>
        </div>
        <style>{`@keyframes gravity-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </footer>
    </div>
  );
}
