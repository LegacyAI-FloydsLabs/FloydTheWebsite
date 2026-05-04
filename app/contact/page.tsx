import { Metadata } from 'next';
import { ContactForm } from './_components/contact-form';
import { MapPin, Clock, Cat, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | Floyd Labs',
  description: 'Get in touch with Floyd Labs. We read everything, usually at 3 AM.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-16 px-4">
        <div className="glass-panel max-w-3xl mx-auto text-center p-8">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full border mb-6 inline-block"
            style={{
              color: 'var(--floyd-accent-cyan)',
              borderColor: 'var(--floyd-accent-cyan)',
              backgroundColor: 'rgba(0,229,255,0.1)',
            }}
          >
            DISPATCH FROM THE FIELD
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 neon-heading">Contact Us</h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            We read every message. Usually at 3 AM. Response time depends on the coffee situation
            and whether Bella is on the keyboard.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left sidebar */}
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Brown County, Indiana',
                  sub: 'Probably a garage. Maybe a barn.',
                  color: 'var(--floyd-accent-cyan)',
                },
                {
                  icon: Clock,
                  label: 'Response Time',
                  value: 'Eventually',
                  sub: 'Peak hours: 2\u201347 AM',
                  color: 'var(--floyd-accent-pink)',
                },
                {
                  icon: Cat,
                  label: 'Current Status',
                  value: 'Building Stuff',
                  sub: 'Bella is supervising',
                  color: 'var(--floyd-accent-orange)',
                },
                {
                  icon: Coffee,
                  label: 'Fuel Level',
                  value: 'Motor Oil Coffee',
                  sub: "Don't ask what cup this is",
                  color: 'var(--floyd-accent-green)',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="floyd-card p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${item.color}20`,
                          border: `1px solid ${item.color}50`,
                        }}
                      >
                        <Icon size={18} style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--floyd-text-muted)' }}>{item.label}</p>
                        <p className="font-bold text-sm" style={{ color: 'var(--floyd-text-body)' }}>{item.value}</p>
                        <p className="text-xs" style={{ color: 'var(--floyd-text-muted)' }}>{item.sub}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="glass-panel p-4 text-sm font-mono">
                <p style={{ color: 'var(--floyd-accent-cyan)' }} className="mb-2 font-bold">Privacy note:</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--floyd-text-body)' }}>
                  Your message gets saved to our database and read by exactly one (1) caffeinated
                  human and possibly a cat. We don&apos;t sell data. We barely monetize anything.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
