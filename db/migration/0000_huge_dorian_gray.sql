CREATE TABLE IF NOT EXISTS "account" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false,
	"createdAt" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"supabase_uid" text NOT NULL,
	"email" text,
	"display_name" text
);
