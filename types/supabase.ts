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
      form_results: {
        Row: {
          answer: string | null
          form_id: string | null
          id: string
          question_id: string | null
          submission_timestamp: string | null
          user_id: string | null
          user_key: string | null
        }
        Insert: {
          answer?: string | null
          form_id?: string | null
          id?: string
          question_id?: string | null
          submission_timestamp?: string | null
          user_id?: string | null
          user_key?: string | null
        }
        Update: {
          answer?: string | null
          form_id?: string | null
          id?: string
          question_id?: string | null
          submission_timestamp?: string | null
          user_id?: string | null
          user_key?: string | null
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

