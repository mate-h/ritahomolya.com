import { jsonResponse } from "$lib/api";
import type { RequestHandler } from "@sveltejs/kit";
import { firestore } from "./firestore";

// scoped imports
import projectTemplate from "../admin/projects/template";
import type { Project } from "../admin/projects";

let fillTemplate = function(templateString: string, templateVars: Record<string, unknown>){
	templateString = templateString.split('{').join('{this.');
	console.log(templateString)
	return new Function("return `"+templateString +"`;").call(templateVars);
}

export const get: RequestHandler = async ({ query }) => {
	const path = query.get('path');
	if (!path) {
		return jsonResponse(400, 'Bad Request: missing path');
	}

	const document = firestore.doc(path);
	const doc = await document.get();

	const page = projectTemplate(doc.data() as Project);

	// console.log(doc.data(), page);

	// for this path, we defined a datatype in config.
	// map datatype to template 
	// define static template in source code (admin folde)
	// or store template in the database

	// get template assigned for this path
	

	return jsonResponse(200, page);
};
