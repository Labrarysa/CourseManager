alter table "public"."form_results" drop constraint "chk_user_presence";

alter table "public"."form_results" drop constraint "form_results_form_id_fkey";

alter table "public"."form_results" drop constraint "form_results_question_id_fkey";

alter table "public"."question_choices" drop constraint "question_choices_question_id_fkey";

alter table "public"."questions" drop constraint "questions_section_id_fkey";

alter table "public"."sections" drop constraint "sections_form_id_fkey";

create table "public"."circles" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying(255) not null,
    "description" text,
    "next_circle_id" uuid
);


create table "public"."groups" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying(255) not null,
    "max_students" integer,
    "year" integer not null,
    "circle_id" uuid,
    "teacher_id" uuid,
    "group_name" character varying(255)
);


create table "public"."parents" (
    "id" uuid not null default uuid_generate_v4(),
    "full_name" character varying(255) not null,
    "phone_number" character varying(255) not null
);


create table "public"."students" (
    "id" uuid not null default uuid_generate_v4(),
    "first_name" character varying(255) not null,
    "father_name" character varying(255) not null,
    "grandfather_name" character varying(255) not null,
    "last_name" character varying(255) not null,
    "phone_number" character varying(255),
    "student_key" text,
    "parent_id" uuid
);


create table "public"."teachers" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying(255) not null,
    "mobile_number" character varying(255) not null
);


alter table "public"."form_results" drop column "non_user_id";

alter table "public"."form_results" drop column "user_answer";

alter table "public"."form_results" add column "answer" text;

alter table "public"."form_results" add column "user_key" text;

CREATE UNIQUE INDEX circles_pkey ON public.circles USING btree (id);

CREATE UNIQUE INDEX groups_pkey ON public.groups USING btree (id);

CREATE UNIQUE INDEX parents_pkey ON public.parents USING btree (id);

CREATE UNIQUE INDEX students_pkey ON public.students USING btree (id);

CREATE UNIQUE INDEX teachers_pkey ON public.teachers USING btree (id);

alter table "public"."circles" add constraint "circles_pkey" PRIMARY KEY using index "circles_pkey";

alter table "public"."groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."parents" add constraint "parents_pkey" PRIMARY KEY using index "parents_pkey";

alter table "public"."students" add constraint "students_pkey" PRIMARY KEY using index "students_pkey";

alter table "public"."teachers" add constraint "teachers_pkey" PRIMARY KEY using index "teachers_pkey";

alter table "public"."circles" add constraint "circles_next_circle_id_fkey" FOREIGN KEY (next_circle_id) REFERENCES circles(id) not valid;

alter table "public"."circles" validate constraint "circles_next_circle_id_fkey";

alter table "public"."groups" add constraint "groups_circle_id_fkey" FOREIGN KEY (circle_id) REFERENCES circles(id) not valid;

alter table "public"."groups" validate constraint "groups_circle_id_fkey";

alter table "public"."groups" add constraint "groups_teacher_id_fkey" FOREIGN KEY (teacher_id) REFERENCES teachers(id) not valid;

alter table "public"."groups" validate constraint "groups_teacher_id_fkey";

alter table "public"."students" add constraint "students_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES parents(id) not valid;

alter table "public"."students" validate constraint "students_parent_id_fkey";

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

grant delete on table "public"."circles" to "anon";

grant insert on table "public"."circles" to "anon";

grant references on table "public"."circles" to "anon";

grant select on table "public"."circles" to "anon";

grant trigger on table "public"."circles" to "anon";

grant truncate on table "public"."circles" to "anon";

grant update on table "public"."circles" to "anon";

grant delete on table "public"."circles" to "authenticated";

grant insert on table "public"."circles" to "authenticated";

grant references on table "public"."circles" to "authenticated";

grant select on table "public"."circles" to "authenticated";

grant trigger on table "public"."circles" to "authenticated";

grant truncate on table "public"."circles" to "authenticated";

grant update on table "public"."circles" to "authenticated";

grant delete on table "public"."circles" to "service_role";

grant insert on table "public"."circles" to "service_role";

grant references on table "public"."circles" to "service_role";

grant select on table "public"."circles" to "service_role";

grant trigger on table "public"."circles" to "service_role";

grant truncate on table "public"."circles" to "service_role";

grant update on table "public"."circles" to "service_role";

grant delete on table "public"."groups" to "anon";

grant insert on table "public"."groups" to "anon";

grant references on table "public"."groups" to "anon";

grant select on table "public"."groups" to "anon";

grant trigger on table "public"."groups" to "anon";

grant truncate on table "public"."groups" to "anon";

grant update on table "public"."groups" to "anon";

grant delete on table "public"."groups" to "authenticated";

grant insert on table "public"."groups" to "authenticated";

grant references on table "public"."groups" to "authenticated";

grant select on table "public"."groups" to "authenticated";

grant trigger on table "public"."groups" to "authenticated";

grant truncate on table "public"."groups" to "authenticated";

grant update on table "public"."groups" to "authenticated";

grant delete on table "public"."groups" to "service_role";

grant insert on table "public"."groups" to "service_role";

grant references on table "public"."groups" to "service_role";

grant select on table "public"."groups" to "service_role";

grant trigger on table "public"."groups" to "service_role";

grant truncate on table "public"."groups" to "service_role";

grant update on table "public"."groups" to "service_role";

grant delete on table "public"."parents" to "anon";

grant insert on table "public"."parents" to "anon";

grant references on table "public"."parents" to "anon";

grant select on table "public"."parents" to "anon";

grant trigger on table "public"."parents" to "anon";

grant truncate on table "public"."parents" to "anon";

grant update on table "public"."parents" to "anon";

grant delete on table "public"."parents" to "authenticated";

grant insert on table "public"."parents" to "authenticated";

grant references on table "public"."parents" to "authenticated";

grant select on table "public"."parents" to "authenticated";

grant trigger on table "public"."parents" to "authenticated";

grant truncate on table "public"."parents" to "authenticated";

grant update on table "public"."parents" to "authenticated";

grant delete on table "public"."parents" to "service_role";

grant insert on table "public"."parents" to "service_role";

grant references on table "public"."parents" to "service_role";

grant select on table "public"."parents" to "service_role";

grant trigger on table "public"."parents" to "service_role";

grant truncate on table "public"."parents" to "service_role";

grant update on table "public"."parents" to "service_role";

grant delete on table "public"."students" to "anon";

grant insert on table "public"."students" to "anon";

grant references on table "public"."students" to "anon";

grant select on table "public"."students" to "anon";

grant trigger on table "public"."students" to "anon";

grant truncate on table "public"."students" to "anon";

grant update on table "public"."students" to "anon";

grant delete on table "public"."students" to "authenticated";

grant insert on table "public"."students" to "authenticated";

grant references on table "public"."students" to "authenticated";

grant select on table "public"."students" to "authenticated";

grant trigger on table "public"."students" to "authenticated";

grant truncate on table "public"."students" to "authenticated";

grant update on table "public"."students" to "authenticated";

grant delete on table "public"."students" to "service_role";

grant insert on table "public"."students" to "service_role";

grant references on table "public"."students" to "service_role";

grant select on table "public"."students" to "service_role";

grant trigger on table "public"."students" to "service_role";

grant truncate on table "public"."students" to "service_role";

grant update on table "public"."students" to "service_role";

grant delete on table "public"."teachers" to "anon";

grant insert on table "public"."teachers" to "anon";

grant references on table "public"."teachers" to "anon";

grant select on table "public"."teachers" to "anon";

grant trigger on table "public"."teachers" to "anon";

grant truncate on table "public"."teachers" to "anon";

grant update on table "public"."teachers" to "anon";

grant delete on table "public"."teachers" to "authenticated";

grant insert on table "public"."teachers" to "authenticated";

grant references on table "public"."teachers" to "authenticated";

grant select on table "public"."teachers" to "authenticated";

grant trigger on table "public"."teachers" to "authenticated";

grant truncate on table "public"."teachers" to "authenticated";

grant update on table "public"."teachers" to "authenticated";

grant delete on table "public"."teachers" to "service_role";

grant insert on table "public"."teachers" to "service_role";

grant references on table "public"."teachers" to "service_role";

grant select on table "public"."teachers" to "service_role";

grant trigger on table "public"."teachers" to "service_role";

grant truncate on table "public"."teachers" to "service_role";

grant update on table "public"."teachers" to "service_role";


