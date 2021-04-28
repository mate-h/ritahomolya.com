import { jsonResponse } from "$lib/responses";
import type { RequestHandler } from "@sveltejs/kit";
import type { Project } from "$lib/admin/projects";
import { template } from "$lib/admin/projects";
import { firestore } from "$lib/firebase";

// scoped imports

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

	const page = template(doc.data() as Project);

	// console.log(doc.data(), page);

	// for this path, we defined a datatype in config.
	// map datatype to template 
	// define static template in source code (admin folde)
	// or store template in the database

	// get template assigned for this path
	

	return jsonResponse(200, page);
};
