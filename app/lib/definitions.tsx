export type Project = {
  id: number;
  name: string;
  start_date?: Date;
  end_date?: Date;
  image?: string;
  description?: string;
  technologies?: string;
  deployed_url?: string;
  github_url?: string;
}
