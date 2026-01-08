import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar el post específico desde /public/blog/
    const loadPost = async () => {
      try {
        const postFiles = import.meta.glob('/public/blog/*.md', { query: '?raw', import: 'default' });
        
        for (const path in postFiles) {
          const fileName = path.split('/').pop().replace('.md', '');
          
          if (fileName === id || path.includes(id)) {
            const content = await postFiles[path]();
            
            // Extraer frontmatter y contenido
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
            if (frontmatterMatch) {
              const frontmatter = {};
              const lines = frontmatterMatch[1].split('\n');
              
              lines.forEach(line => {
                const match = line.match(/^(\w+):\s*"?(.+?)"?$/);
                if (match) {
                  frontmatter[match[1]] = match[2];
                }
              });

              setPost({
                id: fileName,
                slug: frontmatter.slug || fileName,
                title: frontmatter.title || 'Sin título',
                date: frontmatter.date || 'Sin fecha',
                author: frontmatter.author || 'Edison Enríquez',
                content: frontmatterMatch[2].trim()
              });
            }
            break;
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setLoading(false);
      }
    };

    loadPost();
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
      <div className="blog-post">
        <div className="post-not-found">
          <h2>Post no encontrado</h2>
          <Link to="/blog" className="nav-button">
            <FaArrowLeft /> Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="terminal-command-block">
        <div className="cmd-line">
          <span className="prompt">blog</span>
          <span className="cmd">cat</span>
          <span className="cmd-arg">{post.title}</span>
        </div>
      </div>

      <div className="post-content">
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-author">por {post.author}</span>
        </div>

        
        <pre className="post-markdown">{post.content}</pre>
        
        <div className="post-navigation">
          <Link to="/blog" className="nav-button">
            <FaArrowLeft /> Volver al blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
