import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar } from 'lucide-react';
import { DeleteBlogButton, TogglePublishButton } from './_components/blog-actions';

export const dynamic = 'force-dynamic';

async function getBlogPosts() {
  return prisma.blog_post.findMany({
    orderBy: { date: 'desc' },
  });
}

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      {/* Header */}
      <div className="glass-panel p-6 flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--floyd-text-heading)' }}
          >
            Blog Posts
          </h1>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            {posts.length} post{posts.length !== 1 ? 's' : ''} in the garage archives
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all"
          style={{
            background: 'var(--floyd-accent-cyan)',
            color: '#0a0510',
          }}
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="floyd-card p-12 text-center">
          <p
            className="text-xl mb-4"
            style={{ color: 'var(--floyd-text-body)' }}
          >
            No blog posts yet. The manifesto awaits.
          </p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold"
            style={{
              background: 'var(--floyd-accent-cyan)',
              color: '#0a0510',
            }}
          >
            <Plus size={20} />
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="floyd-card p-6 flex items-center justify-between"
              style={{
                opacity: post.published ? 1 : 0.85,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: 'var(--floyd-text-heading)' }}
                  >
                    {post.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    style={{
                      background: post.published
                        ? 'rgba(118, 255, 3, 0.2)'
                        : 'rgba(255, 171, 0, 0.2)',
                      color: post.published
                        ? 'var(--floyd-accent-green)'
                        : 'var(--floyd-accent-orange)',
                    }}
                  >
                    {post.published ? (
                      <><Eye size={12} /> Published</>
                    ) : (
                      <><EyeOff size={12} /> Draft</>
                    )}
                  </span>
                </div>
                {post.subtitle && (
                  <p
                    className="text-sm mb-2"
                    style={{ color: 'var(--floyd-text-body)' }}
                  >
                    {post.subtitle}
                  </p>
                )}
                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ color: 'var(--floyd-text-muted)' }}
                >
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span>By {post.author}</span>
                  <span>/{post.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--floyd-text-muted)',
                  }}
                  title="View"
                >
                  <Eye size={18} />
                </Link>
                <TogglePublishButton id={post.id} published={post.published} />
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: 'rgba(0, 229, 255, 0.1)',
                    color: 'var(--floyd-accent-cyan)',
                  }}
                  title="Edit"
                >
                  <Edit size={18} />
                </Link>
                <DeleteBlogButton id={post.id} title={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
