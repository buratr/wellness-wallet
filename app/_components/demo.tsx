"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Heart, Lock } from "./icons";

type Phase = "setup" | "locked" | "unlocked";
type GoalKey = keyof typeof GOALS;
type PeriodKey = keyof typeof PERIODS;

const GOALS = {
  steps: { label: "Steps", one: "step", many: "steps", targets: { daily: 10000, weekly: 70000, monthly: 300000 } },
  workouts: { label: "Workouts", one: "workout", many: "workouts", targets: { daily: 1, weekly: 5, monthly: 20 } },
  calories: { label: "Calories", one: "calorie", many: "calories", targets: { daily: 2000, weekly: 14000, monthly: 60000 } },
};

const PERIODS = {
  daily: { label: "Daily", parts: 30, noun: "Today’s", when: "today" },
  weekly: { label: "Weekly", parts: 4, noun: "This week’s", when: "this week" },
  monthly: { label: "Monthly", parts: 1, noun: "This month’s", when: "this month" },
};

const AMOUNTS = [150, 300, 600];
const HOLD_MS = 1100;
const RING_LENGTH = 678.6;

const money = (v: number) => {
  const pence = Math.round(v * 100);
  return "£" + (pence % 100 === 0 ? String(pence / 100) : (pence / 100).toFixed(2));
};
const num = (v: number) => v.toLocaleString("en-GB");

function Options<T extends string | number>({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onPick: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-2">
      <span className="field-label">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`opt${o.value === value ? " is-on" : ""}`}
            aria-pressed={o.value === value}
            onClick={() => onPick(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Demo() {
  const [phase, setPhase] = useState<Phase>("locked");
  const [amount, setAmount] = useState(300);
  const [periodKey, setPeriodKey] = useState<PeriodKey>("daily");
  const [goalKey, setGoalKey] = useState<GoalKey>("steps");
  const [rawProgress, setProgress] = useState(8000);
  const [holding, setHolding] = useState(false);
  const [nudged, setNudged] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(holdTimer.current), []);

  const goal = GOALS[goalKey];
  const period = PERIODS[periodKey];
  const target = goal.targets[periodKey];
  const progress = phase === "setup" ? 0 : Math.min(rawProgress, target);
  const share = amount / period.parts;
  const left = target - progress;
  const unit = (n: number) => (n === 1 ? goal.one : goal.many);

  const isSetup = phase === "setup";
  const isLocked = phase === "locked";
  const isUnlocked = phase === "unlocked";
  const ratio = isUnlocked ? 1 : progress / target;

  const reset = (next: Phase) => {
    clearTimeout(holdTimer.current);
    setPhase(next);
    setProgress(0);
    setHolding(false);
    setNudged(false);
  };
  const commit = () => reset("locked");
  const edit = () => reset("setup");

  const holdStart = (e: React.PointerEvent) => {
    if (e.button) return;
    clearTimeout(holdTimer.current);
    setHolding(true);
    holdTimer.current = setTimeout(commit, HOLD_MS);
  };
  const holdEnd = () => {
    if (!holding) return;
    clearTimeout(holdTimer.current);
    setHolding(false);
    setNudged(true);
  };

  const onProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (v >= target) {
      setPhase("unlocked");
      setProgress(target);
    } else {
      setPhase("locked");
      setProgress(v);
    }
  };

  const stepCls = (active: boolean, done: boolean) =>
    `step${active ? " is-active" : ""}${done ? " is-done" : ""}`;

  return (
    <div className="console glass reveal">
      <div className="console-bar">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="block size-2.5 rounded-full transition-colors duration-600"
            style={{ background: isSetup ? "rgba(20, 26, 69, 0.3)" : isLocked ? "var(--cyan)" : "var(--green)" }}
          />
          <span aria-live="polite">{isSetup ? "Setting up" : isLocked ? "Funds locked" : "Funds available"}</span>
        </div>
        <span>Demo with illustrative figures</span>
      </div>

      <div className="console-grid">
        <ol className="steps">
          <li className={stepCls(isSetup, !isSetup)}>
            <div className="step-num" aria-hidden="true">1</div>
            <div className="step-body">
              <h3 className="step-title">Choose a goal and set money aside</h3>
              {isSetup ? (
                <div className="fade-in flex flex-col gap-[18px]">
                  <Options
                    label="Amount to set aside"
                    options={AMOUNTS.map((v) => ({ value: v, label: money(v) }))}
                    value={amount}
                    onPick={setAmount}
                  />
                  <Options
                    label="Unlock period"
                    options={(Object.keys(PERIODS) as PeriodKey[]).map((k) => ({ value: k, label: PERIODS[k].label }))}
                    value={periodKey}
                    onPick={setPeriodKey}
                  />
                  <Options
                    label="Goal"
                    options={(Object.keys(GOALS) as GoalKey[]).map((k) => ({ value: k, label: GOALS[k].label }))}
                    value={goalKey}
                    onPick={setGoalKey}
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className={`hold${holding ? " is-holding" : ""}`}
                      onPointerDown={holdStart}
                      onPointerUp={holdEnd}
                      onPointerLeave={holdEnd}
                      onPointerCancel={holdEnd}
                      onClick={(e) => {
                        // keyboard activation has no pointer, so commit straight away
                        if (e.detail === 0) commit();
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <span className="hold-fill" aria-hidden="true" />
                      <span className="relative flex items-center justify-center gap-2.5">
                        <Heart size={22} stroke={2.2} />
                        <span>Hold to set aside {money(amount)}</span>
                      </span>
                    </button>
                    <span aria-live="polite" className="text-sm font-normal text-(--muted)">
                      {nudged
                        ? "Almost. Keep holding until the bar fills."
                        : "Press and hold to set it aside. On a keyboard, press Enter."}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
                  <span className="step-note">
                    {money(amount)} locked · {period.label} · {goal.label}
                  </span>
                  <button type="button" className="ghost" onClick={edit}>
                    Change
                  </button>
                </div>
              )}
            </div>
          </li>

          <li className={stepCls(isLocked, isUnlocked)}>
            <div className="step-num" aria-hidden="true">2</div>
            <div className="step-body">
              <h3 className="step-title">Stay active to access your money</h3>
              {isLocked && (
                <div className="fade-in flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <label htmlFor="ww-activity" className="field-label">
                      {period.noun} {goal.many}
                    </label>
                    <span className="text-[15px] font-medium whitespace-nowrap text-(--ink)">
                      {num(progress)} / {num(target)}
                    </span>
                  </div>
                  <div className="relative h-11">
                    <div className="rng-track" aria-hidden="true">
                      <div
                        className="rng-fill"
                        style={{ width: `calc(17px + (100% - 34px) * ${(progress / target).toFixed(4)})` }}
                      />
                    </div>
                    <input
                      id="ww-activity"
                      className="rng"
                      type="range"
                      min={0}
                      max={target}
                      step={goalKey === "workouts" ? 1 : target / 20}
                      value={progress}
                      onChange={onProgress}
                      aria-valuetext={`${num(left)} ${unit(left)} to go`}
                    />
                  </div>
                  <span aria-live="polite" className="text-[15px] font-medium text-(--text)">
                    {num(left)} {unit(left)} to go
                  </span>
                </div>
              )}
              {isSetup && <span className="step-note">Set your money aside first, then get moving.</span>}
              {isUnlocked && (
                <span className="flex items-center gap-2 text-base font-medium text-(--teal)">
                  <Check stroke={2.6} />
                  <span>
                    Verified: {num(target)} {unit(target)}
                  </span>
                </span>
              )}
            </div>
          </li>

          <li className={stepCls(isUnlocked, false)}>
            <div className="step-num" aria-hidden="true">3</div>
            <div className="step-body">
              <h3 className="step-title">Reach goals to earn rewards</h3>
              {isUnlocked ? (
                <div className="fade-in flex flex-col items-start gap-3.5">
                  <span className="step-note">
                    {money(share)} is ready to spend on your digital card. Keep the streak going to collect badges,
                    bonus points and partner discounts.
                  </span>
                  <button type="button" className="ghost min-h-12! px-[22px]! text-base!" onClick={edit}>
                    Set up your own
                  </button>
                </div>
              ) : (
                <span className="step-note">Streaks, badges, bonus points and partner discounts.</span>
              )}
            </div>
          </li>
        </ol>

        <div className="preview">
          <div className="chip-ink">
            {isLocked ? (
              <Lock size={14} stroke={2.2} className="text-(--lime)" />
            ) : (
              <span aria-hidden="true" className="blob morph-soft size-3 bg-(--lime)" />
            )}
            <span>{isSetup ? "Not set aside yet" : isLocked ? "Money set aside" : "Goal verified"}</span>
          </div>

          <div className="meter">
            {isUnlocked && (
              <>
                <div aria-hidden="true" className="meter-burst burst border-[3px] border-(--lime)" />
                <div aria-hidden="true" className="meter-burst burst burst-2 border-2 border-(--green)" />
              </>
            )}
            <svg viewBox="0 0 250 250" width="250" height="250" aria-hidden="true">
              <circle cx="125" cy="125" r="108" fill="none" stroke="rgba(20, 26, 69, 0.09)" strokeWidth="22" />
              <circle
                cx="125"
                cy="125"
                r="108"
                fill="none"
                strokeWidth="22"
                strokeLinecap="round"
                strokeDasharray={RING_LENGTH}
                style={{
                  stroke: ratio === 0 ? "transparent" : isUnlocked ? "var(--green)" : "var(--cyan)",
                  strokeDashoffset: (RING_LENGTH * (1 - ratio)).toFixed(1),
                  transition: "stroke-dashoffset 0.9s var(--ease), stroke 0.8s ease",
                }}
              />
            </svg>
            <div key={phase} className={`meter-disc${isUnlocked ? " settle" : ""}`}>
              <span
                className="text-[46px] leading-none font-normal tracking-[-0.035em]"
                style={{ color: isUnlocked ? "var(--teal)" : "var(--ink)" }}
              >
                {isSetup ? money(amount) : isLocked ? num(progress) : money(share)}
              </span>
              <span className="text-[15px] font-medium text-(--muted)">
                {isSetup ? "ready to set aside" : isLocked ? `/ ${num(target)} ${goal.many}` : "now available"}
              </span>
            </div>
          </div>

          {isUnlocked && (
            <div className="banner settle" role="status">
              <span aria-hidden="true" className="blob morph-soft size-[18px] bg-(--lime)" />
              <span>
                {money(share)} made available {period.when}
              </span>
            </div>
          )}

          <dl className="ledger glass-soft">
            <div>
              <dt>Money Set Aside</dt>
              <dd>{isSetup ? "£0" : money(isUnlocked ? amount - share : amount)}</dd>
            </div>
            <div>
              <dt>Money Available</dt>
              <dd>{isUnlocked ? money(share) : "£0"}</dd>
            </div>
            <div>
              <dt>Unlock Period</dt>
              <dd>{period.label}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
