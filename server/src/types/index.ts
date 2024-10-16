import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Full name is required." }),
  companyEmail: z.string().email({ message: "Invalid email format." }),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9][0-9]{7,14}$/, { message: "Invalid phone number." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  employeeSize: z
    .number()
    .positive({ message: "Employee size must be a positive number." }),
});

export const otpSchema = z.object({
  mobileOtp: z.string().min(6).max(6),
  emailOtp: z.string().min(6).max(6),
  userId: z.string(),
});

export const jobSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title must be less than 100 characters." }),

  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(500, { message: "Description must be less than 500 characters." }),

  experience: z.string(),

  emails: z
    .array(z.string().email(), {
      required_error: "At least one valid email is required.",
    })
    .min(1, { message: "At least one email is required." }),

  date: z
    .string()
    .refine(
      (value) => {
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate >= today;
      },
      { message: "Date cannot be in the past." }
    )
    .optional(),
});
