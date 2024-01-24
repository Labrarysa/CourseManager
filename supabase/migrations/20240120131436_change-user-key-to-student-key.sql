alter table "public"."form_results" drop constraint "chk_user_presence";

alter table "public"."form_results" drop column "user_key";

alter table "public"."form_results" add column "student_key" text;

alter table "public"."form_results" add constraint "chk_user_presence" CHECK ((((user_id IS NOT NULL) AND (student_key IS NULL)) OR ((user_id IS NULL) AND (student_key IS NOT NULL)))) not valid;

alter table "public"."form_results" validate constraint "chk_user_presence";


