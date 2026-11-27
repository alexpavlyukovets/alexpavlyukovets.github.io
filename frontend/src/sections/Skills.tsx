import { learningNow, skillCategories } from '../data/portfolio';

export function Skills() {
  return <section className="section" id="skills" aria-labelledby="skills-title">
    <div className="section-heading"><div><p className="section-kicker">02 / toolkit</p><h2 id="skills-title">Technical skills, grounded in practice.</h2></div><p>The groups below separate applied foundations from the areas I am actively developing. They are not proficiency ratings.</p></div>
    <div className="skills-grid">{skillCategories.map((category) => <article className="skill-card" key={category.title}><div className="card-header"><h3>{category.title}</h3><span>{category.summary}</span></div><ul>{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
    <aside className="learning-card"><p className="section-kicker">In active development</p><ul>{learningNow.map((item) => <li key={item}>{item}</li>)}</ul></aside>
  </section>;
}
