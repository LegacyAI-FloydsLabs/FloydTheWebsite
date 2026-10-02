import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { posts } from "@/lib/site-data";
import { formatPostDate } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Manifestos, chronicles, and dispatches from the Floyd Labs garage.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="DISPATCHES FROM THE GARAGE" title="The Blog">
        <p>Manifestos, chronicles, testimonials, and late-night rants. All written between midnight and 4 AM. Coffee involved throughout.</p>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap post-list">
          {posts.map((post, index) => (
            <Link className="floyd-card post-row" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="post-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <span className="post-meta">{[formatPostDate(post.date), post.author].filter(Boolean).join(" · ") || "Garage Chronicles"}</span>
                <h2>{post.title}</h2>
                <strong>{post.subtitle}</strong>
                <p>{post.excerpt}</p>
                <div className="tags">{post.tags.map((tag) => <span className="tag cyan" key={tag}>{tag}</span>)}</div>
              </div>
              <span className="read-more">Read →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
