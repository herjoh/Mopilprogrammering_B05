import { z } from "zod";

import type { CaseCategory, CaseSeverity, CaseStatus } from "@/constants/types";
import { validateDescription } from "@/utils/validation";

// zod trenger listene, satisfies sjekker at de matcher typene i constants/types
export const caseCategories = ["water", "electricity", "heating", "complaint", "other"] as const satisfies readonly CaseCategory[];
export const caseSeverities = ["low", "medium", "high", "urgent"] as const satisfies readonly CaseSeverity[];
export const caseStatuses = ["open", "in progress", "pending tenant confirmation", "closed"] as const satisfies readonly CaseStatus[];

// det skjemaet sender inn; tenantId settes fra innlogget bruker
export const createCaseSchema = z.object({
  title: z
    .string({ required_error: "Tittel mangler" })
    .trim()
    .min(3, "Tittelen må ha minst 3 tegn")
    .max(80, "Tittelen kan ha maks 80 tegn"),
  description: z.string({ required_error: "Beskrivelse mangler" }).superRefine((text, ctx) => {
    const result = validateDescription(text);
    if (!result.ok) ctx.addIssue({ code: z.ZodIssueCode.custom, message: result.error ?? "Ugyldig beskrivelse" });
  }),
  category: z.enum(caseCategories, { errorMap: () => ({ message: "Velg en gyldig kategori" }) }),
  severity: z.enum(caseSeverities, { errorMap: () => ({ message: "Velg en gyldig hastegrad" }) }),
  propertyId: z.string({ required_error: "Eiendom mangler" }).min(1, "Eiendom mangler"),
});

export const updateCaseSchema = createCaseSchema.partial().extend({
  status: z.enum(caseStatuses, { errorMap: () => ({ message: "Ugyldig status" }) }).optional(),
});

export type CreateCaseInput = z.infer<typeof createCaseSchema>;
export type UpdateCaseInput = z.infer<typeof updateCaseSchema>;

export function fieldErrorsOf(error: z.ZodError) {
  return error.flatten().fieldErrors as Record<string, string[] | undefined>;
}
