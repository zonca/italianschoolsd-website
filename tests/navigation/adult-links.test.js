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
