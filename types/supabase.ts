export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      circles: {
        Row: {
          description: string | null
          id: string
          name: string
          next_circle_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          next_circle_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          next_circle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "circles_next_circle_id_fkey"
            columns: ["next_circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          }
        ]
      }
      form_results: {
        Row: {
          answer: string | null
          form_id: string | null
          id: string
          question_id: string | null
          student_key: string | null
          submission_timestamp: string | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          form_id?: string | null
          id?: string
          question_id?: string | null
          student_key?: string | null
          submission_timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          form_id?: string | null
          id?: string
          question_id?: string | null
          student_key?: string | null
          submission_timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_results_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_results_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      forms: {
        Row: {
          description: string | null
          id: string
          is_quiz: boolean
          title: string
        }
        Insert: {
          description?: string | null
          id?: string
          is_quiz?: boolean
          title: string
        }
        Update: {
          description?: string | null
          id?: string
          is_quiz?: boolean
          title?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          circle_id: string | null
          group_name: string | null
          id: string
          max_students: number | null
          name: string
          teacher_id: string | null
          year: number
        }
        Insert: {
          circle_id?: string | null
          group_name?: string | null
          id?: string
          max_students?: number | null
          name: string
          teacher_id?: string | null
          year: number
        }
        Update: {
          circle_id?: string | null
          group_name?: string | null
          id?: string
          max_students?: number | null
          name?: string
          teacher_id?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "groups_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          }
        ]
      }
      parents: {
        Row: {
          full_name: string
          id: string
          phone_number: string
        }
        Insert: {
          full_name: string
          id?: string
          phone_number: string
        }
        Update: {
          full_name?: string
          id?: string
          phone_number?: string
        }
        Relationships: []
      }
      question_choices: {
        Row: {
          choice_text: string
          id: string
          question_id: string | null
        }
        Insert: {
          choice_text: string
          id?: string
          question_id?: string | null
        }
        Update: {
          choice_text?: string
          id?: string
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_choices_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          correct_answer_id: string | null
          id: string
          metadata: Json | null
          question_text: string
          section_id: string | null
          type: string
        }
        Insert: {
          correct_answer_id?: string | null
          id?: string
          metadata?: Json | null
          question_text: string
          section_id?: string | null
          type: string
        }
        Update: {
          correct_answer_id?: string | null
          id?: string
          metadata?: Json | null
          question_text?: string
          section_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_correct_answer"
            columns: ["correct_answer_id"]
            isOneToOne: false
            referencedRelation: "question_choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          }
        ]
      }
      sections: {
        Row: {
          description: string | null
          form_id: string | null
          id: string
          title: string
        }
        Insert: {
          description?: string | null
          form_id?: string | null
          id?: string
          title: string
        }
        Update: {
          description?: string | null
          form_id?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          }
        ]
      }
      student_groups: {
        Row: {
          group_id: string | null
          id: string
          student_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          student_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_groups_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          father_name: string
          first_name: string
          grandfather_name: string
          id: string
          last_name: string
          parent_id: string | null
          phone_number: string | null
          student_key: string | null
        }
        Insert: {
          father_name: string
          first_name: string
          grandfather_name: string
          id?: string
          last_name: string
          parent_id?: string | null
          phone_number?: string | null
          student_key?: string | null
        }
        Update: {
          father_name?: string
          first_name?: string
          grandfather_name?: string
          id?: string
          last_name?: string
          parent_id?: string | null
          phone_number?: string | null
          student_key?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          }
        ]
      }
      teachers: {
        Row: {
          id: string
          mobile_number: string
          name: string
        }
        Insert: {
          id?: string
          mobile_number: string
          name: string
        }
        Update: {
          id?: string
          mobile_number?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_form_questions: {
        Args: {
          form_uuid: string
        }
        Returns: Json
      }
      get_user_form_results: {
        Args: {
          form_uuid: string
          user_uuid: string
          non_user_id: number
        }
        Returns: {
          result_id: string
          question_id: string
          question_text: string
          user_answer: string
          submission_timestamp: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

