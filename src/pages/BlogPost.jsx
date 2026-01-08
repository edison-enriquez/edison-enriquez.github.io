import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
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

        <div className="post-markdown">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                
                return !inline && language ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(100, 255, 218, 0.15)',
                      borderRadius: '8px',
                      padding: '20px',
                      fontSize: '0.9rem',
                      margin: '16px 0',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
        
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
