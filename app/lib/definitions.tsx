export type Project = {
  id: number;
  name: string;
  start_date?: Date;
  end_date?: Date;
  image?: string;
  description?: string;
  technologies?: Technology[];
  deployed_url?: string;
  repo_url?: string;
};

export type Technology = {
  id: number;
  name: string;
  icon?: string;
  category?: string;
};

export type SocialLink = {
  id: number;
  name: string;
  icon?: string;
  url: string;
};
