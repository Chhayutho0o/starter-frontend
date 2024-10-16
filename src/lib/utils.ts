import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformError(error: any): any {
  const status = error?.response?.status ?? "error";
  const message = error?.response?.data?.message ?? error?.message ?? "";
  const errors = error?.response?.data?.errors ?? {};

  return {
    status,
    message,
    errors,
  };
}
