import React, { useEffect, useState, useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, OrbitControls, View } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import './index.css';

// ═══════════════════════════════════════════════
// UNIQUE 3D EFFECTS (Per Section)
// ═══════════════════════════════════════════════

function Hero3D() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00d4ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#c084fc" />
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <group ref={meshRef}>
          <mesh>
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial color="#0a0e1c" wireframe transparent opacity={0.4} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[1.8, 1]} />
            <meshStandardMaterial color="#00d4ff" wireframe />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

function About3D() {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 400; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 0.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      const z = r * Math.cos(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <group ref={ref}>
        <points geometry={points}>
          <pointsMaterial size={0.06} color="#c084fc" transparent opacity={0.6} />
        </points>
      </group>
    </>
  );
}

function Experience3D() {
  const lineRef = useRef();

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 100; i++) {
      pts.push(new THREE.Vector3((i - 50) * 0.1, 0, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const positions = lineRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = Math.sin(x * 1.5 + state.clock.elapsedTime * 2) * 0.8 + 
                Math.sin(x * 4 + state.clock.elapsedTime * 1.5) * 0.3;
      positions.setY(i, y);
    }
    positions.needsUpdate = true;
  });

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <line ref={lineRef} geometry={points}>
        <lineBasicMaterial color="#34d399" linewidth={2} transparent opacity={0.6} />
      </line>
    </Float>
  );
}

function Projects3D() {
  const pointsRef = useRef();
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 200; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6
        )
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef} geometry={points}>
      <pointsMaterial size={0.08} color="#00d4ff" transparent opacity={0.4} />
    </points>
  );
}

function Skills3D() {
  const group = useRef();
  const nodes = useMemo(() => {
    return Array.from({ length: 25 }, () => 
      new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4)
    );
  }, []);

  const connections = useMemo(() => {
    const pts = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3.5) {
          pts.push(nodes[i], nodes[j]);
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [nodes]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={1} />
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00d4ff" />
        </mesh>
      ))}
      <lineSegments geometry={connections}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

// ═══════════════════════════════════════════════
// 3D CARD COMPONENT
// ═══════════════════════════════════════════════

function Card3D({ children, className = '', style = {}, variant = 'default' }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Track mouse position for all variants
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    const pctX = ((x / rect.width) * 100).toFixed(1);
    const pctY = ((y / rect.height) * 100).toFixed(1);
    cardRef.current.style.setProperty('--mouse-pct-x', `${pctX}%`);
    cardRef.current.style.setProperty('--mouse-pct-y', `${pctY}%`);

    // ─── ABOUT: Glow-follow only, NO tilt ───
    if (variant === 'about') {
      setTransform('scale3d(1, 1, 1)');
      return;
    }

    // ─── EXPERIENCE: Glitch micro-shift ───
    if (variant === 'experience') {
      const shiftX = ((x - centerX) / centerX) * 3;
      const shiftY = ((y - centerY) / centerY) * 2;
      setTransform(`translate(${shiftX}px, ${shiftY}px)`);
      return;
    }

    // ─── EDUCATION: Float / levitate upward ───
    if (variant === 'education') {
      setTransform('translateY(-8px) scale(1.02)');
      return;
    }

    // ─── PROJECTS: Deep 3D perspective tilt (the only one that tilts!) ───
    if (variant === 'projects') {
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`);
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      cardRef.current.style.setProperty('--shimmer-angle', `${angle + 90}deg`);
      return;
    }

    // ─── LANGUAGES: Scan-line sweep (position drives the scan line via CSS) ───
    if (variant === 'languages') {
      setTransform('scale(1.01)');
      return;
    }

    // ─── DEFAULT: Standard subtle tilt ───
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    cardRef.current.style.setProperty('--shimmer-angle', `${angle + 90}deg`);
  }, [variant]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform('');
    if (cardRef.current) {
      cardRef.current.style.removeProperty('--mouse-x');
      cardRef.current.style.removeProperty('--mouse-y');
    }
  }, []);

  // Build transition based on variant
  let transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
  if (variant === 'experience') {
    transition = 'transform 0.05s linear, box-shadow 0.2s ease'; // snappy glitch
  } else if (variant === 'education') {
    transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease'; // bouncy float
  } else if (variant === 'projects' && transform) {
    transition = 'transform 0.08s ease-out, box-shadow 0.4s ease'; // responsive tilt
  }

  return (
    <div className={`card-3d-wrapper wrapper-${variant}`}>
      <div
        ref={cardRef}
        className={`card-3d variant-${variant} ${isHovered ? 'is-hovered' : ''} ${className}`}
        style={{
          ...style,
          transform: transform || undefined,
          transition,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// SCROLL REVEAL 3D
// ═══════════════════════════════════════════════

function ScrollReveal3D({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1200px' }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════
// TYPEWRITER HOOK
// ═══════════════════════════════════════════════

function useTypewriter(text, speed = 40) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

// ═══════════════════════════════════════════════
// SKILLS GRID — Bold & Visible
// ═══════════════════════════════════════════════

const SKILL_CATEGORIES = [
  {
    title: 'ML & Deep Learning',
    icon: 'fas fa-brain',
    skills: [
      { name: 'PyTorch', icon: 'fas fa-brain' },
      { name: 'Transformers', icon: 'fas fa-network-wired', purple: true },
      { name: 'Scikit-learn', icon: 'fas fa-chart-line' },
      { name: 'TensorFlow', icon: 'fas fa-microchip', purple: true },
      { name: 'Time Series', icon: 'fas fa-clock' },
      { name: 'Computer Vision', icon: 'fas fa-eye', purple: true },
    ],
  },
  {
    title: 'Data & Analysis',
    icon: 'fas fa-database',
    purple: true,
    skills: [
      { name: 'Pandas', icon: 'fas fa-table', purple: true },
      { name: 'NumPy', icon: 'fas fa-square-root-alt' },
      { name: 'LLMs', icon: 'fas fa-comments', purple: true },
      { name: 'AutoML', icon: 'fas fa-robot' },
    ],
  },
  {
    title: 'Engineering & MLOps',
    icon: 'fas fa-server',
    skills: [
      { name: 'Python', icon: 'fab fa-python', purple: true },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'FastAPI', icon: 'fas fa-bolt' },
      { name: 'SQL', icon: 'fas fa-database', purple: true },
      { name: 'Git', icon: 'fab fa-git-alt' },
      { name: 'MLOps', icon: 'fas fa-server' },
      { name: 'Flask', icon: 'fas fa-pepper-hot', purple: true },
    ],
  },
];

function SkillsGrid() {
  return (
    <div>
      {SKILL_CATEGORIES.map((cat, catIdx) => (
        <ScrollReveal3D key={cat.title} delay={0.1 * catIdx}>
          <div className="skill-category">
            <div className={`skill-category-title ${cat.purple ? 'purple-cat' : ''}`}>
              <i className={cat.icon}></i>
              {cat.title}
            </div>
            <div className="skills-grid">
              {cat.skills.map((skill) => (
                <div key={skill.name} className={`skill-tile ${skill.purple ? 'purple' : ''}`}>
                  <i className={`${skill.icon} skill-icon`}></i>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal3D>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════

function App() {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef();

  const heroCodeText = `> INITIALIZING NEURAL NETWORK PROTOCOL...
> MODEL: Yashkumar_Dhameliya_v2.0
> ROLE: ML Engineer & Data Scientist
> STATUS: ONLINE ■■■■■■■■■■ 100%

def forward_pass(data):
    features = extract(data)
    prediction = model.predict(features)
    return deploy(prediction)

# MODELS LOADED: Time Series | CV | AutoML | LLMs
# PIPELINE: Active & Processing...`;

  const typedHero = useTypewriter(heroCodeText, 25);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => setNavActive(!navActive);
  const closeNav = () => setNavActive(false);

  return (
    <div ref={mainRef} className="app-wrapper">
      {/* Global Canvas for Porting Views */}
      <Canvas eventSource={mainRef} className="global-canvas">
        <View.Port />
      </Canvas>
      
      <div className="grid-overlay"></div>

      {/* Main Content */}
      <div className="app-content">
        {/* Navigation */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-container">
            <a href="#" className="logo">YD<span className="dot">_</span></a>
            <ul className={`nav-links ${navActive ? 'active' : ''}`}>
              <li><a href="#hero" onClick={closeNav}>model.init()</a></li>
              <li><a href="#about" onClick={closeNav}>model.summary()</a></li>
              <li><a href="#experience" onClick={closeNav}>model.fit()</a></li>
              <li><a href="#education" onClick={closeNav}>model.load_weights()</a></li>
              <li><a href="#projects" onClick={closeNav}>model.deploy()</a></li>
              <li><a href="#skills" onClick={closeNav}>model.compile()</a></li>
              <li><a href="#languages" onClick={closeNav}>nlp.tokenize()</a></li>
            </ul>
            <div className="hamburger" onClick={toggleNav}>
              {navActive ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </div>
          </div>
        </nav>

        <main>
          {/* ════════════ HERO SECTION ════════════ */}
          <section id="hero">
            <View className="view-container">
              <Hero3D />
            </View>
            <div className="container">
              <ScrollReveal3D>
                <div className="hero-content">
                  <div className="hero-tag">
                    <div className="pulse-dot"></div>
                    Neural Network Online
                  </div>

                  <h1 className="hero-name">
                    Yashkumar<br />
                    <span className="gradient-text">Dhameliya</span>
                  </h1>

                  <p className="hero-title">Machine Learning Engineer & Data Scientist</p>

                  <Card3D className="terminal-window" style={{ padding: 0 }}>
                    <div className="terminal-header">
                      <div className="terminal-dot red"></div>
                      <div className="terminal-dot yellow"></div>
                      <div className="terminal-dot green"></div>
                      <span className="terminal-title">yash_neural_net.py</span>
                    </div>
                    <div className="terminal-body">
                      {typedHero}<span className="cursor-blink"></span>
                    </div>
                  </Card3D>

                  <div className="action-buttons">
                    <a href="#projects" className="btn btn-primary">
                      <i className="fas fa-play"></i> View Projects
                    </a>
                    <a href="https://github.com/Yashd1722" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <i className="fab fa-github"></i> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/yashkumar-dhameliya" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <i className="fab fa-linkedin-in"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </ScrollReveal3D>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* ════════════ ABOUT SECTION ════════════ */}
          <section id="about">
            <View className="view-container">
              <About3D />
            </View>
            <div className="container">
              <ScrollReveal3D>
                <h2 className="section-title">model.summary()</h2>
                <p className="section-subtitle"># Network Architecture</p>
              </ScrollReveal3D>

              <ScrollReveal3D delay={0.15}>
                <Card3D variant="about">
                  <div className="about-grid">
                    <div className="about-visual">
                      <div className="brain-3d-container">
                        <i className="fas fa-brain"></i>
                        <div className="brain-ring"></div>
                        <div className="brain-ring"></div>
                      </div>
                      <div className="about-stats">
                        <div className="stat-item">
                          <div className="stat-value">4+</div>
                          <div className="stat-label">Projects</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">2</div>
                          <div className="stat-label">Publications</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">M.Sc</div>
                          <div className="stat-label">Informatik</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">DE</div>
                          <div className="stat-label">Location</div>
                        </div>
                      </div>
                    </div>

                    <div className="about-text">
                      <p>
                        Machine Learning & Data Analytics-Spezialist. Focusing on data-driven AI solutions, Feature Engineering, Time Series Analysis, and Computer Vision. Hands-on experience with LLM analysis, AutoML development, and interactive ML implementations.
                      </p>
                      <div className="about-details">
                        <div className="about-detail-item">
                          <i className="fas fa-map-marker-alt"></i>
                          Würzburg, Germany
                        </div>
                        <div className="about-detail-item">
                          <i className="fas fa-envelope"></i>
                          yashdhameliya03@gmail.com
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal3D>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* ════════════ EXPERIENCE SECTION ════════════ */}
          <section id="experience">
            <View className="view-container">
              <Experience3D />
            </View>
            <div className="container">
              <ScrollReveal3D>
                <h2 className="section-title">model.fit()</h2>
                <p className="section-subtitle"># Training Loops</p>
              </ScrollReveal3D>

              <div className="timeline">
                <div className="timeline-beam"></div>

                <ScrollReveal3D delay={0.1}>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <Card3D variant="experience" className="timeline-content">
                      <span className="date">08/2025 → 01/2026</span>
                      <h3>Machine Learning Engineer</h3>
                      <h4>
                        <a href="https://www.axinity.dev/en/" target="_blank" rel="noopener noreferrer">
                          axinity.dev
                        </a>
                      </h4>
                      <ul className="content-list">
                        <li>Dynamic data analysis, cleaning and feature extraction for E-commerce ML models.</li>
                        <li>Real-time processing of business-relevant AI workflows.</li>
                      </ul>
                    </Card3D>
                  </div>
                </ScrollReveal3D>

                <ScrollReveal3D delay={0.2}>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <Card3D variant="experience" className="timeline-content">
                      <span className="date">Present</span>
                      <h3>Masterarbeit Researcher</h3>
                      <h4>Time Series & Synthetic Data Generation</h4>
                      <ul className="content-list">
                        <li>Developed multi-class time series classification models with synthetic climate data streams.</li>
                        <li>Systematic testing of neural architectures.</li>
                      </ul>
                    </Card3D>
                  </div>
                </ScrollReveal3D>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* ════════════ EDUCATION SECTION ════════════ */}
          <section id="education">
            <div className="container">
              <ScrollReveal3D>
                <h2 className="section-title">model.load_weights()</h2>
                <p className="section-subtitle"># Knowledge Base</p>
              </ScrollReveal3D>

              <div className="grid-2">
                <ScrollReveal3D delay={0.1}>
                  <Card3D variant="education" className="edu-card">
                    <i className="fas fa-university edu-icon"></i>
                    <span className="date">03/2023 – Present</span>
                    <h3>Master of Science in Informatik</h3>
                    <h4>Julius-Maximilians-Universität Würzburg</h4>
                  </Card3D>
                </ScrollReveal3D>

                <ScrollReveal3D delay={0.2}>
                  <Card3D variant="education" className="edu-card">
                    <i className="fas fa-graduation-cap edu-icon"></i>
                    <span className="date">06/2018 – 05/2022</span>
                    <h3>Bachelor of CS & Engineering</h3>
                    <h4>Marwadi University</h4>
                    <p className="gpa">CGPA: 8.17/10 (≈ 1.9 DE)</p>
                  </Card3D>
                </ScrollReveal3D>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* ════════════ PROJECTS SECTION ════════════ */}
          <section id="projects">
            <View className="view-container">
              <Projects3D />
            </View>
            <div className="container">
              <ScrollReveal3D>
                <h2 className="section-title">model.deploy()</h2>
                <p className="section-subtitle"># Deployed Models</p>
              </ScrollReveal3D>

              <div className="grid-2">
                <ScrollReveal3D delay={0.1}>
                  <Card3D variant="projects" className="project-card">
                    <div className="project-header">
                      <h3>NN-GPT: AutoML with LLMs</h3>
                      <span className="badge">v2024.1</span>
                    </div>
                    <p className="subtitle">Architecture: LLM & AutoML</p>
                    <ul className="content-list">
                      <li>Interactive LLM-supported forecasting of model accuracy based on early training states.</li>
                      <li>Scientific publication documenting dynamic metrics.</li>
                    </ul>
                    <div className="project-links">
                      <a href="https://www.researchgate.net/publication/397983532_NNGPT_Rethinking_AutoML_with_Large_Language_Models" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <i className="fas fa-link"></i> Paper
                      </a>
                      <a href="https://github.com/Yashd1722/nn-gpt" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <i className="fab fa-github"></i> Code
                      </a>
                    </div>
                  </Card3D>
                </ScrollReveal3D>

                <ScrollReveal3D delay={0.2}>
                  <Card3D variant="projects" className="project-card">
                    <div className="project-header">
                      <h3>LEMUR Neural Network</h3>
                      <span className="badge">v2024.0</span>
                    </div>
                    <p className="subtitle">Architecture: PyTorch, Optuna</p>
                    <ul className="content-list">
                      <li>PyTorch-based AutoML framework designed for real-time validation.</li>
                      <li>Published methodology with interactive open-access data logs.</li>
                    </ul>
                    <div className="project-links">
                      <a href="https://arxiv.org/abs/2504.10552" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <i className="fas fa-folder-open"></i> arXiv
                      </a>
                      <a href="https://github.com/Yashd1722/nn-dataset" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <i className="fab fa-github"></i> Code
                      </a>
                    </div>
                  </Card3D>
                </ScrollReveal3D>

                <ScrollReveal3D delay={0.3}>
                  <Card3D variant="projects" className="project-card">
                    <div className="project-header">
                      <h3>INSTRUCT-IR</h3>
                      <span className="badge">v2023.2</span>
                    </div>
                    <p className="subtitle">Architecture: Vision-Language Models</p>
                    <ul className="content-list">
                      <li>Investigated model generalization under dynamic image conditions.</li>
                      <li>Active stress-testing of visual modalities.</li>
                    </ul>
                    <div className="project-links">
                      <a href="https://github.com/Yashd1722/instruct-" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <i className="fab fa-github"></i> Code
                      </a>
                    </div>
                  </Card3D>
                </ScrollReveal3D>

                <ScrollReveal3D delay={0.4}>
                  <Card3D variant="projects" className="project-card">
                    <div className="project-header">
                      <h3>Gender Classification</h3>
                      <span className="badge">v2022.9</span>
                    </div>
                    <p className="subtitle">Architecture: OpenCV Stream</p>
                    <ul className="content-list">
                      <li>Real-time capable computer vision recognition algorithm.</li>
                      <li>Continuous preprocessing stream with data augmentation hooks.</li>
                    </ul>
                  </Card3D>
                </ScrollReveal3D>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* ════════════ SKILLS SECTION ════════════ */}
          <section id="skills">
            <View className="view-container">
              <Skills3D />
            </View>
            <div className="container">
              <ScrollReveal3D>
                <h2 className="section-title">model.compile()</h2>
                <p className="section-subtitle"># Neural Parameters & Tooling</p>
              </ScrollReveal3D>

              <ScrollReveal3D delay={0.15}>
                <SkillsGrid />
              </ScrollReveal3D>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* ════════════ LANGUAGES SECTION ════════════ */}
          <section id="languages">
            <div className="container">
              <ScrollReveal3D>
                <h2 className="section-title">nlp.tokenize()</h2>
                <p className="section-subtitle"># Language Protocols</p>
              </ScrollReveal3D>

              <div className="grid-2">
                <ScrollReveal3D delay={0.1}>
                  <Card3D variant="languages" className="lang-card">
                    <i className="fas fa-language lang-icon"></i>
                    <h3>English</h3>
                    <h4>B2 — Upper Intermediate</h4>
                    <div className="progress-cylinder">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                    </div>
                  </Card3D>
                </ScrollReveal3D>

                <ScrollReveal3D delay={0.2}>
                  <Card3D variant="languages" className="lang-card">
                    <i className="fas fa-language lang-icon"></i>
                    <h3>Deutsch</h3>
                    <h4>A2 — Elementary</h4>
                    <div className="progress-cylinder">
                      <div className="progress-fill" style={{ width: '35%' }}></div>
                    </div>
                  </Card3D>
                </ScrollReveal3D>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer>
          <div className="footer-content">
            <p className="footer-text">
              <span>&gt;</span> system.exit(<span>"© 2025 Yashkumar Dhameliya. Engineering Intelligence."</span>)
            </p>
            <div className="footer-links">
              <a href="https://github.com/Yashd1722" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/yashkumar-dhameliya" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="mailto:yashdhameliya03@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
