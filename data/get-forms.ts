"use client";


import { useQuery } from '@tanstack/react-query';

interface Question {
  id: string; // Matches question id in the database
  question_text: string; // This is the label of the question
  type: string; // You have this already
  metadata: {
    placeholder?: string; // Assuming placeholder is part of metadata
    required?: boolean; // Same as above
  };

}

interface Section {
  id: string; // Matches section id in the database
  title: string; // Matches title in sections
  description?: string; // Matches description in sections if needed
  questions: Question[]; // An array of questions
}

interface FormStructure {
  id: string; // Matches form id in the database
  title: string; // Matches title in forms
  description?: string; // Matches description in forms
  is_quiz?: boolean; // Matches is_quiz in forms if needed
  sections: Section[]; // An array of sections
}


export function useFetchFormStructure(formId: string) {
  return useQuery<FormStructure>({
    queryKey: ['form', formId],
    queryFn: async () => {
      const response = await fetch(`/api/forms/${formId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
    
      // Transform the data to match the FormStructure interface
      // This transformation will depend on how our API formats the response
      const formStructure: FormStructure = {
        id: data.id,
        title: data.title,
        description: data.description,
        is_quiz: data.is_quiz,
        sections: data.sections.map((section: any) => ({
          id: section.id,
          title: section.title,
          description: section.description,
          questions: section.questions.map((question: any) => ({
            id: question.id,
            question_text: question.question_text,
            type: question.type,
            metadata: question.metadata,
          })),
        })),
      };
    
      return formStructure;
    },
}
  )}




// export function useGetForms() {
//   return useQuery<Form[]>({
//     queryKey: ['forms'],
//     queryFn: async () => {
//       const response = await fetch('/api/forms');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     },
//   });
// }