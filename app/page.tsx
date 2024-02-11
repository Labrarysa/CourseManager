import RegistrationForm from "@/components/registration-form";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  const formId = "1"; // This should be the ID of the form we want to fetch

  // Prefetch the form structure data
  await queryClient.prefetchQuery({
    queryKey: ["form", formId],
    queryFn: () => {
      // This function should call the API endpoint or static file that returns the form structure
    },
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RegistrationForm formId={formId} />
      </HydrationBoundary>
    </main>
  );
}
