"use client";


import { useQuery } from '@tanstack/react-query';

interface Question {
  questionId: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface Section {
  sectionId: string;
  title: string;
  questions: Question[];
}

interface FormStructure {
  formId: string;
  sections: Section[];
}

export function useFetchFormStructure(formId: string) {
  return useQuery<FormStructure>({
    queryKey: ['form', formId],
    queryFn: async () => {
      const response = await fetch(`/api/forms/${formId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
}




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