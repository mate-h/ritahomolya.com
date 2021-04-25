export class Project {
  date: string;
  title: string;
  description?: string;
  media: string[];
  language: string;
}

export const datatype = {
	name: 'project',
	plural: 'projects',
	api: '/api/projects/[id]',
	url: '/projects/[id]',
	params: ["id"],
	new: () => new Project()
}