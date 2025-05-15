'use client';
import formatTime from '@/lib/utils/formatTime';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  name: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  // GET 요청을 보내서 게시글 가져오기
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts', { method: 'GET' });
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  // POST 요청을 보내서 게시글 생성하기
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData
    });

    // 게시글 추가 후 새로고침
    setName('');
    setContent('');
    setPosts((prev) => [
      ...prev,
      { name, content, id: Date.now(), createdAt: new Date().toISOString() }
    ]);
  }

  return (
    <div className="flex flex-col gap-8 my-4">
      <div className="flex flex-col gap-4 w-fit m-auto p-8 rounded-3xl bg-red-100">
        <h1 className="w-fit py-1 px-3 rounded-full text-white text-lg font-semibold bg-red-400">
          방명록 남기기
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-80 gap-4"
        >
          <input
            className="focus:outline-red-400 w-full p-2 border border-red-300 rounded-xl text-black text-sm"
            type="text"
            placeholder="작성자 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="focus:outline-red-400 w-full p-2 border border-red-300 rounded-xl text-black text-sm"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="hover:bg-red-400 hover:text-white w-fit py-1 px-3 border border-red-400 rounded-2xl text-red-400 text-sm font-semibold bg-white"
          >
            게시글 작성
          </button>
        </form>
      </div>
      <ul className="flex flex-col items-center gap-4 w-96 m-auto p-4 border rounded-2xl">
        {posts.map((post: Post) => (
          <li key={post.id} className="flex flex-col w-full p-2">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs">{post.name}</p>
              <p>{post.content || '작성자가 내용을 입력하지 않았어요.'}</p>
            </div>
            <p className="ml-auto text-gray-400 text-xs">
              {formatTime(post.createdAt)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
