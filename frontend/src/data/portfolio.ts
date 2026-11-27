import type { DevelopmentItem, Project, SkillCategory } from '../types/content';

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Contact', href: '#contact' },
] as const;

export const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud computing',
    summary: 'Hands-on focus',
    skills: ['AWS', 'EC2', 'S3', 'VPC', 'IAM', 'Route 53', 'CloudFront', 'RDS', 'Lambda', 'CloudFormation', 'CloudWatch'],
  },
  {
    title: 'Operating systems & networking',
    summary: 'Hands-on focus',
    skills: ['Linux', 'Ubuntu', 'Bash', 'SSH', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'Subnetting'],
  },
  {
    title: 'DevOps & automation',
    summary: 'Hands-on focus',
    skills: ['Git', 'GitHub', 'Docker', 'GitHub Actions', 'Infrastructure as Code'],
  },
  {
    title: 'Programming & web development',
    summary: 'Applied development background',
    skills: ['Python', 'Flask', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML', 'CSS', 'SCSS'],
  },
  {
    title: 'Databases',
    summary: 'Hands-on focus',
    skills: ['MySQL', 'Amazon RDS', 'SQLite'],
  },
];

export const learningNow = ['AWS architecture patterns', 'Infrastructure as Code workflows', 'Secure CI/CD with OIDC'];

export const projects: Project[] = [
  {
    title: 'MySQL Solutions',
    description: 'A collection of practical MySQL exercises and solutions for strengthening relational database fundamentals.',
    problem: 'Turns database concepts into repeatable, query-driven practice.',
    technologies: ['MySQL', 'SQL'],
    repository: 'https://github.com/alexpavlyukovets/MySQL-Solutions',
    status: 'Public repository',
  },
  {
    title: 'SQLite SQLAlchemy',
    description: 'Python examples for working with SQLite through SQLAlchemy and building a clear persistence layer.',
    problem: 'Explores a maintainable bridge between application code and relational data.',
    technologies: ['Python', 'SQLite', 'SQLAlchemy'],
    repository: 'https://github.com/alexpavlyukovets/SQLite-SQLAlchemy',
    status: 'Public repository',
  },
  {
    title: 'Flask Jinja',
    description: 'A Flask project centred on server-rendered templates and structured web application fundamentals.',
    problem: 'Practises composing dynamic, maintainable web views with a minimal Python stack.',
    technologies: ['Python', 'Flask', 'Jinja'],
    repository: 'https://github.com/alexpavlyukovets/Flask-Jinja',
    status: 'Public repository',
  },
  {
    title: 'Cloud & DevOps Portfolio',
    description: 'This static portfolio is being rebuilt as a production-ready React and TypeScript frontend.',
    problem: 'Demonstrates a delivery-ready frontend designed for a future AWS static-hosting pipeline.',
    technologies: ['React', 'TypeScript', 'Vite', 'AWS'],
    repository: 'https://github.com/alexpavlyukovets/alexpavlyukovets.github.io',
    status: 'In progress',
  },
];

export const professionalDevelopment: DevelopmentItem[] = [
  {
    title: 'Web development foundation',
    detail: 'Practical work across HTML, CSS, JavaScript, React, Node.js, Python, Flask, and relational databases.',
  },
  {
    title: 'Cloud & DevOps direction',
    detail: 'Current professional development is focused on cloud services, Linux administration, networking, automation, and secure delivery practices.',
  },
];
