export const SEED_TOOLS = [
  // FOOD AND DINING
  {
    slug: "ondc-apps",
    name: "ONDC (MagicPin/Paytm)",
    tagline: "Zero commission direct-to-restaurant ordering.",
    category: "Food & Dining Hacks",
    affiliateUrl: "https://paytm.com/ondc",
    seoContent: `
## The Strategy
Most people use standard food delivery apps and silently accept heavily inflated menus. **ONDC (MagicPin/Paytm)** is a government-backed protocol that removes the aggressive middleman, connecting you directly to the restaurant's Point-of-Sale system.

By bypassing the 25-30% platform fee that Swiggy and Zomato extract from restaurants, you access the true "dine-in" menu price, plus a transparent delivery fee.

### Dos
*   **Do** compare the exact same cart across Zomato and ONDC before checking out.
*   **Do** look out for ONDC-specific network coupons applied automatically.

### Donts
*   **Don't** expect instant customer service refunds; ONDC is a decentralized network, so resolutions take longer.

### Alternatives
You could use traditional delivery apps or phone the restaurant for direct delivery, but ONDC provides the digital convenience of tracking paired with structural cost savings.
    `,
    comparison: {
      features: ['Zero Platform Markup', 'Direct Restaurant Payment', 'Stacked Discounts', 'No Surge Multiplier'],
      main: { name: 'ONDC', checks: [true, true, true, true] },
      competitors: [
        { name: 'Zomato', checks: [false, false, false, false] },
        { name: 'Swiggy', checks: [false, false, false, false] }
      ]
    }
  },
  {
    slug: "eatsure",
    name: "EatSure",
    tagline: "Multi-restaurant free delivery food court.",
    category: "Food & Dining Hacks",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Food delivery platform fees stack up quickly, especially when people in a group want different cuisines. **EatSure** operates "cloud kitchens" hosting multiple brands under one roof.

The structural loophole here is entirely eliminating platform delivery fees when ordering from multiple restaurants in a single cart.

### Dos
*   **Do** coordinate group orders. One friend wants pizza, another wants biryani? Add both from respective cloud kitchens.
*   **Do** leverage their native loyalty program for compounding discounts.

### Donts
*   **Don't** assume you can order from independent local spots; EatSure is restricted to its own portfolio of brands (e.g., Faasos, Behrouz, Ovenstory).

### Alternatives
You could place multiple individual orders on standard apps and pay delivery/surge fees, or you could order from a single generic restaurant to compromise.
    `,
    comparison: {
      features: ['Zero Delivery Fees', 'Multi-Brand Cart', 'Loyalty Program', 'Dine-In Discounts'],
      main: { name: 'EatSure', checks: [true, true, true, false] },
      competitors: [
        { name: 'Zomato', checks: [false, false, false, true] },
        { name: 'Swiggy', checks: [false, false, false, true] }
      ]
    }
  },
  {
    slug: "gyftr-park-plus",
    name: "GyFTR / Park+",
    tagline: "Credit card gift voucher multiplier.",
    category: "Food & Dining Hacks",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Never pay full price on food delivery apps. By treating your meals as a prepaid expense, you can drastically decrease your upfront cost. 

Platforms like **GyFTR and Park+** allow you to purchase Swiggy and Zomato gift cards at a flat 5-10% discount. When stacked with high-tier credit cards (like HDFC Infinia or SBI Cashback), your effectively yield approaches 15-16.5%.

### Dos
*   **Do** buy exactly the amount you need right before ordering to avoid locking up cash.
*   **Do** load these vouchers into your app's wallet and stack them with existing promo codes.

### Donts
*   **Don't** buy massive denomination cards unless you order frequently, as these vouchers expire.
*   **Don't** forget that gift card purchases don't earn native milestone rewards on some basic credit cards.

### Alternatives
Paying directly via UPI or standard debit cards limits your baseline discount to $0.
    `,
    comparison: {
      features: ['Flat Discount Vouchers', 'Credit Card Stacking', 'Instant Redemption', 'Transferable'],
      main: { name: 'GyFTR / Park+', checks: [true, true, true, false] },
      competitors: [
        { name: 'Direct Wallet Load', checks: [false, false, true, false] },
        { name: 'Standard Promo Code', checks: [false, true, true, false] }
      ]
    }
  },
  {
    slug: "dineout-eazydiner",
    name: "Dineout / EazyDiner",
    tagline: "Pre-booked 50% flat dining discounts.",
    category: "Food & Dining Hacks",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Walk-in dining is structurally the most expensive way to eat out. Using **Dineout or EazyDiner** shifts you into a pre-booked yield management system where restaurants offer 25-50% off the entire bill just for committing to a time slot.

When it is time to pay, paying the discounted bill directly through the app unlocks an additional immediate 10-15% off via bank tie-ups.

### Dos
*   **Do** book off-peak slots (like 6:30 PM or 10:30 PM) for the absolute maximum discount percentage.
*   **Do** pay via the app's native gateway combining bank offers.

### Donts
*   **Don't** pay the physical bill on the table directly, or you forfeit the secondary gateway discounts.
*   **Don't** assume set menus qualify for the flat percentage discount; always check exclusions.

### Alternatives
Zomato Gold offers baseline 10-15% on dining, but lacks the extreme 50% yield management of EazyDiner Prime.
    `,
    comparison: {
      features: ['Up to 50% Flat Off', 'Gateway Bank Discounts', 'Buffet Special Pricing', 'Guaranteed Table'],
      main: { name: 'EazyDiner', checks: [true, true, true, true] },
      competitors: [
        { name: 'Zomato Gold', checks: [false, true, false, false] },
        { name: 'Walk-In', checks: [false, false, false, false] }
      ]
    }
  },

  // FLIGHTS
  {
    slug: "google-flights",
    name: "Google Flights (ITA Matrix)",
    tagline: "The absolute date grid calendar.",
    category: "Flight & Travel Engineering",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Most people book flights by typing their exact dates into Expedia and accepting the first price. **Google Flights** completely changes the game by giving you a consumer-friendly interface to the underlying ITA Matrix software used by travel agents.

The real power is visual plotting: using the interactive Date Grid or Price Graph to see the structural 24-hour window where airlines dump their lowest fare inventory.

### Dos
*   **Do** leave your destination blank ("Everywhere") and visually scan the map for cheap hubs.
*   **Do** enable "Track Prices" to receive an immediate email alert when an algorithm drops the price below average.

### Donts
*   **Don't** fall for the "Basic Economy Trap." Google will quote the lowest index price, which almost never includes carry-on luggage.

### Alternatives
Skyscanner is great for fragmented airlines, but Google Flights executes matrix searches exponentially faster and offers vastly superior historical price graphing.
    `,
    comparison: {
      features: ['ITA Matrix Engine', 'Price Graphing', 'Direct Airline Booking', 'Hidden City Fares'],
      main: { name: 'Google Flights', checks: [true, true, true, false] },
      competitors: [
        { name: 'Skyscanner', checks: [false, true, false, false] },
        { name: 'Expedia', checks: [false, false, true, false] }
      ]
    }
  },
  {
    slug: "skyscanner-everywhere",
    name: "Skyscanner 'Everywhere'",
    tagline: "Finding the cheapest destination visually.",
    category: "Flight & Travel Engineering",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
If your goal is simply to "travel cheaply" and you are flexible, picking a destination first ruins your leverage. 

**Skyscanner** allows you to type "Everywhere" into the destination box and sets the date to "Cheapest Month." It recursively searches the pricing APIs of every airline to output a ranked list of the cheapest countries on earth to fly to from your home airport.

### Dos
*   **Do** use this to find cheap "positioning flights" to major continental hubs.
*   **Do** combine this search with budget airlines that don't always index correctly on major OTAs.

### Donts
*   **Don't** book complex multi-city connections blindly through terrible third-party agents shown on Skyscanner solely because they are $5 cheaper.

### Alternatives
Google Flights Explore offers a similar map view, but Skyscanner frequently indexes ultra-low-cost regional carriers better in Europe and Asia.
    `,
    comparison: {
      features: ['"Everywhere" Routing', 'Low-Cost Carrier Indexing', 'Multi-City Mapping', 'Direct Airline Booking'],
      main: { name: 'Skyscanner', checks: [true, true, true, false] },
      competitors: [
        { name: 'Google Flights', checks: [true, false, false, true] },
        { name: 'Kayak', checks: [false, false, true, false] }
      ]
    }
  },
  {
    slug: "skiplagged",
    name: "Skiplagged",
    tagline: "The 'Hidden City' ticketing loophole.",
    category: "Flight & Travel Engineering",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Airlines price flights based on market demand, not distance. A direct flight from New York to Atlanta might cost $300, but a flight from New York to Florida *with a layover in Atlanta* might only cost $150.

**Skiplagged** is a search engine built entirely around this pricing anomaly. You book the $150 flight to Florida, get off at your "layover" in Atlanta, and simply throw away the second half of the ticket.

### Dos
*   **Do** travel exclusively with a personal item or carry-on backpack.
*   **Do** book "hidden city" trips as one-way tickets to avoid the rest of your itinerary being canceled.

### Donts
*   **Don't** ever check a bag. Your checked bag will go to the final destination on the ticket, not your secret layover drop-off point.
*   **Don't** link your frequent flyer account to this ticket, as airlines actively penalize this behavior.

### Alternatives
You could map this out manually on Google Flights, but Skiplagged automates the complex graph theory required to find these exact intersecting routes.
    `,
    comparison: {
      features: ['Hidden City Routing', 'Extreme Algorithm Bypassing', 'Layover Mapping', 'Frequent Flyer Safe'],
      main: { name: 'Skiplagged', checks: [true, true, true, false] },
      competitors: [
        { name: 'Standard OTA', checks: [false, false, false, true] },
        { name: 'Airline Direct', checks: [false, false, false, true] }
      ]
    }
  },
  {
    slug: "seatguru-aerolopa",
    name: "SeatGuru / AeroLOPA",
    tagline: "Pre-booking airplane seat validation.",
    category: "Flight & Travel Engineering",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Not all airplane seats are created equal. Airlines hide structural flaws (missing windows, proximity to lavatories, un-reclinable rows) on their generic booking maps.

**SeatGuru and AeroLOPA** provide highly detailed, user-verified aircraft blueprints. You cross-reference your exact flight number to see high-fidelity seating charts indicating the best and worst physical seats on the actual metal you'll be flying.

### Dos
*   **Do** check AeroLOPA for ultra-modern, dimensionally accurate 2D maps of aircraft cabins.
*   **Do** verify window alignment before paying a premium for a "window seat" that is actually a solid wall.

### Donts
*   **Don't** rely on SeatGuru for recent aircraft refits; aeroLOPA is generally more updated while SeatGuru has more user reviews.

### Alternatives
Blindly trusting the airline's rectangular grid map often results in paying extra for seats right next to loud galley operations.
    `,
    comparison: {
      features: ['Detailed Blueprinting', 'Window Alignment Check', 'Lavatory Proximity', 'Ticket Booking'],
      main: { name: 'AeroLOPA', checks: [true, true, true, false] },
      competitors: [
        { name: 'SeatGuru', checks: [true, false, true, false] },
        { name: 'Airline Map', checks: [false, false, false, true] }
      ]
    }
  },
  {
    slug: "awardwallet",
    name: "AwardWallet",
    tagline: "Frequent flyer mileage tracker.",
    category: "Flight & Travel Engineering",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Points and miles are an alternate currency, but fragmentation leads to expiration and immense lost value. 

**AwardWallet** systematically logs into hundreds of your airline, hotel, and credit card loyalty accounts. It aggregates every single mile you own into a unified dashboard, alerting you specifically when points are slated to expire so you can execute a micro-transaction to keep them alive.

### Dos
*   **Do** sync your primary email inbox so AwardWallet can automatically extract travel itineraries and update point balances.
*   **Do** monitor expiration calendars rigorously.

### Donts
*   **Don't** forget that some major U.S. airlines actively block third-party trackers, requiring you to manually update or rely on email syncing rather than direct API connections.

### Alternatives
Using a homemade Excel sheet works, but lacks automated expiration warnings and real-time dashboarding.
    `,
    comparison: {
      features: ['Aggregated Dashboard', 'Expiration Alerts', 'Email Parsing', 'Auto-Booking'],
      main: { name: 'AwardWallet', checks: [true, true, true, false] },
      competitors: [
        { name: 'Spreadsheets', checks: [false, false, false, false] },
        { name: 'Airline App', checks: [false, false, false, true] }
      ]
    }
  },

  // CABS
  {
    slug: "indrive",
    name: "inDrive",
    tagline: "Peer-to-peer fare bidding.",
    category: "Cab & Transport Arbitrage",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Algorithmic pricing has destroyed affordable cab rides. **inDrive** completely disintermediates the algorithm, turning ride-sharing into a direct, negotiated marketplace.

Instead of a black-box surge multiplier dictating terms, users propose a fare directly to surrounding drivers. Drivers can accept, ignore, or counter the offer in real time. Because the platform commission is substantially lower, drivers are happier taking a slightly lower gross fare.

### Dos
*   **Do** check the algorithmic price on Uber/Ola first to establish a baseline.
*   **Do** bid exactly 10-20% lower than that baseline for an instant driver acceptance.

### Donts
*   **Don't** lowball disrespectfully during peak rush hour; the market will ignore you.
*   **Don't** use it when safety tracking is your absolute paramount concern, as their support infrastructure is still scaling.

### Alternatives
Uber and Ola rely heavily on surge algorithms and extract massive fees, leaving both riders and drivers at a disadvantage compared to a transparent peer-to-peer bidding system.
    `,
    comparison: {
      features: ['Negotiable Base Cost', 'Zero Algorithmic Surge Multiplier', 'Cash Payments Preferred', 'Low Driver Cancellation Route'],
      main: { name: 'inDrive', checks: [true, true, true, true] },
      competitors: [
        { name: 'Uber', checks: [false, false, false, false] },
        { name: 'Ola', checks: [false, false, false, false] }
      ]
    }
  },
  {
    slug: "blusmart",
    name: "BluSmart",
    tagline: "Flat-rate EV scheduling without surge.",
    category: "Cab & Transport Arbitrage",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
When you are heading to the airport at 4 A.M., the last thing you want is a driver cancellation or a 3x algorithmic surge price.

**BluSmart** operates a fully-owned, zero-surge electric vehicle fleet. Because drivers are employees rather than gig-workers, they structurally cannot cancel on you. You leverage this by scheduling high-stakes trips well in advance. 

### Dos
*   **Do** schedule your airport drop-offs 24-48 hours in advance to lock in guaranteed availability.
*   **Do** use their native wallet feature for extra cashback loading.

### Donts
*   **Don't** count on them for immediate, on-the-spot hailing during rush hour, as their scheduled inventory dictates availability.

### Alternatives
Uber Reserve exists but still heavily marks up the base fare to guarantee the ride, whereas BluSmart charges standardized per-kilometer flat rates.
    `,
    comparison: {
      features: ['Scheduled Predictability', 'Zero Surge Multiplier', 'EV Cleanliness', 'Intercity Coverage'],
      main: { name: 'BluSmart', checks: [true, true, true, false] },
      competitors: [
        { name: 'Uber', checks: [false, false, false, true] },
        { name: 'Ola', checks: [false, false, false, true] }
      ]
    }
  },
  {
    slug: "amazon-pay-cabs",
    name: "Amazon Pay Gift Cards",
    tagline: "Voucher arbitrage for ride apps.",
    category: "Cab & Transport Arbitrage",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Why pay full price for a cab when you can engineer a discount before you even step inside?

Using credit card reward portals or Amazon Pay, you can consistently purchase Uber and Ola digital gift vouchers at a flat 3-5% discount (or more via bank rewards). You load the entire voucher into your Uber Wallet and set it as the default payment method.

### Dos
*   **Do** stack this with Uber's subscription passes for double-layered discounts.
*   **Do** use optimized cashback credit cards (like Amazon Pay ICICI) when purchasing the vouchers.

### Donts
*   **Don't** purchase massive balances if you rarely take cabs, as funds locked in digital wallets offer zero yield and eventually expire.

### Alternatives
Paying by standard credit card or UPI leaves this free margin entirely on the table.
    `,
    comparison: {
      features: ['Pre-loaded Discount', 'Credit Card Multiplier', 'Stacks with Promos', 'Inter-app Transfer'],
      main: { name: 'Gift Card method', checks: [true, true, true, false] },
      competitors: [
        { name: 'UPI Direct', checks: [false, false, false, false] },
        { name: 'Credit Card Direct', checks: [false, false, false, false] }
      ]
    }
  },
  {
    slug: "rapido-namma-yatri",
    name: "Rapido / Namma Yatri",
    tagline: "Zero-commission auto-rickshaw hailing.",
    category: "Cab & Transport Arbitrage",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Short-distance commutes are plagued by minimum-fare markups on traditional cab platforms.

Apps like **Rapido** (for 2-wheelers) and open-source models like **Namma Yatri** (for auto-rickshaws) bypass heavy corporate routing taxes. Namma Yatri operates on the ONDC network, charging drivers zero commission and allowing them to charge you the direct, un-inflated meter rate plus a tiny booking convenience fee.

### Dos
*   **Do** rely on this during extreme traffic gridlocks where a 2-wheeler or auto can actively maneuver better than an SUV.
*   **Do** carry exact digital change (UPI) as payments are often direct-to-driver.

### Donts
*   **Don't** expect the same level of granular GPS safety tracking or air-conditioned comfort as tier-1 cab apps.

### Alternatives
Uber Auto exists, but the heavy platform commission often results in drivers demanding offline cash transactions anyway.
    `,
    comparison: {
      features: ['Zero Driver Commission', 'Direct UPI Payment', 'Traffic Maneuvering', 'Premium Vehicles'],
      main: { name: 'Namma Yatri', checks: [true, true, true, false] },
      competitors: [
        { name: 'Uber Auto', checks: [false, false, false, false] },
        { name: 'Ola Auto', checks: [false, false, false, false] }
      ]
    }
  },

  // SHOPPING & CASHBACK
  {
    slug: "keepa-camelcamelcamel",
    name: "Keepa / CamelCamelCamel",
    tagline: "Amazon historical price charting.",
    category: "Shopping & Cashback",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Millions of shoppers blindly trust the strike-through "discount" price during Prime Day or Big Billion Days. 

**Keepa** exposes the mathematical truth. It's a browser extension that permanently embeds a highly detailed historical price graph directly onto every single Amazon product page. You can instantly see if a retailer artificially jacked up the price by 40% a week ago just to offer a fake "30% off" sale today.

### Dos
*   **Do** set "Price Drop Alerts" for 5% to 10% below the 90-day historic median to catch algorithmic flash drops.
*   **Do** enable tracking for 'Lightning Deals' inside Keepa's advanced settings.

### Donts
*   **Don't** bother checking lightning-fast 15-minute flash sales; the tracker APIs sometimes lag behind immediate manual drops.

### Alternatives
CamelCamelCamel does the exact same thing via a website dashboard, but Keepa's direct, seamless injection of the graph onto the Amazon page itself makes it vastly superior.
    `,
    comparison: {
      features: ['Page Injection', 'Fake Sale Detection', 'Stock Alerts', 'Auto-Checkout'],
      main: { name: 'Keepa', checks: [true, true, true, false] },
      competitors: [
        { name: 'CamelCamelCamel', checks: [false, true, true, false] },
        { name: 'Honey', checks: [false, false, false, false] }
      ]
    }
  },
  {
    slug: "cashkaro-rakuten",
    name: "CashKaro / Rakuten",
    tagline: "Top-of-funnel affiliate cashback portals.",
    category: "Shopping & Cashback",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
If you go directly to Myntra, Nike, or Amazon, you are leaving money on the table.

Retailers pay massive "affiliate" commissions for customer leads. Portals like **Rakuten or CashKaro** operate by sharing that exact CPA (Cost Per Acquisition) payout directly with you. You simply click their portal link, shop normally, and withdraw the cash back to your bank account 60 days later.

### Dos
*   **Do** formulate a "Double Dip" strategy: Combine the CashKaro portal link with your own high-yield cashback credit card.
*   **Do** search for merchant-specific high-multiplier days across multiple portals.

### Donts
*   **Don't** use severe ad-blockers like uBlock Origin during checkout; they will deliberately break the tracking cookie, voiding your payout.

### Alternatives
Native store rewards points lock you into a single ecosystem, whereas these affiliate portals yield liquid cash.
    `,
    comparison: {
      features: ['Affiliate Routing', 'Bank Withdrawable Cash', 'Double Stacking', 'Auto-Apply Coupons'],
      main: { name: 'CashKaro', checks: [true, true, true, false] },
      competitors: [
        { name: 'Honey', checks: [false, false, false, true] },
        { name: 'Store Credit', checks: [false, false, false, false] }
      ]
    }
  },
  {
    slug: "honey-buyhatke",
    name: "Honey / Buyhatke",
    tagline: "Automated checkout coupon injection.",
    category: "Shopping & Cashback",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Scouring the web for "Promo Code 2026" on fake coupon sites is a massive waste of time and energy.

Browser extensions like **Honey** or **Buyhatke** algorithmically brute-force the checkout page. When you hit the cart, they autonomously cycle through thousands of scraped discount codes, finding the single permutation that yields the lowest final price.

### Dos
*   **Do** use this specifically for D2C (Direct-to-Consumer) Shopify websites, where unlisted influencer coupon codes are heavily prevalent.
*   **Do** leverage Buyhatke's "Compare Price" feature to ensure the product isn't structurally cheaper on a rival platform.

### Donts
*   **Don't** presume it works flawlessly on major walled-gardens like Amazon, which rarely rely on manually typed promo codes.

### Alternatives
Searching Google for coupon codes manually often leads to malware and expired affiliate links.
    `,
    comparison: {
      features: ['Auto-Brute Force', 'D2C Effectiveness', 'Price Comparison', 'Bank Cash Withdrawal'],
      main: { name: 'Honey', checks: [true, true, false, false] },
      competitors: [
        { name: 'Buyhatke', checks: [true, false, true, false] },
        { name: 'CashKaro', checks: [false, false, false, true] }
      ]
    }
  },
  {
    slug: "cred-cheq",
    name: "CRED / Cheq",
    tagline: "Secondary rewards for credit card bills.",
    category: "Shopping & Cashback",
    affiliateUrl: "https://go.partner-affiliate.com/redirect",
    seoContent: `
## The Strategy
Paying your massive credit card bill directly from your bank app yields absolutely zero return.

Apps like **CRED** and **Cheq** gamify your bill payments. By routing your massive monthly credit card clearance through their UPI gateways, you unlock secondary points. While these points are inflated, they can be deployed strategically to offset processing fees or snag heavy discounts at niche D2C coffee and apparel brands.

### Dos
*   **Do** set up automatic statement parsing so you never miss a hidden late fee or structural due date change.
*   **Do** use Cheq specifically to fractionalize reward points toward direct Swiggy or Zomato monetary vouchers.

### Donts
*   **Don't** interact with the predatory personal loan features ("CRED Cash") they push heavily; it contradicts the entire philosophy of financial optimization.
*   **Don't** expect 1:1 reward matching; the inherent point value is extremely diluted.

### Alternatives
Paying through your native bank app is functionally safer, but totally devoid of any secondary economic kickbacks.
    `,
    comparison: {
      features: ['Bill parsing', 'Secondary Rewards', 'D2C Vouchers', '1:1 Cash Yield'],
      main: { name: 'CRED', checks: [true, true, true, false] },
      competitors: [
        { name: 'Native Bank', checks: [false, false, false, false] },
        { name: 'Cheq', checks: [true, true, true, false] }
      ]
    }
  }
];
