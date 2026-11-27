export type SkillCategory = {
  title: string;
  summary: string;
  skills: string[];
};

export type Project = {
  title: string;
  description: string;
  problem: string;
  technologies: string[];
  repository: string;
  status: 'Public repository' | 'In progress';
};

export type DevelopmentItem = {
  title: string;
  detail: string;
};
