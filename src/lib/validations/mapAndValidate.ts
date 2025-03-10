import { z } from "zod"

export default function mapAndValidateSchema<T extends z.ZodObject<z.ZodRawShape>>(
    schema: T,
    obj: Record<string, any>
): z.infer<T> {
    const shape = schema.shape

    const parsedObject = Object.keys(shape).reduce((acc, key) => {
        if (shape[key] instanceof z.ZodObject) {
            acc[key] = mapAndValidateSchema(shape[key], obj)
        } else {
            acc[key] = obj[key]
        }

        return acc
    }, {} as Record<string, any>)

    const result = schema.parse(parsedObject)

    return result
}
