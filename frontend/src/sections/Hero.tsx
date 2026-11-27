import { Icon } from '../components/Icon';

export function Hero() {
  return <section className="hero section" id="top" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" /> Available for cloud-focused opportunities</p>
      <p className="code-label">&lt;hello /&gt;</p>
      <h1 id="hero-title">Alex<br /><em>Pavlyukovets.</em></h1>
      <p className="hero-role">Cloud &amp; DevOps Engineer</p>
      <p className="hero-summary">I build dependable paths from application code to cloud delivery — with a focus on automation, Linux, networking, security, and the foundations that make systems easier to run.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">View selected projects</a>
        <a className="text-link" href="https://github.com/alexpavlyukovets" target="_blank" rel="noreferrer"><Icon name="github" /> Explore GitHub</a>
      </div>
    </div>
    <div className="hero-terminal" aria-label="Terminal-style professional summary">
      <div className="terminal-bar"><span /><span /><span /><code>alex@cloud:~</code></div>
      <div className="terminal-body">
        <p><span className="prompt">$</span> whoami</p>
        <p className="terminal-result">Cloud &amp; DevOps Engineer</p>
        <p><span className="prompt">$</span> focus --current</p>
        <ul className="terminal-list"><li>Cloud infrastructure</li><li>Delivery automation</li><li>Linux &amp; networking</li></ul>
        <p><span className="prompt">$</span> <span className="cursor">_</span></p>
      </div>
    </div>
  </section>;
}
