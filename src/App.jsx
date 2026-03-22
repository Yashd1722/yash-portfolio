import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(() => heroContent.classList.add('active'), 100);
    }
    
    return () => revealObserver.disconnect();
  }, []);

  const toggleNav = () => setNavActive(!navActive);
  const closeNav = () => setNavActive(false);

  return (
    <>
      <div className="mesh-bg">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>
      <div className="grid-overlay"></div>

      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="logo">YD<span className="dot">.</span></a>
          <ul className={`nav-links ${navActive ? 'active' : ''}`}>
            <li><a href="#hero" onClick={closeNav}>Home</a></li>
            <li><a href="#about" onClick={closeNav}>Zusammenfassung</a></li>
            <li><a href="#experience" onClick={closeNav}>Berufserfahrung</a></li>
            <li><a href="#education" onClick={closeNav}>Ausbildung</a></li>
            <li><a href="#projects" onClick={closeNav}>Projekte</a></li>
            <li><a href="#skills" onClick={closeNav}>Kenntnisse</a></li>
          </ul>
          <div className="hamburger" onClick={toggleNav}>
            {navActive ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
          </div>
        </div>
      </nav>

      <main>
        <section id="hero">
          <div className="container" style={{paddingTop: '0'}}>
            <div className="hero-content reveal">
              <div className="hero-tag">
                <i className="fas fa-microchip"></i> ML Engineer & MLOps
              </div>
              <h1 className="hero-name">Yashkumar Dhameliya</h1>
              <h2 className="hero-title gradient-text">Machine Learning & Data Analyst</h2>
              <p className="hero-summary">
                Translating raw data into product-ready artificial intelligence. Specialized in time-series analysis, computer vision, and building resilient MLOps pipelines.
              </p>
              <div className="action-buttons">
                <a href="#experience" className="btn btn-primary">
                  <i className="fas fa-rocket"></i> Meine Arbeit
                </a>
                <a href="https://github.com/Yashd1722" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fab fa-github"></i> GitHub
                </a>
                <a href="https://www.linkedin.com/in/yashkumar-dhameliya" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="sec-about">
          <div className="container reveal">
            <h2 className="section-title">Zusammenfassung</h2>
            <div className="glass-card">
              <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>
                Machine Learning & Data Analytics-Spezialist mit Fokus auf datengetriebene KI-Lösungen, Feature Engineering, Zeitreihenanalyse und Computer Vision. Praktische Erfahrung in LLM-Analyse, AutoML-Entwicklung und produktnahen ML-Implementierungen. Masterarbeit: Entwicklung und Vergleich von ML-Modellen für Zeitreihenklassifikation mit synthetischen und realen Klimadaten.
              </p>
              <div style={{display: 'flex', gap: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '1.1rem'}}>
                  <i className="fas fa-map-marker-alt" style={{color: 'var(--color-primary)'}}></i> Würzburg, DE
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '1.1rem'}}>
                  <i className="fas fa-envelope" style={{color: 'var(--color-primary)'}}></i> yashdhameliya03@gmail.com
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="sec-exp">
          <div className="container reveal">
            <h2 className="section-title">Berufserfahrung</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-content">
                  <span className="date">Aug 2025 – Heute</span>
                  <h3>Machine Learning Engineer</h3>
                  <h4>Axinity GmbH & Co. KG · Liketik-Projekt</h4>
                  <ul>
                    <li>Datenanalyse, -bereinigung und Feature-Extraktion für ML-Modelle im E-Commerce</li>
                    <li>Entwicklung geschäftsrelevanter KI-Lösungen mit KPI-Integration und Vektorgenerierung</li>
                    <li>Optimierung interner Workflows zur Effizienzsteigerung in der KI-Entwicklung</li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-content">
                  <span className="date">Apr 2023 – Heute</span>
                  <h3>Masterarbeit Researcher</h3>
                  <h4>Zeitreihenklassifikation & Synthetische Daten</h4>
                  <ul>
                    <li>Entwicklung von Multiklass-Zeitreihenklassifikationsmodellen mit synthetischen und realen Klimadaten</li>
                    <li>Systematischer Vergleich klassischer ML-Ansätze vs. spezialisierte Zeitreihen-Modelle</li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-content">
                  <span className="date">Mai 2021 – Mär 2023</span>
                  <h3>Webentwickler</h3>
                  <h4>Webcare Infoway · Shreeja Infotech</h4>
                  <ul>
                    <li>Entwicklung datengetriebener Web-Applikationen mit JavaScript, Java, Python und MySQL</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="sec-edu">
          <div className="container reveal">
            <h2 className="section-title">Ausbildung</h2>
            <div className="grid-2">
              <div className="glass-card">
                <i className="fas fa-university" style={{fontSize: '3rem', color: 'var(--color-secondary)', marginBottom: '1.5rem'}}></i>
                <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white'}}>Master in Informatik</h3>
                <h4 style={{color: 'var(--color-primary)', marginBottom: '1rem'}}>Julius-Maximilians-Universität</h4>
                <p style={{color: 'var(--text-muted)'}}>März 2023 – Heute | Würzburg</p>
              </div>
              <div className="glass-card">
                <i className="fas fa-graduation-cap" style={{fontSize: '3rem', color: 'var(--color-secondary)', marginBottom: '1.5rem'}}></i>
                <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white'}}>Bachelor in CS & Engineering</h3>
                <h4 style={{color: 'var(--color-primary)', marginBottom: '1rem'}}>Marwadi University</h4>
                <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>Juni 2018 – Mai 2022</p>
                <div style={{paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.95rem', color: 'var(--text-muted)'}}>
                  Notendurchschnitt: 1,9 (deutsche Äquivalenz) | CGPA: 8.17/10
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="sec-projects">
          <div className="container reveal">
            <h2 className="section-title">Projekte</h2>
            <div className="grid-2">
              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>NN-GPT: Rethinking AutoML with LLMs</h3>
                  <span className="badge">2024</span>
                </div>
                <p className="subtitle">LLM & AutoML Architecture</p>
                <ul>
                  <li>LLM-gestützte Prognose von Modellgenauigkeit basierend auf frühen Epochen.</li>
                  <li>Wissenschaftliche Publikation zur Dokumentation von Experimenten und AutoML Innovation.</li>
                </ul>
                <a href="https://www.researchgate.net/publication/397983532_NNGPT_Rethinking_AutoML_with_Large_Language_Models" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fas fa-external-link-alt"></i> Publikation
                </a>
              </div>
              
              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>LEMUR Neural Network Dataset</h3>
                  <span className="badge">2024</span>
                </div>
                <p className="subtitle">AutoML, PyTorch, Optuna</p>
                <ul>
                  <li>PyTorch-basiertes AutoML-Framework mit Optuna für skalierbare KI-Experimente.</li>
                  <li>Publizierte Methodik mit Open-Access Architektur.</li>
                </ul>
                <a href="https://arxiv.org/abs/2504.10552" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fas fa-external-link-alt"></i> Publikation
                </a>
              </div>

              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>INSTRUCT-IR – VLM Robustness</h3>
                  <span className="badge">2023</span>
                </div>
                <p className="subtitle">Computer Vision, VLMs</p>
                <ul>
                  <li>Untersuchung der Robustheit von Vision-Language Modellen bei Bilddegradierung.</li>
                  <li>Analyse von Generalisierung und Modellstabilität unter Extrembedingungen.</li>
                </ul>
              </div>

              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>Gender Classification</h3>
                  <span className="badge">2022</span>
                </div>
                <p className="subtitle">Computer Vision, OpenCV</p>
                <ul>
                  <li>Entwicklung eines Geschlechtserkennungssystems (93% Gen.) mit OpenCV.</li>
                  <li>Robuste Vorverarbeitungspipeline mit intensiver Datenaugmentation.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="sec-skills">
          <div className="container reveal">
            <h2 className="section-title">Technical Stacks</h2>
            
            <div className="marquee-container">
              <div className="marquee-content">
                {[...Array(2)].map((_, idx) => (
                  <React.Fragment key={idx}>
                    <div className="marquee-tag"><i className="fas fa-brain"></i> PyTorch</div>
                    <div className="marquee-tag purple"><i className="fas fa-network-wired"></i> Transformers</div>
                    <div className="marquee-tag"><i className="fas fa-chart-line"></i> Scikit-learn</div>
                    <div className="marquee-tag purple"><i className="fas fa-table"></i> Pandas</div>
                    <div className="marquee-tag"><i className="fas fa-square-root-alt"></i> NumPy</div>
                    <div className="marquee-tag purple"><i className="fas fa-diagram-project"></i> Feature Eng.</div>
                    <div className="marquee-tag"><i className="fas fa-clock"></i> Zeitreihenanalyse</div>
                    <div className="marquee-tag purple"><i className="fas fa-robot"></i> NLP</div>
                    <div className="marquee-tag"><i className="fas fa-microchip"></i> LLMs</div>
                    <div className="marquee-tag purple"><i className="fas fa-eye"></i> Computer Vision</div>
                    <div className="marquee-tag"><i className="fas fa-laugh-beam"></i> Hugging Face</div>
                    <div className="marquee-tag purple"><i className="fas fa-cogs"></i> AutoML</div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="marquee-container">
              <div className="marquee-content reverse">
                {[...Array(2)].map((_, idx) => (
                  <React.Fragment key={idx}>
                    <div className="marquee-tag purple"><i className="fab fa-python"></i> Python</div>
                    <div className="marquee-tag"><i className="fab fa-js"></i> JavaScript</div>
                    <div className="marquee-tag purple"><i className="fas fa-pepper-hot"></i> Flask</div>
                    <div className="marquee-tag"><i className="fas fa-bolt"></i> FastAPI</div>
                    <div className="marquee-tag purple"><i className="fas fa-database"></i> MySQL</div>
                    <div className="marquee-tag"><i className="fas fa-leaf"></i> MongoDB</div>
                    <div className="marquee-tag purple"><i className="fas fa-server"></i> MLOps</div>
                    <div className="marquee-tag"><i className="fab fa-docker"></i> Docker</div>
                    <div className="marquee-tag"><i className="fas fa-dharmachakra"></i> Kubernetes</div>
                    <div className="marquee-tag purple"><i className="fab fa-git-alt"></i> Git</div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="grid-2" style={{marginTop: '4rem'}}>
              <div className="glass-card workflow-card">
                <h3><i className="fas fa-chart-pie"></i> Data Science Workflow</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '1.1rem'}}>
                  Expertise connecting exploratory data engineering, resilient feature extraction, optimal model deployment, and KPI-monitored infrastructure.
                </p>
              </div>
              <div className="glass-card workflow-card">
                <h3><i className="fas fa-language"></i> Sprachen</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', width: '100%'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)'}}>
                    <strong style={{color: 'white'}}>Englisch</strong> <span style={{color: 'var(--color-primary)'}}>B1 (Gute Kenntnisse)</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)'}}>
                    <strong style={{color: 'white'}}>Deutsch</strong> <span style={{color: 'var(--color-primary)'}}>A2 (Grundkenntnisse)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p style={{fontFamily: 'Space Grotesk'}}>&copy; 2024 Yashkumar Dhameliya. Engineering Intelligence.</p>
          <div className="footer-links">
            <a href="https://github.com/Yashd1722" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/yashkumar-dhameliya" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            <a href="mailto:yashdhameliya03@gmail.com"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
