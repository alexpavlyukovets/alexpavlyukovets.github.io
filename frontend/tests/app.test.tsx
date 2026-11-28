import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('portfolio app', () => {
  it('renders the main portfolio sections and real repository links', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /alex/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /selected projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open mysql solutions repository/i })).toHaveAttribute('href', 'https://github.com/alexpavlyukovets/MySQL-Solutions');
    expect(screen.getByText(/production aws architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/20 Terraform-managed resources/i)).toBeInTheDocument();
  });

  it('uses a dimensioned, descriptive profile image to prevent layout shift', () => {
    render(<App />);
    const image = screen.getByRole('img', { name: /alex pavlyukovets holding a glass lens/i });
    expect(image).toHaveAttribute('src', '/images/alex-pavlyukovets.webp');
    expect(image).toHaveAttribute('width', '640');
    expect(image).toHaveAttribute('height', '640');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('opens and closes the mobile navigation accessibly', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: /open navigation menu/i });
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
