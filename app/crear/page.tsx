import { CrearEncuesta } from "@/components/CrearEncuesta"

export default function CrearPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="m-auto flex w-full max-w-md flex-col items-start gap-2 ">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Creacion de Encuesta
        </h1>
        <p className="max-w-[700px] text-center text-lg text-muted-foreground">
          Escribe tu pregunta y las opciones.
        </p>
        <CrearEncuesta />
      </div>
    </section>
  )
}
