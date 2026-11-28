import { Icon } from '../components/Icon';

const support = [
  'Private S3 origin + CloudFront OAC',
  'Least-privilege IAM + GitHub OIDC / AWS STS',
  'Route 53 + ACM + AWS WAF',
  'Terraform state encryption + locking',
  'CloudWatch alarms + SNS notifications',
  'Pinned Actions + Dependabot updates',
  'CloudFront security response headers',
];

export function Architecture() {
  return <section className="section architecture" id="architecture" aria-labelledby="architecture-title">
    <div className="section-heading"><div><p className="section-kicker">04 / production architecture</p><h2 id="architecture-title">Static delivery, implemented as a cloud-native stack.</h2></div><p>This portfolio is delivered through the production AWS architecture below, with infrastructure and deployment automation managed in the repository.</p></div>
    <div className="architecture-panel">
      <div className="architecture-flow" aria-label="Production delivery architecture"><div className="flow-node developer"><span>01</span><strong>Developer</strong><small>Source changes</small></div><div className="flow-line">↓</div><div className="flow-node"><span>02</span><strong>GitHub repository</strong><small>Version control</small></div><div className="flow-line">↓</div><div className="flow-node"><span>03</span><strong>GitHub Actions</strong><small>OIDC delivery pipeline</small></div><div className="flow-line">↓</div><div className="flow-node cloud"><span>04</span><strong>Amazon S3</strong><small>Private static origin</small></div><div className="flow-connection">↕</div><div className="flow-node cloud"><span>05</span><strong>Amazon CloudFront</strong><small>CDN, HTTPS, OAC</small></div><div className="flow-connection">↕</div><div className="flow-node visitor"><span>06</span><strong>End user</strong><small>Fast, secure access</small></div></div>
      <aside className="architecture-support"><div className="support-icon"><Icon name="terminal" /></div><h3>Supporting controls</h3><ul>{support.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul><p>20 Terraform-managed resources define the hosted delivery stack and operational controls.</p></aside>
    </div>
  </section>;
}
