import { z } from "zod";

export const signupSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
});
