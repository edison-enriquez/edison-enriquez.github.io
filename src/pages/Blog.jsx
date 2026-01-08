import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import yaml from 'js-yaml';
import { FaCalendar, FaArrowRight } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blog-posts.yaml')
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading blog posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="blog-loading">
        <p>Cargando posts<span className="cursor"></span></p>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">edison@enriquez: ~/blog</div>
        </div>
        <div className="terminal-command-bar">
          <div className="command-line">
            <span className="prompt-arrow">➜</span>
            <span className="prompt-dir">blog</span>
            <span className="git-branch">git:(<span className="branch-name">main</span>)</span>
            <span className="command">ls -lah --color=auto</span>
          </div>
        </div>

        <div className="blog-content">
          <div className="blog-header-section">
            <h1 className="page-title">
              Blog
            </h1>
            <p className="page-subtitle">Artículos sobre tecnología, ingeniería y educación</p>
          </div>

          <div className="posts-grid">
            {posts.length === 0 ? (
              <div className="no-posts">
                <p className="no-posts-text">No hay posts disponibles aún...</p>
                <p className="no-posts-subtext">¡Pronto habrá contenido nuevo!</p>
              </div>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-header-content">
                      <h2 className="post-title">{post.title}</h2>
                      <div className="post-meta">
                        <span className="post-date">
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="read-more">
                    <span>Leer más</span>
                    <FaArrowRight />
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
