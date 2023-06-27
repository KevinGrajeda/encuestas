CREATE TABLE IF NOT EXISTS "opciones" (
	"id" serial PRIMARY KEY NOT NULL,
	"texto" text NOT NULL,
	"votos" integer DEFAULT 0,
	"pregunta_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "preguntas" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pregunta" text NOT NULL
);
