import { navigation } from '../data/portfolio';
import { useMenu } from '../hooks/useMenu';
import { Icon } from './Icon';

export function Header() {
  const { isOpen, setIsOpen } = useMenu();
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Alex Pavlyukovets — home">AP<span>.</span></a>
      <button className="menu-toggle" type="button" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Icon name={isOpen ? 'close' : 'menu'} />
      </button>
      <nav className={isOpen ? 'navigation is-open' : 'navigation'} aria-label="Primary navigation">
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>)}
        <a className="nav-github" href="https://github.com/alexpavlyukovets" target="_blank" rel="noreferrer"><Icon name="github" /> <span>GitHub</span></a>
      </nav>
    </header>
  );
}
