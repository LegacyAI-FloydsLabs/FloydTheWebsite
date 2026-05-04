import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { blogPosts as staticBlogPosts } from '@/lib/blog-data';
import { BookOpen, Calendar, User, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Floyd Labs',
  description: 'Manifestos, chronicles, and dispatches from the garage. Floyd Labs blog.',
};

const tagColors = [
  'var(--floyd-accent-cyan)',
  'var(--floyd-accent-pink)',
  'var(--floyd-accent-green)',
  'var(--floyd-accent-orange)',
  'var(--floyd-text-subheading)',
];

function getTagColor(tag: string): string {
  const hash = (tag ?? '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return tagColors[hash % tagColors.length] ?? tagColors[0];
}

async function getBlogPosts() {
  try {
    const dbPosts = await prisma.blog_post.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
    });
    
    if (dbPosts.length > 0) {
      return dbPosts.map(post => ({
        slug: post.slug,
        title: post.title,
        subtitle: post.subtitle || '',
        date: post.date.toISOString().split('T')[0],
        author: post.author,
        authorRole: post.author_role || '',
        tags: post.tags,
        excerpt: post.excerpt || '',
        content: post.content,
      }));
    }
    
    // Fallback to static data if no DB posts
    return staticBlogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return staticBlogPosts;
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-16 px-4 text-center">
        <div className="glass-panel max-w-3xl mx-auto p-8">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full border mb-6 inline-block"
            style={{
              color: 'var(--floyd-accent-cyan)',
              borderColor: 'var(--floyd-accent-cyan)',
              backgroundColor: 'rgba(0,229,255,0.1)',
            }}
          >
            DISPATCHES FROM THE GARAGE
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 neon-heading">
            The Blog
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            Manifestos, chronicles, testimonials, and late-night rants. All written between
            midnight and 4 AM. Coffee involved throughout.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {posts.map((post, i) => (
              <Link key={post?.slug ?? i} href={`/blog/${post?.slug ?? ''}`}>
                <div
                  className="floyd-card p-7 cursor-pointer group block"
                  style={{ display: 'block' }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    {/* Post number */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-black text-xl font-mono"
                      style={{
                        color: 'var(--floyd-accent-cyan)',
                        backgroundColor: 'rgba(0,229,255,0.1)',
                        border: '1px solid rgba(0,229,255,0.3)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="flex-1">
                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-xs mb-3" style={{ color: 'var(--floyd-text-muted)' }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {post?.date ?? ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {post?.author ?? ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {post?.authorRole ?? ''}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-xl font-bold mb-1 transition-colors"
                        style={{ color: 'var(--floyd-text-heading)' }}
                      >
                        {post?.title ?? ''}
                      </h2>
                      <p
                        className="text-sm mb-3 italic"
                        style={{ color: 'var(--floyd-text-subheading)' }}
                      >
                        {post?.subtitle ?? ''}
                      </p>

                      {/* Excerpt */}
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: 'var(--floyd-text-muted)' }}
                      >
                        {(post?.excerpt ?? '').slice(0, 200)}...
                      </p>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {(post?.tags ?? []).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded font-mono flex items-center gap-1"
                            style={{
                              color: getTagColor(tag),
                              backgroundColor: `${getTagColor(tag)}15`,
                              border: `1px solid ${getTagColor(tag)}40`,
                            }}
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Read more */}
                    <div
                      className="flex-shrink-0 text-sm font-mono mt-2 md:mt-0"
                      style={{ color: 'var(--floyd-accent-cyan)' }}
                    >
                      Read &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
