create table "public"."form_results" (
    "id" uuid not null default uuid_generate_v4(),
    "form_id" uuid,
    "user_id" uuid,
    "non_user_id" integer,
    "question_id" uuid,
    "user_answer" text,
    "submission_timestamp" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."forms" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "description" text,
    "is_quiz" boolean not null default false
);


create table "public"."question_choices" (
    "id" uuid not null default gen_random_uuid(),
    "question_id" uuid,
    "choice_text" character varying(255) not null
);


create table "public"."questions" (
    "id" uuid not null default gen_random_uuid(),
    "section_id" uuid,
    "question_text" text not null,
    "type" character varying(50) not null,
    "metadata" jsonb,
    "correct_answer_id" uuid
);


create table "public"."sections" (
    "id" uuid not null default gen_random_uuid(),
    "form_id" uuid,
    "title" character varying(255) not null,
    "description" text
);


CREATE UNIQUE INDEX form_results_pkey ON public.form_results USING btree (id);

CREATE UNIQUE INDEX forms_pkey ON public.forms USING btree (id);

CREATE UNIQUE INDEX question_choices_pkey ON public.question_choices USING btree (id);

CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id);

CREATE UNIQUE INDEX sections_pkey ON public.sections USING btree (id);

alter table "public"."form_results" add constraint "form_results_pkey" PRIMARY KEY using index "form_results_pkey";

alter table "public"."forms" add constraint "forms_pkey" PRIMARY KEY using index "forms_pkey";

alter table "public"."question_choices" add constraint "question_choices_pkey" PRIMARY KEY using index "question_choices_pkey";

alter table "public"."questions" add constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table "public"."sections" add constraint "sections_pkey" PRIMARY KEY using index "sections_pkey";

alter table "public"."form_results" add constraint "chk_user_presence" CHECK ((((user_id IS NOT NULL) AND (non_user_id IS NULL)) OR ((user_id IS NULL) AND (non_user_id IS NOT NULL)))) not valid;

alter table "public"."form_results" validate constraint "chk_user_presence";

alter table "public"."form_results" add constraint "form_results_form_id_fkey" FOREIGN KEY (form_id) REFERENCES forms(id) not valid;

alter table "public"."form_results" validate constraint "form_results_form_id_fkey";

alter table "public"."form_results" add constraint "form_results_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) not valid;

alter table "public"."form_results" validate constraint "form_results_question_id_fkey";

alter table "public"."form_results" add constraint "form_results_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."form_results" validate constraint "form_results_user_id_fkey";

alter table "public"."question_choices" add constraint "question_choices_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) not valid;

alter table "public"."question_choices" validate constraint "question_choices_question_id_fkey";

alter table "public"."questions" add constraint "fk_correct_answer" FOREIGN KEY (correct_answer_id) REFERENCES question_choices(id) not valid;

alter table "public"."questions" validate constraint "fk_correct_answer";

alter table "public"."questions" add constraint "questions_section_id_fkey" FOREIGN KEY (section_id) REFERENCES sections(id) not valid;

alter table "public"."questions" validate constraint "questions_section_id_fkey";

alter table "public"."sections" add constraint "sections_form_id_fkey" FOREIGN KEY (form_id) REFERENCES forms(id) not valid;

alter table "public"."sections" validate constraint "sections_form_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_form_questions(form_uuid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    form_data JSONB;
BEGIN
    SELECT JSONB_BUILD_OBJECT(
        'id', f.id,
        'title', f.title,
        'sections', (
            SELECT JSONB_AGG(
                JSONB_BUILD_OBJECT(
                    'id', s.id,
                    'title', s.title,
                    'questions', (
                        SELECT JSONB_AGG(
                            JSONB_BUILD_OBJECT(
                                'id', q.id,
                                'question_text', q.question_text,
                                'type', q.type,
                                'metadata', q.metadata,
                                'correct_answer_id', q.correct_answer_id,
                                'choices', (
                                    SELECT COALESCE(JSONB_AGG(
                                        JSONB_BUILD_OBJECT(
                                            'id', qc.id,
                                            'choice_text', qc.choice_text
                                        )), '[]'::JSONB)
                                    FROM question_choices qc
                                    WHERE qc.question_id = q.id
                                )
                            )
                        )
                        FROM questions q
                        WHERE q.section_id = s.id
                    )
                )
            )
            FROM sections s
            WHERE s.form_id = f.id
        )
    )
    INTO form_data
    FROM forms f
    WHERE f.id = form_uuid;

    RETURN form_data;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_form_results(form_uuid uuid, user_uuid uuid, non_user_id integer)
 RETURNS TABLE(result_id uuid, question_id uuid, question_text text, user_answer text, submission_timestamp timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        fr.id as result_id,
        q.id AS question_id,
        q.question_text,
        fr.user_answer,
        fr.submission_timestamp
    FROM 
        form_results fr
    JOIN 
        questions q ON fr.question_id = q.id
    WHERE 
        fr.form_id = form_uuid AND
        ((user_uuid IS NOT NULL AND fr.user_id = user_uuid) OR 
        (non_user_id IS NOT NULL AND fr.non_user_id = non_user_id));
END;
$function$
;

grant delete on table "public"."form_results" to "anon";

grant insert on table "public"."form_results" to "anon";

grant references on table "public"."form_results" to "anon";

grant select on table "public"."form_results" to "anon";

grant trigger on table "public"."form_results" to "anon";

grant truncate on table "public"."form_results" to "anon";

grant update on table "public"."form_results" to "anon";

grant delete on table "public"."form_results" to "authenticated";

grant insert on table "public"."form_results" to "authenticated";

grant references on table "public"."form_results" to "authenticated";

grant select on table "public"."form_results" to "authenticated";

grant trigger on table "public"."form_results" to "authenticated";

grant truncate on table "public"."form_results" to "authenticated";

grant update on table "public"."form_results" to "authenticated";

grant delete on table "public"."form_results" to "service_role";

grant insert on table "public"."form_results" to "service_role";

grant references on table "public"."form_results" to "service_role";

grant select on table "public"."form_results" to "service_role";

grant trigger on table "public"."form_results" to "service_role";

grant truncate on table "public"."form_results" to "service_role";

grant update on table "public"."form_results" to "service_role";

grant delete on table "public"."forms" to "anon";

grant insert on table "public"."forms" to "anon";

grant references on table "public"."forms" to "anon";

grant select on table "public"."forms" to "anon";

grant trigger on table "public"."forms" to "anon";

grant truncate on table "public"."forms" to "anon";

grant update on table "public"."forms" to "anon";

grant delete on table "public"."forms" to "authenticated";

grant insert on table "public"."forms" to "authenticated";

grant references on table "public"."forms" to "authenticated";

grant select on table "public"."forms" to "authenticated";

grant trigger on table "public"."forms" to "authenticated";

grant truncate on table "public"."forms" to "authenticated";

grant update on table "public"."forms" to "authenticated";

grant delete on table "public"."forms" to "service_role";

grant insert on table "public"."forms" to "service_role";

grant references on table "public"."forms" to "service_role";

grant select on table "public"."forms" to "service_role";

grant trigger on table "public"."forms" to "service_role";

grant truncate on table "public"."forms" to "service_role";

grant update on table "public"."forms" to "service_role";

grant delete on table "public"."question_choices" to "anon";

grant insert on table "public"."question_choices" to "anon";

grant references on table "public"."question_choices" to "anon";

grant select on table "public"."question_choices" to "anon";

grant trigger on table "public"."question_choices" to "anon";

grant truncate on table "public"."question_choices" to "anon";

grant update on table "public"."question_choices" to "anon";

grant delete on table "public"."question_choices" to "authenticated";

grant insert on table "public"."question_choices" to "authenticated";

grant references on table "public"."question_choices" to "authenticated";

grant select on table "public"."question_choices" to "authenticated";

grant trigger on table "public"."question_choices" to "authenticated";

grant truncate on table "public"."question_choices" to "authenticated";

grant update on table "public"."question_choices" to "authenticated";

grant delete on table "public"."question_choices" to "service_role";

grant insert on table "public"."question_choices" to "service_role";

grant references on table "public"."question_choices" to "service_role";

grant select on table "public"."question_choices" to "service_role";

grant trigger on table "public"."question_choices" to "service_role";

grant truncate on table "public"."question_choices" to "service_role";

grant update on table "public"."question_choices" to "service_role";

grant delete on table "public"."questions" to "anon";

grant insert on table "public"."questions" to "anon";

grant references on table "public"."questions" to "anon";

grant select on table "public"."questions" to "anon";

grant trigger on table "public"."questions" to "anon";

grant truncate on table "public"."questions" to "anon";

grant update on table "public"."questions" to "anon";

grant delete on table "public"."questions" to "authenticated";

grant insert on table "public"."questions" to "authenticated";

grant references on table "public"."questions" to "authenticated";

grant select on table "public"."questions" to "authenticated";

grant trigger on table "public"."questions" to "authenticated";

grant truncate on table "public"."questions" to "authenticated";

grant update on table "public"."questions" to "authenticated";

grant delete on table "public"."questions" to "service_role";

grant insert on table "public"."questions" to "service_role";

grant references on table "public"."questions" to "service_role";

grant select on table "public"."questions" to "service_role";

grant trigger on table "public"."questions" to "service_role";

grant truncate on table "public"."questions" to "service_role";

grant update on table "public"."questions" to "service_role";

grant delete on table "public"."sections" to "anon";

grant insert on table "public"."sections" to "anon";

grant references on table "public"."sections" to "anon";

grant select on table "public"."sections" to "anon";

grant trigger on table "public"."sections" to "anon";

grant truncate on table "public"."sections" to "anon";

grant update on table "public"."sections" to "anon";

grant delete on table "public"."sections" to "authenticated";

grant insert on table "public"."sections" to "authenticated";

grant references on table "public"."sections" to "authenticated";

grant select on table "public"."sections" to "authenticated";

grant trigger on table "public"."sections" to "authenticated";

grant truncate on table "public"."sections" to "authenticated";

grant update on table "public"."sections" to "authenticated";

grant delete on table "public"."sections" to "service_role";

grant insert on table "public"."sections" to "service_role";

grant references on table "public"."sections" to "service_role";

grant select on table "public"."sections" to "service_role";

grant trigger on table "public"."sections" to "service_role";

grant truncate on table "public"."sections" to "service_role";

grant update on table "public"."sections" to "service_role";


