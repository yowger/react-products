import { z } from "zod"

import mapAndValidateSchema from "@/lib/validations/mapAndValidate"

const envSchema = z.object({
    VITE_API_URL: z.string().url(),
})

export const config = mapAndValidateSchema(envSchema, import.meta.env)
