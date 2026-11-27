import { Icon } from '../components/Icon';

export function Contact() {
  return <section className="section contact" id="contact" aria-labelledby="contact-title"><p className="section-kicker">06 / contact</p><h2 id="contact-title">Let’s build reliable systems.</h2><p>I’m interested in Cloud &amp; DevOps opportunities where careful automation, dependable delivery, and continuous learning matter.</p><div className="contact-actions"><a className="button button-primary" href="mailto:alexpavlyukovec@gmail.com"><Icon name="mail" /> Send an email</a><a className="text-link" href="https://github.com/alexpavlyukovets" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub profile</a></div></section>;
}
