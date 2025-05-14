'use server';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// 서버에서 게시글 생성
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  await prisma.post.create({
    data: { title }
  });

  return { message: 'Post created successfully' };
}

// 서버에서 모든 게시글 조회
export async function getPosts() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
