"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-panel form-success" role="status">
        <span className="success-mark">✓</span>
        <h2>Message staged.</h2>
        <p>This proving-ground form is intentionally disconnected from the production inbox. Nothing was sent.</p>
        <button className="button secondary" onClick={() => setSubmitted(false)} type="button">Send another preview</button>
      </div>
    );
  }

  return (
    <form className="glass-panel contact-form" onSubmit={submit}>
      <div>
        <span className="eyebrow">PREVIEW TRANSMISSION</span>
        <h2>What&apos;s on your mind?</h2>
        <p>Questions, ideas, collaborations, bug reports, or coffee recommendations.</p>
      </div>
      <div className="field-grid">
        <label>Name<input required name="name" placeholder="Your name" /></label>
        <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
      </div>
      <label>Subject<input required name="subject" placeholder="What are we building?" /></label>
      <label>Message<textarea required name="message" rows={7} placeholder="The useful details…" /></label>
      <button className="button primary" type="submit">Stage Message →</button>
      <small>Preview only. This form does not write to the Floyd Labs production database.</small>
    </form>
  );
}
