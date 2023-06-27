"use client"

import { usePathname } from "next/navigation"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

export function CompartirButton() {
  const pathname = usePathname()
  const { toast } = useToast()
  return (
    <div className="flex justify-evenly">
      <Button
        variant="ghost"
        size="sm"
        className=" -mb-2 w-fit text-muted-foreground"
        onClick={() => {
          const url = `${window.location.origin}${pathname}`
          navigator.share({ url })
        }}
      >
        <Icons.share className="mr-2 h-4 w-4" /> Compartir
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className=" -mb-2 w-fit text-muted-foreground"
        onClick={() => {
          const url = `${window.location.origin}${pathname}`

          navigator.clipboard.writeText(url)

          toast({
            description: `Enlace de respuestas copiado.`,
          })
        }}
      >
        <Icons.link className="mr-2 h-4 w-4" /> Copiar link
      </Button>
    </div>
  )
}
