export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export const ACADEMY_ARTICLES: Article[] = [
  {
    slug: "the-50-30-20-rule-explained",
    title: "The 50/30/20 Rule: Your Blueprint for Balance",
    category: "Budgeting",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Learn the most famous rule in personal finance. Discover how to partition your income between needs, wants, and your future self.",
    content: `
      <h2>Introduction to Balanced Budgeting</h2>
      <p>The 50/30/20 rule is a simple yet effective guideline for managing your after-tax income. It was popularized by Senator Elizabeth Warren and her daughter, Amelia Warren Tyagi, in their book, <i>All Your Worth: The Ultimate Lifetime Money Plan</i>.</p>
      
      <h3>The Breakdown</h3>
      <ul>
        <li><strong>50% for Needs:</strong> These are your non-negotiables. Housing, utilities, groceries, insurance, and minimum debt payments. If it would significantly disrupt your life or health to stop paying it, it's a need.</li>
        <li><strong>30% for Wants:</strong> This is your lifestyle capital. Dining out, subscriptions (Netflix/Spotify), hobbies, and upgrades. These are things you enjoy but could survive without in an emergency.</li>
        <li><strong>20% for Savings & Debt:</strong> This is your future capital. Contributions to your emergency fund, retirement accounts, or extra payments towards principal debt.</li>
      </ul>

      <blockquote>"Budgeting isn't about restriction; it's about intentionality."</blockquote>

      <h3>Why it Works</h3>
      <p>Most budgets fail because they are too restrictive. The 50/30/20 rule acknowledges that humans need to enjoy their lives (the 30%) while ensuring that their future security (the 20%) is prioritized alongside their survival (the 50%).</p>
      
      <p><strong>Pro-Tip:</strong> Use SpendSense AI to automatically categorize your transactions into these three buckets to see where you stand in real-time.</p>
    `
  },
  {
    slug: "why-inflation-is-stealing-your-money",
    title: "Why Inflation is Stealing Your Money",
    category: "Market Analysis",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1611974714024-46077579162e?auto=format&fit=crop&q=80&w=800",
    excerpt: "Understand the silent tax. Why keeping all your money in a savings account might be making you poorer every year.",
    content: `
      <h2>The Silent Eraser of Wealth</h2>
      <p>Inflation is the rate at which the general level of prices for goods and services is rising. While a small amount of inflation (around 2%) is considered signs of a healthy economy, it acts as a silent tax on your cash savings.</p>
      
      <h3>The Purchasing Power Trap</h3>
      <p>Imagine you have ₹1,00,000 in a standard savings account earning 3% interest. If inflation is at 6%, your money's "real value" (what it can actually buy) is decreasing by 3% every year. In 10 years, that same ₹1,00,000 will buy significantly less than it does today.</p>

      <h3>How to Fight Back</h3>
      <p>To preserve wealth, you must outpace inflation. This typically means moving "Defensive Capital" (cash) into "Growth Capital" (assets like equities, real estate, or inflation-indexed bonds).</p>

      <div class="my-8 p-6 bg-muted rounded-2xl">
        <h4 class="font-bold mb-2">Historical Context</h4>
        <p class="text-sm italic">In the last 40 years, the global supply of fiat currency has expanded exponentially. Those who held only cash saw their purchasing power collapse, while asset holders saw their nominal wealth explode.</p>
      </div>

      <p>At SpendSense, we help you monitor the "Real Yield" of your portfolio—ensuring you're actually getting richer, not just seeing larger numbers in your bank account.</p>
    `
  },
  {
    slug: "term-life-vs-health-insurance",
    title: "Term Life vs. Health Insurance: What You Need First",
    category: "Protection",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    excerpt: "Before you build wealth, you must build walls. We break down which insurance products are non-negotiable for your unique stage of life.",
    content: `
      <h2>Defense Before Offense</h2>
      <p>In the SpendSense philosophy, we believe in "Shielding" before "Growing." Two essential shields are Health Insurance and Term Life Insurance.</p>
      
      <h3>1. Health Insurance (The Immediate Shield)</h3>
      <p>A single medical emergency can wipe out years of disciplined savings. Health insurance is your primary defense against bankruptcy. Regardless of your age or income, this is Step 0.</p>

      <h3>2. Term Life Insurance (The Legacy Shield)</h3>
      <p>If anyone depends on your income (parents, spouse, children), you need Term Life insurance. It ensures that your dependents can maintain their lifestyle if you are no longer there to provide for them.</p>

      <div class="space-y-4 my-8">
        <div class="p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-xl">
          <p class="text-sm font-bold">Standard Recommendation</p>
          <p class="text-xs italic">Cover 10x to 15x of your annual income in Term Life insurance.</p>
        </div>
      </div>

      <h3>Why Term and not 'Investment-Linked'?</h3>
      <p>We recommend Pure Term Life. It is cheap and provides the highest coverage. Avoid "Endowment" or "Money-back" plans that mix insurance with low-yield investments. Keep your protection and your growth separate.</p>
    `
  },
  {
    slug: "index-funds-guaranteed-way-to-wealth",
    title: "Index Funds: The Slow, Guaranteed Way to Wealth",
    category: "Wealth Hub",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Stop trying to beat the market and start owning it. Discover why low-cost index funds are the ultimate tool for 99% of investors.",
    content: `
      <h2>Owning the Machine</h2>
      <p>An index fund is a type of mutual fund or exchange-traded fund (ETF) with a portfolio constructed to match or track the components of a financial market index, such as the Nifty 50 or S&P 500.</p>
      
      <h3>The Power of Passive Investing</h3>
      <p>Most active fund managers fail to beat the market index over the long term. By buying an index fund, you aren't betting on one company; you are betting on the collective growth of the top companies in the economy.</p>

      <h3>Key Advantages</h3>
      <ul>
        <li><strong>Low Cost:</strong> Fees (expense ratios) are significantly lower than active funds.</li>
        <li><strong>Diversification:</strong> You instantly own hundreds of the best companies.</li>
        <li><strong>Consistency:</strong> No human error or emotional trading involved.</li>
      </ul>

      <blockquote>"The index fund is the most effective investment device ever created for the individual investor." — Warren Buffett</blockquote>

      <p>The goal is time <i>in</i> the market, not <i>timing</i> the market. Start your Pulse Accumulator today in the Wealth Hub using low-cost index funds.</p>
    `
  }
];
