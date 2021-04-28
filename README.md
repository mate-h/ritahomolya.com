# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Svelte apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `node build`. To use a different adapter, add it to the `devDependencies` in `package.json` making sure to specify the version as `next` and update your `svelte.config.cjs` to [specify your chosen adapter](https://kit.svelte.dev/docs#configuration-adapter). The following official adapters are available:

- [@sveltejs/adapter-node](https://github.com/sveltejs/kit/tree/master/packages/adapter-node)
- [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)
- [@sveltejs/adapter-netlify](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify)
- [@sveltejs/adapter-vercel](https://github.com/sveltejs/kit/tree/master/packages/adapter-vercel)
- ...more soon

[See the adapter documentation for more detail](https://kit.svelte.dev/docs#adapters)

# Notes
I have a list of available routes in code.
I have a list of available blocks that are implemented as components.
I have a list of available data types implemented in code.
Assemble a Page for each route from blocks in the admin panel.
If a route is dynamic (includes a parameter):
- Define source data (firebase)
- Define mapping from source data shape to Page
If you want to add a page, it will need to be added to the source code, aka pull request. 
This step can be automated by using default page templates.

For creating new data types, the API will need to be able to handle that.
Which tag type to use? Infer semantic data from the content.
Page content is rendered on the server side, 
sometimes pre-rendered and static for a given route.
Page loads incrementally, first the document, then assets (CSS, fonts, scripts, images, etc.), 
for that reason, all versions need to be working and visually correct.
That is called incremental inmprovement.
General semantic structure of a html document
html```
<html>
  <head>
    <title>Title</title>
    Metadata for importing assets - Svelte Kit to .vercel_build_output
    Metadata for description, preview image, favicon
      -> Defined in $layout.svelte
  </head>
  <body>
    <main>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>                             Navigation items, also called Breadcrumb which contains backlinks
      <section id="section-1">           Hashbang Navigation
        <hr />                           Horizontal or vertical divider
        <br />                           Line break
        <h1>Title</h1>                   Typography: headline 1-6
        <span>Subtitle</span>            Typography: single line
        <p>Body text and content</p>     Typography: multi line
        <form>
          <input type="email" name="email"/> 
          <button type="submit">
        </form>                          Form, defines a data structure
        <a href="/img-1.png">           Link
        <i> <b> <u>                      Italic, Bold, Underline
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>                               Unordered list
        <img 
          id="img-1"
          alt="Accessible description"
          src="/img-1.png" />               Image
        <label>Readable description</label> Image Caption
        <div>                             General purpose element
        
        <table>              To display tabular data, use a form for pagination
        <svelte:component /> To display hierarchical data (or by using javascript functions)

          W3C has an extensive collection of tags. Ideally these are targeted at search engines.

      </section>
    </main>
  </body>
</html>

### Example for projects module
Modules are hierarchical, just like a filesystem  
All modules inherit from the root module, and data is stored and mutated in stores  

Admin interface: sitemap, api docs, template and content editor

Name: root  
Datatype: {projects: Project[], user: User}  
Routes: "/", "/contact"  

Name: project  
Plural: projects  
Datatype: {avatar} & Page  
Routes: "/projects", "/projects/[id]", "/api/projects/[id]"  
