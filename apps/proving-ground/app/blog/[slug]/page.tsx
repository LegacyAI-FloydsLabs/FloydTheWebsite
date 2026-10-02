import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { posts } from "@/lib/site-data";
import { formatPostDate } from "@/lib/posts";
import { siteUrl } from "@/lib/deployment";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.date || undefined,
      authors: post.author ? [post.author] : undefined,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Floyd Labs Garage Chronicles" }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: ["/og.png"] },
  };
}

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return part;
  });
}

function MarkdownBody({ source }: { source: string }) {
  const lines = source.split("\n");
  const nodes: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let facts: Array<{ label: string; value: string }> = [];
  let ordered = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const value = paragraph.join(" ").trim();
    if (value) nodes.push(<p key={"p-" + nodes.length}>{inline(value)}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    const items = list.map((item, index) => <li key={index}>{inline(item)}</li>);
    nodes.push(ordered ? <ol key={"l-" + nodes.length}>{items}</ol> : <ul key={"l-" + nodes.length}>{items}</ul>);
    list = [];
  };
  const flushFacts = () => {
    if (!facts.length) return;
    nodes.push(
      <dl className="story-facts" key={"f-" + nodes.length}>
        {facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{inline(fact.value)}</dd></div>)}
      </dl>,
    );
    facts = [];
  };
  const flushAll = () => { flushParagraph(); flushList(); flushFacts(); };

  lines.forEach((line) => {
    const trimmed = line.trim();
    const fact = trimmed.match(/^\*\*([^*]+):\*\*\s*(.*)$/);
    const listMatch = trimmed.match(/^(?:[-*] |(\d+)\. )(.*)$/);
    if (!trimmed) { flushAll(); return; }
    if (trimmed === "---") { flushAll(); return; }
    if (fact) { flushParagraph(); flushList(); facts.push({ label: fact[1], value: fact[2] }); return; }
    flushFacts();
    if (listMatch) {
      flushParagraph();
      const isOrdered = Boolean(listMatch[1]);
      if (list.length && ordered !== isOrdered) flushList();
      ordered = isOrdered;
      list.push(listMatch[2]);
      return;
    }
    flushList();
    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      const headingText = heading[2];
      nodes.push(heading[1].length === 2 ? <h2 key={"t-" + nodes.length}>{inline(headingText)}</h2> : <h3 key={"t-" + nodes.length}>{inline(headingText)}</h3>);
      return;
    }
    if (trimmed.startsWith("> ")) { flushParagraph(); nodes.push(<blockquote key={"q-" + nodes.length}>{inline(trimmed.slice(2))}</blockquote>); return; }
    paragraph.push(trimmed);
  });
  flushAll();
  return <>{nodes}</>;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postIndex = posts.findIndex((item) => item.slug === slug);
  if (postIndex === -1) notFound();
  const post = posts[postIndex];
  const previous = posts[postIndex - 1];
  const next = posts[postIndex + 1];
  const storyNumber = String(postIndex + 1).padStart(2, "0");
  const readMinutes = Math.max(1, Math.ceil(post.body.split(/\s+/).length / 220));

  return (
    <article className="article-page">
      <div className="content-wrap article-wrap">
        <Link className="article-back" href="/blog">← All Garage Chronicles</Link>
        <header className="article-masthead">
          <div className="article-sequence">
            <span>Garage Chronicles</span>
            <b>Story {storyNumber} / {String(posts.length).padStart(2, "0")}</b>
          </div>
          <h1>{post.title}</h1>
          <p className="article-deck">{post.subtitle}</p>
          <div className="article-byline">
            {post.author && <span>{post.author}</span>}
            {post.date && <time dateTime={post.date}>{formatPostDate(post.date)}</time>}
            <span>{readMinutes} min read</span>
          </div>
        </header>

        <div className="article-layout">
          <aside className="article-rail" aria-label="Story information">
            <span className="rail-label">Reading edition</span>
            <strong>Audio-ready text</strong>
            <p>Structured for a clean read while preserving the performance cues used by the listening edition.</p>
            <div className="rail-progress" aria-label={"Story " + storyNumber + " of " + posts.length}>
              <span style={{ width: ((postIndex + 1) / posts.length * 100) + "%" }} />
            </div>
            <small>{storyNumber} of {String(posts.length).padStart(2, "0")} in sequence</small>
          </aside>

          <div className="article-body">
            <MarkdownBody source={post.body} />
          </div>
        </div>

        <nav className="story-navigation" aria-label="Garage Chronicles navigation">
          {previous ? (
            <Link className="story-nav-link previous" href={"/blog/" + previous.slug}>
              <span>← Previous story</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : <span className="story-nav-spacer" />}
          {next ? (
            <Link className="story-nav-link next" href={"/blog/" + next.slug}>
              <span>Next story →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link className="story-nav-link next" href="/blog">
              <span>End of the sequence</span>
              <strong>Return to all stories →</strong>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
