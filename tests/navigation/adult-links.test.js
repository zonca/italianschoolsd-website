const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { JSDOM } = require('jsdom');

test('adult section links stay on their page when the document has a site-root base URL', () => {
  const routes = ['/adults/', ...['beginner', 'intermediate', 'advanced']
    .map((level) => `/news/2026/11/adult-${level}-classes-january-may-2027/`)];
  let checked = 0;
  for (const route of routes) {
    const html = fs.readFileSync(path.join(__dirname, '../../dist', route, 'index.html'), 'utf8');
    const document = new JSDOM(html, { url: `https://www.italianschoolsd.com${route}` }).window.document;
    assert.equal(new URL(document.baseURI).pathname, '/');
    const links = document.querySelectorAll('.adult-jump-links a, .session-billing-note a');
    assert.equal(links.length, route === '/adults/' ? 4 : 1);
    for (const link of links) {
      // Use the browser's resolved href, which accounts for <base>, rather
      // than resolving getAttribute('href') against the current page by hand.
      const destination = new URL(link.href);
      assert.equal(destination.pathname, route, link.textContent);
      assert.ok(document.getElementById(decodeURIComponent(destination.hash.slice(1))), link.href);
      checked += 1;
    }
  }
  assert.equal(checked, 7);
});

test('every internal link on the adult enrollment pages has a built destination and anchor', () => {
  const routes = ['/adults/', '/italian-classes-encinitas/',
    '/news/2026/11/adult-italian-classes-january-may-2027/',
    ...['beginner', 'intermediate', 'advanced']
      .map((level) => `/news/2026/11/adult-${level}-classes-january-may-2027/`)];
  const root = path.join(__dirname, '../../dist');
  const documents = new Map();
  function readDocument(route) {
    if (!documents.has(route)) {
      const filename = path.join(root, route, path.extname(route) ? '' : 'index.html');
      assert.ok(fs.existsSync(filename), `Missing built destination: ${route}`);
      documents.set(route, new JSDOM(fs.readFileSync(filename, 'utf8'), {
        url: `https://www.italianschoolsd.com${route}`,
      }).window.document);
    }
    return documents.get(route);
  }
  for (const route of routes) {
    for (const link of readDocument(route).querySelectorAll('a[href]')) {
      const destination = new URL(link.href);
      if (destination.origin !== 'https://www.italianschoolsd.com') continue;
      const target = readDocument(destination.pathname);
      if (destination.hash) {
        assert.ok(target.getElementById(decodeURIComponent(destination.hash.slice(1))),
          `${route}: ${link.textContent.trim()} points to missing ${link.href}`);
      }
    }
  }
});
