import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(repo, 'ksword-website');
const sourceArg = process.argv.indexOf('--source-root');
const source = sourceArg >= 0 ? path.resolve(process.argv[sourceArg + 1]) : null;
const errors = [];
const assert = (ok, message) => { if (!ok) errors.push(message); };
function filesIn(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(dir, entry.name);
        return entry.isDirectory() ? filesIn(file) : [file];
    });
}
const files = filesIn(site);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const read = file => fs.readFileSync(file, 'utf8');
for (const file of htmlFiles) {
    const html = read(file);
    const label = path.relative(site, file);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert(new Set(ids).size === ids.length, 'Duplicate IDs: ' + label);
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
        const href = match[1].replaceAll('&amp;', '&');
        if (/^(?:https?:|data:|mailto:|tel:|javascript:|\/\/)/i.test(href)) continue;
        const parsed = new URL(href, 'http://preview.local/' + label.replaceAll('\\', '/'));
        const target = path.join(site, decodeURIComponent(parsed.pathname));
        assert(target.startsWith(site + path.sep) && fs.existsSync(target), `Broken local target in ${label}: ${href}`);
        if (parsed.hash && fs.existsSync(target) && target.endsWith('.html')) {
            const targetIds = [...read(target).matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
            // learn/ document anchors are generated at runtime from Markdown.
            if (!parsed.searchParams.has('doc')) assert(targetIds.includes(decodeURIComponent(parsed.hash.slice(1))), `Broken anchor in ${label}: ${href}`);
        }
        if (source && parsed.searchParams.has('doc')) assert(fs.existsSync(path.join(source, parsed.searchParams.get('doc'))), `Missing source doc in ${label}: ${parsed.searchParams.get('doc')}`);
    }
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (/\bsrc=|application\//i.test(match[1]) || !match[2].trim()) continue;
        try { new vm.Script(match[2], { filename: label }); }
        catch (error) { errors.push(error.message); }
    }
}
const jsFiles = files.filter(file => file.endsWith('.js'));
for (const file of jsFiles) {
    try { new vm.Script(read(file), { filename: path.relative(site, file) }); }
    catch (error) { errors.push(error.message); }
}
const catalog = read(path.join(site, 'learn/learn.js'));
const paths = [...catalog.matchAll(/(?:\bp:\s*|"p":\s*)['"]([^'"]+)['"]/g)].map(m => m[1]);
assert(new Set(paths).size === paths.length, 'Duplicate document catalog paths');
if (source) for (const doc of paths) assert(fs.existsSync(path.join(source, doc)), 'Missing catalog document: ' + doc);
for (const match of catalog.matchAll(/\bsite:\s*['"]([^'"]+\.html)['"]/g)) {
    assert(fs.existsSync(path.resolve(site, 'learn', match[1])), 'Missing catalog site page: ' + match[1]);
}
// Maintenance metadata stays outside the product copy.
const snapshot = JSON.parse(read(path.join(site, 'site-info.json')));
const reviewedOn = snapshot.contentDate;
const snapshotSha = snapshot.sourceRevision;
assert(/^\d{4}-\d{2}-\d{2}$/.test(reviewedOn) && /^[a-f0-9]{40}$/.test(snapshotSha), 'Invalid source metadata');
if (source && snapshotSha) {
    try {
        const committed = new Set(execFileSync('git', ['-c', 'core.quotepath=false', '-C', source, 'ls-tree', '-r', '--name-only', snapshotSha], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }).trim().split(/\r?\n/));
        for (const doc of paths) assert(committed.has(doc), 'Catalog document absent from reviewed commit: ' + doc);
    } catch (error) { errors.push('Cannot verify reviewed source tree: ' + error.message); }
}
// A stale cached script can overwrite an otherwise current static page.
const assetVersion = snapshot.assetVersion;
for (const file of htmlFiles) {
    for (const match of read(file).matchAll(/\b(?:href|src)="([^"]+)"/g)) {
        const resource = new URL(match[1], 'http://preview.local/');
        if (['styles.css', 'script.js', 'learn.js', 'learn.css', 'hvm.css', 'redirect.js'].some(asset => resource.pathname.endsWith('/' + asset))) {
            assert(resource.searchParams.get('v') === assetVersion, 'Stale asset version in ' + path.relative(site, file) + ': ' + match[1]);
        }
    }
}
assert(read(path.join(site, 'en/script.js')).includes('../script.js?v=' + assetVersion), 'Stale English runtime adapter version');
const guideIds = ['package', 'ce', 'memory', 'monitor', 'hvm', 'light', 'clipboard', 'compatibility', 'mcp', 'cli', 'reports-permissions', 'navigation', 'cks-research'];
for (const lang of ['', 'en/']) {
    const guide = read(path.join(site, lang, 'docs/index.html'));
    for (const id of guideIds) assert(guide.includes('id="' + id + '"'), `Missing ${lang || 'zh/'} guide section: ${id}`);

}
assert(!catalog.includes('KSwordDEV/Website'), 'Stale website repository in catalog');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${htmlFiles.length} HTML pages, ${jsFiles.length} scripts, ${paths.length} document targets, anchors and bilingual guide sections${source ? ' against source checkout' : ''}.`);
