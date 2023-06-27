import { notFound } from "next/navigation"
import { db } from "@/db"
import { preguntas } from "@/db/schema"
import { eq } from "drizzle-orm"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CompartirButton } from "@/components/CompartirButton"

export default async function Page({ params }: { params: { slug: string } }) {
  const pregunta = await db.query.preguntas.findFirst({
    where: eq(preguntas.id, params.slug),
    with: {
      opciones: true,
    },
  })
  if (!pregunta) notFound()

  const votosTotales = pregunta.opciones.reduce(
    (accumulator, opcion) => accumulator + opcion.votos,
    0
  )

  return (
    <section className="pb-8 pt-6">
      <div className="m-auto flex w-full max-w-md flex-col gap-8 rounded-lg border bg-card p-6 pb-4 pt-8 text-card-foreground shadow-sm">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {pregunta?.pregunta}
        </h1>

        <div className="flex flex-col gap-3">
          <p className=" text-muted-foreground">Resultados:</p>

          {pregunta?.opciones.map((opcion) => (
            <div
              key={opcion.id}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "relative z-20 flex w-full justify-between bg-transparent"
              )}
            >
              <div
                className="absolute left-0 -z-10 h-full rounded-md bg-muted"
                style={{
                  width: `${Math.round((opcion.votos / votosTotales) * 100)}%`,
                }}
              />
              <div className="text-muted-foreground">{opcion.votos} votos</div>
              <div>{opcion.texto}</div>
              <div className="text-muted-foreground">
                {Math.round((opcion.votos / votosTotales) * 100)}%
              </div>
            </div>
          ))}
        </div>
        <CompartirButton />
      </div>
    </section>
  )
}
