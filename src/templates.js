const React = require('react');

function Layout({ title, description, stylesPath, children, script }) {
  return React.createElement(
    'html',
    { lang: 'en' },
    React.createElement('head', null, [
      React.createElement('meta', { charSet: 'UTF-8' }),
      React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      React.createElement('title', null, title),
      description ? React.createElement('meta', { name: 'description', content: description }) : null,
      React.createElement('link', { rel: 'stylesheet', href: stylesPath }),
    ]),
    React.createElement(
      'body',
      { className: 'font-sans' },
      children,
      script ? React.createElement('script', { dangerouslySetInnerHTML: { __html: script } }) : null
    )
  );
}

function IndexPage({ presets }) {
  return React.createElement(
    'main',
    { className: 'max-w-3xl mx-auto p-4 space-y-4' },
    [
      React.createElement('h1', { className: 'text-3xl font-bold' }, 'Must-Have Presets for NUX Mighty Plug'),
      React.createElement(
        'p',
        null,
        'We\u2019ve spent hours tweaking tones so you don\u2019t have to. Below you\u2019ll find carefully balanced presets for the NUX Mighty Plug and Mighty Plug Pro. Each card includes a short description, musical references and a QR code that contains the full preset as a JSON definition.'
      ),
      React.createElement('input', {
        id: 'preset-filter',
        type: 'text',
        placeholder: 'Search presets...',
        className: 'border p-2 w-full',
      }),
      React.createElement(
        'div',
        { id: 'preset-list', className: 'grid gap-4 md:grid-cols-2' },
        presets.map((p) =>
          React.createElement(
            'div',
            { key: p.id, className: 'preset card border p-4 rounded' },
            [
              React.createElement('h3', { className: 'text-xl font-semibold' }, p.name),
              React.createElement('p', { className: 'mb-2' }, p.description),
              React.createElement('p', { className: 'font-semibold' }, 'References:'),
              React.createElement(
                'ul',
                { className: 'refs list-disc list-inside mb-2' },
                p.references.map((r) => React.createElement('li', { key: r }, r))
              ),
              React.createElement(
                'a',
                { className: 'text-blue-600 underline mr-2', href: p.file, download: true },
                'Download preset'
              ),
              React.createElement(
                'a',
                { className: 'text-blue-600 underline', href: `preset/${p.id}.html` },
                'View settings'
              ),
              React.createElement('img', { className: 'mt-2', src: p.qr, alt: `QR code for ${p.name} preset` }),
            ]
          )
        )
      ),
    ]
  );
}

function PresetPage({ preset, chain }) {
  return React.createElement(
    'main',
    { className: 'max-w-3xl mx-auto p-4 space-y-4' },
    [
      React.createElement('h1', { className: 'text-3xl font-bold' }, preset.name),
      React.createElement('p', null, preset.description),
      React.createElement('p', { className: 'font-semibold' }, 'References:'),
      React.createElement(
        'ul',
        { className: 'refs list-disc list-inside mb-4' },
        preset.references.map((r) => React.createElement('li', { key: r }, r))
      ),
      React.createElement(
        'div',
        { className: 'card border p-4 rounded' },
        [
          React.createElement('h2', { className: 'text-2xl font-bold mb-2' }, 'Signal Chain'),
          ...chain.map((slot) =>
            React.createElement(
              'div',
              { key: slot.slot, className: 'mb-2' },
              [
                React.createElement('h3', { className: 'font-semibold' }, `${slot.slot} \u2013 ${slot.model}`),
                React.createElement(
                  'ul',
                  { className: 'list-disc list-inside ml-4' },
                  Object.entries(slot.params).map(([k, v]) =>
                    React.createElement('li', { key: k }, `${k}: ${v}`)
                  )
                ),
              ]
            )
          ),
        ]
      ),
      React.createElement(
        'a',
        { className: 'text-blue-600 underline mr-2', href: `../${preset.file}`, download: true },
        'Download preset'
      ),
      React.createElement('img', { className: 'mt-2', src: `../${preset.qr}`, alt: `QR code for ${preset.name} preset` }),
    ]
  );
}

module.exports = { Layout, IndexPage, PresetPage };
