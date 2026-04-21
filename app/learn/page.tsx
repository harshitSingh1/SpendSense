import LearnView from "@/components/LearnView";
import { educationalArticles } from "@/lib/data/education";

export default function LearnPage() {
  return <LearnView articles={educationalArticles} />;
}
