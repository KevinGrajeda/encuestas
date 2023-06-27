"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { encuestaSchema } from "@/lib/validations/encuesta"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addEncuestaAction } from "@/app/_actions/encuesta"

import { Icons } from "./icons"
import { useToast } from "./ui/use-toast"

export function CrearEncuesta() {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof encuestaSchema>>({
    resolver: zodResolver(encuestaSchema),
    defaultValues: {
      pregunta: "",
      opciones: [{ value: "" }, { value: "" }],
    },
  })

  const {
    fields: opciones,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "opciones",
  })

  function onSubmit(values: z.infer<typeof encuestaSchema>) {
    startTransition(async () => {
      try {
        const idEncuesta = await addEncuestaAction({ ...values })
        toast({
          description: `Encuesta creada.`,
        })
        form.reset()
        router.push(`/${idEncuesta}`)
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
    <div className="m-auto w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pregunta"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Pregunta
                </FormLabel>
                <FormControl>
                  <Input placeholder="¿Cual es tu color favorito?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            {opciones.map((opcion, index) => (
              <FormField
                control={form.control}
                key={opcion.id}
                name={`opciones.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(
                        "scroll-m-20 text-xl font-semibold tracking-tight",
                        index !== 0 && "sr-only"
                      )}
                    >
                      Respuestas
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Respuesta" {...field} />
                        {opciones.length > 2 && (
                          <Button
                            variant="ghost"
                            className="absolute right-0 top-0 px-2"
                            onClick={() => {
                              remove(index)
                            }}
                          >
                            <Icons.remove className=" h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              <Icons.add className="mr-2 h-4 w-4"></Icons.add>
              Agregar respuesta
            </Button>
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Creando encuesta" : "Crear encuesta"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
