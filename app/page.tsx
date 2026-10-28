import Image from "next/image";
import { Demo } from "./_components/demo";
import { RevealOnScroll } from "./_components/reveal";
import { ArrowDown, ArrowRight, Check, Clock } from "./_components/icons";
import { ScrollLitText, SmoothWheel } from "./_components/scroll-effects";
import { AppConnections, NotificationSwitches } from "./_components/toggles";
import { WaitlistModal } from "./_components/waitlist-modal";
import badges from "@/public/images/badges.webp";
import calendar from "@/public/images/calendar.webp";
import card from "@/public/images/card.webp";
import logoHero from "@/public/images/logo-hero.png";
import logo from "@/public/images/logo.png";
import phoneHome from "@/public/images/phone-home.webp";
import phoneTracking from "@/public/images/phone-tracking.webp";
import wallet from "@/public/images/wallet.webp";

// every waitlist button opens the signup popup (see _components/waitlist-modal.tsx)
const WAITLIST = "#waitlist";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#verify", label: "Wearables" },
  { href: "#card", label: "Digital card" },
  { href: "#premium", label: "Premium" },
];

const FOOTER_NAV = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#premium", label: "Premium" },
  { href: "#", label: "Terms and Conditions" },
];

const MARQUEE = [
  { text: "Your goals", muted: true, dot: "var(--lime)" },
  { text: "Your commitment", muted: false, dot: "var(--green)" },
  { text: "Your reward", muted: true, dot: "var(--lime)" },
];

const STATEMENT =
  "The money you set aside remains yours. Missing an activity goal doesn’t mean losing it. The Wellness Wallet is designed to help you use your own money as motivation, with funds intended to be held by an independent, FCA-regulated third-party provider.";

function WaitlistButton({ size = "lg" }: { size?: "md" | "lg" }) {
  return (
    <a className={`btn btn-${size}`} href={WAITLIST}>
      <span>Join the Waitlist</span>
      <span className="dot" aria-hidden="true">
        <ArrowRight size={size === "lg" ? 20 : 18} />
      </span>
    </a>
  );
}

function Deco({ className, blob, style }: { className?: string; blob: React.CSSProperties & { cls?: string }; style: React.CSSProperties }) {
  const { cls, ...blobStyle } = blob;
  return (
    <div aria-hidden="true" className={`deco ${className ?? ""}`} style={style}>
      <div className={`blob ${cls ?? ""}`} style={blobStyle} />
    </div>
  );
}

function PlanItem({ children, dot }: { children: React.ReactNode; dot: string }) {
  return (
    <li>
      <span aria-hidden="true" className="blob" style={{ background: dot }} />
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <div id="top" className="ww">
      <SmoothWheel />
      <RevealOnScroll />
      <WaitlistModal />

      {/* ============ NAV ============ */}
      <div className="sticky top-3.5 z-50 px-4">
        <nav
          className="glass-nav mx-auto flex max-w-[1080px] items-center justify-between gap-4 rounded-full py-2 pr-2 pl-[22px]"
          aria-label="Main"
        >
          <a href="#top" className="flex min-h-11 items-center">
            <Image className="nav-logo block h-10 w-auto" src={logo} alt="The Wellness Wallet" preload />
          </a>
          <div className="nav-links flex items-center gap-0.5">
            {NAV.map((l) => (
              <a key={l.href} className="nav-link" href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <a className="btn btn-sm" href={WAITLIST}>
            Join the Waitlist
          </a>
        </nav>
      </div>

      {/* ============ HERO ============ */}
      <header className="relative px-6 pt-[clamp(56px,7.5cqi,112px)]">
        <Deco
          className="par-down"
          style={{ right: "-9%", top: -140, width: "clamp(260px, 44cqi, 640px)" }}
          blob={{ cls: "drift", background: "var(--lime)", filter: "blur(80px)", opacity: 0.75 }}
        />
        <Deco
          className="par-down"
          style={{ left: "-12%", top: 220, width: "clamp(220px, 36cqi, 520px)" }}
          blob={{ cls: "drift-b", background: "var(--cyan)", filter: "blur(90px)", opacity: 0.3 }}
        />

        <div className="relative z-[2] mx-auto flex max-w-[1100px] flex-col items-center gap-7 text-center">
          <div className="reveal relative mb-1 flex justify-center">
            <div
              aria-hidden="true"
              className="blob morph-soft absolute inset-x-[8%] inset-y-[4%] bg-white opacity-90 blur-[34px]"
            />
            <Image
              src={logoHero}
              alt="The Wellness Wallet"
              preload
              sizes="(max-width: 640px) 230px, 520px"
              className="relative block h-auto w-[clamp(230px,36cqi,520px)]"
            />
          </div>
          <div className="glass-soft reveal flex items-center gap-2.5 rounded-full py-2 pr-[18px] pl-3 text-[15px] font-medium text-(--ink)">
            <span aria-hidden="true" className="shrink-0 blob morph-soft size-3 bg-(--green)" />
            <span>Early sign-ups get 6 months of Premium free</span>
          </div>
          <h1 className="reveal m-0 text-[clamp(44px,7cqi,100px)] leading-[1.02] font-normal tracking-[-0.045em] text-balance text-(--ink)">
            Your money moves{" "}
            <span className="whitespace-nowrap">
              when{" "}
              <span className="relative inline-block px-[0.16em]">
                <span aria-hidden="true" className="blob morph-soft absolute inset-x-0 top-[0.12em] bottom-[0.02em] bg-(--lime)" />
                <span className="relative">you do</span>
              </span>
            </span>
          </h1>
          <p className="reveal m-0 max-w-[620px] text-[clamp(18px,1.5cqi,21px)] leading-[1.55] text-pretty">
            <strong className="font-medium text-(--ink)">Turn your own money into motivation</strong>. Set money aside,
            choose your activity goals and access your money as you make progress. Your money always remains yours.
          </p>
          <div className="reveal flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <WaitlistButton />
            <a className="text-link" href="#how">
              <span>See how it works</span>
              <ArrowDown className="arrow" />
            </a>
          </div>
          <p className="reveal m-0 text-[15px] font-normal text-(--muted)">Movement verified by Apple, Fitbit or Strava</p>
        </div>

        {/* phone resting on organic matter */}
        <div className="fade-down reveal relative z-[1] mx-auto mt-[clamp(28px,3.6cqi,56px)] h-[clamp(360px,45cqi,640px)] max-w-[1100px] overflow-hidden">
          <div aria-hidden="true" className="par-down absolute inset-0 flex items-start justify-center pt-[5%]">
            <div className="blob morph aspect-[1.12] w-[clamp(300px,56cqi,760px)]" style={{ background: "var(--grad)" }} />
          </div>
          <Deco
            className="par-up max-sm:!left-[calc(55%_-_clamp(170px,34cqi,470px))]"
            style={{ left: "calc(50% - clamp(170px, 34cqi, 470px))", top: "58%", width: "clamp(40px, 7cqi, 96px)" }}
            blob={{ cls: "morph-b", background: "var(--lime)" }}
          />
          {/* <Deco
            className="par-up"
            style={{ left: "calc(50% + clamp(140px, 30cqi, 420px))", top: "12%", width: "clamp(16px, 2.4cqi, 30px)" }}
            blob={{ cls: "morph-soft", background: "var(--ink)" }}
          /> */}

          <div className="par-up relative flex justify-center">
            <div className="glass-soft w-[clamp(200px,24cqi,336px)] flex-none rounded-[clamp(34px,4cqi,56px)] p-[clamp(6px,0.8cqi,11px)]">
              <Image
                src={phoneHome}
                alt="Home screen: April progress ring showing £350 of £500 available, with steps, minutes and calories."
                preload
                sizes="336px"
                className="block h-auto w-full rounded-[clamp(28px,3.3cqi,46px)]"
              />
            </div>
          </div>

          <div className="float absolute top-[26%] right-[calc(50%+120px)] z-[3]" aria-hidden="true">
            <div className="glass bob-a flex items-center gap-3.5 rounded-[26px_30px_28px_34px] py-3.5 pr-[22px] pl-3.5 text-(--ink)">
              <div
                className="grid size-14 place-items-center rounded-full"
                style={{
                  //  background: "conic-gradient(var(--ink) 0deg 288deg, rgba(20, 26, 69, 0.12) 288deg 360deg)" 
                  }}
              >
                <div className="grid size-[42px] place-items-center rounded-full bg-white text-xs font-medium">80%</div>
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-lg font-medium">8,000 steps</span>
                <span className="text-sm font-normal text-(--text)">2,000 steps to go</span>
              </div>
            </div>
          </div>
          <div className="float absolute top-[52%] left-[calc(50%+130px)] z-[3]" aria-hidden="true">
            <div className="glass bob-b float-chip pr-6">
              <span className="blob morph-soft size-[26px] bg-(--lime)" />
              <span>£20 Made Available Today!</span>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <div className="marquee max-w-[2500px] mx-auto fade-x relative overflow-hidden py-[clamp(28px,4cqi,56px)]">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 items-center gap-[clamp(20px,3cqi,44px)] pr-[clamp(20px,3cqi,44px)] text-[clamp(30px,4.6cqi,64px)] leading-[1.1] font-light tracking-[-0.035em] whitespace-nowrap text-(--ink)"
            >
              {[...MARQUEE, ...MARQUEE].map((m, i) => (
                <span key={i} className="contents">
                  <span style={m.muted ? { color: "rgba(20, 26, 69, 0.56)" } : undefined}>{m.text}</span>
                  <span aria-hidden="true" className="blob size-[0.42em] rounded-full!" style={{ background: m.dot }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ HOW IT WORKS: LIVE DEMO ============ */}
      <section id="how" className="section pt-[clamp(64px,8cqi,120px)] pb-[clamp(48px,6cqi,88px)]">
        <Deco
          className="par-view"
          style={{ left: "-10%", top: "38%", width: "clamp(240px, 38cqi, 540px)" }}
          blob={{ cls: "morph", background: "linear-gradient(140deg, #12BBDD, #6FDDB6)", opacity: 0.7 }}
        />
        <Deco
          className="par-view-rev"
          style={{ right: "2%", top: "12%", width: "clamp(180px, 30cqi, 420px)" }}
          blob={{ cls: "morph-b", background: "var(--lime)" }}
        />

        <div className="section-head reveal">
          <p className="eyebrow">How it works</p>
          <h2 className="h2">
            Three moves.
            <br />
            Try them here.
          </h2>
          <p className="lead max-w-[520px]">
            You are 2,000 steps from today’s goal. Drag the slider and see what your effort unlocks.
          </p>
        </div>

        <Demo />

        <ScrollLitText text={STATEMENT} className="statement reveal relative mt-[clamp(64px,8cqi,120px)]" />
      </section>

      {/* ============ EXTERNAL VERIFICATION ============ */}
      <section id="verify" className="section py-[clamp(48px,6cqi,96px)]">
        <Deco
          className="par-view"
          style={{ right: "-6%", top: "6%", width: "clamp(220px, 36cqi, 500px)" }}
          blob={{ cls: "morph-b", background: "var(--lime)", filter: "blur(20px)", opacity: 0.85 }}
        />
        <div className="glass reveal relative flex flex-wrap items-stretch overflow-hidden rounded-[48px]">
          <div className="flex flex-[1_1_440px] flex-col gap-[18px] p-[clamp(32px,4.4cqi,64px)]">
            <p className="eyebrow">External verification</p>
            <h2 className="h2">Verified by your wearable.</h2>
            <p className="lead max-w-[500px]">
              Your progress isn’t self-reported. Connect Apple, Fitbit or Strava and your movement is verified
              externally, so every pound you access is earned. That’s what keeps you accountable.
            </p>
            <div className="mt-auto max-w-[520px]">
              <AppConnections />
            </div>
          </div>
          <div className="relative flex min-h-[480px] flex-[1_1_360px] items-end justify-center overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <div className="blob morph aspect-square w-[min(88%,460px)]" style={{ background: "var(--grad-soft)" }} />
            </div>
            <div className="par-view relative -mb-10 h-[470px] w-[280px] rotate-[-4deg] rounded-t-[48px] p-[9px]">
              <div className="glass-soft absolute inset-0 rounded-t-[48px]" />
              <Image
                src={phoneTracking}
                alt="Tracking Apps screen: Apple connected, Fitbit and Strava not connected."
                sizes="280px"
                className="relative block h-auto w-full rounded-t-[40px]"
              />
            </div>
            <div className="float absolute top-[18%] left-[8%]" aria-hidden="true">
              <div className="glass bob-a float-chip rounded-[26px_30px_28px_32px] py-3 pr-5 pl-3.5 text-base">
                <span className="grid size-[30px] place-items-center rounded-full bg-(--ink) text-(--lime)">
                  <Check size={16} stroke={2.8} />
                </span>
                <span>Movement verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIGITAL CARD ============ */}
      <section id="card" className="section py-[clamp(56px,7cqi,112px)]">
        <div className="relative flex flex-wrap items-center gap-[clamp(40px,6cqi,96px)]">
          <div className="reveal relative flex flex-[1_1_440px] justify-center py-[clamp(40px,5cqi,72px)]">
            <div aria-hidden="true" className="par-view-rev pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="blob morph aspect-[1.15] w-[min(92%,520px)]" style={{ background: "var(--grad)" }} />
            </div>
            <div
              className="tilt relative w-[min(520px,100%)] overflow-hidden rounded-[4%/6.1%]"
              style={{ transform: "rotate(-7deg)", boxShadow: "0 50px 80px -36px rgba(20, 26, 69, 0.6)" }}
            >
              <Image src={card} alt="The Wellness Wallet digital card." sizes="(max-width: 560px) 100vw, 520px" className="block h-auto w-full" />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.18) 100%)",
                }}
              />
            </div>
            <div className="float absolute right-[2%] bottom-[8%]" aria-hidden="true">
              <div className="glass bob-b float-chip">
                <span className="blob morph-soft size-[22px] bg-(--lime)" />
                <span>£10 ready to spend</span>
              </div>
            </div>
          </div>
          <div className="reveal flex flex-[1_1_400px] flex-col gap-[18px]">
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
              <p className="eyebrow">Digital card</p>
              <span className="inline-flex items-center gap-2 rounded-full bg-(--ink) py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium tracking-[0.02em] whitespace-nowrap text-white">
                <Clock className="text-(--lime)" />
                <span>Planned Feature</span>
              </span>
            </div>
            <h2 className="h2">Spend it the moment it’s yours.</h2>
            <p className="lead max-w-[480px]">
              Every member can get a Wellness Wallet digital card. Add it to Apple Wallet and spend instantly once your
              funds are accessible.
            </p>
            <ul className="pills reveal">
              <li className="glass-soft">For every member</li>
              <li className="glass-soft">Add to Apple Wallet</li>
              <li className="glass-soft">Spend instantly</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="section pt-[clamp(64px,8cqi,120px)] pb-[clamp(56px,7cqi,104px)]">
        <Deco
          className="par-view-rev"
          style={{ left: "30%", top: "30%", width: "clamp(260px, 44cqi, 620px)" }}
          blob={{ cls: "morph-b", background: "linear-gradient(160deg, #3FC9C4, #A6ECA4)", opacity: 0.8 }}
        />
        <Deco
          className="par-view"
          style={{ right: "-4%", bottom: "6%", width: "clamp(160px, 26cqi, 360px)" }}
          blob={{ cls: "morph", background: "var(--lime)" }}
        />

        <div className="section-head reveal">
          <p className="eyebrow">Inside the app</p>
          <h2 className="h2">Built to keep you moving.</h2>
        </div>

        <div className="features-grid">
          <article className="card glass span-2 reveal flex min-h-[430px] flex-wrap gap-x-8 gap-y-3 overflow-hidden px-10 pt-10">
            <div className="flex flex-[1_1_300px] flex-col gap-3.5 pb-10">
              <p className="eyebrow">Wallet</p>
              <h3 className="m-0 text-[clamp(28px,3cqi,40px)] leading-[1.08] font-medium tracking-[-0.025em] text-balance text-(--ink)">
                Keep track of your funds and progress
              </h3>
              <p className="m-0 max-w-[400px] text-lg text-pretty">
                Available balance, committed funds, and earned rewards all in one place, with a clear history of every
                goal achieved and withdrawal.
              </p>
            </div>
            <div className="relative flex h-[390px] flex-[1_1_260px] justify-center self-end">
              <div
                aria-hidden="true"
                className="blob morph-soft absolute -bottom-[70px] left-1/2 -ml-[180px] h-[330px] w-[360px]"
                style={{ background: "var(--grad-soft)" }}
              />
              <div className="peek glass-soft relative h-[640px] w-[286px] origin-bottom rounded-t-[48px] p-[9px]" style={{ transform: "translateY(0) rotate(4deg)" }}>
                <Image
                  src={wallet}
                  alt="Wallet screen with available balance, locked and unlocked funds, bonus points and unlock period."
                  sizes="286px"
                  className="block h-auto w-full rounded-t-[40px]"
                />
              </div>
            </div>
          </article>

          <article className="card glass card-pad reveal">
            <p className="eyebrow">Activity</p>
            <h3 className="card-title">Every day that paid out, on your calendar.</h3>
            <p className="card-text">See which days you hit your goal and made your funds available.</p>
            <div className="mt-auto pt-2.5">
              <div className="crop aspect-[336/222]" style={{ boxShadow: "0 18px 36px -24px rgba(20, 26, 69, 0.4)" }}>
                <Image
                  src={calendar}
                  alt="April 2025 calendar with five days marked as unlocked."
                  sizes="380px"
                  style={{ marginTop: "-109.6%" }}
                />
              </div>
            </div>
          </article>

          <article className="card glass card-pad reveal">
            <p className="eyebrow">Rewards</p>
            <h3 className="card-title">Streaks, badges and bonus points.</h3>
            <p className="card-text">
              Join the daily goal and the weekly challenge, then stay active to open up partner discounts.
            </p>
            <div className="mt-auto pt-2.5">
              <div className="crop aspect-[336/134]">
                <Image
                  src={badges}
                  alt="Three badges: 3-day streak, 7-day streak and 30-day challenge completed."
                  sizes="380px"
                  style={{ marginTop: "-131%" }}
                />
              </div>
            </div>
          </article>

          <article className="card glass card-pad reveal">
            <p className="eyebrow">Tracking apps</p>
            <h3 className="card-title">Bring the tracker you already use.</h3>
            <p className="card-text">Connect Apple, Fitbit or Strava to count your steps, minutes and calories.</p>
            <AppConnections compact />
          </article>

          <article className="card glass card-pad reveal">
            <p className="eyebrow">Notifications</p>
            <h3 className="card-title">A nudge when it matters.</h3>
            <p className="card-text">Choose the alerts you want and switch off the rest.</p>
            <NotificationSwitches />
          </article>
        </div>
      </section>

      {/* ============ PLANS ============ */}
      <section id="premium" className="section pt-[clamp(56px,7cqi,104px)] pb-[clamp(64px,8cqi,120px)]">
        <div className="section-head reveal max-w-[820px]! mb-[clamp(28px,3cqi,44px)]!">
          <p className="eyebrow">Plans</p>
          <h2 className="h2">Start free. Go Premium when you want more.</h2>
        </div>

        <div className="glass reveal relative mb-[clamp(72px,7cqi,96px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-[40px] py-6 pr-6 pl-7">
          <div className="flex flex-[1_1_420px] items-center gap-5">
            <div className="blob morph-soft grid size-[72px] flex-none place-items-center bg-(--lime) text-[30px] font-normal tracking-[-0.04em] text-(--ink)">
              6
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="m-0 text-xl font-medium text-(--ink)">Early sign-up offer</p>
              <p className="m-0 text-[17px]">Join early and get 6 months of Premium free when it launches.</p>
            </div>
          </div>
          <WaitlistButton size="md" />
        </div>

        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-end gap-x-6 gap-y-16">
          <div className="relative">
            <Deco
              className="par-view"
              style={{ left: "4%", bottom: "-22%", width: "clamp(200px, 26cqi, 340px)" }}
              blob={{ cls: "morph", background: "var(--grad-soft)", opacity: 0.8 }}
            />
            <article className="plan glass reveal text-(--ink)">
              <h3 className="plan-title">Free Plan</h3>
              <p className="plan-price">£0</p>
              <ul className="plan-list">
                <PlanItem dot="var(--green)">Basic goal tracking</PlanItem>
                <PlanItem dot="var(--green)">Limited access to features</PlanItem>
              </ul>
              <a className="btn btn-block mt-2.5" href={WAITLIST}>
                Get Started
              </a>
            </article>
          </div>

          <article
            className="plan on-ink reveal bg-(--ink) pt-[clamp(110px,10cqi,140px)] text-white"
            style={{ boxShadow: "0 50px 90px -50px rgba(20, 26, 69, 0.8)" }}
          >
            <div className="tilt absolute -top-[clamp(40px,4cqi,56px)] right-[clamp(16px,2cqi,28px)] w-[clamp(180px,17cqi,240px)] overflow-hidden rounded-[6%/9%] shadow-[0_30px_50px_-24px_rgba(20,26,69,0.6)]" style={{ transform: "rotate(7deg)" }}>
              <Image src={card} alt="" sizes="240px" className="block h-auto w-full" />
            </div>
            <h3 className="plan-title">Premium</h3>
            <p className="plan-price text-(--lime)">[PREMIUM PRICE]</p>
            <ul className="plan-list">
              <PlanItem dot="var(--lime)">Faster access to your money</PlanItem>
              <PlanItem dot="var(--lime)">Personalized fitness &amp; financial insights</PlanItem>
              <PlanItem dot="var(--lime)">Additional challenges &amp; rewards</PlanItem>
              <PlanItem dot="var(--lime)">Banking app integration</PlanItem>
              <PlanItem dot="var(--lime)">Digital Card you can add to Apple Wallet</PlanItem>
            </ul>
            <p className="m-0 pt-1 text-base font-normal text-white/80">Upgrade any time from Settings in the app.</p>
          </article>
        </div>
      </section>

      {/* ============ FINAL CALL TO ACTION ============ */}
      <section
        id="get-started"
        className="section flex flex-col items-center gap-[26px] py-[clamp(96px,12cqi,176px)] text-center"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
          <div className="absolute top-1/2 left-1/2 h-[min(calc(100%-48px),640px)] w-[min(calc(100%-32px),964px)] -translate-1/2">
            {/* tilted pill from the design; stretches to stay behind the text on narrow screens */}
            <svg viewBox="0 0 964 640" preserveAspectRatio="none" className="absolute inset-0 size-full">
              <defs>
                <linearGradient id="cta-bg" x1="24.4263" y1="127.218" x2="715.836" y2="750.531" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#12BBDD" />
                  <stop offset="0.48" stopColor="#3FC9C4" />
                  <stop offset="1" stopColor="#A6ECA4" />
                </linearGradient>
              </defs>
              <rect x="24.4263" width="940" height="602" rx="280" transform="rotate(2.32542 24.4263 0)" fill="url(#cta-bg)" />
            </svg>
            <div className="absolute top-[4%] right-[1%] aspect-square w-[clamp(64px,9cqi,128px)] rounded-full bg-(--lime)" />
          </div>
        </div>
        <h2 className="reveal relative m-0 max-w-[820px] text-[clamp(40px,6.2cqi,92px)] leading-none font-normal tracking-[-0.045em] text-balance text-(--ink)">
          Ready to put your goals in motion?
        </h2>
        <p className="reveal relative m-0 max-w-[520px] text-[clamp(18px,1.5cqi,21px)] font-normal text-pretty text-(--ink)">
          Join the waitlist and be among the first to experience a new way to stay motivated.
        </p>
        <div className="reveal relative">
          <WaitlistButton />
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative mx-auto flex max-w-[1248px] flex-wrap items-center justify-between gap-x-10 gap-y-5 px-6 pt-6 pb-12">
        <Image src={logo} alt="The Wellness Wallet" className="block h-[58px] w-auto" />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-1">
          {FOOTER_NAV.map((l) => (
            <a key={l.label} className="foot-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <p className="m-0 text-[15px] text-(--muted)">© 2026 The Wellness Wallet</p>
      </footer>
    </div>
  );
}
