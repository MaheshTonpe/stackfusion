import { z } from "zod";

export interface User {
  id: number;
  name: string;
  dob: string;
  email_id: string;
  phone_no: number;
}

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email_id: z.string().email(),
  dob: z.string(),
  phone_no: z.number(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
