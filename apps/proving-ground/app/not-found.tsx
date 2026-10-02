import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-pad not-found">
      <div className="glass-panel">
        <span className="eyebrow">ERROR 404 / CAT-ASSISTED ROUTING</span>
        <h1>Bowser sat on the link.</h1>
        <p>This page does not exist in the proving ground.</p>
        <Link className="button primary" href="/">Return to the garage</Link>
      </div>
    </section>
  );
}
