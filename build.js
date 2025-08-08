const fs = require('fs');
const path = require('path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { presets } = require('./src/presets');
const { Layout, IndexPage, PresetPage } = require('./src/templates');

const buildDir = path.join(__dirname, 'dist');
fs.rmSync(buildDir, { recursive: true, force: true });
fs.mkdirSync(buildDir, { recursive: true });

// copy assets
fs.cpSync(path.join(__dirname, 'presets'), path.join(buildDir, 'presets'), { recursive: true });
fs.cpSync(path.join(__dirname, 'qrcodes'), path.join(buildDir, 'qrcodes'), { recursive: true });

const filterScript = `
const input=document.getElementById('preset-filter');
const cards=document.querySelectorAll('.preset.card');
input.addEventListener('input',()=>{
  const q=input.value.toLowerCase();
  cards.forEach(card=>{
    card.style.display=card.textContent.toLowerCase().includes(q)?'':'none';
  });
});
`;

const indexHtml =
  '<!DOCTYPE html>' +
  renderToStaticMarkup(
    React.createElement(
      Layout,
      {
        title: 'Must-Have Presets for NUX Mighty Plug',
        description:
          'Download essential presets for the NUX Mighty Plug headphone amplifier.',
        stylesPath: 'styles.css',
        script: filterScript,
      },
      React.createElement(IndexPage, { presets })
    )
  );
fs.writeFileSync(path.join(buildDir, 'index.html'), indexHtml);

const presetDir = path.join(buildDir, 'preset');
fs.mkdirSync(presetDir, { recursive: true });

presets.forEach((p) => {
  const presetData = JSON.parse(fs.readFileSync(path.join(__dirname, p.file), 'utf8'));
  const html =
    '<!DOCTYPE html>' +
    renderToStaticMarkup(
      React.createElement(
        Layout,
        {
          title: `${p.name} \u2013 Preset Details`,
          description: p.description,
          stylesPath: '../styles.css',
        },
        React.createElement(PresetPage, { preset: p, chain: presetData.chain })
      )
    );
  fs.writeFileSync(path.join(presetDir, `${p.id}.html`), html);
});
