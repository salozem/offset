"use client";
import { DanceClass, classes as defaultClasses } from "./classes";
import { RSVP } from "./types";

// ── Clases ────────────────────────────────────────────────────────────────────

export function getClasses(): DanceClass[] {
  if (typeof window === "undefined") return defaultClasses;
  const raw = localStorage.getItem("osc_classes");
  if (!raw) return defaultClasses;
  try {
    return JSON.parse(raw) as DanceClass[];
  } catch {
    return defaultClasses;
  }
}

export function saveClasses(classes: DanceClass[]): void {
  localStorage.setItem("osc_classes", JSON.stringify(classes));
}

export function addClass(cls: DanceClass): void {
  saveClasses([...getClasses(), cls]);
}

export function deleteClass(id: string): void {
  saveClasses(getClasses().filter((c) => c.id !== id));
}

// ── RSVPs ─────────────────────────────────────────────────────────────────────

export function getRSVPs(): RSVP[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("osc_rsvps");
  if (!raw) return [];
  try {
    return JSON.parse(raw) as RSVP[];
  } catch {
    return [];
  }
}

export function addRSVP(rsvp: RSVP): void {
  localStorage.setItem("osc_rsvps", JSON.stringify([...getRSVPs(), rsvp]));
}

export function getRSVPsByClass(classId: string): RSVP[] {
  return getRSVPs().filter((r) => r.classId === classId);
}

// ── Auth ──────────────────────────────────────────────────────────────────────

const ADMIN_KEY = "osc_admin_auth";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "offset2026";

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "1");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(ADMIN_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_KEY) === "1";
}
