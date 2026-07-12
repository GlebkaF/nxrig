import fs from "node:fs";
import path from "node:path";

const outputDirectory = path.resolve("out");

if (!fs.existsSync(outputDirectory)) {
  throw new Error("Missing out directory. Run npm run build before seo:check.");
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

const htmlFiles = walk(outputDirectory).filter((file) => file.endsWith(".html"));
const failures = [];
const canonicalOwners = new Map();

function count(html, expression) {
  return html.match(expression)?.length ?? 0;
}

function routeFor(file) {
  const relativePath = path.relative(outputDirectory, file);
  if (relativePath === "index.html") return "/";
  if (relativePath.endsWith(`${path.sep}index.html`)) {
    return `/${relativePath.slice(0, -"index.html".length).replaceAll(path.sep, "/")}`;
  }
  return `/${relativePath.replaceAll(path.sep, "/")}`;
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFor(file);
  const isAdmin = route.startsWith("/admin/") || route === "/admin/";
  const isPrivate = isAdmin || route === "/favorites/";
  const isErrorPage = route === "/404.html" || route === "/404/";
  const isPublicPage = !isPrivate && !isErrorPage;

  if (isPrivate && !/<meta name="robots" content="[^"]*noindex/.test(html)) {
    failures.push(`${route}: private page is missing noindex`);
  }

  if (!isPublicPage) continue;

  if (count(html, /<h1(?:\s|>)/g) !== 1) {
    failures.push(`${route}: expected exactly one h1`);
  }
  if (!/<title>[^<]+<\/title>/.test(html)) {
    failures.push(`${route}: missing title`);
  }
  if (!/<meta name="description" content="[^"]+"/.test(html)) {
    failures.push(`${route}: missing meta description`);
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) {
    failures.push(`${route}: missing canonical`);
  } else {
    const existingRoute = canonicalOwners.get(canonical);
    if (existingRoute && existingRoute !== route) {
      failures.push(`${route}: canonical is also used by ${existingRoute}`);
    }
    canonicalOwners.set(canonical, route);
  }

  const presetSegments = route.match(/^\/preset\/([^/]+)\/([^/]+)\/$/);
  const artistSegments = route.match(/^\/preset\/([^/]+)\/$/);
  const isBlogPost = /^\/blog\/[^/]+\/$/.test(route);

  if (presetSegments) {
    if (!html.includes('"@type":"CreativeWork"')) {
      failures.push(`${route}: missing CreativeWork structured data`);
    }
    if (!html.includes('"@type":"BreadcrumbList"')) {
      failures.push(`${route}: missing BreadcrumbList structured data`);
    }
  } else if (artistSegments) {
    if (!html.includes('"@type":"CollectionPage"')) {
      failures.push(`${route}: missing CollectionPage structured data`);
    }
  } else if (isBlogPost && !html.includes('"@type":"BlogPosting"')) {
    failures.push(`${route}: missing BlogPosting structured data`);
  }
}

if (failures.length > 0) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `SEO audit passed for ${htmlFiles.length} HTML files and ${canonicalOwners.size} public canonicals.`,
  );
}
