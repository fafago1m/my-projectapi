import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const GameUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [zip, setZip] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category_id', categoryId);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    if (zip) formData.append('zip', zip);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/games`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`, // pastikan token tersedia
          },
        }
      );
      alert('Game uploaded successfully');
      router.push('/developer/dashboard'); // redirect ke halaman dashboard developer setelah berhasil
    } catch (error) {
      setError('Failed to upload game');
    }
  };

  return (
    <div>
      <h1>Upload Game</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Game Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Game Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
        />
        <input
          type="file"
          onChange={(e) => setZip(e.target.files ? e.target.files[0] : null)}
        />
        <button type="submit">Upload Game</button>
      </form>
    </div>
  );
};

export default GameUpload;
