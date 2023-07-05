-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ACCOUNT_ACCESS" AS ENUM('READ_ONLY', 'READ_WRITE', 'ADMIN', 'OWNER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"current_period_ends" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"features" text[],
	"plan_id" integer NOT NULL,
	"plan_name" text NOT NULL,
	"max_notes" integer DEFAULT 100 NOT NULL,
	"stripe_subscription_id" text,
	"stripe_customer_id" text,
	"max_members" integer DEFAULT 1 NOT NULL,
	"join_password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer,
	"note_text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "membership" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"access" "ACCOUNT_ACCESS" DEFAULT 'READ_ONLY' NOT NULL,
	"pending" boolean DEFAULT false NOT NULL,
	"account_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer,
	"token_text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"features" text[],
	"max_notes" integer DEFAULT 100 NOT NULL,
	"stripe_product_id" text,
	"max_members" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"supabase_uid" text NOT NULL,
	"email" text,
	"display_name" text
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY("id","id");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "account_join_password_key" ON "account" ("join_password");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "membership_user_id_account_id_key" ON "membership" ("user_id","account_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "plan_name_key" ON "plan" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "confirmation_token_idx" ON "users" ("confirmation_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_change_token_current_idx" ON "users" ("email_change_token_current");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_change_token_new_idx" ON "users" ("email_change_token_new");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reauthentication_token_idx" ON "users" ("reauthentication_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "recovery_token_idx" ON "users" ("recovery_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_partial_key" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_instance_id_email_idx" ON "users" ("instance_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_instance_id_idx" ON "users" ("instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_phone_key" ON "users" ("phone");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "membership" ADD CONSTRAINT "membership_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "membership" ADD CONSTRAINT "membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/