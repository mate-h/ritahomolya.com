import type { Block, Page } from "src/routes/api/pages/[id]";
import type { Project } from ".";

// date, title are bound to Project type
// Toggle field whether it's templated or unique to the page
const main = (p: Project): Page => ({
  title: p.title,
  path: p.title,
  content: [
    {
      type: 'text',
      typography: 'overline',
      node: p.date
    },
    {
      type: 'text',
      typography: 'headline6',
      node: p.title
    },
    {
      type: 'text',
      node: p.description
    },
    ...p.media.map<Block>(m => ({
      type: 'image',
      src: '/projects' + m,
      alt: p.title,
      class: 'mx-auto'
    }))
  ]
})
export default main;

export const template = {
  path: '/projects',
  type: 'view',
  class: 'page',
  meta: {
    title: '${title} | Projects',
    description: '${description}',
    image: '${thumbnail}'
  },
  content: {
    date: {
      type: 'text',
      typography: 'overline',
      class: 'text-opacity-54',
      content: '${date}'
    },
    title: {
      type: 'text',
      typography: 'headline6',
      content: '${title}'
    }
  }
};
// fetch(`/api/templates/${id}`, {
//   method: 'POST',
//   body: JSON.stringify(template)
// });