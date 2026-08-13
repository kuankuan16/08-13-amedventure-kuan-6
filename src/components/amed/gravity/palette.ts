import * as THREE from "three";

/** Sphere color roles shared by the gravity scenes. */
export type Role = "pastel" | "light" | "medium" | "deep" | "glass";
export const ROLES: Role[] = ["pastel", "light", "medium", "deep", "glass"];

export function getDynamicColors(baseColor: string) {
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
