import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createConnection } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { after, before, test } from "node:test";

const base = process.env.FLOYD_TEST_BASE_URL || "http://127.0.0.1:17453";
const canonical = process.env.NEXT_PUBLIC_SITE_URL || "https://www.floydslabs.com";
let server;
let serverLog = "";

before(async () => {
  if (process.env.FLOYD_TEST_BASE_URL) return;
  const inUse = await new Promise(resolve => {
    const socket = createConnection({ host: "127.0.0.1", port: 17453 });
    socket.once("connect", () => { socket.destroy(); resolve(true); });
    socket.once("error", () => resolve(false));
  });
  assert.equal(inUse, false, "Verification port 17453 is already in use; preserve that service.");
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "17453"], {
    cwd: process.cwd(), env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", value => { serverLog += value; });
  server.stderr.on("data", value => { serverLog += value; });
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    assert.equal(server.exitCode, null, serverLog);
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(2000) });
      if (response.status === 200) return;
    } catch { /* The process has not opened its listener yet. */ }
    await delay(150);
  }
  assert.fail(`Next.js did not become ready: ${serverLog}`);
});

after(async () => {
  if (!server || server.exitCode !== null) return;
  const exited = once(server, "exit");
  server.kill("SIGTERM");
  await Promise.race([exited, delay(5000)]);
  if (server.exitCode === null && server.signalCode === null) {
    server.kill("SIGKILL");
    await exited;
  }
});

test("renders the refreshed homepage and all sitemap routes", async () => {
  const homepage = await fetch(base);
  const html = await homepage.text();
  assert.equal(homepage.status, 200);
  assert.match(html, /Useful technology for/);
  assert.match(html, /Latest from the Garage/);
  assert.match(html, /morning-bench-800\.webp/);
  assert.match(html, /router-watch-800\.webp/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
  const sitemap = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, 34);
  for (const url of urls) {
    assert.ok(url.startsWith(canonical), url);
    const path = new URL(url).pathname;
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    const page = await response.text();
    assert.equal((page.match(/<h1\b/g) || []).length, 1, path);
    assert.equal((page.match(/<main\b/g) || []).length, 1, `One main landmark: ${path}`);
  }
});

test("exposes filter selection and preserves verified article attribution", async () => {
  const tools = await (await fetch(`${base}/tools`)).text();
  assert.equal((tools.match(/aria-pressed="true"/g) || []).length, 1);
  assert.equal((tools.match(/aria-pressed="false"/g) || []).length, 4);
  const origin = await (await fetch(`${base}/blog/the-garage-chronicles-origins-edition`)).text();
  assert.match(origin, /<title>The Garage Chronicles: Origins Edition \| Floyd Labs<\/title>/);
  assert.match(origin, /property="og:type" content="article"/);
  assert.match(origin, /name="author" content="Douglas Talley"/);
  const suite = await (await fetch(`${base}/blog/the-suite`)).text();
  assert.match(suite, /name="author" content="James Bravo"/);
  assert.match(suite, /datetime="2026-02-20"/i);
  const undated = await (await fetch(`${base}/blog/the-garage-band-symphony`)).text();
  assert.doesNotMatch(undated, /name="author"|property="article:published_time"/);
  const docs = await (await fetch(`${base}/api-docs`)).text();
  assert.match(docs, /public aggregate usage statistics/);
  const connect = await (await fetch(`${base}/connect`)).text();
  assert.doesNotMatch(connect, /@anthropics\/mcp-proxy/);
  assert.match(connect, /https:\/\/www\.floydslabs\.com\/api\/mcp/);
});

test("serves nine real WebP scene variants", async () => {
  for (const scene of ["morning-bench", "electronics-workbench", "router-watch"]) {
    for (const width of [480, 800, 1200]) {
      const response = await fetch(`${base}/brand/scenes/${scene}-${width}.webp`);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") || "", /^image\/webp/);
      const bytes = Buffer.from(await response.arrayBuffer());
      assert.equal(bytes.subarray(0, 4).toString(), "RIFF");
      assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
      assert.ok(bytes.length > 1000 && bytes.length < 150000);
    }
  }
});

test("retains five real product downloads and truthful release details", async () => {
  const response = await fetch(`${base}/open-source`);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const asset of [
    "CrystalMaze/releases/download/v0.1.0/crystalmaze-0.1.0.tgz",
    "CLI-TOOLS/releases/download/v1.0.0/floyd-cli-tools-1.0.0.tar.gz",
    "TerminalOne/releases/download/v1.0.1/terminalone-1.0.1.tgz",
    "wsdash/releases/download/v0.2.0/wsdash-0.2.0-py3-none-any.whl",
    "pebkacv2/releases/download/v1.1.0/pebkac-1.1.0-macos-arm64.tar.gz",
  ]) assert.ok(html.includes(`https://github.com/CaptainPhantasy/${asset}`), asset);
  assert.match(html, /TerminalOne is MIT open source/);
  assert.match(html, /license not specified/);
  assert.match(html, /standalone binary is unsigned/);
});

test("does not accept Sites identity headers as Vercel admin authentication", async () => {
  for (const path of ["/admin", "/admin/login", "/admin/blog", "/admin/api-keys"]) {
    const response = await fetch(`${base}${path}`, {
      redirect: "manual",
      headers: { "oai-authenticated-user-email": "untrusted@example.invalid" },
    });
    assert.equal(response.status, 307, path);
    assert.equal(response.headers.get("location"), `https://floydslabs.com${path}`, path);
  }
  const contact = await (await fetch(`${base}/contact`)).text();
  assert.match(contact, /does not write to the Floyd Labs production database/);
});

test("uses this deployment's canonical URL and keeps previews out of search", async () => {
  const response = await fetch(`${base}/robots.txt`);
  assert.equal(response.status, 200);
  const robots = await response.text();
  assert.ok(robots.includes(`Sitemap: ${canonical}/sitemap.xml`));
  if (process.env.VERCEL_ENV === "preview") assert.match(robots, /Disallow: \/\s/);
  else assert.match(robots, /Disallow: \/admin/);
  const html = await (await fetch(base)).text();
  assert.ok(html.includes(`${canonical}/og.png`));
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${canonical}"`));
  assert.doesNotMatch(html, /floyd-labs-proving-ground\.captainphantasy\.chatgpt\.site/);
  assert.doesNotMatch(html, /floyd-labs-proving-ground\.vercel\.app/);
});

test("never publishes the SSO-gated preview alias as the canonical host", async () => {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes(`${canonical}/blog/`));
  assert.doesNotMatch(sitemap, /floyd-labs-proving-ground\.vercel\.app/);
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.doesNotMatch(robots, /floyd-labs-proving-ground\.vercel\.app/);
});

test("gives every route its own canonical and Open Graph URL", async () => {
  for (const path of ["/about", "/tools", "/blog", "/connect", "/api-docs"]) {
    const html = await (await fetch(`${base}${path}`)).text();
    assert.ok(
      html.includes(`<link rel="canonical" href="${canonical}${path}"`),
      `canonical must be this route, not the origin: ${path}`,
    );
    assert.ok(
      html.includes(`<meta property="og:url" content="${canonical}${path}"`),
      `og:url must be this route, not the origin: ${path}`,
    );
  }
});
