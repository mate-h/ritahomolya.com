import template from './template';

export class Project {
	constructor() {
		this.date = "";
		this.title = "";
		this.description = "";
		this.media = [""];
		this.language = "";
	}
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
	instance: new Project(),
	url: '/projects/[id]',
	params: ["id"],
	new: () => new Project()
}

export {template};