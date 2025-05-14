'use server';

import { NextResponse } from 'next/server';
import { createPost, getPosts } from '@/app/actions/post'; // action import

// POST 요청: 새로운 게시글을 생성
export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await createPost(formData); // action 호출
  return NextResponse.json(result, { status: 200 });
}

// GET 요청: 모든 게시글을 조회
export async function GET() {
  const posts = await getPosts(); // action 호출
  return posts;
}
