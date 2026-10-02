import { PageHero } from "@/components/page-hero";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="LEGAL, BUT HUMAN" title="Privacy Policy">
        <p>Short version: your data is yours. This proving ground does not collect form submissions, create accounts, or write visitor data to a database.</p>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap narrow glass-panel legal-copy">
          <h2>What this proving ground does</h2>
          <p>It renders a public preview of Floyd Labs pages and lets you test local interactions such as navigation, search, filters, theme changes, and form states.</p>
          <h2>What it does not do</h2>
          <p>It does not connect to the production Floyd Labs database, authentication system, MCP servers, contact inbox, analytics account, or API keys.</p>
          <h2>External links</h2>
          <p>Links to Legacy AI and GitHub leave this site. Those services have their own privacy practices.</p>
          <h2>Before production</h2>
          <p>Any feature that stores information should receive a fresh privacy and security review before it is promoted from this proving ground.</p>
        </div>
      </section>
    </>
  );
}
