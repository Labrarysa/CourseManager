alter table "public"."form_results" drop constraint "chk_user_presence";

alter table "public"."form_results" drop constraint "form_results_form_id_fkey";

alter table "public"."form_results" drop constraint "form_results_question_id_fkey";

alter table "public"."question_choices" drop constraint "question_choices_question_id_fkey";

alter table "public"."questions" drop constraint "questions_section_id_fkey";

alter table "public"."sections" drop constraint "sections_form_id_fkey";

alter table "public"."form_results" drop column "non_user_id";

alter table "public"."form_results" drop column "user_answer";

alter table "public"."form_results" add column "answer" text;

alter table "public"."form_results" add column "user_key" text;

alter table "public"."form_results" add constraint "chk_user_presence" CHECK ((((user_id IS NOT NULL) AND (user_key IS NULL)) OR ((user_id IS NULL) AND (user_key IS NOT NULL)))) not valid;

alter table "public"."form_results" validate constraint "chk_user_presence";

alter table "public"."form_results" add constraint "form_results_form_id_fkey" FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE not valid;

alter table "public"."form_results" validate constraint "form_results_form_id_fkey";

alter table "public"."form_results" add constraint "form_results_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE not valid;

alter table "public"."form_results" validate constraint "form_results_question_id_fkey";

alter table "public"."question_choices" add constraint "question_choices_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE not valid;

alter table "public"."question_choices" validate constraint "question_choices_question_id_fkey";

alter table "public"."questions" add constraint "questions_section_id_fkey" FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE not valid;

alter table "public"."questions" validate constraint "questions_section_id_fkey";

alter table "public"."sections" add constraint "sections_form_id_fkey" FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE not valid;

alter table "public"."sections" validate constraint "sections_form_id_fkey";


