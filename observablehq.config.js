// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Regression",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  // pages: [
  //   {
  //     name: "Examples",
  //     pages: [
  //       {name: "Dashboard", path: "/example-dashboard"},
  //       {name: "Report", path: "/example-report"}
  //     ]
  //   }
  // ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: () =>
    `<link rel="icon" href="/cropped-favicon-32x32.png" type="image/png" sizes="32x32">`,

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  // theme: "dark", // try "light", "dark", "slate", etc.
  footer: () =>
    `EarthScope Consortium operates the NSF Geodetic Facility for the Advancement of Geoscience (GAGE) and NSF Seismological Facility for the Advancement of Geoscience (SAGE). Any opinions, findings and conclusions, or recommendations expressed in this material do not necessarily reflect the views of the U.S. National Science Foundation.`, // what to show in the footer (HTML)
  sidebar: false, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // cleanUrls: true, // drop .html from URLs
  header:
    () => `<div style="display: flex; align-items: center; gap: 0.5rem; margin: -1.5rem -2rem 2rem -2rem; padding: 0.5rem 2rem; border-bottom: solid 1px var(--theme-foreground-faintest); font: 500 16px var(--sans-serif);">
  <div style="display: flex; flex-grow: 1; justify-content: space-between; align-items: baseline;">
    <a href="https://observablehq.com/framework/" target="_self" rel="">
      <img src="EarthScope_logo_color.png" height="96px">
    </a>
    <span style="display: flex; align-items: baseline; gap: 0.5rem; font-size: 14px;">
      <a target="_blank" href="https://observablehq.com/@earthscope"><span>More Notebooks →</span></a>
    </span>
  </div>
</div>`,
};
