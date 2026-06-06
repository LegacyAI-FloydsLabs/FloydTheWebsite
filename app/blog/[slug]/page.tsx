import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getBlogPost as getStaticBlogPost, getAllSlugs } from '@/lib/blog-data';
import { marked } from 'marked';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getBlogPost(slug: string) {
  try {
    const dbPost = await prisma.blog_post.findUnique({
      where: { slug },
    });
    
    if (dbPost) {
      return {
        slug: dbPost.slug,
        title: dbPost.title,
        subtitle: dbPost.subtitle || '',
        date: dbPost.date.toISOString().split('T')[0],
        author: dbPost.author,
        authorRole: dbPost.author_role || '',
        tags: dbPost.tags,
        excerpt: dbPost.excerpt || '',
        content: dbPost.content,
      };
    }
    
    // Fallback to static data
    return getStaticBlogPost(slug);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return getStaticBlogPost(slug);
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getBlogPost(params?.slug ?? '');
  if (!post) return { title: 'Post Not Found | Floyd Labs' };
  return {
    title: `${post.title} | Floyd Labs Blog`,
    description: post.excerpt ?? '',
  };
}

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params?.slug ?? '');
  if (!post) notFound();

  const htmlContent = marked.parse(post?.content ?? '') as string;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-12 px-4">
        <div className="glass-panel max-w-3xl mx-auto p-8">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-4">
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

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-black mb-2"
            style={{ color: 'var(--floyd-text-heading)' }}
          >
            {post?.title ?? ''}
          </h1>
          <p
            className="text-lg italic mb-6"
            style={{ color: 'var(--floyd-text-subheading)' }}
          >
            {post?.subtitle ?? ''}
          </p>

          {/* Meta */}
          <div
            className="flex flex-wrap gap-5 text-sm pb-6 border-b"
            style={{
              color: 'var(--floyd-text-muted)',
              borderColor: 'rgba(156,39,176,0.4)',
            }}
          >
            <span className="flex items-center gap-1.5">
              <User size={14} style={{ color: 'var(--floyd-accent-cyan)' }} />
              {post?.author ?? ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} style={{ color: 'var(--floyd-accent-cyan)' }} />
              {post?.date ?? ''}
            </span>
            <span style={{ color: 'var(--floyd-accent-orange)' }}>{post?.authorRole ?? ''}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel p-8">
            <article
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: typeof htmlContent === 'string' ? htmlContent : '' }}
            />

            {/* Footer */}
            <div
              className="mt-16 pt-8 border-t"
              style={{ borderColor: 'rgba(156,39,176,0.4)' }}
            >
              <p className="text-xs font-mono mb-6" style={{ color: 'var(--floyd-text-muted)' }}>
                Filed from the garage at 3 AM. Coffee was involved.
              </p>
              <Link
                href="/blog"
                className="btn-neon-cyan px-5 py-2.5 rounded-lg text-sm font-medium inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
