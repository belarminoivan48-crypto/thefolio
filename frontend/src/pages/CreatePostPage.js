// frontend/src/pages/CreatePostPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
      const { data } = await API.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post.');
    }
  };

  return (
    <div className="create-post-page">
      <h2>Write a New Post</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />

        {/* Fix: was written as '<text area>' (broken JSX tag) */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post here..."
          rows={12}
          required
        />

        {/* Image upload — admin only */}
        {user?.role === 'admin' && (
          <div>
            <label style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Upload Cover Image (Admin only):
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}

        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;