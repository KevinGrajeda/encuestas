"use client"

import { useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Opcion } from "@/db/schema"

import { Button } from "@/components/ui/button"
import { votarAction } from "@/app/_actions/encuesta"

import { useToast } from "./ui/use-toast"

export function Opciones({ opciones }: { opciones: Opcion[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  function votar(opcion: Opcion) {
    startTransition(async () => {
      try {
        await votarAction(opcion)
        router.push(`${pathname}/resultados`)
      } catch (error) {
        error instanceof Error &&
          toast({
            variant: "destructive",
            description: "Hubo un error.",
          })
      }
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className=" text-muted-foreground">Selecciona una opcion:</p>

      {opciones.map((opcion) => (
        <Button
          key={opcion.id}
          variant="secondary"
          size="lg"
          disabled={isPending}
          onClick={() => {
            votar(opcion)
          }}
        >
          <span>{opcion.texto}</span>
        </Button>
      ))}
    </div>
  )
}
