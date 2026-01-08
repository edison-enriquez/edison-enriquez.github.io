import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import yaml from 'js-yaml';
import './Home.css';

const welcomeMessage = {
  type: 'output',
  content: (
    <div className="welcome-message">
      <div className="screenfetch-layout">
        <div className="logo-art">
          <pre className="logo">
{`
 ███████╗██████╗ ██╗███████╗ ██████╗ ███╗   ██╗
 ██╔════╝██╔══██╗██║██╔════╝██╔═══██╗████╗  ██║
 █████╗  ██║  ██║██║███████╗██║   ██║██╔██╗ ██║
 ██╔══╝  ██║  ██║██║╚════██║██║   ██║██║╚██╗██║
 ███████╗██████╔╝██║███████║╚██████╔╝██║ ╚████║
 ╚══════╝╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
                                                
 ███████╗███╗   ██╗██████╗ ██╗ ██████╗ ██╗   ██╗███████╗███████╗
 ██╔════╝████╗  ██║██╔══██╗██║██╔═══██╗██║   ██║██╔════╝╚══███╔╝
 █████╗  ██╔██╗ ██║██████╔╝██║██║   ██║██║   ██║█████╗    ███╔╝ 
 ██╔══╝  ██║╚██╗██║██╔══██╗██║██║▄▄ ██║██║   ██║██╔══╝   ███╔╝  
 ███████╗██║ ╚████║██║  ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
 ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝
`}
          </pre>
        </div>
        <div className="system-info">
          <div className="info-line"><span className="info-label">edison</span><span className="info-sep">@</span><span className="info-value">portfolio</span></div>
          <div className="info-separator">─────────────────────────</div>
          <div className="info-line"><span className="info-label">Role:</span> <span className="info-value">Electronic Engineer & Developer</span></div>
          <div className="info-line"><span className="info-label">Specialties:</span> <span className="info-value">Cybersecurity, Embedded Systems</span></div>
          <div className="info-line"><span className="info-label">Education:</span> <span className="info-value">M.Sc. + Ph.D Candidate</span></div>
          <div className="info-line"><span className="info-label">Teaching:</span> <span className="info-value">University Professor</span></div>
          <div className="info-separator">─────────────────────────</div>
          <div className="info-line"><span className="info-label">Shell:</span> <span className="info-value">zsh 5.8 (oh-my-zsh)</span></div>
          <div className="info-line"><span className="info-label">Stack:</span> <span className="info-value">React + Vite + Node.js</span></div>
          <div className="info-line"><span className="info-label">Tools:</span> <span className="info-value">Python, JavaScript, C++</span></div>
          <div className="info-separator">─────────────────────────</div>
          <div className="color-palette">
            <span className="color-block color-0"></span>
            <span className="color-block color-1"></span>
            <span className="color-block color-2"></span>
            <span className="color-block color-3"></span>
            <span className="color-block color-4"></span>
            <span className="color-block color-5"></span>
            <span className="color-block color-6"></span>
            <span className="color-block color-7"></span>
          </div>
        </div>
      </div>
      <div className="intro-text">
        <p className="welcome-prompt">
          <span className="prompt-user">edison@portfolio</span>
          <span className="prompt-sep">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-dollar">$</span>
          <span className="welcome-cmd"> cat README.md</span>
        </p>
        <p className="welcome-output">Welcome! Type 'help' to explore available commands.</p>
      </div>
    </div>
  )
};

const Home = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([welcomeMessage]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  
  // OLED Display States
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [oledView, setOledView] = useState('menu'); // 'menu' or 'cv'
  const [cvData, setCvData] = useState(null);
  const [cvSection, setCvSection] = useState(0);
  
  const menuItems = [
    { label: 'MENU', action: () => setOledView('menu') },
    { label: 'VIEW CV', action: () => setOledView('cv') },
    { label: 'GO TO CV', action: () => navigate('/cv') },
    { label: 'BLOG', action: () => navigate('/blog') },
  ];

  // Load CV data
  useEffect(() => {
    fetch('/data/cv-data.yaml')
      .then(res => res.text())
      .then(text => {
        const data = yaml.load(text);
        setCvData(data);
      })
      .catch(err => console.error('Error loading CV data:', err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Solo capturar teclas cuando el foco no está en el input del terminal
      if (document.activeElement === inputRef.current) return;
      
      if (oledView === 'menu') {
        switch(e.key) {
          case 'ArrowUp':
            e.preventDefault();
            setSelectedMenu((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
            break;
          case 'ArrowDown':
            e.preventDefault();
            setSelectedMenu((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
            break;
          case 'Enter':
            e.preventDefault();
            menuItems[selectedMenu].action();
            break;
          default:
            break;
        }
      } else if (oledView === 'cv' && cvData) {
        const sections = ['personal', 'experience', 'education', 'skills'];
        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            setCvSection((prev) => (prev > 0 ? prev - 1 : sections.length - 1));
            break;
          case 'ArrowRight':
            e.preventDefault();
            setCvSection((prev) => (prev < sections.length - 1 ? prev + 1 : 0));
            break;
          case 'Escape':
            e.preventDefault();
            setOledView('menu');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMenu, oledView, cvData, cvSection, navigate]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: cmd }];

    switch (trimmedCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="help-output">
              <div className="help-header">
                <span className="help-title">Available Commands</span>
              </div>
              <table className="help-table">
                <tbody>
                  <tr><td className="cmd-name">about</td><td className="cmd-sep">→</td><td className="cmd-desc">Información sobre mí</td></tr>
                  <tr><td className="cmd-name">cv</td><td className="cmd-sep">→</td><td className="cmd-desc">Ver Curriculum Vitae</td></tr>
                  <tr><td className="cmd-name">blog</td><td className="cmd-sep">→</td><td className="cmd-desc">Ir al Blog</td></tr>
                  <tr><td className="cmd-name">projects</td><td className="cmd-sep">→</td><td className="cmd-desc">Ver mis proyectos</td></tr>
                  <tr><td className="cmd-name">contact</td><td className="cmd-sep">→</td><td className="cmd-desc">Información de contacto</td></tr>
                  <tr><td className="cmd-name">clear</td><td className="cmd-sep">→</td><td className="cmd-desc">Limpiar la terminal</td></tr>
                </tbody>
              </table>
            </div>
          )
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          content: (
            <div className="about-output">
              <div className="about-header">
                <span className="about-title">Edison Enriquez</span>
              </div>
              <div className="about-items">
                <div className="about-item"><span className="bullet">-</span> <span className="label">Role:</span> Ingeniero Electrónico</div>
                <div className="about-item"><span className="bullet">-</span> <span className="label">Education:</span> Magister en Ingenieria Electronica y Doctor en Ingenieria con enfasis en Ingeniería Electrica y Electrónica</div>
                <div className="about-item"><span className="bullet">-</span> <span className="label">Position:</span> Profesor Universitario</div>
                <div className="about-item"><span className="bullet">-</span> <span className="label">Specialty:</span> Especialista en Sistemas Embebidos + Ciberseguridad - </div>
              </div>
            </div>
          )
        });
        break;
      case 'cv':
        newHistory.push({ type: 'output', content: 'Navegando al CV...' });
        setTimeout(() => navigate('/cv'), 1000);
        break;
      case 'blog':
        newHistory.push({ type: 'output', content: 'Abriendo el blog...' });
        setTimeout(() => navigate('/blog'), 1000);
        break;
      case 'projects':
        newHistory.push({ type: 'output', content: 'Navegando a proyectos (sección en el CV)...' });
        setTimeout(() => navigate('/cv'), 1000);
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          content: (
            <div className="contact-output">
              <div className="contact-header">
                <span className="contact-title">Contact Information</span>
              </div>
              <div className="contact-items">
                <div className="contact-item">
                  <span className="contact-label">EMAIL:</span>
                  <a href="mailto:ferneyenriquez@gmail.com" className="contact-link">ferneyenriquez@gmail.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">LINKEDIN:</span>
                  <a href="https://linkedin.com/in/edison-enriquez" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/edison-enriquez</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">GITHUB:</span>
                  <a href="https://github.com/edison-enriquez" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/edison-enriquez</a>
                </div>
              </div>
            </div>
          )
        });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        break;
      default:
        newHistory.push({
          type: 'output',
          content: <p>Comando no encontrado: {cmd}. Escribe 'help' para ver los comandos.</p>
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const cleanInput = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  // Comentado: función renderOledContent no se usa actualmente
  // const renderOledContent = () => { ... };

  return (
    <div className="home">
      {/* <div className="home-layout">
        <div className="oled-container">
          <div className="oled-screen">
            <div className="oled-border">
              <div className="oled-display">
                {renderOledContent()}
                <div className="scanline"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="terminal-container" onClick={() => inputRef.current?.focus()}> */}
      <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <div className="terminal-title">edison@enriquez: ~</div>
            </div>
            <div className="terminal-body">
              {history.map((item, index) => (
                <div key={index} className={`terminal-line ${item.type}`}>
                  {item.type === 'input' && (
                    <span className="prompt">
                      <span className="prompt-arrow">➜</span>
                      <span className="prompt-dir">~</span>
                    </span>
                  )}
                  {item.content}
                </div>
              ))}
              
              <div className="input-line">
                <span className="prompt">
                  <span className="prompt-arrow">➜</span>
                  <span className="prompt-dir">~</span>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={cleanInput}
                  className="terminal-input"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        {/* </div>
      </div> */}
      </div>
    </div>
  );
};

export default Home;
