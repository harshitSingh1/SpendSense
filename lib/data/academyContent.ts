import { ReactNode } from "react";

export type ContentSection = 
  | { type: 'header'; text: string; level: 2 | 3 }
  | { type: 'paragraph'; text: string }
  | { type: 'blockquote'; text: string; author?: string }
  | { type: 'takeaways'; items: string[] };

export interface DetailedArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  sections: ContentSection[];
}

export const DETAILED_ACADEMY_ARTICLES: DetailedArticle[] = [
  {
    slug: "why-inflation-is-stealing-your-money",
    title: "The Silent Thief: Defeating Inflation",
    category: "Economics",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1611974714024-46077579162e?auto=format&fit=crop&q=80&w=800",
    excerpt: "Understand the silent tax. Why keeping all your money in a savings account might be making you poorer every year.",
    sections: [
      { type: 'header', level: 2, text: "The Illusion of Safety" },
      { type: 'paragraph', text: "For generations, the fundamental advice passed down from parents to children was simple: work hard, earn money, and put it in a safe bank account. The paradigm was built on the assumption that a unit of currency today would hold relatively the same purchasing power tomorrow. However, in the modern macroeconomic environment, this advice is not just outdated—it is mathematically destructive to your wealth." },
      { type: 'paragraph', text: "Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. While a small amount of inflation (around 2-3%) is targeted by central banks to stimulate spending and economic growth, it acts as a silent, compounding tax on any capital that isn't growing at an equal or faster rate." },
      { type: 'blockquote', text: "Inflation is taxation without legislation.", author: "Milton Friedman" },
      { type: 'header', level: 3, text: "The Purchasing Power Trap" },
      { type: 'paragraph', text: "Let’s look at the mathematics. Imagine you have ₹10,00,000 sitting in a standard savings account yielding a nominal interest rate of 3%. If the true rate of inflation—the actual increase in the cost of housing, food, energy, and healthcare—is tracking at 6%, your capital is effectively melting. Your 'Real Yield' (Nominal Yield minus Inflation) is negative 3%." },
      { type: 'paragraph', text: "While your bank statement might show your balance slowly creeping up, the volume of assets those digits can procure is collapsing. After 10 years in this environment, you haven't just 'failed to grow' your wealth; you have actively lost roughly a third of your purchasing power, despite saving diligently." },
      { type: 'header', level: 3, text: "Escaping the Trap: The Transition to Hard Assets" },
      { type: 'paragraph', text: "Recognizing the problem is the first step. The second is structural reallocation. Cash should be viewed as temporary ammunition or a defensive emergency shield, not a long-term store of value. To protect your purchasing power, you must transition your surplus capital from fiat currency into assets that historically appreciate in an inflationary environment." },
      { type: 'takeaways', items: [
        "Cash is not a risk-free asset; its guaranteed risk is the loss of purchasing power.",
        "Your 'Real Yield' is the only metric that matters (Nominal Return - Inflation Rate).",
        "Invest in assets like broad-market index funds, real estate, and strong equities to outpace inflation.",
        "Maintain only enough cash for your 3-6 month emergency runway; deploy the rest."
      ]}
    ]
  },
  {
    slug: "term-life-vs-health-insurance",
    title: "The Armor: Advanced Liability Protection",
    category: "Risk Management",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    excerpt: "Before you build wealth, you must build walls. We break down which insurance products are non-negotiable for your unique stage of life.",
    sections: [
      { type: 'header', level: 2, text: "Defense Before Offense" },
      { type: 'paragraph', text: "In the pursuit of financial independence, offense gets all the glory. We celebrate high returns, compound interest, and explosive portfolio growth. But without a resilient defense, offense is irrelevant. A single, catastrophic systemic shock—a critical medical diagnosis or an unexpected loss of life—can obliterate decades of disciplined compounding in a matter of days." },
      { type: 'paragraph', text: "Insurance is not an investment. It is the tactical transfer of catastrophic risk. You are paying a premium to a massive institution to assume a liability that would otherwise bankrupt you. In the SpendSense architecture, this is known as building 'The Armor' around your core capital." },
      { type: 'header', level: 3, text: "Base Layer: Comprehensive Health Insurance" },
      { type: 'paragraph', text: "Medical inflation historically outpaces general inflation globally. A corporate health cover is not sufficient—it disappears the moment you change jobs, get laid off, or choose to start a business. You must secure an independent, comprehensive base health insurance policy early in life before pre-existing conditions narrow your options." },
      { type: 'blockquote', text: "Your portfolio returns mean nothing if they must be liquidated at the bottom of a market cycle to pay a hospital bill." },
      { type: 'header', level: 3, text: "Structural Layer: Pure Term Life Insurance" },
      { type: 'paragraph', text: "If you have dependents—parents relying on your income, a spouse, or children—Term Life Insurance is a moral and financial non-negotiable. Its purpose is singular: to instantly replace the economic value of your future labor if you die prematurely." },
      { type: 'paragraph', text: "The golden rule of insurance: keep insurance and investments strictly separated. Avoid 'Endowment', 'ULIP', or 'Money-Back' policies that promise to return your premiums with growth. They are mathematically inefficient, offering both terrible insurance coverage and terrible investment returns. Buy 'Pure Term' insurance for maximum coverage at minimum cost, and invest the difference in low-cost index funds." },
      { type: 'takeaways', items: [
        "Never rely solely on employer-provided health insurance.",
        "Secure early, independent health coverage to lock in insurability.",
        "If someone depends on your income, Pure Term Life Insurance is mandatory.",
        "Target coverage equal to 15x-20x your annual income.",
        "Never mix insurance with investments. Buy term, invest the rest."
      ]}
    ]
  },
  {
    slug: "index-funds-guaranteed-way-to-wealth",
    title: "The Engine: Index Fund Mastery",
    category: "Investing",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Stop trying to beat the market and start owning it. Discover why low-cost index funds are the ultimate tool for 99% of investors.",
    sections: [
      { type: 'header', level: 2, text: "Owning the Machine" },
      { type: 'paragraph', text: "The allure of stock picking is powerful. It appeals to human ego—the belief that through sheer intelligence and research, one can outsmart the collective wisdom of millions of market participants and supercomputers. The reality, backed by decades of empirical data, is humbling: the vast majority of active fund managers and retail investors fail to consistently beat the market over a 10-year horizon." },
      { type: 'paragraph', text: "If you cannot beat the market, the mathematically optimal strategy is to simply *be* the market. Enter the Index Fund." },
      { type: 'header', level: 3, text: "The Mechanics of Inevitable Growth" },
      { type: 'paragraph', text: "An index fund (or ETF tracking an index) is a basket of equities constructed to mirror a specific financial market index, such as the Nifty 50 or S&P 500. When you buy a share of an S&P 500 index fund, you instantly become a fractional owner of the 500 largest, most profitable companies in the United States." },
      { type: 'paragraph', text: "It is a self-cleansing system. If a company fails, it drops out of the index and is replaced by a rising star. You never have to read an annual report, analyze a balance sheet, or panic when a CEO resigns. You are betting on the fundamental trajectory of human progress and corporate capitalism." },
      { type: 'blockquote', text: "Don't look for the needle in the haystack. Just buy the haystack.", author: "John C. Bogle" },
      { type: 'header', level: 3, text: "The Asymmetric Advantage of Low Fees" },
      { type: 'paragraph', text: "Because index funds are passively managed by algorithms, they cost a fraction of what 'actively managed' mutual funds charge. A 1% difference in expense ratio might sound trivial, but compounded over 30 years, it can consume nearly 30% of your total potential end wealth. Securing a low-cost, broad-market index fund is the single most asymmetric decision you can make for your long-term capital." },
      { type: 'takeaways', items: [
        "Active trading is a zero-sum game most humans lose.",
        "Index funds provide instant, low-cost diversification.",
        "The index is self-cleansing; losers are removed, winners rise.",
        "Expense ratios compound over time; ruthlessly minimize them.",
        "Consistency is key: automate your purchase (SIP/DCA) and ignore the noise."
      ]}
    ]
  },
  {
    slug: "the-50-30-20-rule-explained",
    title: "The 50/30/20 Rule: Your Blueprint for Balance",
    category: "Budgeting",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Learn the most famous rule in personal finance. Discover how to partition your income between needs, wants, and your future self.",
    sections: [
      { type: 'header', level: 2, text: "The Physiology of Cash Flow" },
      { type: 'paragraph', text: "A high income is an excellent defense, but without a disciplined system to capture and direct that income, it vanishes into the ether of lifestyle creep. Budgeting often sparks anxiety because traditional models feel like deprivation—a financial diet composed solely of self-denial. The 50/30/20 rule reimagines cash flow not as restriction, but as architectural proportion." },
      { type: 'paragraph', text: "Popularized by Senator Elizabeth Warren in her book 'All Your Worth', the framework divides your after-tax income into three distinct operational buckets." },
      { type: 'header', level: 3, text: "Bucket 1: Needs (50%)" },
      { type: 'paragraph', text: "These are your systemic non-negotiables. If a payment is required to maintain your baseline survival and employment, it is a need. This includes rent or mortgage, base utility bills, minimum loan payments, essential groceries, and critical insurance premiums." },
      { type: 'paragraph', text: "The goal is to engineer your life so these obligations consume no more than 50% of your net income. When your 'Needs' breach 60% or 70%, your system becomes fragile, vulnerable to the slightest macroeconomic shock or emergency." },
      { type: 'header', level: 3, text: "Bucket 2: Wants (30%)" },
      { type: 'paragraph', text: "This is your psychological runway—the capital allocated to lifestyle, experiences, and joy. Dining at high-end restaurants, upgrading to a luxury vehicle, streaming subscriptions, and vacations fall firmly here." },
      { type: 'paragraph', text: "The inclusion of this 30% bucket is what makes the architecture sustainable. By categorically allowing yourself to spend guilt-free on experiences you value, you eliminate the friction and inevitable 'relapse' associated with hyper-restrictive budgets." },
      { type: 'header', level: 3, text: "Bucket 3: Savings & Investments (20%)" },
      { type: 'paragraph', text: "This is your future capital. This 20% must be paid first, ideally automated before it ever touches your primary checking account. It is deployed sequentially: first to build a 6-month liquid emergency shield, next to eliminate high-interest toxic debt, and finally, into long-term compounding machines like Index Funds." },
      { type: 'blockquote', text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett" },
      { type: 'takeaways', items: [
        "Structure is liberation: pre-allocate capital before you spend it.",
        "Keep baseline needs under 50% to maintain financial agility.",
        "Automate the 20% savings bucket first; treat it as an unpayable debt to your future self.",
        "A budget without 'Wants' is unsustainable. Allocate 30% to live without guilt."
      ]}
    ]
  }
];
