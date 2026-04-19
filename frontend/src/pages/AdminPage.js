// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          API.get('/admin/users'),
          API.get('/admin/posts'),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const { data } = await API.put(`/admin/users/${id}/status`);
      setUsers(users.map((u) => (u._id === id ? data.user : u)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status.');
    }
  };

  const removePost = async (id) => {
    if (!window.confirm('Are you sure you want to remove this post?')) return;
    try {
      await API.put(`/admin/posts/${id}/remove`);
      setPosts(posts.map((p) => (p._id === id ? { ...p, status: 'removed' } : p)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove post.');
    }
  };

  if (loading) return <p style={{ padding: '40px 30px', color: '#d4af37' }}>Loading admin data...</p>;
  if (error)   return <p className="error-msg" style={{ margin: '40px 30px' }}>{error}</p>;

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <div className="admin-tabs">
        <button
          onClick={() => setTab('users')}
          className={tab === 'users' ? 'active' : ''}
        >
          Members ({users.length})
        </button>
        <button
          onClick={() => setTab('posts')}
          className={tab === 'posts' ? 'active' : ''}
        >
          All Posts ({posts.length})
        </button>
      </div>

      {tab === 'users' && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#64748b' }}>
                  No members found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`status-badge ${u.status}`}>{u.status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStatus(u._id)}
                      className={u.status === 'active' ? 'btn-danger' : 'btn-success'}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {tab === 'posts' && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#64748b' }}>
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.author?.name}</td>
                  <td>
                    <span className={`status-badge ${p.status}`}>{p.status}</span>
                  </td>
                  <td>
                    {p.status === 'published' && (
                      <button className="btn-danger" onClick={() => removePost(p._id)}>
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;