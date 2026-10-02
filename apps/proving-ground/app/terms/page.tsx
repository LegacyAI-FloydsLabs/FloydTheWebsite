import { PageHero } from "@/components/page-hero";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="THE RULES, SUCH AS THEY ARE" title="Terms of Service">
        <p>This is an experimental proving ground, not the production Floyd Labs service.</p>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap narrow glass-panel legal-copy">
          <h2>Preview status</h2>
          <p>Content, navigation, features, data, and interfaces here may change without notice. Some functionality is deliberately simulated.</p>
          <h2>No production transactions</h2>
          <p>Forms do not send messages, API examples do not execute requests, and application status labels are presented for design evaluation.</p>
          <h2>Use your judgment</h2>
          <p>Do not submit secrets, credentials, personal records, or production data to experimental features.</p>
          <h2>Ownership</h2>
          <p>Floyd Labs and Legacy AI names, visual identity, original writing, and assets remain with their respective owner. External software retains its own license.</p>
        </div>
      </section>
    </>
  );
}
