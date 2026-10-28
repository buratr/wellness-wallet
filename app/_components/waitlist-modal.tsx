"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "./icons";

type Status = "idle" | "sending" | "done" | "error";

/** Signup popup. Opens from any link pointing at `#waitlist`. */
export function WaitlistModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest('a[href="#waitlist"]');
      if (!link) return;
      e.preventDefault();
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialog.current?.close();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <dialog
      ref={dialog}
      className="waitlist"
      aria-labelledby="waitlist-title"
      // click on the backdrop closes the popup
      onClick={(e) => e.target === e.currentTarget && close()}
      onClose={() => status === "done" && setStatus("idle")}
    >
      <div className="waitlist-box">
        <button type="button" className="waitlist-close" aria-label="Close" onClick={close}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="text-center mx-auto flex w-fit items-center gap-2.5 rounded-full border border-[rgba(20,26,69,0.12)] bg-white py-2 pr-[18px] pl-3 text-[15px] font-medium text-(--ink)">
          <span aria-hidden="true" className="shrink-0 blob size-3 rounded-full! bg-(--green)" />
          <span>Early sign-ups get 6 months of Premium free</span>
        </div>

        {status === "done" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center" role="status">
            <span className="grid size-16 place-items-center rounded-full bg-(--lime) text-(--ink)">
              <Check size={28} stroke={2.6} />
            </span>
            <h2 id="waitlist-title" className="waitlist-title">You’re on the list!</h2>
            <p className="waitlist-lead">We’ll email you as soon as The Wellness Wallet opens.</p>
            <button type="button" className="btn btn-md mt-2 pr-[26px]!" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="waitlist-title" className="waitlist-title">
              Join the Waitlist
            </h2>
            <p className="waitlist-lead">
              Get notified when The Wellness Wallet opens and be one of the first to turn your own money into
              motivation.
            </p>

            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
              <label className="waitlist-field">
                <span>Email address</span>
                <input type="email" name="email" required autoComplete="email" placeholder="you@example.com" />
              </label>
              <label className="waitlist-field">
                <span>How did you hear about us?</span>
                <input type="text" name="source" maxLength={200} placeholder="Social media, friend, or search" />
              </label>
              <label className="waitlist-field">
                <span>What motivates you to join?</span>
                <textarea
                  name="motivation"
                  rows={3}
                  maxLength={1000}
                  placeholder="I want to commit money to my fitness goals and unlock it when I make progress."
                />
              </label>

              {status === "error" && (
                <p role="alert" className="m-0 text-center text-[15px] font-medium text-[#c0392b]">
                  {error}
                </p>
              )}

              <div className="flex flex-col items-center gap-4 pt-1">
                <button type="submit" className="btn btn-lg" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Sending…" : "Join the Waitlist"}</span>
                  <span className="dot" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </button>
                <p className="m-0 text-[15px] font-normal text-(--muted)">Movement verified by Apple, Fitbit or Strava</p>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
