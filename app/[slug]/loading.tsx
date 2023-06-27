import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

export default function Loading() {
  return (
    <section className="pb-8 pt-6">
      <div className="m-auto flex w-full max-w-md flex-col gap-8 rounded-lg border bg-card p-6 pb-4 pt-8 text-card-foreground shadow-sm">
        <Skeleton className=" mx-auto h-[40px] w-3/4" />

        <div className="flex flex-col gap-3">
          <p className=" text-muted-foreground">Selecciona una opcion:</p>
          <Skeleton className="m-auto h-11 w-full" />
          <Skeleton className="m-auto h-11 w-full " />
        </div>
        <div className="flex justify-evenly">
          <Button
            variant="ghost"
            size="sm"
            className=" -mb-2 w-fit text-muted-foreground"
          >
            <Icons.share className="mr-2 h-4 w-4" /> Compartir
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className=" -mb-2 w-fit text-muted-foreground"
          >
            <Icons.link className="mr-2 h-4 w-4" /> Copiar link
          </Button>
        </div>
      </div>
    </section>
  )
}
