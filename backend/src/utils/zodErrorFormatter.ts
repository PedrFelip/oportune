import { ZodError } from "zod";

export function formatZodErrors(err: ZodError) {
    return err.issues.reduce((acc, issue) => {
        const fieldName = issue.path[0];
        if (fieldName) {
            acc[fieldName.toString()] = issue.message;
        }
        return acc;
    }, {} as Record<string, string>);
}