import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { accountExists } from "~/routes/_queries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function signupValidate(
  email: string,
  password: string,
  confirmPassword: string,
) {
  let errors: { email?: string; password?: string } = {};
  if (!email) {
    errors.email = "Can't be empty";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (await accountExists(email)) {
    errors.email = "An account with this email already exists";
  }

  if (!password) {
    errors.password = "Please check again";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (confirmPassword !== password) {
    errors.password = "Password fields do not match";
  }

  if (password !== confirmPassword) {
    errors.password = "Password fields do not match";
  }

  return Object.keys(errors).length ? errors : null;
}

export async function signinValidate(email: string, password: string) {
  let errors: { email?: string; password?: string } = {};
  if (!email) {
    errors.email = "Can't be empty";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Please check again";
  }

  return Object.keys(errors).length ? errors : null;
}
