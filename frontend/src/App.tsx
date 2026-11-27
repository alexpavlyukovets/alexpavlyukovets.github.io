import { Header } from './components/Header';
import { About } from './sections/About';
import { Architecture } from './sections/Architecture';
import { Contact } from './sections/Contact';
import { Development } from './sections/Development';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

export default function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><About /><Skills /><Projects /><Architecture /><Development /><Contact /></main><footer className="footer"><span>© {new Date().getFullYear()} Alex Pavlyukovets</span><span>Built with React, TypeScript &amp; Vite</span></footer></>;
}
