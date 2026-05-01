import React, { useState } from "react";
import { ArrowLeft, Mail, Building2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted");
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        {/* Hero Section */}
        <div className="mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground font-medium">
            Have a question about SpendSense Pro or need support? We are here to help.
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-indigo-500" />
                General Support
              </h2>
              <p className="text-muted-foreground mb-4">
                For account issues, billing questions, or bug reports, please email us directly. 
                Our team typically responds within 24 hours.
              </p>
              <a href="mailto:support@spendsense.ai" className="text-lg font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                support@spendsense.ai
              </a>
            </div>

            <div className="h-px bg-border"></div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3 mb-4">
                <Building2 className="h-6 w-6 text-emerald-500" />
                Enterprise Inquiries & Partnerships
              </h2>
              <p className="text-muted-foreground mb-4">
                Interested in bringing SpendSense AI's predictive wealth engine to your organization? 
                Let's discuss institutional API access and white-labeling options.
              </p>
              <a href="mailto:partners@spendsense.ai" className="text-lg font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                partners@spendsense.ai
              </a>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div>
            <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 pointer-events-none"></div>
              <CardContent className="p-8 relative">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                    <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">Message Sent!</h3>
                    <p className="text-muted-foreground font-medium">
                      We've received your inquiry and will reply within 24 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6 font-bold"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          required
                          className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium" 
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          required
                          className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium" 
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                      <select 
                        id="subject"
                        required
                        className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium"
                      >
                        <option value="" disabled selected>Select a topic...</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing & Pro Subscription</option>
                        <option value="feedback">Product Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                      <textarea 
                        id="message" 
                        required
                        className="flex min-h-[120px] w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium resize-y" 
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 pr-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
