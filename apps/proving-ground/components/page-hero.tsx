export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-hero section-pad">
      <div className="glass-panel page-hero-panel">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="hero-copy">{children}</div>
      </div>
    </section>
  );
}
