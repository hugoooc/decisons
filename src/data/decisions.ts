import type { Decision } from '@/types'

export const decisions: Decision[] = [
  // ============================================
  // CHAPTER 1: STARTING OUT (Decisions 1-6)
  // ============================================
  {
    id: 'ch1-d1',
    chapter: 1,
    title: 'Your First Paycheck',
    scenario_text:
      "Congratulations! You just received your first real paycheck of $2,800 after taxes. You're living in a modest apartment with $500 in savings. How do you allocate this money?",
    concept_tags: ['Budgeting', 'Emergency Fund'],
    why_it_matters:
      'How you handle your first income sets financial habits for life. The 50/30/20 rule suggests 50% needs, 30% wants, 20% savings.',
    choices: [
      {
        id: 'ch1-d1-a',
        label: 'Follow the 50/30/20 rule',
        short_tradeoff: 'Balanced approach, slower lifestyle upgrades',
        effects: {
          cash: 560,
          monthly_expenses: 1400,
          stress: -5,
          long_term_choice: true,
        },
        explanation:
          "You allocate 50% to needs ($1,400), 30% to wants ($840), and save 20% ($560). This disciplined approach builds good habits early. Your savings grow steadily while you still enjoy life.",
        hidden_cost: 'Delaying gratification now means missing some experiences your peers are having.',
        educator_note:
          'The 50/30/20 rule is a simple budgeting framework popularized by Senator Elizabeth Warren.',
      },
      {
        id: 'ch1-d1-b',
        label: 'Maximize savings aggressively',
        short_tradeoff: 'Faster emergency fund, minimal social life',
        effects: {
          cash: 1400,
          monthly_expenses: 1000,
          stress: 10,
          long_term_choice: true,
        },
        explanation:
          "You commit to saving 50% of your income, living extremely frugally. You skip outings and cook every meal. Your savings skyrocket but you feel isolated from friends.",
        hidden_cost:
          'Extreme frugality can lead to burnout and "revenge spending" later. Social connections also have economic value through networking.',
      },
      {
        id: 'ch1-d1-c',
        label: 'Enjoy your hard-earned money',
        short_tradeoff: 'Immediate enjoyment, no safety net',
        effects: {
          cash: 100,
          monthly_expenses: 2200,
          stress: -10,
        },
        explanation:
          "You treat yourself to a nice wardrobe, dining out, and entertainment. You've worked hard and deserve to enjoy it! But your savings barely grow.",
        hidden_cost: 'Without savings, any unexpected expense becomes a crisis requiring debt.',
      },
    ],
  },
  {
    id: 'ch1-d2',
    chapter: 1,
    title: 'The Emergency Fund Question',
    scenario_text:
      "Your bank offers a high-yield savings account at 4.5% APY. Financial advisors recommend 3-6 months of expenses as an emergency fund. You currently have $1,500 saved. What's your strategy?",
    concept_tags: ['Emergency Fund', 'APR vs APY', 'Opportunity Cost'],
    why_it_matters:
      'An emergency fund prevents you from going into debt when unexpected expenses arise. The difference between APR and APY matters for both savings and borrowing.',
    bias_nudge: 'Present bias alert: "I\'ll start saving next month" rarely works.',
    choices: [
      {
        id: 'ch1-d2-a',
        label: 'Build to 3 months expenses first',
        short_tradeoff: 'Good protection, opportunity cost on investments',
        effects: {
          cash: 200,
          monthly_expenses: 50,
          stress: -10,
          long_term_choice: true,
        },
        explanation:
          "You prioritize building your emergency fund to $4,500. With 4.5% APY, you earn about $200/year on this. It's not exciting, but you'll sleep better knowing unexpected expenses won't derail you.",
        hidden_cost:
          'Money in savings earns less than historical stock market returns (~7% after inflation). This is the price of security.',
        educator_note:
          'APY (Annual Percentage Yield) includes compound interest, while APR (Annual Percentage Rate) does not.',
      },
      {
        id: 'ch1-d2-b',
        label: 'Keep minimal savings, invest the rest',
        short_tradeoff: 'Higher growth potential, risky if emergencies hit',
        effects: {
          investments: 1000,
          cash: -800,
          stress: 5,
        },
        explanation:
          "You keep just $700 for emergencies and invest $800 in index funds. Your money has higher growth potential, but you're exposed if anything goes wrong.",
        hidden_cost:
          'If you need to sell investments during a market downturn, you lock in losses. Emergencies don\'t wait for market recoveries.',
      },
      {
        id: 'ch1-d2-c',
        label: 'No formal emergency fund',
        short_tradeoff: 'Maximum flexibility now, high risk',
        effects: {
          monthly_expenses: 100,
          stress: 15,
        },
        explanation:
          "You decide you'll figure it out if something happens. Maybe you can use a credit card or borrow from family. This gives you more spending money now.",
        hidden_cost:
          'Credit card emergency debt at 20% APR can cost you thousands. A $1,000 emergency becomes $1,200+ if not paid off quickly.',
      },
    ],
  },
  {
    id: 'ch1-d3',
    chapter: 1,
    title: 'Lifestyle Inflation Temptation',
    scenario_text:
      "You got a raise! Your monthly income increased by $400. Your coworkers are upgrading their apartments and cars. Do you increase your lifestyle to match?",
    concept_tags: ['Lifestyle Inflation', 'Opportunity Cost', 'Compound Interest'],
    why_it_matters:
      "Lifestyle inflation is when spending rises with income. It's the #1 reason high earners still struggle financially.",
    bias_nudge: 'Social comparison trap: Your financial goals matter more than keeping up with others.',
    choices: [
      {
        id: 'ch1-d3-a',
        label: 'Keep lifestyle the same, save the raise',
        short_tradeoff: 'Wealth building, possible FOMO',
        effects: {
          monthly_income: 400,
          cash: 400,
          stress: 5,
          long_term_choice: true,
        },
        explanation:
          "You resist the upgrade urge. That extra $400/month invested for 30 years at 7% becomes over $450,000. You might feel left out occasionally, but your future self will thank you.",
        hidden_cost: 'Social pressure and feeling "behind" peers can affect mental health and relationships.',
        educator_note:
          'This demonstrates the power of compound interest: $400/month × 12 months × 30 years at 7% = $453,000+',
      },
      {
        id: 'ch1-d3-b',
        label: 'Split it: half lifestyle, half savings',
        short_tradeoff: 'Balanced improvement, moderate growth',
        effects: {
          monthly_income: 400,
          monthly_expenses: 200,
          cash: 200,
        },
        explanation:
          "You give yourself a small lifestyle upgrade while saving half. You move to a slightly nicer place and put $200/month toward savings. A balanced approach.",
        hidden_cost:
          'Even modest lifestyle inflation compounds. That $200/month extra spending is $72,000 over 30 years in direct costs.',
      },
      {
        id: 'ch1-d3-c',
        label: 'Upgrade your lifestyle fully',
        short_tradeoff: 'Immediate quality of life, no wealth gain',
        effects: {
          monthly_income: 400,
          monthly_expenses: 450,
          stress: -5,
        },
        explanation:
          "You move to a nicer apartment and lease a better car. Your daily life improves noticeably. But your savings rate stays flat despite earning more.",
        hidden_cost:
          "In 10 years, you'll be earning much more but still living paycheck to paycheck like when you started.",
      },
    ],
  },
  {
    id: 'ch1-d4',
    chapter: 1,
    title: 'The Side Hustle Opportunity',
    scenario_text:
      "A friend offers you freelance work that could earn an extra $500-800/month, but it requires 10-15 hours weekly of your evenings and weekends. Your job is stable but not demanding.",
    concept_tags: ['Opportunity Cost', 'Taxes', 'Risk-Return'],
    why_it_matters:
      'Side income can accelerate wealth building, but time has value too. Self-employment also means self-employment taxes.',
    choices: [
      {
        id: 'ch1-d4-a',
        label: 'Take the side hustle',
        short_tradeoff: 'More income, less personal time',
        effects: {
          monthly_income: 500,
          monthly_expenses: 75,
          stress: 15,
          long_term_choice: true,
        },
        explanation:
          "You commit to the extra work. After self-employment taxes (15.3%) and expenses, you net about $500/month. It's tiring but your savings grow faster.",
        hidden_cost:
          'Self-employment tax is 15.3% on top of income tax. A $600 gross payment nets you closer to $450 after taxes.',
        educator_note:
          'Self-employed individuals pay both employee and employer portions of Social Security/Medicare taxes.',
      },
      {
        id: 'ch1-d4-b',
        label: 'Try it part-time first',
        short_tradeoff: 'Test the waters, smaller commitment',
        effects: {
          monthly_income: 250,
          monthly_expenses: 30,
          stress: 8,
        },
        explanation:
          "You agree to half the work initially. This lets you test if you can sustain it while keeping some personal time. You can always scale up later.",
        hidden_cost: 'Part-time commitment might not build the skills or reputation that lead to better opportunities.',
      },
      {
        id: 'ch1-d4-c',
        label: 'Decline and protect your time',
        short_tradeoff: 'Work-life balance, slower wealth building',
        effects: {
          stress: -10,
        },
        explanation:
          "You value your evenings and weekends too much. Rest, relationships, and hobbies matter for long-term happiness. Money isn't everything.",
        hidden_cost:
          "Passing on opportunities when young and energetic means missing prime earning years. It's harder to hustle later.",
      },
    ],
  },
  {
    id: 'ch1-d5',
    chapter: 1,
    title: 'Health Insurance Decision',
    scenario_text:
      "Your employer offers three health insurance options: a low-premium high-deductible plan ($100/month, $3,000 deductible) with HSA, a mid-tier plan ($250/month, $1,000 deductible), or a premium plan ($400/month, $200 deductible).",
    concept_tags: ['Insurance', 'Risk-Return', 'Taxes'],
    why_it_matters:
      "Health insurance is risk management. HSAs offer triple tax advantages but require discipline. Young, healthy people often overpay for coverage they don't use.",
    choices: [
      {
        id: 'ch1-d5-a',
        label: 'High-deductible with HSA',
        short_tradeoff: 'Lowest cost, higher risk, tax benefits',
        effects: {
          monthly_expenses: -100,
          cash: 150,
          stress: 5,
          long_term_choice: true,
        },
        explanation:
          "You choose the HDHP and contribute to an HSA. The HSA offers tax-deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses. Triple tax advantage!",
        hidden_cost:
          'If you have a major health event, you pay up to $3,000 before insurance kicks in. That emergency fund becomes critical.',
        educator_note:
          'HSAs are unique: contributions are pre-tax, growth is tax-free, and withdrawals for medical expenses are tax-free.',
      },
      {
        id: 'ch1-d5-b',
        label: 'Mid-tier balanced plan',
        short_tradeoff: 'Moderate cost and risk',
        effects: {
          monthly_expenses: 50,
        },
        explanation:
          "You pick the middle option. You pay more monthly but have lower out-of-pocket risk. It's a reasonable balance for most people.",
        hidden_cost:
          "If you stay healthy, you're overpaying by about $1,800/year compared to the HDHP option. That's real money over time.",
      },
      {
        id: 'ch1-d5-c',
        label: 'Premium comprehensive plan',
        short_tradeoff: 'Best coverage, highest cost',
        effects: {
          monthly_expenses: 200,
          stress: -5,
        },
        explanation:
          "You want the best coverage available. Doctor visits are basically free, and you never worry about medical bills. Peace of mind has value.",
        hidden_cost:
          "At 25 years old, you're likely overpaying by $3,600/year. Over 10 healthy years, that's $36,000 that could have been invested.",
      },
    ],
  },
  {
    id: 'ch1-d6',
    chapter: 1,
    title: 'Tax Season Strategy',
    scenario_text:
      "It's tax season. You can either take the standard deduction ($13,850) or itemize deductions. Your potential itemized deductions total $9,000. You're also deciding whether to adjust your W-4 withholding.",
    concept_tags: ['Taxes', 'Opportunity Cost'],
    why_it_matters:
      'Understanding marginal vs. average tax rates helps you make better financial decisions. Over-withholding is an interest-free loan to the government.',
    choices: [
      {
        id: 'ch1-d6-a',
        label: 'Take standard deduction, adjust W-4',
        short_tradeoff: 'Optimal strategy, requires attention',
        effects: {
          monthly_income: 100,
          cash: -200,
          long_term_choice: true,
        },
        explanation:
          "You take the standard deduction (saving more than itemizing) and adjust your W-4 so less is withheld monthly. You get more money each paycheck instead of a big refund.",
        hidden_cost:
          'You must be disciplined with the extra monthly cash. Many people prefer forced savings via over-withholding.',
        educator_note:
          "A tax refund isn't a gift—it's your own money you lent to the government at 0% interest.",
      },
      {
        id: 'ch1-d6-b',
        label: 'Standard deduction, keep withholding high',
        short_tradeoff: 'Simple, forced savings via refund',
        effects: {
          cash: 1200,
        },
        explanation:
          "You take the standard deduction and don't change withholding. You'll get a nice refund next year. It's not optimal but feels good to get that lump sum.",
        hidden_cost:
          'If you got $1,200 back, you gave the government a $100/month interest-free loan. That money could have earned returns for you.',
      },
      {
        id: 'ch1-d6-c',
        label: 'Try to itemize everything',
        short_tradeoff: 'Effort for no benefit, possible mistakes',
        effects: {
          stress: 10,
          cash: -100,
        },
        explanation:
          "You spend hours itemizing but your total ($9,000) is less than the standard deduction ($13,850). You wasted time and may have made errors. You end up taking the standard deduction anyway.",
        hidden_cost:
          'Complex tax strategies often have diminishing returns for most people. Your time has value too.',
      },
    ],
  },

  // ============================================
  // CHAPTER 2: DEBT & CREDIT (Decisions 7-12)
  // ============================================
  {
    id: 'ch2-d1',
    chapter: 2,
    title: 'The Credit Card Offer',
    scenario_text:
      "You receive a pre-approved credit card offer: 0% APR for 15 months, then 22.99% APR. $200 sign-up bonus after spending $500 in 3 months. Your current credit score is 680.",
    concept_tags: ['Credit Score', 'APR vs APY', 'Present Bias'],
    why_it_matters:
      'Credit cards are tools that can build credit and earn rewards, or traps that lead to debt spirals. The difference is entirely in how you use them.',
    bias_nudge: 'Present bias warning: The 0% intro rate is temporary. 22.99% APR means a $1,000 balance costs $230/year.',
    choices: [
      {
        id: 'ch2-d1-a',
        label: 'Accept but pay in full monthly',
        short_tradeoff: 'Build credit, earn rewards, requires discipline',
        effects: {
          credit_score: 15,
          cash: 200,
          long_term_choice: true,
        },
        explanation:
          "You accept the card, get the $200 bonus, and commit to paying the full balance every month. This builds credit, earns rewards, and costs you nothing in interest.",
        hidden_cost: 'Credit cards make spending psychologically easier. Studies show people spend 12-18% more with cards vs. cash.',
        educator_note: 'Credit utilization (balance/limit ratio) under 30% helps your score. Under 10% is ideal.',
      },
      {
        id: 'ch2-d1-b',
        label: 'Accept for a large planned purchase',
        short_tradeoff: 'Interest-free financing, debt risk after promo',
        effects: {
          credit_score: 10,
          credit_card_debt: 1500,
          cash: 200,
        },
        explanation:
          "You use the 0% period to finance a $1,500 purchase you've been planning. You have 15 months to pay it off interest-free. Just remember: if any balance remains after 15 months, you'll pay 22.99% APR.",
        hidden_cost: 'Deferred interest cards can retroactively charge interest on the full original balance if not paid in full.',
      },
      {
        id: 'ch2-d1-c',
        label: 'Decline the offer',
        short_tradeoff: 'Avoid temptation, miss credit-building opportunity',
        effects: {
          stress: -5,
        },
        explanation:
          "You decide the temptation isn't worth it. You'll stick with your debit card. This is safer but you miss an opportunity to build credit and earn rewards.",
        hidden_cost: 'Without credit history, you may pay higher rates on future mortgages and car loans. This can cost thousands.',
      },
    ],
  },
  {
    id: 'ch2-d2',
    chapter: 2,
    title: 'Student Loan Repayment Strategy',
    scenario_text:
      "You have $28,000 in federal student loans at 5.5% interest. Your minimum payment is $300/month. You have $500/month available for debt repayment. How do you approach this?",
    concept_tags: ['Debt Management', 'Compound Interest', 'Opportunity Cost'],
    why_it_matters:
      'Student loans are often your first major debt. Understanding repayment strategies and the math behind them empowers better decisions.',
    choices: [
      {
        id: 'ch2-d2-a',
        label: 'Pay extra toward principal',
        short_tradeoff: 'Faster payoff, guaranteed 5.5% return',
        effects: {
          cash: -200,
          student_loan: -400,
          stress: -5,
          long_term_choice: true,
        },
        explanation:
          "You pay $500/month instead of $300. The extra $200 goes directly to principal. You'll pay off the loan years early and save thousands in interest. It's a guaranteed 5.5% return.",
        hidden_cost: 'The money used for extra payments could potentially earn more in the stock market (historically ~7-10%).',
        educator_note: 'Paying extra on loans provides a guaranteed return equal to the interest rate.',
      },
      {
        id: 'ch2-d2-b',
        label: 'Minimum payment, invest the difference',
        short_tradeoff: 'Higher potential return, requires discipline',
        effects: {
          investments: 200,
          stress: 5,
        },
        explanation:
          "You make minimum payments and invest the extra $200/month. Historically, stocks return 7-10% annually, higher than your 5.5% loan rate. But this requires staying invested through market drops.",
        hidden_cost: 'Market returns aren\'t guaranteed. During a downturn, you\'ll have both debt AND investment losses.',
      },
      {
        id: 'ch2-d2-c',
        label: 'Apply for income-driven repayment',
        short_tradeoff: 'Lower payments now, more interest long-term',
        effects: {
          monthly_expenses: -100,
          cash: 100,
        },
        explanation:
          "You switch to an income-driven plan, lowering your payment to $200/month. This frees up cash flow now. However, you'll pay more total interest over a longer term.",
        hidden_cost:
          'Income-driven plans can extend repayment to 20-25 years. You may pay 50-100% more in total interest.',
      },
    ],
  },
  {
    id: 'ch2-d3',
    chapter: 2,
    title: 'The Minimum Payment Trap',
    scenario_text:
      "You have $3,000 on a credit card at 19.99% APR. The minimum payment is $60/month (2% of balance). You have $200/month available. How do you handle this?",
    concept_tags: ['Minimum Payments', 'Compound Interest', 'APR vs APY'],
    why_it_matters:
      'Minimum payments are designed to maximize interest paid. A $3,000 balance at minimum payments can take 15+ years to pay off.',
    bias_nudge:
      'Minimum payment math: $60/month on $3,000 at 19.99% takes 9 years and costs $3,600 in interest. Paying $200/month takes 17 months and costs $500 in interest.',
    choices: [
      {
        id: 'ch2-d3-a',
        label: 'Pay $200/month aggressively',
        short_tradeoff: 'Fastest payoff, tight budget',
        effects: {
          cash: -200,
          credit_card_debt: -600,
          credit_score: 10,
          stress: -10,
          long_term_choice: true,
        },
        explanation:
          "You commit $200/month. The debt will be gone in about 17 months. You'll pay roughly $500 in interest total instead of $3,600 at minimum payments. Your credit score improves as your utilization drops.",
        hidden_cost: "Budget is tight during payoff. You'll need to say no to some social activities.",
        educator_note:
          "Always pay more than the minimum. Even an extra $20/month significantly reduces total interest paid.",
      },
      {
        id: 'ch2-d3-b',
        label: 'Balance transfer to 0% card',
        short_tradeoff: 'No interest for 15 months, requires good credit',
        effects: {
          credit_card_debt: 90,
          credit_score: -5,
        },
        explanation:
          "You transfer the balance to a 0% intro APR card (3% transfer fee = $90). You now have 15 months to pay it off interest-free. Just make sure you pay it all before the rate jumps.",
        hidden_cost:
          "If you don't pay it off in time, you're back to high interest. The new card also tempts you to spend more.",
      },
      {
        id: 'ch2-d3-c',
        label: 'Pay minimum, focus on savings',
        short_tradeoff: 'Cash flow now, debt forever',
        effects: {
          cash: 140,
          credit_card_debt: 50,
          stress: 15,
        },
        explanation:
          "You pay the minimum ($60) and keep $140 for savings. But with 19.99% APR, your debt grows faster than your savings. Each month, about $50 in interest is added to your balance.",
        hidden_cost:
          "At minimum payments, this $3,000 debt could cost you $6,600 total over 9 years. That's more than double the original amount.",
      },
    ],
  },
  {
    id: 'ch2-d4',
    chapter: 2,
    title: 'Credit Score Building',
    scenario_text:
      "Your credit score is 650, limiting your options for loans and apartments. You want to build it to 720+ within a year. What's your strategy?",
    concept_tags: ['Credit Score', 'Credit Utilization', 'Debt Management'],
    why_it_matters:
      'Your credit score affects interest rates on everything from cars to homes, plus apartment rentals and even job applications. A 100-point difference can save tens of thousands.',
    choices: [
      {
        id: 'ch2-d4-a',
        label: 'Become an authorized user + credit builder loan',
        short_tradeoff: 'Multiple strategies, fastest improvement',
        effects: {
          credit_score: 35,
          monthly_expenses: 50,
          long_term_choice: true,
        },
        explanation:
          "You become an authorized user on a family member's old, good-standing card (instant history boost). You also take a small credit-builder loan ($500) that you pay off over 12 months. Multiple positive accounts accelerate improvement.",
        hidden_cost: 'Credit builder loans charge interest. The $500 loan might cost you $30-50 in interest over the year.',
        educator_note:
          'Credit scores consider: payment history (35%), amounts owed (30%), length of history (15%), credit mix (10%), new credit (10%).',
      },
      {
        id: 'ch2-d4-b',
        label: 'Pay down credit utilization aggressively',
        short_tradeoff: 'Direct impact, requires available cash',
        effects: {
          credit_score: 25,
          cash: -500,
        },
        explanation:
          "You pay down your credit card balances to get utilization under 10%. This is the fastest single factor you can control. If your limit is $2,000, you keep the balance under $200.",
        hidden_cost: 'Using cash to pay debt means less emergency fund. It\'s a trade-off between liquidity and credit improvement.',
      },
      {
        id: 'ch2-d4-c',
        label: 'Just wait and pay on time',
        short_tradeoff: 'Simple but slow, no active improvement',
        effects: {
          credit_score: 10,
        },
        explanation:
          "You focus on never missing a payment and let time do the work. This is the safest approach but slowest. With consistent payments, you might reach 720 in 2-3 years instead of 1.",
        hidden_cost:
          'Every year at a lower credit score costs you in higher interest rates. Patience has a real dollar cost.',
      },
    ],
  },
  {
    id: 'ch2-d5',
    chapter: 2,
    title: 'Debt Consolidation Offer',
    scenario_text:
      "You have multiple debts: $2,000 credit card (19.99%), $5,000 personal loan (12%), and $3,000 store credit (24.99%). A bank offers to consolidate all $10,000 at 11% fixed for 5 years. Monthly payment would be $217.",
    concept_tags: ['Debt Management', 'APR vs APY', 'Minimum Payments'],
    why_it_matters:
      'Debt consolidation can simplify payments and reduce interest, but extending the term means paying more total interest over time.',
    choices: [
      {
        id: 'ch2-d5-a',
        label: 'Consolidate and pay extra',
        short_tradeoff: 'Simplified + lower rate, requires discipline',
        effects: {
          credit_card_debt: -2000,
          student_loan: 10000,
          monthly_expenses: 17,
          credit_score: 5,
          long_term_choice: true,
        },
        explanation:
          "You consolidate at 11% (lower than your weighted average of ~17%) and commit to paying $300/month instead of $217. You'll pay it off in 3 years and save on interest.",
        hidden_cost:
          'The closed accounts may temporarily hurt your credit score. Make sure the consolidation loan reports to credit bureaus.',
        educator_note:
          'When consolidating, compare total interest paid, not just monthly payment. Lower payment over longer term often costs more.',
      },
      {
        id: 'ch2-d5-b',
        label: 'Consolidate at minimum payment',
        short_tradeoff: 'Lower monthly payment, more total interest',
        effects: {
          credit_card_debt: -2000,
          student_loan: 10000,
          monthly_expenses: -83,
          stress: -5,
        },
        explanation:
          "You consolidate and pay the minimum $217/month. Your monthly payment drops from $300 to $217, freeing up cash. But over 5 years, you'll pay about $3,000 in total interest.",
        hidden_cost:
          "Your current debts would cost more in interest monthly, but if paid aggressively, could be gone faster. Stretching to 5 years means paying interest longer.",
      },
      {
        id: 'ch2-d5-c',
        label: 'Attack debts with avalanche method',
        short_tradeoff: 'Most mathematically efficient, harder to stick with',
        effects: {
          cash: -300,
          credit_card_debt: -200,
          stress: 10,
          long_term_choice: true,
        },
        explanation:
          "You keep debts separate and attack the 24.99% store credit first (avalanche method: highest rate first). This is mathematically optimal but requires more mental energy to manage multiple accounts.",
        hidden_cost:
          'The avalanche method is optimal but psychologically harder. Many people do better with the snowball method (smallest balance first) for motivation.',
      },
    ],
  },
  {
    id: 'ch2-d6',
    chapter: 2,
    title: 'The Collection Agency Call',
    scenario_text:
      "A collections agency contacts you about a $800 medical bill you forgot about. It's been 4 years since the service. They offer to settle for $500. Your credit score is currently 690.",
    concept_tags: ['Credit Score', 'Debt Management', 'Loss Aversion'],
    why_it_matters:
      'Collections can stay on your report for 7 years from delinquency. Understanding your rights (like the statute of limitations) is crucial.',
    bias_nudge: 'Loss aversion alert: Fear of credit damage can lead to paying debts you may not legally owe.',
    choices: [
      {
        id: 'ch2-d6-a',
        label: 'Negotiate pay-for-delete agreement',
        short_tradeoff: 'Best outcome if successful, requires negotiation',
        effects: {
          cash: -400,
          credit_score: 20,
          stress: -10,
          long_term_choice: true,
        },
        explanation:
          "You negotiate a 'pay for delete' where they remove the collection from your report in exchange for payment. You settle for $400 with written agreement to delete. Your score could improve significantly.",
        hidden_cost:
          'Not all collectors agree to pay-for-delete. Get everything in writing before paying. Verbal promises mean nothing.',
        educator_note:
          "Always request debt validation in writing first. Collectors must prove you owe the debt. Know your state's statute of limitations.",
      },
      {
        id: 'ch2-d6-b',
        label: 'Pay the settlement without negotiating',
        short_tradeoff: 'Quick resolution, collection still shows as paid',
        effects: {
          cash: -500,
          credit_score: 5,
          stress: -5,
        },
        explanation:
          "You pay the $500 settlement. The collection will show as 'settled' on your credit report. Better than 'unpaid' but it still hurts your score for 7 years from original delinquency.",
        hidden_cost:
          'A settled collection still impacts your score. You paid $500 but the negative mark remains. You might have negotiated better.',
      },
      {
        id: 'ch2-d6-c',
        label: 'Request validation and wait it out',
        short_tradeoff: 'Might fall off naturally, could escalate',
        effects: {
          stress: 15,
        },
        explanation:
          "You send a debt validation letter (your right under FDCPA). The debt is 4 years old; in 3 more years it may fall off your report naturally. If they can't validate it, they must stop collection efforts.",
        hidden_cost:
          'If they validate the debt, you\'re back to square one. They could also sue before the statute of limitations expires (varies by state).',
      },
    ],
  },

  // ============================================
  // CHAPTER 3: INVESTING & GROWTH (Decisions 13-18)
  // ============================================
  {
    id: 'ch3-d1',
    chapter: 3,
    title: 'Your First Investment Decision',
    scenario_text:
      "You have $3,000 saved and want to start investing. Your employer offers a 401(k) with 50% match up to 6% of salary. You also want to open an IRA or brokerage account. What's your priority?",
    concept_tags: ['Compound Interest', 'Taxes', 'Investment Growth'],
    why_it_matters:
      "An employer match is literally free money—100% instant return. The order of investment accounts matters significantly for tax efficiency and wealth building.",
    bias_nudge: 'Present bias alert: Retirement feels far away, but $100/month from age 25 to 65 at 7% = $240,000.',
    choices: [
      {
        id: 'ch3-d1-a',
        label: 'Max employer match first, then Roth IRA',
        short_tradeoff: 'Optimal order, tax-advantaged growth',
        effects: {
          investments: 2500,
          monthly_expenses: 200,
          cash: -500,
          long_term_choice: true,
        },
        explanation:
          "You contribute 6% to get the full match (instant 50% return!) then put the rest in a Roth IRA for tax-free growth. This is the textbook optimal order for most young investors.",
        hidden_cost:
          "Your take-home pay decreases with 401(k) contributions. You need to budget for this reduction.",
        educator_note:
          "Investment priority order: 1) 401(k) to match, 2) High-interest debt, 3) Roth IRA, 4) 401(k) to max, 5) Taxable brokerage.",
      },
      {
        id: 'ch3-d1-b',
        label: 'Skip 401(k), use brokerage for flexibility',
        short_tradeoff: 'Access money anytime, lose free match',
        effects: {
          investments: 3000,
          cash: -3000,
          stress: 5,
        },
        explanation:
          "You put all $3,000 in a regular brokerage account. You can access it anytime without penalties. But you're leaving free employer match money on the table.",
        hidden_cost:
          "You're giving up $900/year in free match money (if salary is $50k). Over 40 years at 7%, that's over $180,000 lost.",
      },
      {
        id: 'ch3-d1-c',
        label: 'Wait until you have more saved',
        short_tradeoff: 'Feels safer, massive opportunity cost',
        effects: {
          cash: 100,
          stress: -5,
        },
        explanation:
          "You decide to build more cash savings first. Investing feels risky and you want a larger emergency fund. You'll start investing 'when you're more stable.'",
        hidden_cost:
          "Every year you delay costs compound growth. $3,000 invested at 25 vs 35 (at 7%) is $30,000 vs $15,000 by age 65. Time is your biggest asset.",
      },
    ],
  },
  {
    id: 'ch3-d2',
    chapter: 3,
    title: 'Index Funds vs Stock Picking',
    scenario_text:
      "You're ready to invest $5,000. A coworker brags about 40% gains on individual stocks. Meanwhile, you've read that 80% of actively managed funds underperform index funds over 15 years. What do you choose?",
    concept_tags: ['Diversification', 'Risk-Return', 'Investment Growth'],
    why_it_matters:
      "The evidence is clear: for most investors, low-cost index funds outperform stock picking and active management over the long term. Diversification reduces risk without sacrificing returns.",
    choices: [
      {
        id: 'ch3-d2-a',
        label: 'Broad market index funds (80%+)',
        short_tradeoff: 'Reliable long-term growth, "boring"',
        effects: {
          investments: 5000,
          cash: -5000,
          risk_level: 10,
          stress: -5,
          long_term_choice: true,
        },
        explanation:
          "You put 80%+ in low-cost total market index funds (0.03% expense ratio). You own a slice of thousands of companies. Historical average return: 7-10% annually after inflation. Simple and effective.",
        hidden_cost:
          "Index funds are 'boring'—no exciting stock picks to talk about at parties. You'll match the market, never beat it. That's actually the goal.",
        educator_note:
          "Warren Buffett's advice to most investors: put money in a low-cost S&P 500 index fund. Even he admits most can't beat the market consistently.",
      },
      {
        id: 'ch3-d2-b',
        label: 'Mix of index funds and individual stocks',
        short_tradeoff: 'Some market exposure, some speculation',
        effects: {
          investments: 5000,
          cash: -5000,
          risk_level: 25,
          stress: 5,
        },
        explanation:
          "You put 70% in index funds and 30% in individual stocks you research. This gives you core stability with some upside potential (and learning experience) from stock picking.",
        hidden_cost:
          "That 30% in individual stocks will likely underperform the index over time. But it might keep you engaged with investing.",
      },
      {
        id: 'ch3-d2-c',
        label: 'All individual stocks you research',
        short_tradeoff: 'High potential gains, high potential losses',
        effects: {
          investments: 5000,
          cash: -5000,
          risk_level: 50,
          stress: 15,
        },
        explanation:
          "You do your own research and pick individual stocks. Maybe you'll beat the market! (Statistics say you probably won't over 15+ years, but some people do.)",
        hidden_cost:
          "Individual stocks are much riskier. One company can go to zero. An index fund never will. Time spent researching could be spent earning more money.",
      },
    ],
  },
  {
    id: 'ch3-d3',
    chapter: 3,
    title: 'Risk Tolerance Assessment',
    scenario_text:
      "The market drops 20% over a month. Your $10,000 portfolio is now worth $8,000. You're 27 years old with 35+ years until retirement. How do you respond?",
    concept_tags: ['Risk-Return', 'Loss Aversion', 'Investment Growth'],
    why_it_matters:
      "How you behave during market downturns determines your long-term returns. Historically, every major crash has been followed by recovery and new highs.",
    bias_nudge: 'Loss aversion warning: The pain of losing $2,000 feels twice as strong as the joy of gaining $2,000. This is hardwired in your brain.',
    choices: [
      {
        id: 'ch3-d3-a',
        label: 'Stay the course, maybe buy more',
        short_tradeoff: 'Long-term optimal, emotionally difficult',
        effects: {
          investments: 500,
          cash: -500,
          stress: 10,
          long_term_choice: true,
        },
        explanation:
          "You remind yourself of your long time horizon. Stocks are 'on sale.' You buy another $500 at lower prices, lowering your average cost. In past downturns, patient investors were rewarded.",
        hidden_cost:
          "It doesn't feel good to buy when everything is falling. What if it falls more? (It might! But historical data favors staying invested.)",
        educator_note:
          "Dollar-cost averaging during downturns has historically produced excellent returns. You're buying the same companies at cheaper prices.",
      },
      {
        id: 'ch3-d3-b',
        label: 'Stop contributions, wait and see',
        short_tradeoff: 'Feels safer, miss buying opportunity',
        effects: {
          cash: 200,
          stress: 5,
        },
        explanation:
          "You pause new investments until things stabilize. You don't sell, but you also don't buy. This feels safer but you miss the opportunity to buy at lower prices.",
        hidden_cost:
          "Trying to time the market usually fails. Missing just the 10 best market days over 20 years can cut your returns by more than half.",
      },
      {
        id: 'ch3-d3-c',
        label: 'Sell everything to stop the bleeding',
        short_tradeoff: 'Locks in losses, peace of mind (temporary)',
        effects: {
          investments: -7500,
          cash: 7500,
          stress: -10,
        },
        explanation:
          "You sell everything to avoid further losses. Your $10,000 is now $8,000 cash. You'll buy back in 'when things calm down.' You feel relieved... for now.",
        hidden_cost:
          "You locked in a 20% loss. Historically, selling during crashes and buying back 'when it's safe' dramatically underperforms staying invested.",
      },
    ],
  },
  {
    id: 'ch3-d4',
    chapter: 3,
    title: 'The Crypto Question',
    scenario_text:
      "Friends are making (and losing) money in cryptocurrency. Bitcoin is down 50% from its high but still up 10x from 5 years ago. You have $2,000 you could invest. Your other investments are all in index funds.",
    concept_tags: ['Risk-Return', 'Diversification', 'Present Bias'],
    why_it_matters:
      "Crypto is highly speculative with extreme volatility. Position sizing matters: only invest what you can afford to lose entirely.",
    bias_nudge: 'FOMO alert: Fear of missing out drives people to buy highs and sell lows. Your friends posting gains aren\'t posting losses.',
    choices: [
      {
        id: 'ch3-d4-a',
        label: 'Small allocation (5-10% of portfolio)',
        short_tradeoff: 'Limited exposure, controlled risk',
        effects: {
          investments: 200,
          cash: -200,
          risk_level: 10,
          stress: 5,
        },
        explanation:
          "You invest $200 (5%) in crypto as a small speculative position. If it goes to zero, you lose $200—painful but not devastating. If it 10x, you gain $1,800. Asymmetric bet with limited downside.",
        hidden_cost:
          "Crypto is highly volatile. That $200 might become $50 or $2,000 within months. Can you handle the emotional rollercoaster?",
        educator_note:
          "Position sizing is risk management. Only bet what you can lose entirely on speculative assets.",
      },
      {
        id: 'ch3-d4-b',
        label: 'Significant allocation (25%+ of $2,000)',
        short_tradeoff: 'Higher upside, higher risk',
        effects: {
          investments: 500,
          cash: -500,
          risk_level: 25,
          stress: 15,
        },
        explanation:
          "You put $500 into crypto, believing in its long-term potential. If you're right, the returns could be substantial. If wrong, you lose a meaningful amount of your savings.",
        hidden_cost:
          "Concentrating in speculative assets means your portfolio's outcome depends heavily on one bet. Diversification provides smoother returns.",
      },
      {
        id: 'ch3-d4-c',
        label: 'Avoid crypto entirely',
        short_tradeoff: 'No speculation, might miss upside',
        effects: {
          cash: 2000,
          stress: -5,
          long_term_choice: true,
        },
        explanation:
          "You stick to your index fund strategy. Crypto might moon, but it might also crash. Index funds have 100+ years of data showing reliable long-term growth. You sleep well at night.",
        hidden_cost:
          "If crypto does become widely adopted, you'll miss potential gains. But you also avoid potential total loss. Time will tell who was right.",
      },
    ],
  },
  {
    id: 'ch3-d5',
    chapter: 3,
    title: 'Understanding Fees',
    scenario_text:
      "You're comparing two retirement funds: Fund A charges 0.04% annually, Fund B charges 1.2% annually. Both aim to track similar market indices. You plan to invest $10,000 and add $500/month for 30 years.",
    concept_tags: ['Compound Interest', 'Opportunity Cost', 'Investment Growth'],
    why_it_matters:
      "Fees compound just like returns—but against you. A 1% difference in fees can cost you hundreds of thousands over a lifetime.",
    choices: [
      {
        id: 'ch3-d5-a',
        label: 'Low-cost Fund A (0.04%)',
        short_tradeoff: 'Maximum growth, requires self-direction',
        effects: {
          investments: 500,
          monthly_expenses: -10,
          long_term_choice: true,
        },
        explanation:
          "You choose the 0.04% fund. Over 30 years, assuming 7% returns, your $10,000 + $500/month grows to about $610,000. The fee costs you roughly $8,000 total over 30 years.",
        hidden_cost:
          "Low-cost funds are often self-directed. You don't get advice or hand-holding. You need to stay disciplined on your own.",
        educator_note:
          "The math: $10,000 + $500/month for 30 years at 7% minus 0.04% fee ≈ $610,000. Same calculation with 1.2% fee ≈ $490,000. Difference: $120,000!",
      },
      {
        id: 'ch3-d5-b',
        label: 'Higher-cost Fund B (1.2%)',
        short_tradeoff: 'More services, significant fee drag',
        effects: {
          investments: 500,
          monthly_expenses: 10,
        },
        explanation:
          "You choose Fund B, perhaps because it's the default or offers more 'service.' Over 30 years, the same investment grows to only about $490,000—$120,000 less than Fund A.",
        hidden_cost:
          "That 1.16% difference doesn't sound like much, but over 30 years it costs you $120,000. That's money that goes to the fund company, not you.",
      },
      {
        id: 'ch3-d5-c',
        label: 'Use a financial advisor (additional 1%)',
        short_tradeoff: 'Professional guidance, highest cost',
        effects: {
          investments: 500,
          monthly_expenses: 20,
          stress: -10,
        },
        explanation:
          "You hire an advisor who charges 1% on top of fund fees (2.2% total). They provide guidance and keep you from emotional decisions. But your $610,000 potential becomes about $400,000.",
        hidden_cost:
          "An advisor might add value through behavioral coaching, but 2%+ in total fees is extremely high. Fee-only advisors charge flat rates instead.",
      },
    ],
  },
  {
    id: 'ch3-d6',
    chapter: 3,
    title: 'The Bonus Dilemma',
    scenario_text:
      "You receive a $5,000 annual bonus. You have a $3,000 credit card balance at 19.99% APR, $10,000 invested in index funds, and 2 months of expenses in emergency savings. How do you use the bonus?",
    concept_tags: ['Opportunity Cost', 'Debt Management', 'Investment Growth'],
    why_it_matters:
      "The guaranteed return of paying off high-interest debt usually beats uncertain investment returns. Order of operations matters.",
    choices: [
      {
        id: 'ch3-d6-a',
        label: 'Pay off credit card completely',
        short_tradeoff: 'Guaranteed 19.99% return, debt freedom',
        effects: {
          cash: 2000,
          credit_card_debt: -3000,
          credit_score: 15,
          stress: -15,
          long_term_choice: true,
        },
        explanation:
          "You pay off the $3,000 credit card (guaranteed 19.99% return!) and put $2,000 in emergency savings. Being debt-free and having 3 months expenses saved reduces stress dramatically.",
        hidden_cost:
          "The money doesn't go into investments, missing potential growth. But mathematically, beating a guaranteed 20% return is nearly impossible.",
        educator_note:
          "Paying off 19.99% debt is equivalent to earning 19.99% guaranteed return—risk-free. No investment reliably offers that.",
      },
      {
        id: 'ch3-d6-b',
        label: 'Split: pay some debt, invest some',
        short_tradeoff: 'Balanced approach, still paying interest',
        effects: {
          cash: 500,
          credit_card_debt: -1500,
          investments: 3000,
          credit_score: 5,
        },
        explanation:
          "You pay $1,500 on the card and invest $3,000. You're reducing debt while also growing investments. But you're still paying 19.99% on the remaining $1,500.",
        hidden_cost:
          "That remaining $1,500 at 19.99% costs $300/year in interest. Your investments need to beat that just to break even on this strategy.",
      },
      {
        id: 'ch3-d6-c',
        label: 'Invest everything for long-term growth',
        short_tradeoff: 'Maximum investment, debt continues compounding',
        effects: {
          investments: 5000,
          stress: 10,
        },
        explanation:
          "You invest the full $5,000. Your portfolio grows to $15,000. But your $3,000 credit card balance continues accruing 19.99% interest—$600/year—eating into your gains.",
        hidden_cost:
          "Your investments need to earn 20%+ just to beat your debt interest. Historically, stocks average 7-10%. The math doesn't favor this choice.",
      },
    ],
  },

  // ============================================
  // CHAPTER 4: HOUSING & BIG CHOICES (Decisions 19-24)
  // ============================================
  {
    id: 'ch4-d1',
    chapter: 4,
    title: 'Rent vs Buy: First Home',
    scenario_text:
      "You're considering buying your first home. Rent is $1,500/month. A comparable home costs $300,000 with 20% down ($60,000). Monthly mortgage would be $1,600 plus $400 for taxes/insurance/maintenance. You have $70,000 saved.",
    concept_tags: ['Opportunity Cost', 'Compound Interest', 'Inflation'],
    why_it_matters:
      "The rent vs buy decision depends on many factors: how long you'll stay, local market conditions, opportunity cost of down payment, and lifestyle preferences.",
    choices: [
      {
        id: 'ch4-d1-a',
        label: 'Continue renting, invest the difference',
        short_tradeoff: 'Flexibility, invest down payment',
        effects: {
          investments: 60000,
          cash: -60000,
          monthly_expenses: 100,
          stress: -5,
        },
        explanation:
          "You keep renting and invest your $60,000 down payment in index funds. The $500/month you save (vs total homeownership costs) also goes to investments. If you move in 3-5 years, this often wins mathematically.",
        hidden_cost:
          "Rent typically increases 3-5% annually. Your landlord could sell. You build no home equity. But you maintain flexibility and liquidity.",
        educator_note:
          "Use a rent vs buy calculator for your specific situation. Rule of thumb: plan to stay 5+ years to make buying worthwhile after transaction costs.",
      },
      {
        id: 'ch4-d1-b',
        label: 'Buy with 20% down',
        short_tradeoff: 'Build equity, lose liquidity and flexibility',
        effects: {
          cash: -70000,
          mortgage: 240000,
          monthly_expenses: 500,
          stress: 10,
          long_term_choice: true,
        },
        explanation:
          "You buy the home with 20% down, avoiding PMI. You start building equity and lock in your housing cost. Home prices historically appreciate 3-4% annually.",
        hidden_cost:
          "True cost of homeownership includes maintenance (1-2% of home value annually), property taxes, insurance, and opportunity cost of down payment. Most first-time buyers underestimate these.",
      },
      {
        id: 'ch4-d1-c',
        label: 'Buy with smaller down payment (5%)',
        short_tradeoff: 'Keep more liquid, pay PMI',
        effects: {
          cash: -20000,
          mortgage: 285000,
          monthly_expenses: 700,
          investments: 45000,
        },
        explanation:
          "You put 5% down ($15,000) plus closing costs. You pay PMI ($150/month) until you reach 20% equity. You invest the remaining $45,000. This balances homeownership and investment.",
        hidden_cost:
          "PMI is $150/month with no benefit to you—it protects the lender. That's $1,800/year until you reach 20% equity, potentially 7-10 years.",
      },
    ],
  },
  {
    id: 'ch4-d2',
    chapter: 4,
    title: 'The Car Decision',
    scenario_text:
      "Your old car finally died. You need transportation. Options: buy a reliable used car ($15,000), lease a new car ($350/month for 3 years), or buy new with financing ($30,000 at 6% APR for 5 years = $580/month).",
    concept_tags: ['Opportunity Cost', 'Debt Management', 'Lifestyle Inflation'],
    why_it_matters:
      "Transportation is often the second-largest expense after housing. Cars depreciate rapidly—a new car loses 20% of value in year one alone.",
    choices: [
      {
        id: 'ch4-d2-a',
        label: 'Buy reliable used car',
        short_tradeoff: 'Best financial choice, less exciting',
        effects: {
          cash: -15000,
          monthly_expenses: 100,
          stress: 5,
          long_term_choice: true,
        },
        explanation:
          "You buy a 3-year-old certified pre-owned car with cash (or a small loan). It's already depreciated 40%, so you get good value. Reliable transportation without monthly payments.",
        hidden_cost:
          "Used cars may need repairs sooner. No new car smell or latest features. But the math strongly favors used cars for most people.",
        educator_note:
          "Average new car depreciates 20% year 1, then 15% per year. A $30,000 car is worth $18,000 after 3 years. Buy the $18,000 car!",
      },
      {
        id: 'ch4-d2-b',
        label: 'Lease a new car',
        short_tradeoff: 'Newest car, always have payment',
        effects: {
          monthly_expenses: 350,
          stress: -5,
        },
        explanation:
          "You lease a new car for $350/month. You always have a warranty-covered new car with latest safety features. But you'll always have a payment and never own anything.",
        hidden_cost:
          "Leasing is the most expensive way to drive over time. After 10 years of leasing, you've paid $42,000+ with nothing to show. Mileage limits and wear fees add up too.",
      },
      {
        id: 'ch4-d2-c',
        label: 'Finance a new car',
        short_tradeoff: 'New car ownership, significant debt',
        effects: {
          auto_loan: 30000,
          monthly_expenses: 380,
          stress: 10,
        },
        explanation:
          "You buy a new $30,000 car with 5-year financing. You'll own it eventually, but you're paying $580/month for 5 years ($34,800 total). The car will be worth about $12,000 when you're done paying.",
        hidden_cost:
          "You pay $4,800 in interest. The car loses $18,000 in depreciation while you're still paying it off. You're underwater (owe more than it's worth) for the first 2-3 years.",
      },
    ],
  },
  {
    id: 'ch4-d3',
    chapter: 4,
    title: 'Insurance Coverage Decisions',
    scenario_text:
      "You're reviewing your insurance coverage. Your current health, auto, and renters insurance costs $400/month. An agent suggests umbrella insurance ($300/year) and increasing your coverage levels (+$100/month). Your net worth is now $80,000.",
    concept_tags: ['Insurance', 'Risk-Return', 'Emergency Fund'],
    why_it_matters:
      "Insurance is risk transfer. You pay a predictable premium to avoid unpredictable catastrophic losses. The key is insuring against disasters, not minor inconveniences.",
    choices: [
      {
        id: 'ch4-d3-a',
        label: 'Add umbrella, optimize deductibles',
        short_tradeoff: 'Better protection, slightly higher cost',
        effects: {
          monthly_expenses: 50,
          stress: -10,
          long_term_choice: true,
        },
        explanation:
          "You add $1M umbrella insurance ($25/month) and increase deductibles to $1,000 (saving $50/month). Net cost: flat. You're protected against lawsuits while not over-insuring small claims.",
        hidden_cost:
          "Higher deductibles mean you pay more out-of-pocket for minor claims. Your emergency fund must cover these. Trade-off: small claims cost more, catastrophic claims cost less.",
        educator_note:
          "Insurance should protect against catastrophic loss, not minor inconvenience. High deductibles + umbrella = optimal strategy for most.",
      },
      {
        id: 'ch4-d3-b',
        label: 'Increase all coverage levels',
        short_tradeoff: 'Maximum protection, higher ongoing cost',
        effects: {
          monthly_expenses: 100,
          stress: -15,
        },
        explanation:
          "You increase all coverage to maximum levels with low deductibles. You're extremely well protected against any eventuality. Monthly cost increases significantly.",
        hidden_cost:
          "Low deductibles mean you're using insurance for small claims—inefficient. You're paying premium prices for peace of mind that may not be mathematically justified.",
      },
      {
        id: 'ch4-d3-c',
        label: 'Keep minimum required coverage',
        short_tradeoff: 'Lowest cost, highest personal risk',
        effects: {
          monthly_expenses: -50,
          stress: 15,
        },
        explanation:
          "You keep only state-required minimums. Your monthly cost drops, but a serious accident or lawsuit could wipe out your entire $80,000 net worth—and then some.",
        hidden_cost:
          "Minimum auto liability might be $25,000. A serious accident could easily cause $100,000+ in damages. You'd be personally liable for the difference.",
      },
    ],
  },
  {
    id: 'ch4-d4',
    chapter: 4,
    title: 'The Wedding Budget',
    scenario_text:
      "You're getting married! Average wedding cost is $35,000. You have $15,000 saved specifically for this, good income, and no debt. Your partner's family offered to contribute $10,000. How do you approach the budget?",
    concept_tags: ['Lifestyle Inflation', 'Opportunity Cost', 'Present Bias'],
    why_it_matters:
      "Weddings are emotionally charged financial decisions. The industry profits from couples overspending. Starting marriage in debt statistically increases divorce risk.",
    bias_nudge: 'Present bias alert: The wedding is one day. The marriage is forever. Financial stress is the #1 cause of divorce.',
    choices: [
      {
        id: 'ch4-d4-a',
        label: 'Budget wedding ($20,000-25,000)',
        short_tradeoff: 'Meaningful celebration, start marriage strong',
        effects: {
          cash: -15000,
          stress: 5,
          long_term_choice: true,
        },
        explanation:
          "You use your $15,000 + family's $10,000 for a beautiful but budget-conscious wedding. You focus on what matters: committing to your partner in front of loved ones. You start marriage debt-free.",
        hidden_cost:
          "You might need to make some compromises—smaller venue, DIY elements, off-peak date. But 10 years from now, you won't remember the flowers; you'll remember being debt-free.",
        educator_note:
          "Studies show no correlation between wedding spending and marriage happiness. Couples who go into debt for weddings have higher divorce rates.",
      },
      {
        id: 'ch4-d4-b',
        label: 'Average wedding on credit ($35,000)',
        short_tradeoff: 'Dream wedding, start with debt',
        effects: {
          cash: -15000,
          credit_card_debt: 10000,
          stress: 15,
        },
        explanation:
          "You have the wedding you've always dreamed of, putting $10,000 on credit. It's a beautiful day. But you start marriage with $10,000 debt at ~20% interest.",
        hidden_cost:
          "That $10,000 at 20% with minimum payments takes 9 years to pay off and costs $8,000 in interest. Your honeymoon glow fades fast when the bills arrive.",
      },
      {
        id: 'ch4-d4-c',
        label: 'Minimal ceremony, big honeymoon',
        short_tradeoff: 'Prioritize experience over event',
        effects: {
          cash: -20000,
          stress: -5,
        },
        explanation:
          "You have a small courthouse ceremony with close family, then spend $15,000 on an unforgettable 3-week honeymoon. Memories over materialism.",
        hidden_cost:
          "Some family might be hurt not to be included. You might have some regrets about not having the traditional wedding experience. But you'll have amazing memories.",
      },
    ],
  },
  {
    id: 'ch4-d5',
    chapter: 4,
    title: 'Lifestyle Upgrade Decision',
    scenario_text:
      "Your income has grown significantly. You can now afford a much nicer lifestyle—bigger home ($500,000 vs current $300,000), luxury car, premium everything. Your friends in similar jobs have upgraded. Your current lifestyle is comfortable but modest.",
    concept_tags: ['Lifestyle Inflation', 'Opportunity Cost', 'Compound Interest'],
    why_it_matters:
      "Lifestyle inflation is often invisible. The difference between a $300,000 and $500,000 house isn't just $200,000—it's what that $200,000 could become invested.",
    choices: [
      {
        id: 'ch4-d5-a',
        label: 'Stay modest, invest the difference',
        short_tradeoff: 'Maximum wealth building, swim against current',
        effects: {
          investments: 2000,
          monthly_expenses: -200,
          stress: 10,
          long_term_choice: true,
        },
        explanation:
          "You resist the upgrade. The $200,000 difference invested at 7% for 20 years becomes $775,000. Add the $2,000/month in lower expenses invested, and you're looking at $1M+ difference in net worth.",
        hidden_cost:
          "You'll feel 'behind' peers visually. Your home might feel inadequate when hosting. But the math overwhelmingly favors this choice for long-term wealth.",
        educator_note:
          "The Millionaire Next Door research shows most millionaires live well below their means. They drive used cars and live in modest homes.",
      },
      {
        id: 'ch4-d5-b',
        label: 'Partial upgrade, maintain savings rate',
        short_tradeoff: 'Improved lifestyle, still building wealth',
        effects: {
          monthly_expenses: 500,
          mortgage: 100000,
          investments: 500,
          stress: -5,
        },
        explanation:
          "You upgrade to a $400,000 home but keep driving your current car. You improve daily life while still maintaining a solid savings rate. Balance is key.",
        hidden_cost:
          "Even a partial upgrade has compound effects. That extra $100,000 mortgage and $500/month expenses add up over decades.",
      },
      {
        id: 'ch4-d5-c',
        label: 'Full lifestyle upgrade',
        short_tradeoff: 'Best current lifestyle, minimal wealth building',
        effects: {
          monthly_expenses: 2000,
          mortgage: 200000,
          auto_loan: 40000,
          stress: -15,
        },
        explanation:
          "You move to the bigger home, get the luxury car, and enjoy the lifestyle you've earned. Quality of daily life improves dramatically. You're living like your successful peers.",
        hidden_cost:
          "Your savings rate drops to near zero despite high income. In 20 years, your modest-living peers will have $1M+ more than you. You'll be 'rich' but not wealthy.",
      },
    ],
  },
  {
    id: 'ch4-d6',
    chapter: 4,
    title: 'Children Financial Planning',
    scenario_text:
      "You're planning to have children. The USDA estimates raising a child to 18 costs $310,000+ (not including college). You want to start a 529 college savings plan. You're also considering whether to go from two incomes to one.",
    concept_tags: ['Compound Interest', 'Opportunity Cost', 'Taxes'],
    why_it_matters:
      "Children are wonderful but financially significant. Early planning, especially for college costs, makes an enormous difference due to compound growth.",
    choices: [
      {
        id: 'ch4-d6-a',
        label: 'Both work, max 529 contributions',
        short_tradeoff: 'Strong finances, less time with kids',
        effects: {
          monthly_expenses: 1500,
          investments: 500,
          stress: 20,
          long_term_choice: true,
        },
        explanation:
          "Both parents continue working. Childcare is expensive ($1,500/month) but two incomes allow maximum 529 contributions ($500/month). Starting at birth, $500/month for 18 years at 7% = $215,000 for college.",
        hidden_cost:
          "Daycare costs, commute stress, missing milestones. But financially, two incomes usually beat one income minus childcare costs.",
        educator_note:
          "529 plans offer tax-free growth for education expenses. Starting early makes a huge difference—$500/month for 18 years vs 10 years is $215k vs $87k.",
      },
      {
        id: 'ch4-d6-b',
        label: 'One parent stays home, moderate savings',
        short_tradeoff: 'More time with kids, tighter budget',
        effects: {
          monthly_income: -3000,
          monthly_expenses: -1500,
          investments: 200,
          stress: 5,
        },
        explanation:
          "One parent stays home. Income drops but so do childcare costs. You contribute $200/month to a 529 ($43,000 by 18). You're there for every milestone.",
        hidden_cost:
          "The stay-at-home parent's career suffers. Re-entering the workforce later often means lower pay. Total lifetime earning impact can be $500,000+.",
      },
      {
        id: 'ch4-d6-c',
        label: 'Wait on 529, focus on current needs',
        short_tradeoff: 'More flexibility now, college savings lag',
        effects: {
          monthly_expenses: 1000,
          stress: -5,
        },
        explanation:
          "You decide to handle childcare needs first and start the 529 'when things calm down.' College is 18 years away—there's time.",
        hidden_cost:
          "Every year you delay costs compound growth. Starting a 529 at birth vs age 8 can mean $100,000+ difference. Time is your biggest asset.",
      },
    ],
  },

  // ============================================
  // CHAPTER 5: SHOCKS & LONG RUN (Decisions 25-30)
  // ============================================
  {
    id: 'ch5-d1',
    chapter: 5,
    title: 'Job Loss Crisis',
    scenario_text:
      "Unexpected layoff. Your company downsized and you're out. You have 3 months of expenses in emergency savings, marketable skills, and unemployment benefits covering 40% of your previous income for 6 months. What's your strategy?",
    concept_tags: ['Emergency Fund', 'Unemployment', 'Budgeting'],
    why_it_matters:
      "Job loss tests your financial preparation. Those with emergency funds have time to find the right next job; those without often take any job in desperation.",
    choices: [
      {
        id: 'ch5-d1-a',
        label: 'Strategic job search, use emergency fund',
        short_tradeoff: 'Find right fit, deplete savings',
        effects: {
          cash: -3000,
          monthly_income: -1800,
          stress: 25,
          long_term_choice: true,
        },
        explanation:
          "You use your emergency fund as intended—to buy time for a strategic job search. You apply selectively for roles that advance your career. Unemployment + savings covers 3-4 months of focused searching.",
        hidden_cost:
          "Your emergency fund depletes. If the search takes longer than expected, stress increases dramatically. But this often leads to better long-term outcomes.",
        educator_note:
          "This is exactly why emergency funds exist. People with 3-6 months expenses saved recover from job loss with better outcomes than those without.",
      },
      {
        id: 'ch5-d1-b',
        label: 'Take first available job quickly',
        short_tradeoff: 'Income stability, possible step backward',
        effects: {
          monthly_income: -500,
          stress: 15,
        },
        explanation:
          "You take the first reasonable offer to maintain income. It might not be ideal—possibly lower pay or less interesting work—but you preserve your savings and stay employed.",
        hidden_cost:
          "Accepting a lower position can set back your career trajectory. It's harder to get a $100k job when your current job pays $70k.",
      },
      {
        id: 'ch5-d1-c',
        label: 'Cash out investments to extend runway',
        short_tradeoff: 'More time, setback long-term wealth',
        effects: {
          investments: -10000,
          cash: 8500,
          stress: 20,
        },
        explanation:
          "You sell $10,000 in investments (taking a tax hit) to extend your runway to 6+ months. More time to find the perfect job, but your retirement savings takes a significant hit.",
        hidden_cost:
          "Selling investments means potential capital gains taxes plus losing years of compound growth. That $10,000 at 7% for 25 years would be $54,000.",
      },
    ],
  },
  {
    id: 'ch5-d2',
    chapter: 5,
    title: 'Recession Impact',
    scenario_text:
      "A recession hits. Your portfolio drops 35%. Your job seems secure but raises are frozen. Home values in your area fell 15%. Unemployment is rising nationally. How do you respond?",
    concept_tags: ['Recession', 'Loss Aversion', 'Investment Growth'],
    why_it_matters:
      "How you behave during recessions determines long-term wealth. Those who panic sell lock in losses; those who stay invested (or buy more) build wealth.",
    bias_nudge: 'Loss aversion peak: Your brain screams to stop the pain. Historical data shows staying invested through recessions leads to strong recoveries.',
    choices: [
      {
        id: 'ch5-d2-a',
        label: 'Stay invested, increase contributions',
        short_tradeoff: 'Buy low, emotionally difficult',
        effects: {
          investments: 1000,
          cash: -1000,
          stress: 15,
          long_term_choice: true,
        },
        explanation:
          "You remember that stocks are 'on sale.' You increase your 401(k) contribution and buy more index funds at depressed prices. Every past recession has been followed by recovery and new highs.",
        hidden_cost:
          "It doesn't feel good watching your portfolio drop further. The bottom is only clear in hindsight. But historically, this is the wealth-building move.",
        educator_note:
          "From 2008-2009 bottom, the market recovered in ~4 years and was up 400%+ in 15 years. Those who sold missed the recovery.",
      },
      {
        id: 'ch5-d2-b',
        label: 'Hold steady, don\'t change anything',
        short_tradeoff: 'Maintain course, no opportunistic buying',
        effects: {
          stress: 10,
        },
        explanation:
          "You keep your automatic contributions the same and don't look at your portfolio. You ride it out without panic selling or opportunistic buying. Steady as she goes.",
        hidden_cost:
          "You miss the opportunity to buy more at low prices. But you also don't make emotional mistakes. Not terrible, just not optimal.",
      },
      {
        id: 'ch5-d2-c',
        label: 'Reduce risk, move to bonds/cash',
        short_tradeoff: 'Feel safer, lock in losses',
        effects: {
          investments: -5000,
          cash: 4000,
          risk_level: -30,
          stress: -10,
        },
        explanation:
          "You move a portion of investments to bonds and cash to 'reduce risk.' You lock in some losses but sleep better at night. You plan to move back to stocks 'when things stabilize.'",
        hidden_cost:
          "Timing the market rarely works. By the time things feel stable, the recovery is underway and you've missed gains. Selling low, buying high = wealth destruction.",
      },
    ],
  },
  {
    id: 'ch5-d3',
    chapter: 5,
    title: 'Inflation Spike',
    scenario_text:
      "Inflation surges to 8% annually. Your rent just increased 12%. Groceries are up 15%. Your salary only went up 3%. Your purchasing power is shrinking rapidly. How do you adapt?",
    concept_tags: ['Inflation', 'Budgeting', 'Investment Growth'],
    why_it_matters:
      "Inflation is a hidden tax on cash and fixed incomes. Understanding real vs. nominal returns is crucial during high-inflation periods.",
    choices: [
      {
        id: 'ch5-d3-a',
        label: 'Negotiate raise, adjust investments',
        short_tradeoff: 'Proactive adaptation, requires effort',
        effects: {
          monthly_income: 300,
          monthly_expenses: 200,
          investments: 500,
          stress: 10,
          inflation_rate: 0.08,
          long_term_choice: true,
        },
        explanation:
          "You ask for a raise citing inflation and market rates (get 10% instead of 3%). You shift investments slightly toward inflation hedges like I-bonds and TIPS. You're being proactive.",
        hidden_cost:
          "Negotiating raises is stressful. Your employer might say no. But the cost of not asking during high inflation is guaranteed purchasing power loss.",
        educator_note:
          "I-bonds and TIPS adjust for inflation. In high-inflation environments, they preserve purchasing power better than regular bonds.",
      },
      {
        id: 'ch5-d3-b',
        label: 'Cut discretionary spending drastically',
        short_tradeoff: 'Preserve savings, reduced quality of life',
        effects: {
          monthly_expenses: -300,
          stress: 15,
          inflation_rate: 0.08,
        },
        explanation:
          "You slash discretionary spending: no dining out, cancel subscriptions, staycations only. You maintain your savings rate but life is less enjoyable.",
        hidden_cost:
          "Extreme frugality during inflation means your quality of life drops while prices rise. You're treading water, not adapting.",
      },
      {
        id: 'ch5-d3-c',
        label: 'Maintain lifestyle, dip into savings',
        short_tradeoff: 'Preserve quality of life, erode wealth',
        effects: {
          cash: -500,
          monthly_expenses: 400,
          stress: -5,
          inflation_rate: 0.08,
        },
        explanation:
          "You refuse to let inflation change your lifestyle. You dip into savings to maintain your standard of living. You've worked hard and deserve to enjoy life.",
        hidden_cost:
          "Cash sitting in savings loses 8% purchasing power annually. Your savings erode from both inflation and withdrawals. Dual wealth destruction.",
      },
    ],
  },
  {
    id: 'ch5-d4',
    chapter: 5,
    title: 'Medical Emergency',
    scenario_text:
      "Unexpected medical crisis. Total bills: $15,000 after insurance. You have $8,000 in emergency savings, a high-deductible plan with an HSA containing $5,000, and $20,000 in investments. How do you handle this?",
    concept_tags: ['Emergency Fund', 'Insurance', 'Debt Management'],
    why_it_matters:
      "Medical bills are a leading cause of bankruptcy. Understanding your options—HSA, payment plans, hardship programs—can prevent financial ruin.",
    choices: [
      {
        id: 'ch5-d4-a',
        label: 'HSA + emergency fund + negotiate bill',
        short_tradeoff: 'Optimal use of resources, requires advocacy',
        effects: {
          cash: -7000,
          monthly_expenses: 200,
          stress: 15,
          long_term_choice: true,
        },
        explanation:
          "You pay $5,000 from HSA (tax-free), negotiate the remaining $10,000 down 30% to $7,000, and pay that from emergency fund plus a 12-month interest-free payment plan. Total out of pocket: $12,000.",
        hidden_cost:
          "Negotiating medical bills requires time and persistence. Not everyone succeeds. But most hospitals have hardship policies they don't advertise.",
        educator_note:
          "Always negotiate medical bills. Ask for itemized bills, dispute errors, request hardship discounts, and arrange payment plans before using credit.",
      },
      {
        id: 'ch5-d4-b',
        label: 'Pay with credit card for points',
        short_tradeoff: 'Simple, potentially expensive',
        effects: {
          credit_card_debt: 15000,
          stress: 25,
        },
        explanation:
          "You put all $15,000 on a rewards credit card to earn points, planning to pay it off 'as fast as possible.' But 20% APR on $15,000 is $3,000/year in interest if not paid quickly.",
        hidden_cost:
          "Credit card interest on medical debt is among the worst ways to handle it. Most providers offer 0% payment plans that beat any credit card rewards.",
      },
      {
        id: 'ch5-d4-c',
        label: 'Sell investments to avoid debt',
        short_tradeoff: 'No debt, sacrifice long-term growth',
        effects: {
          investments: -12000,
          cash: 9500,
          stress: 10,
        },
        explanation:
          "You liquidate $12,000 in investments (after tax impact) and use emergency fund to pay in full. You avoid debt but your retirement savings takes a major hit.",
        hidden_cost:
          "That $12,000 invested for 25 years at 7% would become $65,000. You're trading future wealth for present peace of mind.",
      },
    ],
  },
  {
    id: 'ch5-d5',
    chapter: 5,
    title: 'Early Retirement Possibility',
    scenario_text:
      "You're 45 with $800,000 invested. Using the 4% rule, you could withdraw $32,000/year indefinitely. Your current expenses are $45,000/year. You could: keep working to the standard 65, retire early with a leaner lifestyle, or pursue a passion that pays less.",
    concept_tags: ['Compound Interest', 'Risk-Return', 'Opportunity Cost'],
    why_it_matters:
      "The 4% rule suggests you can withdraw 4% annually from a diversified portfolio with low risk of running out in 30 years. But early retirement requires more conservative planning.",
    choices: [
      {
        id: 'ch5-d5-a',
        label: 'Keep working, target $1.5M by 55',
        short_tradeoff: 'Maximum security, delayed freedom',
        effects: {
          investments: 5000,
          stress: 10,
          long_term_choice: true,
        },
        explanation:
          "You continue working and investing aggressively. In 10 years, your $800,000 could grow to $1.5M+, allowing $60,000/year withdrawals—a comfortable retirement at 55.",
        hidden_cost:
          "10 more years of work. You're trading time for security. If health issues arise, you might regret not retiring earlier.",
        educator_note:
          "The 4% rule is based on historical market returns. For early retirement (30+ years), some advisors recommend 3-3.5% to be safer.",
      },
      {
        id: 'ch5-d5-b',
        label: 'Retire now with lean lifestyle',
        short_tradeoff: 'Freedom now, tight budget forever',
        effects: {
          monthly_income: -3000,
          monthly_expenses: -1200,
          stress: -20,
        },
        explanation:
          "You retire now and reduce expenses to $32,000/year. You move to a lower cost-of-living area, embrace minimalism, and gain freedom. Every day is yours.",
        hidden_cost:
          "Little margin for error. Healthcare before Medicare (10 years) is expensive. Any market downturn or unexpected expense threatens your plan.",
      },
      {
        id: 'ch5-d5-c',
        label: 'Pursue passion, semi-retire',
        short_tradeoff: 'Meaningful work, some income needed',
        effects: {
          monthly_income: -2000,
          monthly_expenses: -500,
          stress: -15,
        },
        explanation:
          "You leave your corporate job to pursue work you love that pays less—maybe $25,000/year. Combined with small portfolio withdrawals, you cover expenses while doing fulfilling work.",
        hidden_cost:
          "Your passion might not sustain income. You're dependent on both market returns and continued ability/desire to work.",
      },
    ],
  },
  {
    id: 'ch5-d6',
    chapter: 5,
    title: 'Legacy Planning',
    scenario_text:
      "You're established now with significant assets. It's time to think about legacy. Options include maximizing inheritance for children, charitable giving, or spending more on experiences while alive. Estate taxes apply above $12.9M (single).",
    concept_tags: ['Taxes', 'Compound Interest', 'Opportunity Cost'],
    why_it_matters:
      "Legacy planning isn't just for the ultra-wealthy. How you allocate resources in later years affects both your quality of life and what you leave behind.",
    choices: [
      {
        id: 'ch5-d6-a',
        label: 'Balance giving and enjoying',
        short_tradeoff: 'Balanced approach, no optimization',
        effects: {
          monthly_expenses: 500,
          cash: -2000,
          stress: -10,
          long_term_choice: true,
        },
        explanation:
          "You increase spending on experiences (travel, time with family), maintain charitable giving, and let the remainder go to heirs. Die with some money but not all of it.",
        hidden_cost:
          "Not maximizing any single goal. Your heirs get less than if you lived frugally, and charities get less than if you prioritized giving.",
        educator_note:
          "Research shows spending on experiences provides more lasting happiness than material goods, especially experiences with loved ones.",
      },
      {
        id: 'ch5-d6-b',
        label: 'Maximize inheritance for children',
        short_tradeoff: 'Family wealth transfer, personal sacrifice',
        effects: {
          monthly_expenses: -500,
          investments: 1000,
          stress: 5,
        },
        explanation:
          "You live frugally to maximize what you leave to children. You find meaning in building generational wealth. Every dollar you don't spend is a dollar that grows for the next generation.",
        hidden_cost:
          "You might die with regrets about experiences not had. Research on inherited wealth shows children often handle it poorly. Are you preparing them?",
      },
      {
        id: 'ch5-d6-c',
        label: 'Die with zero approach',
        short_tradeoff: 'Maximum experiences, nothing left over',
        effects: {
          monthly_expenses: 1500,
          investments: -2000,
          stress: -20,
        },
        explanation:
          "You aim to spend your last dollar on your last day. You increase spending dramatically on experiences, give to charities now (tax benefits), and give children financial support while alive rather than after.",
        hidden_cost:
          "Risk of outliving your money. Unexpected longevity or health costs could leave you dependent on children or government support.",
      },
    ],
  },
]

// Chapter metadata
export const chapters = [
  {
    number: 1,
    title: 'Starting Out',
    description: 'Building foundations: income, budgeting, and emergency funds',
    decisions: [0, 1, 2, 3, 4, 5],
  },
  {
    number: 2,
    title: 'Debt & Credit',
    description: 'Managing debt, building credit, and understanding interest',
    decisions: [6, 7, 8, 9, 10, 11],
  },
  {
    number: 3,
    title: 'Investing & Growth',
    description: 'Growing wealth through smart investing and compound returns',
    decisions: [12, 13, 14, 15, 16, 17],
  },
  {
    number: 4,
    title: 'Housing & Big Choices',
    description: 'Major life decisions: homes, cars, family, and lifestyle',
    decisions: [18, 19, 20, 21, 22, 23],
  },
  {
    number: 5,
    title: 'Shocks & Long Run',
    description: 'Handling crises and planning for the future',
    decisions: [24, 25, 26, 27, 28, 29],
  },
]
