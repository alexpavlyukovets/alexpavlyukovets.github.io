import { professionalDevelopment } from '../data/portfolio';

export function Development() {
  return <section className="section split-section development" aria-labelledby="development-title"><div><p className="section-kicker">05 / development</p><h2 id="development-title">Learning that stays close to the work.</h2></div><div className="development-list">{professionalDevelopment.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>)}<p className="disclosure">No unverified certificates, employers, titles, dates, or outcomes are listed here.</p></div></section>;
}
