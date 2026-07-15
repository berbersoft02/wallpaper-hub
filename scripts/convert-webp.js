const sharp = require('sharp');
const path = require('path');

async function convert(input, output, quality) {
  await sharp(input)
    .webp({ quality })
    .toFile(output);
  const inStats = require('fs').statSync(input);
  const outStats = require('fs').statSync(output);
  console.log(`${path.basename(input)} -> ${path.basename(output)}: ${(inStats.size / 1024).toFixed(1)}KB -> ${(outStats.size / 1024).toFixed(1)}KB`);
}

(async () => {
  await convert('app/icon.jpg', 'app/icon.webp', 80);
  await convert('bar.PNG', 'bar.webp', 85);
})().catch(e => { console.error(e); process.exit(1); });
