type IconName = 'github' | 'menu' | 'close' | 'external' | 'terminal' | 'mail' | 'check';

const paths: Record<IconName, string> = {
  github: 'M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.04-2.78-.1-.26-.45-1.31.1-2.74 0 0 .85-.28 2.75 1.06A9.3 9.3 0 0 1 12 5.9c.85 0 1.71.12 2.5.34 1.9-1.34 2.74-1.06 2.74-1.06.55 1.43.2 2.48.1 2.74.65.73 1.04 1.65 1.04 2.78 0 3.96-2.34 4.83-4.57 5.09.36.32.68.94.68 1.9 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'm6 6 12 12M18 6 6 18',
  external: 'M14 3h7v7m0-7L10 14M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5',
  terminal: 'm5 7 4 5-4 5m6 0h8',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  check: 'm5 12 4 4L19 6',
};

export function Icon({ name, label }: { name: IconName; label?: string }) {
  return (
    <svg aria-hidden={label ? undefined : true} aria-label={label} className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} fill={name === 'github' ? 'currentColor' : 'none'} />
    </svg>
  );
}
