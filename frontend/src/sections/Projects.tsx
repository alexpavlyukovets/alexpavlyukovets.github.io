import { Icon } from '../components/Icon';
import { projects } from '../data/portfolio';

export function Projects() {
  return <section className="section" id="projects" aria-labelledby="projects-title">
    <div className="section-heading"><div><p className="section-kicker">03 / work</p><h2 id="projects-title">Selected projects.</h2></div><a className="text-link" href="https://github.com/alexpavlyukovets?tab=repositories" target="_blank" rel="noreferrer">All repositories <Icon name="external" /></a></div>
    <div className="projects-grid">{projects.map((project) => <article className="project-card" key={project.title}><div className="project-top"><span className={project.status === 'In progress' ? 'tag tag-muted' : 'tag'}>{project.status}</span><a href={project.repository} aria-label={`Open ${project.title} repository`} target="_blank" rel="noreferrer"><Icon name="external" /></a></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-problem"><span>Purpose</span>{project.problem}</div><ul className="tech-tags">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></article>)}</div>
  </section>;
}
