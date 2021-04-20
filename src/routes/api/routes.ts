import { jsonResponse } from "$lib/api";
import type { RequestHandler } from "@sveltejs/kit";
import fs from "fs";

// returns a list of routes as a flattened hierarchy
export const get: RequestHandler = () => {
  // read folders and files recursively
  const dir = './src/routes';
  function recourse(dir: string): string[] {
    const arr: string[] = [];
    let result;
    try {
      result = fs.readdirSync(dir);
      result.forEach(r => {
        arr.push(...recourse(dir + '/' + r));
      })      
    }
    catch (e) {
      if (e.code === 'ENOTDIR') {
        const exists = fs.existsSync(dir);
        if (exists) {
          arr.push(dir);
        }
      }
    }
    return arr;
  }

  const pages = recourse(dir)
    .map(r => r.replace('./src/routes', ''))
    .filter(f => f.includes('.svelte'))
    .filter(r => !r.includes('$layout'))
    .map(r => r.replace('index.svelte', ''))
    .map(r => r.replace('.svelte', ''))
    .map(r => ({ url: r }))
    .map(o => {
      const u = o.url;
      if (u.includes('[') && u.includes(']')) {
        const params: string[] = u.split('[').filter(r => r.includes(']')).map(r => r.split(']')[0]);
        return {...o, params}
      }
      return o;
    });
	
  return jsonResponse(200, {pages});
};

