import React from "react";
import { ArrowLeft } from "lucide-react";

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-8">Last Updated: April 2026</p>

          <h2>1. Information We Collect</h2>
          <p>
            When you use SpendSense AI, we collect information you provide directly to us, such as when you create an 
            account, connect your bank via our integration partners, or interact with Stocrates. This includes account 
            identifiers, read-only transaction metadata, and anonymized interaction logs with the AI assistant.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our Service. Specifically, to render 
            your financial dashboard, generate predictive wealth insights, and power the contextual responses of the 
            Stocrates AI coach. We do not sell your personal data or your transaction history to third-party data brokers.
          </p>

          <h2>3. Generative AI Data Processing</h2>
          <p>
            In order to provide personalized financial guidance, portions of your financial metadata (such as category 
            totals and anonymized balances) are sent to our language model partners (e.g., Featherless AI / DeepSeek) 
            during chat sessions. We have strict data processing agreements ensuring your data is <strong>never</strong> 
            used to train their public models.
          </p>

          <h2>4. Data Retention and Deletion</h2>
          <p>
            You retain the right to be forgotten. If you delete your SpendSense AI account, all of your associated 
            banking connections will be revoked immediately. Your account profile, tracked transactions, Piggy Banks, 
            and chat history will be permanently deleted from our active MongoDB instances within 7 days.
          </p>
        </article>
      </div>
    </div>
  );
}
