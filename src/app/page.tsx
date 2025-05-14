'use client';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');

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
    formData.append('title', title);

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    // 게시글 추가 후 새로고침
    setTitle('');
    setPosts((prevPosts) => [...prevPosts, { title, id: Date.now() }]);
  }

  return (
    <div>
      <h1>게시글 목록</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">게시글 작성</button>
      </form>

      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
