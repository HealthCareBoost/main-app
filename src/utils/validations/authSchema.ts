import { z } from "zod";

export const LoginSchema = z.object({
  csrfToken: z.string(),
  email: z.string().email({ message: "Not a valid email" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3),
  csrfToken: z.string(),
  email: z.string().email({ message: "Not a valid email" }),
});
