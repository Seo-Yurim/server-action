'use client';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
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
    const result = await response.json();

    // 게시글 추가 후 새로고침
    setName('');
    setContent('');
    setPosts((prev) => [
      ...prev,
      { name, content, id: Date.now(), createdAt: new Date() }
    ]);
  }

  return (
    <div>
      <h1>게시글 목록</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">게시글 작성</button>
      </form>

      <ul>
        {posts.map((post: Post) => (
          <div key={post.id}>
            <li>{post.name}</li>
            <li>{post.content}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
