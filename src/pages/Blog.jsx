import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar automáticamente los posts desde la carpeta /public/blog/
    const loadPosts = async () => {
      try {
        // Lista de archivos markdown en /public/blog/
        const postFiles = import.meta.glob('/public/blog/*.md', { query: '?raw', import: 'default' });
        const loadedPosts = [];

        for (const path in postFiles) {
          const content = await postFiles[path]();
          const fileName = path.split('/').pop().replace('.md', '');
          
          // Extraer frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = {};
            const lines = frontmatterMatch[1].split('\n');
            
            lines.forEach(line => {
              const match = line.match(/^(\w+):\s*"?(.+?)"?$/);
              if (match) {
                frontmatter[match[1]] = match[2];
              }
            });

            loadedPosts.push({
              id: fileName,
              slug: frontmatter.slug || fileName,
              title: frontmatter.title || 'Sin título',
              date: frontmatter.date || 'Sin fecha',
              excerpt: frontmatter.excerpt || '',
              author: frontmatter.author || 'Edison Enríquez',
              content: content
            });
          }
        }

        // Ordenar por fecha (más recientes primero)
        loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(loadedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setLoading(false);
      }
    };

    loadPosts();
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
      <div className="terminal-command-block">
        <div className="cmd-line">
          <span className="prompt">blog</span>
          <span className="cmd">ls</span>
          <span className="cmd-arg">--all</span>
        </div>
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No hay posts disponibles aún...</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <span className="prompt">cat</span>
                <span className="cmd">posts/</span>
                <Link to={`/blog/${post.id}`} className="post-title-link">
                  {post.title}
                </Link>
              </div>
              <div className="post-content-area">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-author">{post.author}</span>
                </div>
                <p className="post-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="read-more">
                  <span>Leer más</span>
                  <FaArrowRight />
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
