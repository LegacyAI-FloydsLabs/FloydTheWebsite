import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { WorkshopScene } from "@/components/workshop-scene";

export const metadata = {
  title: "About",
  description: "One guy, two cats, a garage, and an unhealthy obsession with AI ownership.",
};

export default function AboutPage() {
  const team = [
    ["DT", "Douglas Talley", "Founder / Guy in the Garage", "Building homemade robots since age seven. Looked at hundreds per month in AI subscriptions and said, “I could build this.” Spoiler: he did.", "cyan"],
    ["🐈", "Bella", "Senior Project Manager", "Knows exactly when you’re about to ship and walks across the keyboard. Detects low coffee levels with alarming accuracy.", "orange"],
    ["🐈‍⬛", "Bowser", "Technical Director", "Knows which server will fail before it does. Has debugged more infrastructure by sitting on routers than most interns.", "purple"],
  ];

  return (
    <>
      <PageHero eyebrow="README / CRY FOR HELP" title="Floyd Labs">
        <h2>How We Accidentally Got a Website and Now Have to Act Like We Know What We&apos;re Doing</h2>
        <p>One guy, two cats, a garage, and a stubborn belief that useful technology should make sense to the human being standing in front of it.</p>
      </PageHero>

      <section className="section-pad compact">
        <div className="content-wrap">
          <div className="classification glass-panel">
            <div><span>DOCUMENT CLASSIFICATION</span><b>README / CRY FOR HELP</b></div>
            <div><span>LOCATION</span><b>Probably a garage. Maybe a barn.</b></div>
            <div><span>BEVERAGE</span><b>Whatever was left in the pot.</b></div>
            <div><span>SANITY LEVEL</span><b>Questionable at best</b></div>
          </div>
        </div>
      </section>

      <section className="section-pad compact">
        <div className="content-wrap story-row">
          <div className="story-copy rural-statement">
          <span className="eyebrow">THE ACTUAL POINT</span>
          <h2>Built Where the Work Is Real</h2>
          <p>Floyd Labs is the rowdy workshop beside the more client-facing side of the business. This is where we experiment, break things safely, argue with bad assumptions, and turn the pieces that survive into tools people can actually use.</p>
          <p>Being in rural Indiana is not a cute origin story. It is the standard. Around here, a product has to help the plumber in the crawlspace, the owner answering calls after hours, and the one-person operation doing six jobs before lunch. If it only works for a software company with a training department, it does not work yet.</p>
          <p className="terminal-line">Build close to the problem. Test it in real life. Keep the useful parts.</p>
          </div>
          <WorkshopScene scene="morning-bench" />
        </div>
      </section>

      <section className="section-pad compact">
        <div className="content-wrap glass-panel prose-panel">
          <h2 className="neon">Useful Is the Standard.</h2>
          <p>Each tool starts with a problem we want out of the way. CrystalMaze opens up architecture ideas. CLI Tools recover skills, prompts, and forgotten work. TerminalOne puts a real shell in the browser. wsdash finds loose ends. PEBKAC asks a coding agent to show its work.</p>
          <p>The public workbench lists what each product does, what it needs, and where its limits are. Optional services can cost money. License terms differ. You should know that before downloading.</p>
          <Link className="button primary" href="/open-source">Find Your Kind of Useful</Link>

        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap">
          <div className="story-row team-story">
            <div className="section-title"><p className="eyebrow">People. Cats. Chain of command.</p><h2 className="neon">The Team</h2><p>1 guy + 2 cats. Fully staffed.</p><p>Bella checks the keyboard. Bowser watches the router. The job titles are serious. The hiring process was not.</p></div>
            <WorkshopScene scene="router-watch" />
          </div>
          <div className="card-grid three-col">
            {team.map(([icon, name, role, copy, accent]) => (
              <article className="floyd-card team-card" key={name}>
                <div className={`avatar ${accent}`}>{icon}</div>
                <h3>{name}</h3>
                <strong className={accent}>{role}</strong>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap glass-panel prose-panel">
          <h2 className="neon">The BALLS Philosophy</h2>
          <p>Yes, we named the core philosophy BALLS. Yes, we stand by it.</p>
          <div className="balls-grid">
            {[
              ["B", "Build", "Anything", "cyan"],
              ["A", "Act", "Autonomously", "pink"],
              ["L", "Launch", "Lean", "green"],
              ["L", "Learn", "Sideways", "orange"],
              ["S", "Stay", "Subversive", "purple"],
            ].map(([letter, word, detail, accent]) => (
              <div className="floyd-card ball" key={`${word}-${detail}`}>
                <b className={accent}>{letter}</b><strong>{word}</strong><span>{detail}</span>
              </div>
            ))}
          </div>
          <div className="center-row"><Link className="button primary" href="/apps">See What We Built</Link></div>
        </div>
      </section>
    </>
  );
}
