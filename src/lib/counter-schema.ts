import { z } from "zod";

const counterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  goal: z
    .number({ error: "Goal must be a number" })
    .int("Goal must be a whole number")
    .positive("Goal must be greater than 0")
    .nullable()
    .optional(),
  value: z
    .number({ error: "Value must be a number" })
    .int("Value must be a whole number")
    .nonnegative("Value cannot be negative"),
});

export type CounterFormValues = z.infer<typeof counterSchema>;
export default counterSchema;
