// Renders the G'Lash flyers (feed 1080x1350 and story 1080x1920) at 2x.
// Usage: node brand/flyers/make.cjs   (needs Playwright with Chromium)
const {chromium} = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const fs = require('fs'), path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const OUT = __dirname;
const logo = fs.readFileSync(path.join(ROOT, 'assets/logo.svg'), 'utf8');
const sym = id => {
  const m = logo.match(new RegExp(`<symbol id="${id}" viewBox="([^"]+)"><path fill="currentColor" d="([^"]+)"`));
  return {vb: m[1], d: m[2]};
};
const MARK = sym('mark'), WORD = sym('wordmark');
const img = f => 'data:image/webp;base64,' + fs.readFileSync(path.join(ROOT, 'img', f + '.webp')).toString('base64');
const svg = (s, c, w) => `<svg viewBox="${s.vb}" style="width:${w}px;display:block"><path fill="${c}" d="${s.d}"/></svg>`;
const lockup = (mc, wc) => `<div style="display:flex;align-items:center;gap:14px">${svg(MARK, mc, 34)}${svg(WORD, wc, 128)}</div>`;
const wa = c => `<svg viewBox="0 0 24 24" style="width:26px;height:26px;flex:none"><path fill="${c}" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.6.94.96-3.5-.23-.36A9.46 9.46 0 0 1 2.53 12C2.53 6.76 6.8 2.5 12.05 2.5c2.54 0 4.93.99 6.72 2.79a9.43 9.43 0 0 1 2.78 6.72c0 5.24-4.27 9.5-9.5 9.5zm8.09-17.59A11.36 11.36 0 0 0 12.05.5C5.73.5.6 5.63.6 11.95c0 2.02.53 3.99 1.53 5.72L.5 23.5l5.97-1.57a11.4 11.4 0 0 0 5.47 1.4h.01c6.31 0 11.45-5.14 11.45-11.45 0-3.06-1.19-5.94-3.36-8.1z"/></svg>`;

const INK = '#15100f', BLUSH = '#e8b4bc', CREAM = '#f7f1ec', ROSE = '#b05f6e', MUTE = '#cbbcb6';
const pill = `<div style="display:flex;align-items:center;gap:14px;background:${BLUSH};color:${INK};padding:18px 30px;border-radius:999px;font-weight:800;font-size:24px">${wa(INK)}054 822 2377</div>`;
const base = H => `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}body{width:1080px;height:${H}px;overflow:hidden;position:relative;font-family:Manrope,sans-serif;-webkit-font-smoothing:antialiased}
.serif{font-family:'Cormorant Garamond',serif}.cap{font-size:15px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}</style>`;
const top = (mc, wc, label, lc) => `<div style="position:absolute;left:64px;right:64px;top:${'$TOP'};display:flex;justify-content:space-between;align-items:center">${lockup(mc, wc)}<span class="cap" style="font-size:13px;color:${lc}">${label}</span></div>`;

function brand(H) {
  const story = H > 1400, photoH = story ? 1150 : 1000, T = story ? 110 : 60;
  return `${base(H)}<body style="background:${INK};color:${CREAM}">
<div style="position:absolute;inset:0;background:url(${img('hero-1')}) center/cover;filter:blur(40px) brightness(.4) saturate(1.2);transform:scale(1.2)"></div>
<img src="${img('hero-1')}" style="position:absolute;right:0;top:${story ? 120 : 0}px;height:${photoH}px;width:auto;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 28%),linear-gradient(180deg,${story ? 'transparent 0,#000 12%,' : ''}#000 70%,transparent 100%);-webkit-mask-composite:source-in">
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(21,16,15,.55) 0,rgba(21,16,15,0) 14%,rgba(21,16,15,0) ${story ? 50 : 48}%,rgba(21,16,15,.85) ${story ? 68 : 70}%,${INK} 92%)"></div>
${top(BLUSH, CREAM, '× Braidhaus', CREAM).replace('$TOP', T + 'px')}
<div style="position:absolute;left:64px;right:64px;bottom:${story ? 150 : 64}px">
 <div class="cap" style="color:${BLUSH}">American House · East Legon</div>
 <h1 class="serif" style="font-weight:600;font-size:118px;line-height:.95;letter-spacing:-2px;margin:22px 0 26px">Hair, lashes<br>&amp; nails, done<br>with <i style="font-weight:500;color:${BLUSH}">love.</i></h1>
 <p style="font-size:24px;line-height:1.45;color:#e2d6d1;max-width:820px">Braids · Lash extensions · Nails · Brows · Tattoos · Piercings · Wig bundles</p>
 <div style="display:flex;align-items:center;justify-content:space-between;margin-top:40px;padding-top:32px;border-top:1px solid rgba(247,241,236,.2)">
  ${pill}
  <div style="text-align:right;font-size:19px;line-height:1.5;color:${MUTE}"><b style="color:${CREAM};font-weight:700">Mon–Sat</b> 9am–8pm · <b style="color:${CREAM};font-weight:700">Sun</b> 1pm–8pm<br>Opposite Compu Ghana</div>
 </div>
</div></body>`;
}

function menu(H) {
  const story = H > 1400, T = story ? 110 : 60, pad = story ? 18 : 13;
  const row = n => `<div style="padding:${pad}px 0;border-bottom:1px solid #ddd0c8"><span class="serif" style="font-size:${story ? 40 : 36}px;font-weight:600">${n}</span></div>`;
  const col = (t, items) => `<div><div class="cap" style="color:${ROSE};padding-bottom:14px;border-bottom:2px solid ${INK}">${t}</div>${items.map(row).join('')}</div>`;
  return `${base(H)}<body style="background:#f4ede7;color:${INK}">
${top(ROSE, INK, 'East Legon, Accra', ROSE).replace('$TOP', T + 'px')}
<h1 class="serif" style="position:absolute;left:60px;top:${story ? 220 : 150}px;font-size:178px;line-height:.9;font-weight:600;letter-spacing:-3px">The <i style="font-weight:500;color:${ROSE}">menu.</i></h1>
<div style="position:absolute;left:64px;right:64px;top:${story ? 470 : 370}px;display:grid;grid-template-columns:1fr 1fr;gap:56px">
 ${col("G'Lash", ['Lash extensions', 'Brows', 'Nails', 'Tattoos', 'Piercings'])}
 ${col('Braidhaus', ['Knotless braids', 'Fulani braids', 'Cornrows &amp; stitch', 'Boho braids', 'Sleek ponytails', 'Curling &amp; straightening', 'Wig bundles'])}
</div>
<div style="position:absolute;left:64px;right:64px;top:${story ? 1160 : 930}px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
 ${['cornrows-profile', 'sleek-pony', 'curls-joy'].map(f => `<div style="height:${story ? 380 : 230}px;border-radius:14px;background:url(${img(f)}) center 30%/cover"></div>`).join('')}
</div>
<div style="position:absolute;left:0;right:0;bottom:0;height:${story ? 230 : 150}px;background:${INK};color:${CREAM};display:flex;align-items:${story ? 'flex-start' : 'center'};justify-content:space-between;padding:${story ? '44px' : '0'} 64px 0">
 <div style="font-size:20px;line-height:1.45;color:${MUTE}">Prices depend on the look.<br><b style="color:${CREAM}">Send us a photo for a quote.</b></div>
 ${pill}
</div></body>`;
}

function lookbook(H) {
  const story = H > 1400, T = story ? 110 : 60;
  const tiles = [['fulani-braids', 'Fulani braids'], ['knotless-classic', 'Knotless'], ['curls-honey', 'Honey curls'], ['kinky-twists', 'Kinky twists'], ['boho-braids', 'Boho braids'], ['sleek-pony-back', 'Sleek pony']];
  const cols = story ? 2 : 3, tileH = story ? 380 : 340;
  return `${base(H)}<body style="background:${INK};color:${CREAM}">
${top(BLUSH, CREAM, '@braidhaus233', BLUSH).replace('$TOP', T + 'px')}
<h1 class="serif" style="position:absolute;left:60px;top:${story ? 200 : 140}px;font-size:128px;line-height:.92;font-weight:600;letter-spacing:-2px">Fresh out<br><i style="font-weight:500;color:${BLUSH}">the chair.</i></h1>
<div style="position:absolute;left:64px;right:64px;top:${story ? 480 : 420}px;display:grid;grid-template-columns:repeat(${cols},1fr);gap:14px">
 ${tiles.map(([f, n]) => `<div style="position:relative;height:${tileH}px;border-radius:14px;overflow:hidden;background:url(${img(f)}) center 28%/cover"><span style="position:absolute;left:12px;bottom:12px;background:rgba(21,16,15,.72);padding:7px 14px;border-radius:999px;font-size:15px;font-weight:700">${n}</span></div>`).join('')}
</div>
<div style="position:absolute;left:64px;right:64px;bottom:${story ? 130 : 64}px;display:flex;justify-content:space-between;align-items:flex-end">
 <div><div class="serif" style="font-size:46px;font-weight:600;line-height:1">Your look is next.</div>
  <div style="font-size:19px;color:${MUTE};margin-top:12px">American House, East Legon · Opp. Compu Ghana<br>Mon–Sat 9am–8pm · Sun 1pm–8pm</div></div>
 ${pill}
</div></body>`;
}

(async () => {
  const b = await chromium.launch();
  const jobs = [];
  for (const [name, fn] of [['1-brand', brand], ['2-menu', menu], ['3-lookbook', lookbook]]) {
    jobs.push([`glash-flyer-${name}.png`, fn(1350), 1350]);
    jobs.push([`glash-story-${name}.png`, fn(1920), 1920]);
  }
  for (const [file, html, H] of jobs) {
    const p = await b.newPage({viewport: {width: 1080, height: H}, deviceScaleFactor: 2});
    await p.setContent(html, {waitUntil: 'networkidle'});
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({path: path.join(OUT, file)});
    await p.close();
    console.log(file);
  }
  await b.close();
})();
