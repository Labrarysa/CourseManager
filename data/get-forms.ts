import { useQuery } from "@tanstack/react-query"

export function useGetForms() {
  return useQuery({
    // queryFn: async () => fetchForms(),
    queryKey: ["forms"],
  })
}