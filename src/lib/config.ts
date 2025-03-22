import { z } from "zod"

import mapAndValidateSchema from "@/lib/validations/mapAndValidate"

const envSchema = z.object({
    VITE_API_URL: z.string().url(),
    auth: z.object({
        VITE_AUTH_DOMAIN: z.string(),
        VITE_AUTH_CLIENT_ID: z.string(),
        VITE_AUTH_AUDIENCE: z.string(),
    }),
})

export const config = mapAndValidateSchema(envSchema, import.meta.env)
