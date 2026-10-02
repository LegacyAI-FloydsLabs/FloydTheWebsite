import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Floyd Labs. We read everything, usually at 3 AM.",
};

export default function ContactPage() {
  const facts = [
    ["⌖", "Location", "Brown County, Indiana", "Probably a garage. Maybe a barn.", "cyan"],
    ["◷", "Response Time", "Eventually", "Peak hours: 2–4:47 AM", "pink"],
    ["🐈", "Current Status", "Building Stuff", "Bella is supervising", "orange"],
    ["☕", "Fuel Level", "Motor Oil Coffee", "Don’t ask what cup this is", "green"],
  ];
  return (
    <>
      <PageHero eyebrow="DISPATCH FROM THE FIELD" title="Contact Us">
        <p>We read every message. Usually at 3 AM. Response time depends on the coffee situation and whether Bella is on the keyboard.</p>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap contact-grid">
          <aside>
            {facts.map(([icon, label, value, sub, accent]) => (
              <div className="floyd-card fact-card" key={label}>
                <span className={`fact-icon ${accent}`}>{icon}</span>
                <div><small>{label}</small><strong>{value}</strong><p>{sub}</p></div>
              </div>
            ))}
            <div className="glass-panel privacy-note">
              <strong>Privacy note:</strong>
              <p>The production site saves messages for one caffeinated human and possibly a cat. This proving ground does not.</p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
