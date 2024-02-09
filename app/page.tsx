import RegistrationForm from "@/components/registration-form";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";


export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["forms"],
    // queryFn: fetchPosts,
  });
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RegistrationForm />
      </HydrationBoundary>
    </main>

