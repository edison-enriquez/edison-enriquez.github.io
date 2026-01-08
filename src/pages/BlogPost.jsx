import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import yaml from 'js-yaml';
import { FaArrowLeft } from 'react-icons/fa';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blog-posts.yaml')
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        const foundPost = data.posts.find((p) => p.id === parseInt(id));
        setPost(foundPost);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading blog post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="post-loading">
        <p>Cargando<span className="cursor"></span></p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="terminal-window">
        <div className="post-not-found">
          <h2>Post no encontrado</h2>
          <Link to="/blog" className="btn">
            <FaArrowLeft /> Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">edison@enriquez: ~/blog/{post.id}.md</div>
        </div>
        <div className="terminal-commands">
          <div className="command-line">
            <span className="prompt">edison@enriquez:~/blog$</span>
            <span className="command">cat {post.id}.md<span className="cursor-blink">_</span></span>
          </div>
        </div>

        <div className="post-content">
          <Link to="/blog" className="back-link">
            <FaArrowLeft /> Volver al blog
          </Link>

          <article>
            <header className="post-header">
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span className="post-date">
                  {post.date}
                </span>
              </div>
            </header>

            <div className="post-body">
              <pre className="post-markdown">{post.content}</pre>
            </div>
          </article>

          <div className="post-footer">
            <Link to="/blog" className="btn">
              <FaArrowLeft /> Volver al blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
