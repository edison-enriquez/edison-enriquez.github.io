import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '~/', desc: 'home' },
    { path: '/cv', label: '~/cv/', desc: 'curriculum' },
    { path: '/blog', label: '~/blog/', desc: 'posts' },
  ];

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-user">edison</span>
            <span className="logo-at">@</span>
            <span className="logo-host">portfolio</span>
            <span className="logo-separator">:</span>
            <span className="logo-path">~</span>
            <span className="logo-prompt">$</span>
            <span className="cursor-blink">▊</span>
          </div>
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-prompt">$</span>
                <span className="nav-command">cd</span>
                <span className="nav-path">{item.label}</span>
                <span className="nav-desc"># {item.desc}</span>
              </Link>
            ))}
          </nav>
          <div className="social-links">
            <a
              href="https://github.com/edison-enriquez"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/edison-enriquez"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>© 2026 Edison Enríquez | Built with React</p>
      </footer>
    </div>
  );
};

export default Layout;
