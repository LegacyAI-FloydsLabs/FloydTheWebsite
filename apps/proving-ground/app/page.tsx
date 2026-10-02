import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/site-data";
import { WorkshopScene } from "@/components/workshop-scene";

export default function HomePage() {
  return <>
    <section className="workshop-hero content-wrap">
      <div className="workshop-message">
        <p className="eyebrow">Independent tools. Brown County, Indiana.</p>
        <h1>Small lab.<br />Useful tools.<br /><em>Zero theater.</em></h1>
        <p className="hero-lede">Useful technology for <strong>actual people.</strong></p>
        <p>We build the tools we wish existed. Then we put them to work. One garage, two black cats, and coffee that probably needs an oil change.</p>
        <div className="button-row"><Link className="button primary" href="/open-source">Get the tools</Link><Link className="button secondary" href="/about">Meet the garage</Link></div>
        <div className="workshop-signature"><span>Built with intent.</span><span>Because spite is a valid engineering motivation.</span></div>
      </div>
      <figure className="workshop-art">
        <Image src="/brand/workshop.webp" width={1322} height={528} unoptimized priority alt="An imagined Floyd’s Labs workbench: a prism, oscilloscope, coffee, and Bella and Bowser" />
        <figcaption><span>001 / THE GARAGE</span><span>Built here. Used out there.</span></figcaption>
      </figure>
    </section>
    <section className="workshop-strip"><div className="content-wrap"><span>Independent by design</span><span>Your tools. Your work.</span><span>Bella checks the keyboard. Bowser watches the router.</span></div></section>
    <section className="section-pad content-wrap">
      <div className="editorial-heading"><div><p className="eyebrow">From the workbench</p><h2>Less friction.<br />More <em>getting somewhere.</em></h2></div><p>You should understand what a tool does before you download it. Clear purpose, honest requirements, and a proper place to get help.</p></div>
      <div className="principle-grid">
        <article><span className="index-number">01 / PURPOSE</span><h3>Built for a real problem.</h3><p>Recover forgotten work. Give your terminal some breathing room. Make a coding agent show its work. The tool earns its place.</p></article>
        <article><span className="index-number">02 / OWNERSHIP</span><h3>Keep your hands on the wheel.</h3><p>Run the tools on your own machine. Know what they need, where your data goes, and which optional services cost money.</p></article>
        <article><span className="index-number">03 / HONESTY</span><h3>Show the work.</h3><p>A shiny badge is cheap. A usable download, clear instructions, and checks you can repeat are the part that matters.</p></article>
      </div>
    </section>
    <section className="workbench-callout section-pad"><div className="content-wrap story-row">
      <div className="story-copy"><p className="eyebrow">The public workbench</p><h2>Five tools.<br /><em>Pick your kind of useful.</em></h2><p>Architecture ideas. Everyday command-line helpers. A browser terminal. A workspace dashboard. Guardrails for coding agents.</p><div className="button-row"><Link href="/open-source" className="button primary">Browse the products</Link><Link href="/tools" className="text-link">Explore MCP Tools</Link></div></div>
      <WorkshopScene scene="electronics-workbench" />
    </div></section>
    <section className="section-pad content-wrap">
      <div className="editorial-heading"><div><p className="eyebrow">Notes, experiments, occasional caffeine damage</p><h2>Latest from the Garage</h2></div><Link className="button secondary" href="/blog">All garage notes</Link></div>
      <div className="card-grid three-col">{posts.slice(0,3).map(post=><Link className="floyd-card post-card" href={`/blog/${post.slug}`} key={post.slug}><span className="index-number">FIELD NOTE / {post.date}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="post-meta">{post.author}</span></Link>)}</div>
    </section>
    <section className="section-pad content-wrap story-row workshop-team">
      <WorkshopScene scene="router-watch" />
      <div className="story-copy"><p className="eyebrow">The overnight shift</p><h2>Small crew.<br /><em>Strong supervision.</em></h2><p>Bella manages the keyboard. Bowser keeps an eye on the infrastructure. Floyd does the bit that requires opposable thumbs.</p><p>One garage. Plenty of curiosity. A healthy disrespect for work that gets in the way of working.</p><Link href="/about" className="text-link">Meet the whole operation <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="garage-closing content-wrap story-row">
      <div className="story-copy"><p className="eyebrow">Built in a garage. Answerable to cats.</p><h2>Got a problem that<br /><em>deserves a better tool?</em></h2><p>The coffee’s on. Bring the problem that keeps making your day harder than it needs to be.</p><Link href="/contact" className="button primary">Talk to Floyd’s Labs</Link></div>
      <WorkshopScene scene="morning-bench" />
    </section>
  </>;
}
