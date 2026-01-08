import { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import './CV.css';

const CV = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/cv-data.yaml')
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        setCvData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading CV data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="cv-loading">
        <p>Cargando<span className="cursor"></span></p>
      </div>
    );
  }

  if (!cvData) {
    return <div>Error al cargar el CV</div>;
  }

  return (
    <div className="cv">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">edison@enriquez: ~/curriculum</div>
        </div>

        <div className="cv-content">
          {/* Header - Personal Info */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">whoami && cat /etc/contact-info</span>
            </div>
            <div className="cmd-output">
              <div className="cv-header">
                <h1>{cvData.personal.name}</h1>
                <p className="subtitle">{cvData.personal.title}</p>
                <div className="contact-links">
                  <a href={`mailto:${cvData.personal.email}`}>
                    {cvData.personal.email}
                  </a>
                  <a href={`https://${cvData.personal.linkedin}`} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href={cvData.personal.resume_pdf} className="btn" download>
                    Descargar PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">cat ~/about/README.md</span>
            </div>
            <div className="cmd-output terminal-output">
              <div className="terminal-entry">
                <div className="terminal-entry-content">
                  {cvData.summary}
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">cat ~/experience/*.md</span>
            </div>
            <div className="cmd-output terminal-output">
              {cvData.experience.map((job, index) => (
                <div key={index} className="terminal-entry">
                  <div className="terminal-entry-header">
                    <span className="entry-marker">#</span> {job.title}
                  </div>
                  <div className="terminal-entry-meta">
                    <span className="meta-item">{job.company}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item">{job.location}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item">{job.period}</span>
                    {job.hours && (
                      <>
                        <span className="meta-separator">•</span>
                        <span className="meta-item">{job.hours}</span>
                      </>
                    )}
                  </div>
                  <div className="terminal-entry-content">
                    {job.responsibilities.map((resp, i) => (
                      <div key={i} className="terminal-list-item">
                        <span className="bullet">•</span> {resp}
                      </div>
                    ))}
                  </div>
                  {index < cvData.experience.length - 1 && <div className="terminal-separator">---</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Other Experience */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">cat ~/experience/other/*.md</span>
            </div>
            <div className="cmd-output terminal-output">
              {cvData.other_experience.map((job, index) => (
                <div key={index} className="terminal-entry">
                  <div className="terminal-entry-header">
                    <span className="entry-marker">#</span> {job.title}
                  </div>
                  <div className="terminal-entry-meta">
                    <span className="meta-item">{job.company}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item">{job.location}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item">{job.period}</span>
                    {job.hours && (
                      <>
                        <span className="meta-separator">•</span>
                        <span className="meta-item">{job.hours}</span>
                      </>
                    )}
                  </div>
                  <div className="terminal-entry-content">
                    {job.responsibilities.map((resp, i) => (
                      <div key={i} className="terminal-list-item">
                        <span className="bullet">•</span> {resp}
                      </div>
                    ))}
                  </div>
                  {index < cvData.other_experience.length - 1 && <div className="terminal-separator">---</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">cat ~/education/degrees.md</span>
            </div>
            <div className="cmd-output terminal-output">
              {cvData.education.map((edu, index) => (
                <div key={index} className="terminal-entry">
                  <div className="terminal-entry-header">
                    <span className="entry-marker">#</span> {edu.degree}
                  </div>
                  <div className="terminal-entry-meta">
                    <span className="meta-item">🎓 {edu.institution}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item">{edu.location}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item">{edu.graduation || edu.status}</span>
                  </div>
                  <div className="terminal-entry-content">
                    <div className="terminal-text-muted">{edu.school}</div>
                    <div className="terminal-list-item">
                      <span className="bullet">→</span> <strong>Cursos:</strong> {edu.courses}
                    </div>
                  </div>
                  {index < cvData.education.length - 1 && <div className="terminal-separator">---</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">cat ~/skills/profile.yaml</span>
            </div>
            <div className="cmd-output terminal-output">
              <div className="terminal-entry">
                <div className="terminal-entry-header">
                  <span className="entry-marker">#</span> Análisis de Datos
                </div>
                <div className="terminal-entry-content">
                  {cvData.skills.analysis.map((skill, i) => (
                    <span key={i} className="terminal-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="terminal-separator">---</div>
              
              <div className="terminal-entry">
                <div className="terminal-entry-header">
                  <span className="entry-marker">#</span> Herramientas de Diseño
                </div>
                <div className="terminal-entry-content">
                  {cvData.skills.design_tools.map((skill, i) => (
                    <span key={i} className="terminal-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="terminal-separator">---</div>
              
              <div className="terminal-entry">
                <div className="terminal-entry-header">
                  <span className="entry-marker">#</span> Programación
                </div>
                <div className="terminal-entry-content">
                  {cvData.skills.programming.map((skill, i) => (
                    <span key={i} className="terminal-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="terminal-separator">---</div>
              
              <div className="terminal-entry">
                <div className="terminal-entry-header">
                  <span className="entry-marker">#</span> Certificaciones
                </div>
                <div className="terminal-entry-content">
                  {cvData.skills.certifications.map((cert, i) => (
                    <div key={i} className="terminal-list-item">
                      <span className="bullet">•</span> {cert}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="terminal-separator">---</div>
              
              <div className="terminal-entry">
                <div className="terminal-entry-header">
                  <span className="entry-marker">#</span> Idiomas
                </div>
                <div className="terminal-entry-content">
                  {cvData.skills.languages.map((lang, i) => (
                    <div key={i} className="terminal-list-item">
                      <span className="bullet">•</span> {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">cat ~/projects/academic/*.md</span>
            </div>
            <div className="cmd-output terminal-output">
              {cvData.projects.map((project, index) => (
                <div key={index} className="terminal-entry">
                  <div className="terminal-entry-header">
                    <span className="entry-marker">#</span> {project.title}
                  </div>
                  <div className="terminal-entry-meta">
                    <span className="meta-item">{project.role}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item">{project.period}</span>
                  </div>
                  <div className="terminal-entry-content">
                    {typeof project.description === 'string' ? (
                      <div className="terminal-text-muted">{project.description}</div>
                    ) : (
                      project.description.map((desc, i) => (
                        <div key={i} className="terminal-list-item">
                          <span className="bullet">•</span> {desc}
                        </div>
                      ))
                    )}
                  </div>
                  {index < cvData.projects.length - 1 && <div className="terminal-separator">---</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">cat ~/achievements/*.md</span>
            </div>
            <div className="cmd-output terminal-output">
              {cvData.achievements.map((achievement, index) => (
                <div key={index} className="terminal-entry">
                  <div className="terminal-entry-header">
                    <span className="entry-marker">#</span> {achievement.title}
                  </div>
                  {achievement.period && (
                    <div className="terminal-entry-meta">
                      <span className="meta-item">{achievement.period}</span>
                    </div>
                  )}
                  <div className="terminal-entry-content">
                    {achievement.description && (
                      <div className="terminal-text-muted">{achievement.description}</div>
                    )}
                    {achievement.items && achievement.items.map((item, i) => (
                      <div key={i} className="terminal-list-item">
                        <span className="bullet">•</span> {item}
                      </div>
                    ))}
                  </div>
                  {index < cvData.achievements.length - 1 && <div className="terminal-separator">---</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="terminal-command-block">
            <div className="cmd-line">
              <span className="prompt">edison@enriquez:~$</span>
              <span className="cmd">echo "CV read complete" && exit 0</span>
            </div>
            <div className="cmd-output">
              <div className="terminal-footer-content">
                <span className="output-success">CV read complete</span><br/>
                <span className="output-dim">Total sections processed: {
                  1 + // personal info
                  1 + // summary
                  cvData.experience.length +
                  cvData.other_experience.length +
                  cvData.education.length +
                  cvData.projects.length +
                  cvData.achievements.length
                }</span><br/>
                <span className="output-success">Process completed with exit code 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
