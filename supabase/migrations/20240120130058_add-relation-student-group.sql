create table "public"."student_groups" (
    "id" uuid not null default uuid_generate_v4(),
    "student_id" uuid,
    "group_id" uuid
);


CREATE UNIQUE INDEX student_groups_pkey ON public.student_groups USING btree (id);

CREATE UNIQUE INDEX student_groups_student_id_group_id_key ON public.student_groups USING btree (student_id, group_id);

alter table "public"."student_groups" add constraint "student_groups_pkey" PRIMARY KEY using index "student_groups_pkey";

alter table "public"."student_groups" add constraint "student_groups_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) not valid;

alter table "public"."student_groups" validate constraint "student_groups_group_id_fkey";

alter table "public"."student_groups" add constraint "student_groups_student_id_fkey" FOREIGN KEY (student_id) REFERENCES students(id) not valid;

alter table "public"."student_groups" validate constraint "student_groups_student_id_fkey";

alter table "public"."student_groups" add constraint "student_groups_student_id_group_id_key" UNIQUE using index "student_groups_student_id_group_id_key";

grant delete on table "public"."student_groups" to "anon";

grant insert on table "public"."student_groups" to "anon";

grant references on table "public"."student_groups" to "anon";

grant select on table "public"."student_groups" to "anon";

grant trigger on table "public"."student_groups" to "anon";

grant truncate on table "public"."student_groups" to "anon";

grant update on table "public"."student_groups" to "anon";

grant delete on table "public"."student_groups" to "authenticated";

grant insert on table "public"."student_groups" to "authenticated";

grant references on table "public"."student_groups" to "authenticated";

grant select on table "public"."student_groups" to "authenticated";

grant trigger on table "public"."student_groups" to "authenticated";

grant truncate on table "public"."student_groups" to "authenticated";

grant update on table "public"."student_groups" to "authenticated";

grant delete on table "public"."student_groups" to "service_role";

grant insert on table "public"."student_groups" to "service_role";

grant references on table "public"."student_groups" to "service_role";

grant select on table "public"."student_groups" to "service_role";

grant trigger on table "public"."student_groups" to "service_role";

grant truncate on table "public"."student_groups" to "service_role";

grant update on table "public"."student_groups" to "service_role";


