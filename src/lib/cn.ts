import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS class names without conflicts.
 * Combines clsx for conditional classes and tailwind-merge to resolve Tailwind class collisions.
 *
 * @param inputs - Class names, objects, or arrays
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
