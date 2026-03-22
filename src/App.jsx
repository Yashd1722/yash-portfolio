import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    // Scroll Reveal Animation
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

    const heroContent = document.querySelector('.hero-container.reveal');
    if (heroContent) {
      heroContent.classList.add('active');
    }
    
    return () => {
      revealObserver.disconnect();
    };
  }, []);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeNav = () => {
    setNavActive(false);
  };

  return (
    <>
      {/* Background Animated Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="#" className="logo">YD<span className="dot">.</span></a>
          <ul className={`nav-links ${navActive ? 'active' : ''}`}>
            <li><a href="#about" onClick={closeNav}>Über mich</a></li>
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
        {/* Hero Section */}
        <section id="hero" className="sec-hero">
          <div className="hero-container reveal">
            <div className="hero-content">
              <p className="greeting">Hallo, ich bin</p>
              <h1 className="name">Yashkumar Dhameliya</h1>
              <h2 className="title gradient-text">Machine Learning & Data Analytics Spezialist</h2>
              <p className="summary">
                Mit Fokus auf datengetriebene KI-Lösungen, Feature Engineering, Zeitreihenanalyse und Computer Vision.
              </p>
              <div className="action-buttons">
                <a href="mailto:yashdhameliya03@gmail.com" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i> Kontaktieren
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

        {/* About Section */}
        <section id="about" className="sec-about">
          <div className="container reveal">
            <h2 className="section-title">Zusammenfassung</h2>
            <div className="glass-card about-card">
              <p>
                Machine Learning & Data Analytics-Spezialist mit Fokus auf datengetriebene KI-Lösungen, Feature Engineering, Zeitreihenanalyse und Computer Vision. Praktische Erfahrung in LLM-Analyse, AutoML-Entwicklung und produktnahen ML-Implementierungen (Axinity/Liketik). Masterarbeit: Entwicklung und Vergleich von ML-Modellen für Zeitreihenklassifikation mit synthetischen und realen Klimadaten.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Würzburg, DE</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+49 157 582 787 54</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="sec-exp">
          <div className="container reveal">
            <h2 className="section-title">Berufserfahrung</h2>
            <div className="timeline">
              {/* Job 1 */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-content">
                  <span className="date">August 2025 – Heute</span>
                  <h3>AI Product & Operations Associate</h3>
                  <h4 className="company"><a href="https://www.axinity.dev/en" target="_blank" rel="noopener noreferrer" style={{color: "inherit", textDecoration: "none"}}>Axinity GmbH & Co. KG</a> · Liketik-Projekt · Werkstudent · Remote</h4>
                  <ul>
                    <li>Datenanalyse, -bereinigung und Feature-Extraktion für ML-Modelle im E-Commerce</li>
                    <li>Entwicklung geschäftsrelevanter KI-Lösungen mit KPI-Integration und Vektorgenerierung</li>
                    <li>Optimierung interner Workflows zur Effizienzsteigerung in der KI-Entwicklung</li>
                  </ul>
                </div>
              </div>
              {/* Job 2 */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-content">
                  <span className="date">April 2023 – Heute</span>
                  <h3>Masterarbeit</h3>
                  <h4 className="company">Synthetische Daten & Zeitreihenklassifikation – Abrupte Klimaübergänge</h4>
                  <ul>
                    <li>Entwicklung von Multiklass-Zeitreihenklassifikationsmodellen mit synthetischen und realen Klimadaten</li>
                    <li>Systematischer Vergleich klassischer ML-Ansätze vs. spezialisierte Zeitreihen-Modelle</li>
                  </ul>
                </div>
              </div>
              {/* Job 3 */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-content">
                  <span className="date">Mai 2021 – März 2023</span>
                  <h3>Webentwickler</h3>
                  <h4 className="company">Webcare Infoway · Shreeja Infotech</h4>
                  <ul>
                    <li>Entwicklung datengetriebener Web-Applikationen mit JavaScript, Java, Python und MySQL</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="sec-edu">
          <div className="container reveal">
            <h2 className="section-title">Ausbildung</h2>
            <div className="grid-2">
              <div className="glass-card edu-card">
                <div className="edu-icon"><i className="fas fa-university"></i></div>
                <span className="date">März 2023 – Heute</span>
                <h3>Master of Science in Informatik</h3>
                <h4>Julius-Maximilians-Universität Würzburg</h4>
              </div>
              <div className="glass-card edu-card">
                <div className="edu-icon"><i className="fas fa-graduation-cap"></i></div>
                <span className="date">Juni 2018 – Mai 2022</span>
                <h3>Bachelor of Computer Science & Engineering</h3>
                <h4>Marwadi University</h4>
                <p className="grade">Notendurchschnitt: 1,9 (deutsche Äquivalenz), CGPA: 8.17/10</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="sec-projects">
          <div className="container reveal">
            <h2 className="section-title">Projekte</h2>
            <div className="grid-2">
              {/* Project 1 */}
              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>NN-GPT: Rethinking AutoML with LLMs</h3>
                  <span className="badge">2024</span>
                </div>
                <p className="subtitle">LLM, AutoML</p>
                <ul>
                  <li>LLM-gestützte Prognose von Modellgenauigkeit und optimaler Trainingsdauer für Computer-Vision-Modelle basierend auf frühen Epochen</li>
                  <li>Veröffentlichung einer wissenschaftlichen Arbeit zur Dokumentation der Experimente und Ergebnisse</li>
                </ul>
                <div style={{ marginTop: '1.5rem' }}>
                  <a href="https://www.researchgate.net/publication/397983532_NNGPT_Rethinking_AutoML_with_Large_Language_Models" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                    <i className="fas fa-external-link-alt"></i> Publikation ansehen
                  </a>
                </div>
              </div>
              {/* Project 2 */}
              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>LEMUR Neural Network Dataset</h3>
                  <span className="badge">2024</span>
                </div>
                <p className="subtitle">AutoML, PyTorch</p>
                <ul>
                  <li>PyTorch-basiertes AutoML-Framework mit Optuna-Integration für reproduzierbare und skalierbare KI-Experimente</li>
                  <li>Veröffentlichung einer wissenschaftlichen Arbeit zur Dokumentation der Implementierung</li>
                </ul>
                <div style={{ marginTop: '1.5rem' }}>
                  <a href="https://arxiv.org/abs/2504.10552" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                    <i className="fas fa-external-link-alt"></i> Publikation ansehen
                  </a>
                </div>
              </div>
              {/* Project 3 */}
              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>INSTRUCT-IR – Robustheit von Vision-Language-Modellen</h3>
                  <span className="badge">2023</span>
                </div>
                <p className="subtitle">Computer Vision, VLMs</p>
                <ul>
                  <li>Untersuchung der Robustheit von VLMs bei verschiedenen Bilddegradierungen</li>
                  <li>Analyse von Bildqualität, Generalisierung und Modellstabilität</li>
                </ul>
              </div>
              {/* Project 4 */}
              <div className="glass-card project-card">
                <div className="project-header">
                  <h3>Gender Classification</h3>
                  <span className="badge">2022</span>
                </div>
                <p className="subtitle">Computer Vision, OpenCV</p>
                <ul>
                  <li>Entwicklung eines Geschlechtserkennungssystems mit OpenCV (93% Genauigkeit)</li>
                  <li>Implementierung einer robusten Vorverarbeitungspipeline mit Datenaugmentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="sec-skills">
          <div className="container reveal">
            <h2 className="section-title">Kenntnisse & Sprachen</h2>
            
            <div className="skills-wrapper">
              <div className="glass-card skills-card">
                <h3><i className="fas fa-brain"></i> ML / KI</h3>
                <div className="tags">
                  <span className="tag">PyTorch</span>
                  <span className="tag">Scikit-learn</span>
                  <span className="tag">Transformers</span>
                  <span className="tag">Pandas</span>
                  <span className="tag">NumPy</span>
                  <span className="tag">Feature Engineering</span>
                  <span className="tag">Zeitreihenanalyse</span>
                  <span className="tag">NLP</span>
                  <span className="tag">LLMs</span>
                  <span className="tag">Computer Vision</span>
                  <span className="tag">Hugging Face</span>
                  <span className="tag">AutoML</span>
                  <span className="tag">Optuna</span>
                </div>
              </div>
              
              <div className="glass-card skills-card">
                <h3><i className="fas fa-database"></i> Datenbanken / Web</h3>
                <div className="tags">
                  <span className="tag">JavaScript</span>
                  <span className="tag">Flask</span>
                  <span className="tag">FastAPI</span>
                  <span className="tag">HTML/CSS</span>
                  <span className="tag">MySQL</span>
                  <span className="tag">MongoDB</span>
                </div>
              </div>

              <div className="grid-2 mt-4">
                <div className="glass-card skills-card">
                  <h3><i className="fas fa-server"></i> DevOps</h3>
                  <div className="tags">
                    <span className="tag">Kubernetes</span>
                    <span className="tag">Git</span>
                  </div>
                </div>
                <div className="glass-card skills-card">
                  <h3><i className="fas fa-language"></i> Sprachen</h3>
                  <ul className="lang-list">
                    <li><strong>Englisch:</strong> B1 (Gute Kenntnisse)</li>
                    <li><strong>Deutsch:</strong> A2 (Grundkenntnisse)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="glass">
        <div className="footer-content">
          <p>&copy; 2024 Yashkumar Dhameliya. All rights reserved.</p>
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
