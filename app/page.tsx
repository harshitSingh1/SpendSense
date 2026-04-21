import LandingPage from "@/components/LandingPage";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return <LandingPage session={session} />;
}
