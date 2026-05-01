import React from "react";
import { ArrowLeft } from "lucide-react";

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-8">Last Updated: April 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using SpendSense AI (the "Service"), you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, then you may not access the Service. These terms constitute 
            a legally binding agreement between you and SpendSense AI.
          </p>

          <h2>2. Data Usage and Plaid/API Connectors</h2>
          <p>
            Our Service strictly uses institutional-grade APIs (such as Plaid or Account Aggregator modes) to retrieve 
            transaction data in a read-only format. SpendSense AI does not have the ability to move funds, initiate 
            transfers, or modify your banking data. Your credentials are never stored directly on our servers.
          </p>

          <h2>3. AI and Stocrates Disclaimer</h2>
          <p>
            The "Stocrates" AI Assistant provides educational insights and data-driven analysis based on your synced 
            transactions. <strong>SpendSense AI is not a registered financial advisor or fiduciary.</strong> All 
            analysis, projections, and recommendations are for informational purposes only. You are solely responsible 
            for any investment or financial decisions you make.
          </p>

          <h2>4. Subscriptions and Account Termination</h2>
          <p>
            "SpendSense Pro" subscriptions are billed in advance on a monthly or annual basis. You may cancel your 
            subscription at any time through your account settings. Upon termination of your account, all personally 
            identifiable information will be queued for permanent deletion in accordance with our Privacy Policy.
          </p>
        </article>
      </div>
    </div>
  );
}
