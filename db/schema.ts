import { InferModel, relations } from "drizzle-orm"
import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core"

export const preguntas = pgTable("preguntas", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  pregunta: text("pregunta").notNull(),
})

export type Pregunta = InferModel<typeof preguntas>

export const preguntasRelations = relations(preguntas, ({ many }) => ({
  opciones: many(opciones),
}))

export const opciones = pgTable("opciones", {
  id: serial("id").primaryKey(),
  texto: text("texto").notNull(),
  votos: integer("votos").default(0).notNull(),
  preguntaId: uuid("pregunta_id").notNull(),
})
export type Opcion = InferModel<typeof opciones>

export const opcionesRelations = relations(opciones, ({ one }) => ({
  pregunta: one(preguntas, {
    fields: [opciones.preguntaId],
    references: [preguntas.id],
  }),
}))
