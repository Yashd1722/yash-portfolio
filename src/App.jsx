import React, { useEffect, useState, useRef } from 'react';
import './index.css';

// Neural Network Interactive Background
const NeuralNetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 180 };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      particles = [];
      const numParticles = Math.min((width * height) / 9000, 120);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 1.5,
          color: Math.random() > 0.5 ? '#72dcff' : '#dd8bfb' // Primary or Secondary color
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        let p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect with other particles
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p1.x - p2.x;
          let dy = p1.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = p1.color === '#dd8bfb' || p2.color === '#dd8bfb'
              ? `rgba(221, 139, 251, ${1 - dist / 130})`
              : `rgba(114, 220, 255, ${1 - dist / 130})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect and attract to mouse
        if (mouse.x != null && mouse.y != null) {
          let dx = p1.x - mouse.x;
          let dy = p1.y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            ctx.beginPath();
            // Intense tertiary color connection when user interacts
            ctx.strokeStyle = `rgba(184, 255, 233, ${1 - dist / mouse.radius})`;
            ctx.lineWidth = 2;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Interaction physics: nodes are attracted to the mouse to simulate "user query processing"
            p1.x -= dx * 0.015;
            p1.y -= dy * 0.015;
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => init();
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

// Terminal typing effect hook
const useTypewriter = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayedText;
};

// Custom interactive hovering for UI components
const InteractiveCard = ({ children, className = '', style = {} }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glass-card interactive-node ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

function App() {
  const [navActive, setNavActive] = useState(false);

  const heroCodeText = `> INITIALIZING NEURAL NETWORK PROTOCOL...
> ESTABLISHING REAL-TIME CONNECTION [██████████] 100%
> USER: Yashkumar Dhameliya
> ROLE: Machine Learning & Data Analyst
> STATUS: ONLINE & INTERACTIVE

def introduce_network():
    nodes = ["Time Series Analysis", "MLOps", "Computer Vision"]
    return f"Processing raw data streams into production AI via {nodes}"
`;

  const typedHero = useTypewriter(heroCodeText, 30);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  const toggleNav = () => setNavActive(!navActive);
  const closeNav = () => setNavActive(false);

  return (
    <>
      {/* Real-time Interactive Neural Network Canvas */}
      <NeuralNetworkCanvas />

      <div className="mesh-bg">
        {/* Keeping subtle background glows */}
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2" style={{ opacity: 0.15 }}></div>
      </div>
      <div className="grid-overlay"></div>

      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="logo">YD<span className="dot">_</span></a>
          <ul className={`nav-links ${navActive ? 'active' : ''}`}>
            <li><a href="#hero" onClick={closeNav}>// Init_Node</a></li>
            <li><a href="#about" onClick={closeNav}>// Layer_1_Summary</a></li>
            <li><a href="#experience" onClick={closeNav}>// Training_Logs</a></li>
            <li><a href="#projects" onClick={closeNav}>// Deployed_Models</a></li>
            <li><a href="#skills" onClick={closeNav}>// Tensor_Stack</a></li>
          </ul>
          <div className="hamburger" onClick={toggleNav}>
            {navActive ? <i className="fas fa-times"></i> : <i className="fas fa-diagram-project"></i>}
          </div>
        </div>
      </nav>

      <main>
        {/* Terminal Hero Section */}
        <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '5rem' }}>
          <div className="container">
            <div className="hero-content reveal active" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
              <InteractiveCard className="terminal-window" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--color-primary)' }}>
                <div className="terminal-header" style={{ background: 'var(--bg-surface-high)', padding: '0.8rem 1rem', display: 'flex', gap: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                  <span style={{ marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'monospace' }}>yash_neural_net.py (Interactive)</span>
                </div>
                <div className="terminal-body" style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '1.1rem', color: '#b8ffe9', background: 'rgba(0,0,0,0.6)', minHeight: '300px', whiteSpace: 'pre-wrap' }}>
                  {typedHero}<span className="cursor-blink">_</span>
                </div>
              </InteractiveCard>

              <div className="action-buttons" style={{ marginTop: '3rem', justifyContent: 'flex-start' }}>
                <a href="#projects" className="btn btn-primary" style={{ transform: 'translateZ(20px)' }}>
                  <i className="fas fa-play"></i> Initialize Nodes
                </a>
                <a href="https://github.com/Yashd1722" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fab fa-github"></i> Repository
                </a>
                <a href="https://www.linkedin.com/in/yashkumar-dhameliya" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fab fa-linkedin-in"></i> Network Ext. (LinkedIn)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About / Architecture */}
        <section id="about">
          <div className="container reveal">
            <h2 className="section-title">Network Architecture (Zusammenfassung)</h2>
            <InteractiveCard style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '3rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <i className="fas fa-brain" style={{ fontSize: '7rem', color: 'var(--color-primary)', filter: 'drop-shadow(0 0 30px rgba(0,210,255,0.6))', animation: 'pulseFloat 4s infinite' }}></i>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
                  Machine Learning & Data Analytics-Spezialist. Focusing on data-driven AI solutions, Feature Engineering, Time Series Analysis, and Computer Vision. Hands-on experience with LLM analysis, AutoML development, and interactive ML implementations.
                </p>
                <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    <i className="fas fa-satellite-dish" style={{ color: 'var(--color-primary)' }}></i> Würzburg, DE (Origin Node)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    <i className="fas fa-satellite" style={{ color: 'var(--color-primary)' }}></i> yashdhameliya03@gmail.com
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience">
          <div className="container reveal">
            <h2 className="section-title">Training Loops (Berufserfahrung)</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <InteractiveCard className="timeline-content">
                  <span className="date">Epoch 01/2026 – Present</span>
                  <h3>Machine Learning Engineer</h3>
                  <h4>Axinity GmbH & Co. KG</h4>
                  <ul>
                    <li>Dynamic data analysis, cleaning and feature extraction for E-commerce ML models.</li>
                    <li>Real-time processing of business-relevant AI workflows.</li>
                  </ul>
                </InteractiveCard>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <InteractiveCard className="timeline-content">
                  <span className="date">Epoch 2023 – Present</span>
                  <h3>Masterarbeit Researcher</h3>
                  <h4>Time Series & Synthetic Data Generation</h4>
                  <ul>
                    <li>Developed multi-class time series classification models with synthetic climate data streams.</li>
                    <li>Systematic testing of neural architectures.</li>
                  </ul>
                </InteractiveCard>
              </div>
            </div>
          </div>
        </section>

        {/* Model Cards (Projects) */}
        <section id="projects">
          <div className="container reveal">
            <h2 className="section-title">Inference Nodes (Projekte)</h2>
            <div className="grid-2">
              <InteractiveCard className="project-card">
                <div className="project-header">
                  <h3>NN-GPT: AutoML with LLMs</h3>
                  <span className="badge">v2024.1</span>
                </div>
                <p className="subtitle">Architecture: LLM & AutoML</p>
                <ul style={{ color: 'var(--text-muted)' }}>
                  <li>Interactive LLM-supported forecasting of model accuracy based on early training states.</li>
                  <li>Scientific publication documenting dynamic metrics.</li>
                </ul>
                <a href="https://www.researchgate.net/publication/397983532_NNGPT_Rethinking_AutoML_with_Large_Language_Models" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fas fa-link"></i> Access Node
                </a>
              </InteractiveCard>

              <InteractiveCard className="project-card">
                <div className="project-header">
                  <h3>LEMUR Neural Network</h3>
                  <span className="badge">v2024.0</span>
                </div>
                <p className="subtitle">Architecture: PyTorch, Optuna</p>
                <ul style={{ color: 'var(--text-muted)' }}>
                  <li>PyTorch-based AutoML framework designed for real-time validation.</li>
                  <li>Published methodology with interactive open-access data logs.</li>
                </ul>
                <a href="https://arxiv.org/abs/2504.10552" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fas fa-folder-open"></i> Query Data
                </a>
              </InteractiveCard>

              <InteractiveCard className="project-card">
                <div className="project-header">
                  <h3>INSTRUCT-IR</h3>
                  <span className="badge">v2023.2</span>
                </div>
                <p className="subtitle">Architecture: Vision-Language Models</p>
                <ul style={{ color: 'var(--text-muted)' }}>
                  <li>Investigated model generalization under dynamic image conditions.</li>
                  <li>Active stress-testing of visual modalities.</li>
                </ul>
              </InteractiveCard>

              <InteractiveCard className="project-card">
                <div className="project-header">
                  <h3>Gender Classification</h3>
                  <span className="badge">v2022.9</span>
                </div>
                <p className="subtitle">Architecture: OpenCV Stream</p>
                <ul style={{ color: 'var(--text-muted)' }}>
                  <li>Real-time capable computer vision recognition algorithm.</li>
                  <li>Continuous preprocessing stream with data augmentation hooks.</li>
                </ul>
              </InteractiveCard>
            </div>
          </div>
        </section>

        {/* Tech Stacks */}
        <section id="skills">
          <div className="container reveal">
            <h2 className="section-title">Neural Parameters & Tooling</h2>

            <div className="marquee-container">
              <div className="marquee-content">
                {[...Array(2)].map((_, idx) => (
                  <React.Fragment key={idx}>
                    <div className="marquee-tag interactive-node"><i className="fas fa-brain"></i> PyTorch</div>
                    <div className="marquee-tag purple interactive-node"><i className="fas fa-network-wired"></i> Transformers</div>
                    <div className="marquee-tag interactive-node"><i className="fas fa-chart-line"></i> Scikit-learn</div>
                    <div className="marquee-tag purple interactive-node"><i className="fas fa-table"></i> Pandas</div>
                    <div className="marquee-tag interactive-node"><i className="fas fa-square-root-alt"></i> NumPy</div>
                    <div className="marquee-tag purple interactive-node"><i className="fas fa-diagram-project"></i> Real-time Features</div>
                    <div className="marquee-tag interactive-node"><i className="fas fa-clock"></i> Time Series</div>
                    <div className="marquee-tag purple interactive-node"><i className="fas fa-microchip"></i> Interactive LLMs</div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="marquee-container">
              <div className="marquee-content reverse">
                {[...Array(2)].map((_, idx) => (
                  <React.Fragment key={idx}>
                    <div className="marquee-tag purple interactive-node"><i className="fab fa-python"></i> Python</div>
                    <div className="marquee-tag interactive-node"><i className="fas fa-server"></i> MLOps</div>
                    <div className="marquee-tag purple interactive-node"><i className="fas fa-pepper-hot"></i> Flask</div>
                    <div className="marquee-tag interactive-node"><i className="fas fa-bolt"></i> FastAPI (Live Streams)</div>
                    <div className="marquee-tag purple interactive-node"><i className="fas fa-database"></i> SQL</div>
                    <div className="marquee-tag interactive-node"><i className="fab fa-docker"></i> Docker</div>
                    <div className="marquee-tag purple interactive-node"><i className="fab fa-git-alt"></i> Git</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>&gt; system.exit("© 2024 Yashkumar Dhameliya. Engineering Intelligence.")</p>
          <div className="footer-links">
            <a href="https://github.com/Yashd1722" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/yashkumar-dhameliya" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            <a href="mailto:yashdhameliya03@gmail.com"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </footer>

      <style>{`
        .cursor-blink {
          display: inline-block;
          width: 10px;
          height: 1.2em;
          background-color: #b8ffe9;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        /* Interactive dynamic node hover effect */
        .interactive-node {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
          position: relative;
        }
        
        /* A gradient glow that follows the mouse using CSS variables set onMouseMove */
        .interactive-node::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(221, 139, 251, 0.06),
            transparent 40%
          );
          pointer-events: none;
          z-index: 10;
        }
        
        .interactive-node:hover::after {
          opacity: 1;
        }
        
        .interactive-node:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(114, 220, 255, 0.2);
        }
      `}</style>
    </>
  );
}

export default App;
