import { Icon } from '../components/Icon';

const support = ['IAM + OIDC', 'Route 53 + ACM', 'Infrastructure as Code', 'CloudWatch monitoring'];

export function Architecture() {
  return <section className="section architecture" id="architecture" aria-labelledby="architecture-title">
    <div className="section-heading"><div><p className="section-kicker">04 / planned architecture</p><h2 id="architecture-title">Static delivery, designed for a cloud-native future.</h2></div><p>This is the planned hosting architecture for this portfolio. The services shown are design intent — they are not yet deployed.</p></div>
    <div className="architecture-panel">
      <div className="architecture-flow" aria-label="Planned delivery architecture"><div className="flow-node developer"><span>01</span><strong>Developer</strong><small>Source changes</small></div><div className="flow-line">↓</div><div className="flow-node"><span>02</span><strong>GitHub repository</strong><small>Version control</small></div><div className="flow-line">↓</div><div className="flow-node"><span>03</span><strong>GitHub Actions</strong><small>CI/CD pipeline</small></div><div className="flow-line">↓</div><div className="flow-node cloud"><span>04</span><strong>Amazon S3</strong><small>Private static origin</small></div><div className="flow-connection">↕</div><div className="flow-node cloud"><span>05</span><strong>Amazon CloudFront</strong><small>CDN, HTTPS, OAC</small></div><div className="flow-connection">↕</div><div className="flow-node visitor"><span>06</span><strong>End user</strong><small>Fast, secure access</small></div></div>
      <aside className="architecture-support"><div className="support-icon"><Icon name="terminal" /></div><h3>Supporting controls</h3><ul>{support.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul><p>Infrastructure and deployment automation remain intentionally outside the current frontend scope.</p></aside>
    </div>
  </section>;
}
