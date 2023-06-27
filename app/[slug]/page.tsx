import { notFound } from "next/navigation"
import { db } from "@/db"
import { preguntas } from "@/db/schema"
import { eq } from "drizzle-orm"

import { CompartirButton } from "@/components/CompartirButton"
import { Opciones } from "@/components/Opciones"
import { Icons } from "@/components/icons"

export default async function Page({ params }: { params: { slug: string } }) {
  const pregunta = await db.query.preguntas.findFirst({
    where: eq(preguntas.id, params.slug),
    with: {
      opciones: true,
    },
  })
  if (!pregunta) notFound()

  return (
    <section className="pb-8 pt-6">
      <div className="m-auto flex w-full max-w-md flex-col gap-8 rounded-lg border bg-card p-6 pb-4 pt-8 text-card-foreground shadow-sm">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {pregunta?.pregunta}
        </h1>

        <Opciones opciones={pregunta?.opciones}></Opciones>
        <CompartirButton></CompartirButton>
      </div>
    </section>
  )
}
