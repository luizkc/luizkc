import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthday: string) {
  // Create a date object for the birth date
  const birthDate = new Date(birthday);
  // Get the current date
  const currentDate = new Date();

  // Calculate the age
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();

  // If the current month is before the birth month or
  // it's the same month but the current day is before the birth day,
  // then the age should be adjusted down by one.
  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
