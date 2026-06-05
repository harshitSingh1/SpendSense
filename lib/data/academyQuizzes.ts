export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  text: string;
  options: QuizOption[];
  rationale: string;
}

export const ACADEMY_QUIZZES: Record<string, QuizQuestion[]> = {
  "why-inflation-is-stealing-your-money": [
    {
      text: "What is the 'Real Yield' of an investment?",
      options: [
        { text: "The advertised bank interest rate.", isCorrect: false },
        { text: "The Nominal Yield minus the Inflation Rate.", isCorrect: true },
        { text: "The return after paying capital gains tax.", isCorrect: false }
      ],
      rationale: "Real yield accounts for the loss of purchasing power over time. If you earn 6% but inflation is 4%, your real yield is 2%."
    },
    {
      text: "Why is keeping all your money in a savings account dangerous?",
      options: [
        { text: "Banks often go bankrupt and lose your money.", isCorrect: false },
        { text: "It is mathematically guaranteed to lose purchasing power.", isCorrect: true },
        { text: "You have to pay high management fees.", isCorrect: false }
      ],
      rationale: "Most savings accounts yield less than the actual rate of inflation, meaning your money buys less over time."
    },
    {
      text: "How should cash be viewed in an inflationary environment?",
      options: [
        { text: "As the safest long-term investment.", isCorrect: false },
        { text: "As a highly appreciating asset.", isCorrect: false },
        { text: "As temporary ammunition or an emergency shield.", isCorrect: true }
      ],
      rationale: "Cash is terrible at holding value over decades but is necessary for short-term liquidity and emergencies."
    },
    {
      text: "Which of these is a typical hedge against inflation?",
      options: [
        { text: "Broad-market Index Funds.", isCorrect: true },
        { text: "A 5-year Fixed Deposit.", isCorrect: false },
        { text: "Keeping physical cash under your mattress.", isCorrect: false }
      ],
      rationale: "Equities and real estate historically outpace inflation over long horizons, while fixed cash returns do not."
    },
    {
      text: "What does Milton Friedman call inflation?",
      options: [
        { text: "The price of progress.", isCorrect: false },
        { text: "Taxation without legislation.", isCorrect: true },
        { text: "A capitalist conspiracy.", isCorrect: false }
      ],
      rationale: "Inflation acts as a hidden tax that reduces your wealth without any government needing to pass a formal tax bill."
    }
  ],
  "term-life-vs-health-insurance": [
    {
      text: "What is the primary purpose of Term Life Insurance?",
      options: [
        { text: "To replace the economic value of your future labor if you die.", isCorrect: true },
        { text: "To act as a tax-free retirement savings account.", isCorrect: false },
        { text: "To pay for your children's college tuition.", isCorrect: false }
      ],
      rationale: "Term life is pure risk protection. It ensures your dependents aren't financially ruined by the loss of your income."
    },
    {
      text: "Why shouldn't you rely solely on employer health coverage?",
      options: [
        { text: "It usually doesn't cover dental.", isCorrect: false },
        { text: "It disappears if you lose your job or start a business.", isCorrect: true },
        { text: "Employers take a percentage of your claims.", isCorrect: false }
      ],
      rationale: "Your health coverage should be independent of your employer so you are protected during career transitions or layoffs."
    },
    {
      text: "What is the 'Golden Rule' of insurance according to the module?",
      options: [
        { text: "Never mix insurance with investments. Buy term, invest the rest.", isCorrect: true },
        { text: "Always buy Whole Life policies for the cash value.", isCorrect: false },
        { text: "Insure everything you own, regardless of cost.", isCorrect: false }
      ],
      rationale: "Hybrid products like ULIPs or Endowment plans are notoriously inefficient. Separate the two functions for maximum benefit."
    },
    {
      text: "How much Term Life coverage is generally recommended?",
      options: [
        { text: "1 to 2 times your annual income.", isCorrect: false },
        { text: "15 to 20 times your annual income.", isCorrect: true },
        { text: "Exactly $1,000,000.", isCorrect: false }
      ],
      rationale: "15x to 20x provides a large enough lump sum that, if invested safely, can replace your lost income through interest."
    },
    {
      text: "When should you secure comprehensive health insurance?",
      options: [
        { text: "Right before you retire.", isCorrect: false },
        { text: "Only if you get a major illness.", isCorrect: false },
        { text: "Early in life, before pre-existing conditions narrow your options.", isCorrect: true }
      ],
      rationale: "Securing coverage while young and healthy locks in your insurability before chronic conditions disqualify you."
    }
  ],
  "index-funds-guaranteed-way-to-wealth": [
    {
      text: "What makes an Index Fund mathematically optimal for most investors?",
      options: [
        { text: "It guarantees a 20% return every year.", isCorrect: false },
        { text: "It is passively managed, meaning extremely low fees.", isCorrect: true },
        { text: "It lets you pick the single best stock of the year.", isCorrect: false }
      ],
      rationale: "Lower fees mean more of your money stays invested and compounds over time. Active managers rarely beat the index after fees."
    },
    {
      text: "What does it mean that an index is 'self-cleansing'?",
      options: [
        { text: "The fund manager actively trades the worst stocks out.", isCorrect: false },
        { text: "Failing companies drop out naturally and are replaced by growing ones.", isCorrect: true },
        { text: "The fund pays out all cash as dividends.", isCorrect: false }
      ],
      rationale: "You never have to manually sell a dying company. The index automatically reconstitutes itself to hold the current market leaders."
    },
    {
      text: "Why do most active retail investors fail to beat the market?",
      options: [
        { text: "They don't own enough monitors.", isCorrect: false },
        { text: "They are competing against millions of participants and supercomputers.", isCorrect: true },
        { text: "They just don't trade frequently enough.", isCorrect: false }
      ],
      rationale: "The stock market is incredibly efficient. Trying to consistently pick undervalued stocks is a zero-sum game that most humans lose."
    },
    {
      text: "Who said: 'Don't look for the needle in the haystack. Just buy the haystack'?",
      options: [
        { text: "Warren Buffett", isCorrect: false },
        { text: "Elon Musk", isCorrect: false },
        { text: "John C. Bogle", isCorrect: true }
      ],
      rationale: "John Bogle founded Vanguard and created the first retail index fund, popularizing the concept of 'buying the haystack'."
    },
    {
      text: "How does a 1% higher expense ratio impact a 30-year timeframe?",
      options: [
        { text: "It can consume nearly 30% of your total potential wealth.", isCorrect: true },
        { text: "It has a negligible impact of about 1%.", isCorrect: false },
        { text: "It actually boosts your returns by 1%.", isCorrect: false }
      ],
      rationale: "Thanks to the math of compound growth, seemingly tiny fees compound over decades, massively eroding your end balance."
    }
  ],
  "the-50-30-20-rule-explained": [
    {
      text: "In the 50/30/20 rule, what does the 50% bucket represent?",
      options: [
        { text: "Needs: Baseline survival and employment obligations.", isCorrect: true },
        { text: "Wants: Lifestyle and experiences.", isCorrect: false },
        { text: "Savings: Investments and debt payoff.", isCorrect: false }
      ],
      rationale: "Needs cover your rent, utilities, essential food, and minimum debt payments. Keeping this under 50% ensures agility."
    },
    {
      text: "Why is the 30% 'Wants' bucket critical for long-term success?",
      options: [
        { text: "Because it makes the banks happy.", isCorrect: false },
        { text: "It prevents psychological burnout and 'budget relapse'.", isCorrect: true },
        { text: "Because you need to spend money to make money.", isCorrect: false }
      ],
      rationale: "A diet of pure restriction usually fails. Allocating explicitly for guilt-free spending makes the system sustainable."
    },
    {
      text: "What is the recommended sequence for the 20% 'Savings' bucket?",
      options: [
        { text: "Crypto first, then stocks, then emergency fund.", isCorrect: false },
        { text: "Emergency shield, eliminate high-interest debt, then long-term investing.", isCorrect: true },
        { text: "Buy a new car, then save whatever is left over.", isCorrect: false }
      ],
      rationale: "You must secure your foundation (cash reserves) and plug the leaks (toxic debt) before building the skyscraper (investing)."
    },
    {
      text: "What happens if your 'Needs' breach 70% of your net income?",
      options: [
        { text: "Your financial system becomes fragile to macro shocks.", isCorrect: true },
        { text: "You automatically get a promotion.", isCorrect: false },
        { text: "You are doing an excellent job saving money.", isCorrect: false }
      ],
      rationale: "High fixed costs mean a single emergency or job loss can instantly lead to missed payments or devastating debt."
    },
    {
      text: "How should you approach the 20% Savings bucket?",
      options: [
        { text: "Wait until the end of the month and save what's left.", isCorrect: false },
        { text: "Automate it first, treating it as a bill to your future self.", isCorrect: true },
        { text: "Only save when you get a bonus.", isCorrect: false }
      ],
      rationale: "Automation removes willpower from the equation. Pay your future self before the capital touches your spending accounts."
    }
  ],
  "tax-optimization": [
    {
      text: "What is the difference between Gross and Net income?",
      options: [
        { text: "Gross is what you keep, Net is what you make.", isCorrect: false },
        { text: "Gross is what you make, Net is what you keep after taxes.", isCorrect: true },
        { text: "They are exactly the same thing.", isCorrect: false }
      ],
      rationale: "Gross income is your total earnings before any taxes or deductions. Net income is your actual take-home pay."
    },
    {
      text: "What is a tax deduction?",
      options: [
        { text: "A penalty for paying late.", isCorrect: false },
        { text: "An extra fee added to your bill.", isCorrect: false },
        { text: "A discount coupon that lowers the money the government looks at.", isCorrect: true }
      ],
      rationale: "Deductions reduce your taxable income, meaning you are taxed on a smaller amount."
    },
    {
      text: "If you get a raise and move into a higher tax bracket, does all your money get taxed at the higher rate?",
      options: [
        { text: "Yes, all your money gets taxed higher.", isCorrect: false },
        { text: "No, only the money in that specific bucket gets taxed higher.", isCorrect: true },
        { text: "It depends on your job.", isCorrect: false }
      ],
      rationale: "Tax systems are progressive. You only pay the higher rate on the money that spills into that specific higher bracket."
    },
    {
      text: "Why is it important to use government-approved retirement accounts?",
      options: [
        { text: "They often act as a massive discount coupon on your current taxes.", isCorrect: true },
        { text: "They let you withdraw money anytime without rules.", isCorrect: false },
        { text: "They guarantee that you will become a millionaire.", isCorrect: false }
      ],
      rationale: "Governments incentivize saving for retirement by offering significant tax deductions or tax-free growth."
    },
    {
      text: "What is the main goal of tax optimization?",
      options: [
        { text: "To avoid paying any taxes illegally.", isCorrect: false },
        { text: "To pay more money to the government than you need to.", isCorrect: false },
        { text: "To legally minimize your taxes so you keep more of your own money.", isCorrect: true }
      ],
      rationale: "Tax evasion is illegal, but tax optimization uses perfectly legal structures and rules to protect your wealth."
    }
  ]
};
