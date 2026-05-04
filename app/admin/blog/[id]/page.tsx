import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { BlogEditForm } from './_components/blog-edit-form';

export const dynamic = 'force-dynamic';

async function getBlogPost(id: string) {
  return prisma.blog_post.findUnique({ where: { id } });
}

export default async function EditBlogPost({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return <BlogEditForm post={post} />;
}
