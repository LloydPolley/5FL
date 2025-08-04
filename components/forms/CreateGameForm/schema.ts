import { z } from "zod";

export const loginSchema = z.object({
  season: z.string().min(1, "Season is required"),
  opponentName: z.string().min(1, "Opponent name is required"),
  teamScore: z.number().min(0, "Team score must be at least 0"),
  opponentScore: z.number().min(0, "Opponent score must be at least 0"),
});
