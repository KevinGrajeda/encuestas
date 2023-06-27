import { z } from "zod"

export const encuestaSchema = z.object({
  pregunta: z
    .string()
    .min(1, {
      message: "Escribe una pregunta.",
    })
    .max(30, {
      message: "La pregunta debe ser mas corta.",
    }),
  opciones: z
    .array(
      z.object({
        value: z.string().min(1, "Escribe una opcion."),
      })
    )
    .nonempty(),
})
