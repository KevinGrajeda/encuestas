"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { Opcion, opciones, preguntas, type Pregunta } from "@/db/schema"
import { sql } from "drizzle-orm"
import { z } from "zod"

import { encuestaSchema } from "@/lib/validations/encuesta"

export async function addEncuestaAction(input: z.infer<typeof encuestaSchema>) {
  const insertedId = await db
    .insert(preguntas)
    .values({
      pregunta: input.pregunta,
    })
    .returning({ insertedId: preguntas.id })

  const rows = input.opciones.map((opcion) => {
    return { preguntaId: insertedId[0].insertedId, texto: opcion.value }
  })
  await db.insert(opciones).values(rows)
  return insertedId[0].insertedId
}

export async function votarAction(opcion: Opcion) {
  const statement = sql`UPDATE opciones SET votos = votos + 1 WHERE id = ${opcion.id} AND pregunta_id = ${opcion.preguntaId}`
  await db.execute(statement)

  revalidatePath(`${opcion.preguntaId}/resultados`)
}
