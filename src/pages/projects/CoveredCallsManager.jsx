import React from 'react';
import { CandlestickChart, LineChart } from 'lucide-react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import rivettradeHero from '../../assets/rivettrade-hero.webp';
import rivettradeStartingScreen from '../../assets/rivettrade-starting-screen.webp';
import rivettradeUserControl from '../../assets/rivettrade-user-control.webp';
import rivettradeLogoWhite from '../../assets/rivettrade-logo-white.png';
import ccAaplPrice from '../../assets/rivettrade-cc-aapl-price.webp';
import opZbfPrice from '../../assets/rivettrade-op-zbf-price.webp';
import opDataTrend from '../../assets/rivettrade-op-data-trend.webp';
import opIntraday from '../../assets/rivettrade-op-intraday.webp';
import opAllDaysGrid from '../../assets/rivettrade-op-all-days-grid.webp';
import ccContractCost from '../../assets/rivettrade-cc-contract-cost.webp';
import ccBestReturns from '../../assets/rivettrade-cc-best-returns.webp';
import ccOptionChain from '../../assets/rivettrade-cc-option-chain.webp';

// A single chart broken out of the product, with a headline and supporting copy.
// All chart images render at w-full, so every chart is the same width on the page.
const ChartBlock = ({ src, alt, title, caption, children }) => (
  <figure className="space-y-3">
    <div className="space-y-1.5">
      <h3 className="text-xl md:text-2xl font-light text-heading">{title}</h3>
      <p className="text-body leading-relaxed max-w-3xl">{children}</p>
    </div>
    <div className="rounded-xl overflow-hidden bg-overlay/10 border border-main">
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full h-auto" />
      {caption && <figcaption className="text-muted text-sm px-4 py-3">{caption}</figcaption>}
    </div>
  </figure>
);

const palette = [
  { name: 'Primary', hex: '#0891B2' },
  { name: 'Positive', hex: '#059669' },
  { name: 'Negative', hex: '#DC2626' },
  { name: 'Ink', hex: '#111827' },
  { name: 'Muted', hex: '#6B7280' },
  { name: 'Surface', hex: '#F5F7FA' },
  { name: 'Card', hex: '#FFFFFF' },
  { name: 'Border', hex: '#E5E7EB' },
];

// Inputs a covered-call seller normally has to hunt across multiple broker surfaces —
// surfaced together in one view.
const callInputs = [
  'Current Price',
  'Strike Price',
  'Expiration',
  'Premium (Bid)',
  'Annualized Return',
  'Breakeven',
  'Downside Protection',
  'Max Profit',
  'Implied Volatility',
  'Open Interest',
  'Dividend & Ex-Date',
  'Assignment Risk',
  'Current Value',
  'History',
  'Analysis',
  'AI Suggestions',
];

// Option-strategy-specific inputs (legs, Greeks, probabilities).
const optionInputs = [
  'Strategy Type',
  'Strike(s)',
  'Expiration',
  'Net Debit / Credit',
  'Delta',
  'Gamma',
  'Theta',
  'Vega',
  'Implied Volatility',
  'IV Rank',
  'Open Interest',
  'Bid / Ask Spread',
  'Breakeven(s)',
  'Max Profit',
  'Max Loss',
  'Probability of Profit',
  'Payoff Diagram',
  'Earnings Date',
];

// Other instrument types the same single-view model could extend to.
const tradingTypes = [
  'Futures',
  'Forex',
  'Stocks',
  'ETFs',
  'Crypto',
  'Commodities',
  'Indices',
];

const menu = [
  {
    id: 'options',
    label: 'Options',
    icon: LineChart,
    chips: optionInputs,
    caption: 'Switch to Options and the same single-view principle holds — every leg, Greek, and probability needed to shape and price a strategy, together in one place.',
  },
  {
    id: 'covered-call',
    label: 'Covered Call',
    icon: CandlestickChart,
    chips: callInputs,
    caption: 'Every input that drives the decision, surfaced in one view — instead of hopping across quote screens, option chains, expiration ladders, and account tabs in your broker to piece it together.',
  },
  {
    id: 'more',
    label: '+More',
    dashed: true,
    chips: tradingTypes,
    caption: 'The same model extends to other instruments — one consistent surface for analyzing any trade type, not a separate tool per asset class.',
  },
];

// Interactive: select a trade type to see the decision inputs that feed it.
const DecisionChips = () => {
  const [active, setActive] = React.useState('covered-call');
  const current = menu.find((m) => m.id === active);
  return (
    <div className="flex flex-col items-center py-4">
      {/* Menu-level chips — each in an equal column with a centered drop line */}
      <div className="grid grid-cols-3 w-full max-w-2xl">
        {menu.map((m) => {
          const isActive = m.id === active;
          const Icon = m.icon;
          return (
            <div key={m.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setActive(m.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'border border-heading text-heading bg-base'
                    : m.dashed
                    ? 'border border-dashed border-tag text-faint hover:text-body hover:border-heading'
                    : 'border border-tag text-body bg-base hover:text-heading hover:border-heading'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" aria-hidden />}
                <span>{m.label}</span>
              </button>
              {/* drop line, centered under this chip */}
              <div className="h-6 w-0 border-l border-subtle" aria-hidden />
            </div>
          );
        })}
      </div>

      {/* Horizontal bus connecting the three drop lines (column centers at 1/6 … 5/6) */}
      <div className="w-full max-w-2xl">
        <div className="mx-[16.667%] h-0 border-t border-subtle" aria-hidden />
      </div>

      {/* Center drop into the inputs */}
      <div className="h-6 w-0 border-l border-subtle mb-6" aria-hidden />

      {/* Inputs for the selected trade type */}
      <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl">
        {current.chips.map((k) => (
          <span
            key={k}
            className="px-4 py-2 rounded-full border border-tag bg-base text-body text-sm whitespace-nowrap"
          >
            {k}
          </span>
        ))}
      </div>

      <p className="text-muted text-sm text-center max-w-2xl mt-8 leading-relaxed">
        {current.caption}
      </p>
    </div>
  );
};

const atAGlance = [
  { label: 'Role', value: 'Founder, Principal Designer & Developer' },
  { label: 'Platforms', value: 'Web · Tablet · Mobile' },
  { label: 'Stack', value: 'React · Vite · Firebase (Auth, Firestore, Functions, Hosting) · Stripe · Charles Schwab brokerage API · Yahoo market data' },
];

const CoveredCallsManager = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="RivetTrade"
      subtitle="Turn live market data into clear covered-call and options decisions"
      description="RivetTrade is a covered-call and options analysis platform with live brokerage integration and decision-support charting. I designed and built it end-to-end through Rivet Studio — from the product model and information architecture to the live Charles Schwab integration and the final UI — so investors can analyze, track, and paper-trade strategies against real market and brokerage data, all in a single view."
    />

    {/* Hero image */}
    <figure className="rounded-xl overflow-hidden bg-overlay/10 mb-16 shadow-2xl transform-gpu">
      <img src={rivettradeHero} alt="RivetTrade — covered-call & options analysis platform" className="w-full h-auto" />
      <figcaption className="text-muted text-sm px-4 py-3">Platform overview</figcaption>
    </figure>

    {/* At a glance */}
    <div className="rounded-2xl p-8 lg:p-12 mb-16 bg-overlay/[0.03]">
      <h2 className="text-2xl font-semibold mb-6 text-heading">At a Glance</h2>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
        {atAGlance.map((row) => (
          <div key={row.label} className="flex flex-col">
            <dt className="text-faint text-sm uppercase tracking-wide mb-1">{row.label}</dt>
            <dd className="text-body leading-relaxed">{row.value}</dd>
          </div>
        ))}
        <div className="flex flex-col">
          <dt className="text-faint text-sm uppercase tracking-wide mb-1">Status</dt>
          <dd className="text-body leading-relaxed">Interactive web demo live; full site in development.</dd>
        </div>
      </dl>
    </div>

    <TwoColumnSection
      leftTitle="Approach"
      leftItems={[
        "Design directly in running code — built and iterated in React (with Claude Code / Cursor) so every data-dense view was validated against real market data rather than mocked.",
        "Trust through transparency — for a tool touching money, prioritized showing where every number comes from and keeping the covered-call math inspectable.",
        "Real integration, not fixtures — wired in the Charles Schwab brokerage API for live positions/quotes/options and Yahoo for quotes, so the app reflects a real portfolio.",
      ]}
      rightTitle="What I Built"
      rightItems={[
        "Live Schwab brokerage integration — import real positions and portfolio, pull live quotes and options chains.",
        "Covered-call analysis & selection — screening/\"universe,\" strike/expiration selection, and premium/yield math.",
        "Charting & decision context that turns raw market data into an actionable read.",
        "Accounts & billing — Firebase Auth + Firestore and Stripe subscriptions.",
      ]}
    />

    {/* How it works — user in control of brokers + tools */}
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">How It Works</h2>
      <p className="text-lg text-body mb-10 leading-relaxed max-w-3xl">
        The user stays in control — RivetTrade connects their own brokerage accounts on one side and their own analysis tools (position tracking, backtesting, risk) on the other, in a single workspace.
      </p>
      <figure className="rounded-xl overflow-hidden bg-overlay/10 border border-main">
        <img loading="lazy" decoding="async" src={rivettradeUserControl} alt="RivetTrade architecture — the user stays in control, connecting their own brokers and their own tools" className="w-full h-auto" />
        <figcaption className="text-muted text-sm px-4 py-3">User in control</figcaption>
      </figure>
    </div>

    <ProcessSection
      title="The Challenge"
      description="Could one view replace the dozen screens a trader juggles to make a single options decision — positions, live quotes, option chains, expirations, strikes, premiums — without ever hiding where a number comes from? RivetTrade is the answer: the whole decision, grounded in real data, legible at a glance."
    >
      <DecisionChips />
    </ProcessSection>

    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">Design Highlights</h2>
      <ul className="space-y-4 mb-10 max-w-3xl">
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span><strong>Clear hierarchy for dense data</strong> — Financial numbers are grouped and spaced so a data-heavy screen reads in seconds, not minutes.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span><strong>Trust through clear states</strong> — Live vs. stale data and risk are always marked, so the user trusts exactly what they're seeing.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span><strong>Helpful comparison views</strong> — Hints and side-by-side comparisons do the math for you — they don't just display it.</span></li>
      </ul>
      <div className="space-y-12">
        <ChartBlock
          src={ccContractCost}
          alt="Contract Cost panel — current price, strike, premium, ROI, and a Best Return Hint"
          title="Every Number That Defines the Trade, in One Panel"
          caption="Contract cost"
        >
          Current price, strike, bid, total premium, ROI, and days-to-expiry sit together in a clear grid — topped by a "Best Return Hint" that proposes a stronger strike and expiration and applies it in one tap. Dense math, made glanceable.
        </ChartBlock>
        <ChartBlock
          src={ccBestReturns}
          alt="Best Returns — Best Return, Best No-Sale, and Best Sale compared side by side"
          title="Three Return Strategies, Compared at a Glance"
          caption="Best returns"
        >
          Best Return, Best No-Sale, and Best Sale laid side by side — each with strike, expiration, premium, annualized yield, and OTM cushion — so the trade-off between income and assignment risk is obvious without a spreadsheet.
        </ChartBlock>
        <ChartBlock
          src={ccOptionChain}
          alt="Option chain — calls and puts around the strike ladder with expiration tabs"
          title="A Dense Options Chain That Stays Readable"
          caption="Option chain"
        >
          Calls and puts mirrored around the strike ladder, bid/ask color-coded by side, and the at-the-money row anchored for orientation. Expiration tabs keep the whole chain one tap away — data density without the clutter.
        </ChartBlock>
      </div>
    </div>

    {/* Covered Calls menu — charts broken out */}
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">Covered-Call Analysis</h2>
      <p className="text-lg text-body mb-10 leading-relaxed max-w-3xl">
        With the <strong>Covered Calls</strong> menu selected, the workspace centers on a single underlying and the calls you can write against it — anchored by a live price chart with covered-call context.
      </p>
      <div className="space-y-12">
        <ChartBlock
          src={ccAaplPrice}
          alt="Covered Calls — underlying price history chart (AAPL, 6-month)"
          title="Underlying Price History, With Strike Context"
          caption="Price history"
        >
          A six-month price view of the underlying with Price, Strike view, and % Change modes. It's the anchor for judging where to sell calls relative to the current price and the recent trading range, with live Schwab data feeding the quote.
        </ChartBlock>
      </div>
    </div>

    {/* Options menu — charts broken out */}
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">Options Analysis</h2>
      <p className="text-lg text-body mb-10 leading-relaxed max-w-3xl">
        Switching to the <strong>Options</strong> menu opens a broader analysis workspace for any symbol — including US Treasuries — layering price trend, signal history, and intraday movement.
      </p>
      <div className="space-y-12">
        <ChartBlock
          src={opZbfPrice}
          alt="Options — price trend chart (ZB=F, one year)"
          title="Price Trend for Any Symbol"
          caption="Price trend"
        >
          A full-year price history with Day / Week / Month resolution for any ticker (here the 30-Year T-Bond). It sets the environment — direction, volatility, and recent levels — before building a strategy around it.
        </ChartBlock>
        <ChartBlock
          src={opDataTrend}
          alt="Options — Data Trend signal chart"
          title="Signal vs. Outcome Over Time"
          caption="Signal history"
        >
          Each trading day's price at a chosen minute is marked Buy (below the prior close) or Sell (above it), then plotted against that day's actual close — so you can see, at a glance, how often the signal pointed the favorable way.
        </ChartBlock>
        <ChartBlock
          src={opIntraday}
          alt="Options — intraday movement chart vs. prior close"
          title="Intraday Movement vs. Prior Close"
          caption="Intraday movement"
        >
          Every minute of the session plotted against the prior close — green above, red below — with the decision minute called out. It reads momentum into and out of a specific minute without losing the full-day shape.
        </ChartBlock>
      </div>
    </div>

    {/* Full-layout chart page */}
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">All-Days Intraday — Full Grid</h2>
      <p className="text-lg text-body mb-10 leading-relaxed max-w-3xl">
        A full-layout view: a multi-day grid of intraday charts, one card per session, for scanning the day-to-day pattern across many sessions at once.
      </p>
      <figure className="rounded-xl overflow-hidden bg-overlay/10 border border-main">
        <img loading="lazy" decoding="async" src={opAllDaysGrid} alt="Options — all-days intraday grid, full layout" className="w-full h-auto" />
        <figcaption className="text-muted text-sm px-4 py-3">All-days grid</figcaption>
      </figure>
    </div>

    {/* Design system — built on Google Material */}
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">Design System</h2>
      <p className="text-lg text-body mb-10 leading-relaxed max-w-3xl">
        Built on Google's Material foundations — Roboto type, Material icons, and a disciplined trading palette — so dense financial data stays legible, consistent, and quick to scan.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Type & brand */}
        <div className="rounded-xl border border-main bg-surface p-6">
          <h3 className="text-faint text-xs uppercase tracking-widest mb-5">Type & brand</h3>
          <div className="flex items-center gap-3 mb-6">
            <img src={rivettradeLogoWhite} alt="RivetTrade mark" className="w-9 h-9" />
            <span className="text-2xl font-semibold text-heading tracking-tight">RivetTrade</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-heading text-xl" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>Roboto — UI & headings</p>
              <p className="text-faint text-xs mt-0.5">Google Material · 400 / 500 / 700</p>
            </div>
            <div>
              <p className="text-heading text-lg" style={{ fontFamily: "'Roboto Mono', monospace" }}>$342.79&nbsp;&nbsp;+20.63%</p>
              <p className="text-faint text-xs mt-0.5">Roboto Mono — data & numerics</p>
            </div>
            <div>
              <div className="flex items-center gap-3 text-heading">
                <span className="material-icons" aria-hidden>trending_up</span>
                <span className="material-icons" aria-hidden>candlestick_chart</span>
                <span className="material-icons" aria-hidden>account_balance</span>
                <span className="material-icons" aria-hidden>query_stats</span>
                <span className="material-icons" aria-hidden>search</span>
              </div>
              <p className="text-faint text-xs mt-0.5">Material Icons</p>
            </div>
          </div>
        </div>

        {/* Color */}
        <div className="rounded-xl border border-main bg-surface p-6">
          <h3 className="text-faint text-xs uppercase tracking-widest mb-5">Color</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {palette.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-lg border border-main shrink-0" style={{ backgroundColor: c.hex }} />
                <div className="leading-tight">
                  <p className="text-body text-sm">{c.name}</p>
                  <p className="text-faint text-xs font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart styles */}
        <div className="rounded-xl border border-main bg-surface p-6">
          <h3 className="text-faint text-xs uppercase tracking-widest mb-5">Chart styles</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="h-5 w-12 rounded shrink-0" style={{ background: 'linear-gradient(180deg, #0891B2 0%, rgba(8,145,178,0.10) 100%)' }} />
              <span className="text-body">Price trend, up — cyan line & area</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-5 w-12 rounded shrink-0" style={{ background: 'linear-gradient(180deg, #DC2626 0%, rgba(220,38,38,0.10) 100%)' }} />
              <span className="text-body">Price trend, down — red line & area</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-white" style={{ backgroundColor: '#059669' }}>B</span>
              <span className="text-body">Buy signal — below prior close</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-white" style={{ backgroundColor: '#DC2626' }}>S</span>
              <span className="text-body">Sell signal — above prior close</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-5 w-12 shrink-0 flex items-end justify-center gap-0.5">
                <span className="w-1.5 h-2.5 rounded-sm" style={{ backgroundColor: '#76C5AC' }} />
                <span className="w-1.5 h-4 rounded-sm" style={{ backgroundColor: '#76C5AC' }} />
                <span className="w-1.5 h-3 rounded-sm" style={{ backgroundColor: '#EC8888' }} />
                <span className="w-1.5 h-2 rounded-sm" style={{ backgroundColor: '#EC8888' }} />
              </span>
              <span className="text-body">Intraday bars — above / below prior close</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-5 w-12 shrink-0 flex items-center">
                <span className="w-full border-t-2 border-dashed" style={{ borderColor: '#334155' }} />
              </span>
              <span className="text-body">Reference line — prior-close baseline</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProcessSection title="Outcome">
      <ul className="space-y-4">
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Built and shipped end-to-end solo — product, design, a live Charles Schwab brokerage integration, billing, and deploy.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Interactive web demo live, validating the single-view model against real market and brokerage data.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Next: additional brokers, live alerts, and mobile — with options tooling expanding alongside covered calls.</span></li>
      </ul>

      <figure className="mt-8 rounded-xl overflow-hidden bg-overlay/10 border border-main">
        <img loading="lazy" decoding="async" src={rivettradeStartingScreen} alt="RivetTrade starting screen — Trading is a craft. Build your strategy. Capture the momentum." className="w-full h-auto" />
        <figcaption className="text-muted text-sm px-4 py-3">Starting screen</figcaption>
      </figure>
    </ProcessSection>

  </div>
);

export default CoveredCallsManager;
