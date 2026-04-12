import { db, blogsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./logger";

const SEED_POSTS = [
  {
    slug: "understanding-smsf-is-it-right-for-you",
    title: "Understanding SMSF: Is a Self-Managed Super Fund Right for You?",
    excerpt:
      "Self-managed super funds offer Australians unparalleled control over their retirement savings. But with great control comes great responsibility. Here's what you need to know before making the switch.",
    category: "SMSF",
    date: "March 28, 2025",
    readTime: "6 min read",
    author: "Pointers Consulting",
    content: `Self-managed super funds (SMSFs) have become increasingly popular among Australians seeking greater control over their retirement savings. With over 600,000 SMSFs managing more than $900 billion in assets, it's clear that many Australians see value in this approach. But is an SMSF right for you?

**What is an SMSF?**

An SMSF is a private superannuation fund that you manage yourself. Unlike industry or retail super funds, with an SMSF you are both a trustee and a member. This means you make all the investment decisions and are responsible for ensuring the fund complies with superannuation laws.

**The key advantages**

The primary appeal of an SMSF lies in investment flexibility. Unlike public-offer funds, an SMSF can invest in a broader range of assets including direct property, unlisted shares, collectibles, and business real property. This can be particularly attractive for business owners who may wish to hold their business premises within their super fund.

Additionally, SMSFs can offer tax planning opportunities. With the right strategy, you can manage the timing of investment income and capital gains to minimise tax, particularly as you approach retirement.

Estate planning is another area where SMSFs shine. You have far more flexibility in how your super benefits are distributed to your beneficiaries, including the ability to create binding death benefit nominations and pension strategies that can provide ongoing income to dependants.

**The responsibilities you must accept**

Running an SMSF is not a passive endeavour. As a trustee, you are legally responsible for the fund's compliance with superannuation legislation. The Australian Taxation Office (ATO) has extensive powers to penalise non-compliant funds, and penalties can be significant.

You must prepare annual financial statements, arrange an independent audit, lodge an annual return with the ATO, and ensure investments align with your fund's investment strategy. The time commitment is real — most SMSF trustees spend several hours per month managing their fund.

**Is it worth it financially?**

The economics of an SMSF typically start to make sense when your combined member balance reaches $200,000 or more. Below this threshold, the fixed costs of running the fund — auditing, accounting, and administration — tend to represent a disproportionate percentage of the fund's assets.

**Getting the right advice**

Before establishing an SMSF, you should seek advice from a licensed SMSF specialist. The decision should be based on your individual circumstances, including your retirement goals, investment knowledge, and the time you're willing to commit to fund administration.

At Pointers Consulting, we help clients navigate every aspect of SMSF establishment and ongoing management. If you're considering an SMSF, reach out to our team for a comprehensive assessment of whether this structure suits your situation.`,
  },
  {
    slug: "top-tax-strategies-australian-small-business-2025",
    title: "Top Tax Strategies for Australian Small Business Owners in 2025",
    excerpt:
      "With the end of the financial year approaching, now is the time to review your tax position. These proven strategies can help Australian small business owners legally minimise their tax obligations.",
    category: "Tax",
    date: "March 15, 2025",
    readTime: "7 min read",
    author: "Pointers Consulting",
    content: `For Australian small business owners, effective tax planning is not just about the end of the financial year — it's a year-round discipline. The strategies you implement now can significantly reduce your tax liability while keeping you on the right side of the ATO.

**Instant Asset Write-Off**

The instant asset write-off scheme remains one of the most powerful tools available to small businesses. Eligible businesses can immediately deduct the business portion of an asset's cost in the year the asset is first used or installed ready for use. Understanding which assets qualify and timing your purchases strategically can make a significant difference to your taxable income.

**Division 7A Loan Strategies**

If your business operates through a company structure, Division 7A rules govern loans and payments made to shareholders or associates. Getting this wrong can result in deemed dividends that are fully assessable. Proper planning around Division 7A, including the use of complying loan agreements, is essential for any private company.

**Pre-Paying Expenses**

Businesses can prepay certain expenses up to 12 months in advance and claim an immediate deduction. This strategy can be particularly effective in years where you've had higher than usual income. Common candidates include professional indemnity insurance, subscriptions, and lease payments.

**Superannuation Contributions**

Contributing to superannuation for yourself and your employees is both a genuine business expense and a meaningful way to build long-term wealth. For business owners who are also employees of their company, maximising concessional contributions (currently up to $30,000 per annum for most individuals) while they remain tax-deductible is a high-priority strategy.

**Trust Distribution Planning**

If your business operates through a family trust, careful planning around income distributions can significantly reduce the overall family tax burden. Distributing income to lower-income family members (where legitimate and appropriate) can utilise their lower marginal tax rates.

**Small Business Tax Concessions**

Businesses with an aggregated turnover under $10 million qualify for a range of small business tax concessions. These include the small business income tax offset for sole traders, concessions on capital gains tax, and simplified depreciation rules.

The tax landscape changes frequently, and strategies that were optimal last year may not be ideal this year. Working with a qualified tax adviser who understands your business structure and goals is essential to staying ahead. Contact Pointers Consulting to discuss a tailored tax strategy for your business.`,
  },
  {
    slug: "smsf-compliance-checklist",
    title: "SMSF Compliance Checklist: What Every Trustee Needs to Know",
    excerpt:
      "Compliance is the foundation of a successful SMSF. Missing a key obligation can result in significant penalties. This comprehensive checklist helps trustees stay on top of their responsibilities.",
    category: "SMSF",
    date: "February 20, 2025",
    readTime: "8 min read",
    author: "Pointers Consulting",
    content: `Running an SMSF comes with substantial compliance obligations. The Australian Tax Office actively monitors SMSF trustees, and the consequences of non-compliance can include fund disqualification, significant financial penalties, and in serious cases, criminal prosecution.

**Annual Obligations**

Every SMSF must have its financial statements prepared each financial year. These include a balance sheet, operating statement, and member statements. An independent approved SMSF auditor must then audit these financial statements and assess the fund's compliance with superannuation laws.

Following the audit, the SMSF annual return must be lodged with the ATO. This includes financial information, member information, and regulatory information.

**Investment Strategy**

Your fund must have a documented investment strategy that considers liquidity, the ability to discharge liabilities, insurance for members, and the composition of investments with regard to risk, return, and diversification.

**Sole Purpose Test**

Every investment made by your SMSF must satisfy the sole purpose test — the fund must be maintained solely to provide retirement benefits to members.

**In-House Asset Rules**

Investments in related parties or entities are generally limited to 5% of the fund's total asset value.

**Contribution Caps**

Members must not exceed their concessional ($30,000) and non-concessional ($120,000) contribution caps. Exceeding these caps results in additional tax and potentially penalties.

Given the complexity of SMSF compliance, most trustees benefit from working with a specialist SMSF administrator and adviser. Pointers Consulting provides comprehensive SMSF compliance services to ensure your fund remains on the right side of the law.`,
  },
  {
    slug: "maximise-super-contributions-2024-25",
    title: "How to Maximise Your Super Contributions in the 2024-25 Financial Year",
    excerpt:
      "Superannuation contribution rules have been updated for 2024-25. Understanding the current caps, carry-forward provisions, and co-contribution rules can significantly boost your retirement savings.",
    category: "Superannuation",
    date: "February 5, 2025",
    readTime: "5 min read",
    author: "Pointers Consulting",
    content: `The 2024-25 financial year brings updated superannuation contribution caps and rules that present significant opportunities for Australians looking to accelerate their retirement savings.

**Concessional Contributions**

Concessional contributions are before-tax contributions that are taxed at 15% within the super fund. For 2024-25, the concessional contribution cap is $30,000. For those with a total super balance under $500,000, unused concessional contribution cap amounts from the prior five years can be carried forward and used in the current year.

**Non-Concessional Contributions**

Non-concessional contributions are after-tax contributions to super. The cap for 2024-25 is $120,000 per year. However, individuals under age 75 may be able to bring forward up to three years' worth of non-concessional contributions, allowing a maximum of $360,000 in a single year.

**Government Co-Contributions**

For lower-income earners who make after-tax contributions to their super, the government may provide a co-contribution of up to $500.

**Spouse Contributions**

If your spouse earns less than $37,000 per year, you may be able to claim an 18% tax offset on up to $3,000 of contributions made to their super account.

If you're unsure how to optimise your super contributions for your individual circumstances, Pointers Consulting can provide personalised advice to help you make the most of the available opportunities.`,
  },
  {
    slug: "business-succession-planning",
    title: "Business Succession Planning: Protecting Your Legacy",
    excerpt:
      "Every business owner will eventually exit their business, whether through sale, retirement, or unexpected illness. Having a comprehensive succession plan protects your life's work and ensures your legacy endures.",
    category: "Business Advisory",
    date: "January 22, 2025",
    readTime: "7 min read",
    author: "Pointers Consulting",
    content: `Business succession planning is one of the most important — and most frequently neglected — aspects of running a business. Research consistently shows that fewer than 30% of family businesses successfully transition to the next generation, and a significant factor is the absence of a formal succession plan.

**Why Succession Planning Matters**

Whether you intend to sell your business to a third party, pass it to a family member, or hand it over to key employees, the preparation required is substantial and time-consuming. Starting early — ideally five to ten years before your intended exit — gives you the time to make the business as attractive and transferable as possible.

**Valuing Your Business**

The foundation of any succession plan is a realistic understanding of what your business is worth. Many business owners are surprised to discover that their business is worth significantly less than they expected, particularly if heavily dependent on their personal relationships or expertise.

**Structuring for Succession**

The legal and tax structure of your business has significant implications for how it can be sold or transferred. The small business CGT concessions can reduce or eliminate capital gains tax on the sale of a business, but accessing these concessions requires careful planning.

**Key Person Risk**

Life insurance and total and permanent disability (TPD) insurance held within super can provide the funds necessary to buy out an incapacitated owner's interest and allow the business to continue.

**Documenting the Succession Plan**

A good succession plan documents not just the intended ownership transition, but also knowledge transfer, customer and supplier relationship management, and the timeline for handing over management responsibilities.

Pointers Consulting works with business owners at every stage of their succession journey. Contact us to begin the conversation.`,
  },
];

export async function seedBlogs(): Promise<void> {
  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogsTable);

  if (row.count > 0) {
    logger.info({ count: row.count }, "Blogs already seeded, skipping");
    return;
  }

  await db.insert(blogsTable).values(SEED_POSTS);
  logger.info({ count: SEED_POSTS.length }, "Seeded blog posts");
}
