# Technical Specification: SEO Upgrade for “All Artists” Landing (nxrig.com)

## Goal

Transform the existing “All Artists” page into a rich, SEO‑optimized catalog that improves crawlability, internal linking, and user engagement while preserving current UI/UX.

---

## Scope

- Page: `/artists` (Next.js App Router)
- Read‑only; no backend mutations
- Data source: existing artist list with counts (server or static JSON)
- Out of scope: building new preset pages (already exist)

---

## Deliverables

1. Updated metadata (title, description, canonical, OG/Twitter).
2. H1 + 2–3 paragraph intro.
3. Artist list with SEO‑friendly anchors: “{{Artist}} presets ({{count}})”.
4. New sections: **Popular right now**, **New presets**, **Explore by genre**, **Request a patch**.
5. FAQ block (5 Q/A) + JSON‑LD `FAQPage`.
6. JSON‑LD `ItemList` for artists.
7. Optional breadcrumbs JSON‑LD if breadcrumbs exist in UI.
8. Performance + accessibility improvements (lazy loading, headings order, focus styles).
9. QA checklist and acceptance tests.

---

## Functional Requirements

### 1. Metadata

- **Title**: `Artist Presets for NUX Mighty Plug Pro & Mighty Space | nxrig`
- **Meta Description**: `Browse all artists and download free presets for NUX Mighty Plug Pro and Mighty Space. Recreate tones of Metallica, Nirvana, Radiohead, RHCP, and more.`
- **Canonical**: `https://nxrig.com/artists`
- **OpenGraph/Twitter**: mirror Title/Description; `twitter:card=summary_large_image`

**Acceptance**

- Meta tags present in rendered HTML
- Canonical equals absolute HTTPS URL
- Unique title/description vs. other pages

### 2. Heading & Intro Copy

- Replace page H1 with: `NUX Mighty Plug Pro Artist Presets — All Artists`
- Add two paragraphs under H1 (see copy block below)
- Ensure only one `<h1>` exists; subsequent sections use `<h2>`

**Acceptance**

- H1 present exactly once
- Intro appears above the artist list
- Copy matches “Content Blocks → Intro”

### 3. Artist List

- Render grid/columns as currently
- Each anchor text must follow: `{{Artist}} presets ({{count}})`
- URLs unchanged: `/artist/{{slug}}`
- Counts must match data source

**Acceptance**

- All anchors follow pattern
- Links resolve to existing pages
- No broken links in list

### 4. Additional Sections

- **Popular right now**: list 5 hardcoded examples with links (can be configured via array)
- **New presets**: short paragraph; may include links if available
- **Explore by genre**: 4 bullets (Metal/Grunge/Classic Rock/Alternative) with short descriptions
- **Request a patch**: paragraph with link to `/request`

**Acceptance**

- Sections rendered below artist list
- Headings use `<h2>`
- `/request` link present and focusable

### 5. FAQ

Questions/answers (exact text in “Content Blocks → FAQ”).

- Display as expandable list (`<details><summary>` or component)
- Add `FAQPage` JSON‑LD (see “Structured Data”)

**Acceptance**

- All 5 Q/A visible and keyboard accessible
- JSON‑LD valid via Structured Data testing

### 6. Structured Data (JSON‑LD)

- **ItemList** describing the artists on the page
  - `numberOfItems = artists.length`
  - `itemListElement` entries with `position` and item `{ "@type": "MusicGroup", "name", "url" }`
- **FAQPage** for the FAQ above

**Acceptance**

- Two `<script type="application/ld+json">` tags present
- JSON validates (no trailing commas, valid schema.org types)

### 7. Accessibility

- Logical heading order (H1 → H2)
- Focus visible on links
- Links use meaningful text (no “click here”)
- Color contrast at least WCAG AA
- Landmarks used (`<main>`, optional `<nav>` for A‑Z future work)

**Acceptance**

- Keyboard navigation reaches all interactive items
- Lighthouse a11y score not degraded relative to baseline

### 8. Performance

- Avoid client‑side effect bundles for static content
- Defer JSON‑LD via `<Script>` (Next.js) which inlines safely
- Lazy‑load any images/illustrations (if added later)
- Keep list under ~120 links on page

**Acceptance**

- No hydration warnings
- No blocking third‑party scripts added
- LCP element remains text (H1) or primary content

### 9. Analytics (optional if GA already installed)

- Fire a page_view with page path `/artists`
- Track clicks on:
  - artist link (`event: 'artist_click', artist, count`)
  - request patch CTA (`event: 'request_patch_click'`)

**Acceptance**

- Events visible in analytics debug view (if enabled)

---

## Non‑Functional Requirements

- Framework: Next.js App Router (TypeScript)
- Styling: keep existing design (Tailwind ok)
- i18n: English copy only on this page for now
- SEO: Noindex must **not** be present

---

## Content Blocks (Exact Copy)

### Intro (2 paragraphs)

> Find artist-inspired guitar tones for **NUX Mighty Plug Pro** and **Mighty Space**. Each preset is crafted to get you close to the signature sound—rhythm and lead variants, sensible gain levels, IR/cab choices, and effect chains that just work.
>
> Open an artist page to see song-by-song patches, quick setup notes, and pickup tips. Import via **Mighty Editor** (desktop) or **MightyAmp** (mobile) using a `.mspatch` file or a QR code. All downloads are free.

### Section: Popular right now

- Metallica — _Master of Puppets_ (rhythm/lead)
- Nirvana — _Smells Like Teen Spirit_
- Red Hot Chili Peppers — _Californication_
- Led Zeppelin — _Whole Lotta Love_
- Guns N’ Roses — _Sweet Child O’ Mine_

### Section: New presets

> Freshly added artist tones for NUX Mighty Plug Pro & Mighty Space. Check them out and tell us what to add next.

### Section: Explore by genre

- **Metal:** tight high-gain rhythms, palm-mutes, modern IRs.
- **Grunge:** gritty mids, moderate gain, roomy reverbs.
- **Classic Rock:** crunchy amps, vintage cabs, light drive.
- **Alternative:** clean/edge-of-breakup, chorus/mod textures.

### Section: Request a patch

> Can’t find the tone you need? **Request a patch** — we’ll add it in a few days and email you when it’s ready.

### FAQ (5)

1. **How do I install a preset?**  
   Download the `.mspatch` file or scan the QR. Import it in **Mighty Editor** (desktop) or **MightyAmp** (mobile), then save to a slot.
2. **Is it compatible with Mighty Space?**  
   In most cases yes. Amp/drive settings transfer 1:1; you may tweak output level and reverb/delay mix to taste.
3. **Which pickups do I need?**  
   Presets work with single coils and humbuckers. Artist pages note the expected pickup position; adjust gain/EQ for your guitar.
4. **Are the presets free?**  
   Yes. Use them, tweak them, and share feedback—credits appreciated but not required.
5. **Can I request a specific song or artist?**  
   Absolutely. Use **Request Patch** and we’ll prioritize popular requests.

---

## Code Skeleton (Next.js App Router)

```tsx
// app/artists/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Artist Presets for NUX Mighty Plug Pro & Mighty Space | nxrig",
  description:
    "Browse all artists and download free presets for NUX Mighty Plug Pro and Mighty Space. Recreate tones of Metallica, Nirvana, Radiohead, RHCP, and more.",
  alternates: { canonical: "https://nxrig.com/artists" },
  openGraph: {
    title: "Artist Presets for NUX Mighty Plug Pro & Mighty Space | nxrig",
    description:
      "Browse all artists and download free presets for NUX Mighty Plug Pro and Mighty Space.",
    url: "https://nxrig.com/artists",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

type Artist = { name: string; slug: string; count: number };

const artists: Artist[] = [
  { name: "AC/DC", slug: "ac-dc", count: 1 },
  { name: "Metallica", slug: "metallica", count: 6 },
  { name: "Nirvana", slug: "nirvana", count: 1 },
  { name: "Radiohead", slug: "radiohead", count: 1 },
  { name: "Red Hot Chili Peppers", slug: "red-hot-chili-peppers", count: 2 },
  // ...rest
];

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "NUX Artist Presets",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: artists.length,
  itemListElement: artists.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MusicGroup",
      name: a.name,
      url: `https://nxrig.com/artist/${a.slug}`,
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I install a preset?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download the .mspatch file or scan the QR. Import it in Mighty Editor (desktop) or MightyAmp (mobile), then save to a slot.",
      },
    },
    {
      "@type": "Question",
      name: "Is it compatible with Mighty Space?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most cases yes. Tweak output level and reverb/delay mix if needed.",
      },
    },
    {
      "@type": "Question",
      name: "Which pickups do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Works with single coils and humbuckers. Adjust gain/EQ for your guitar.",
      },
    },
    {
      "@type": "Question",
      name: "Are the presets free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use and tweak them freely.",
      },
    },
    {
      "@type": "Question",
      name: "Can I request a specific song or artist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes—use Request Patch and we’ll prioritize popular requests.",
      },
    },
  ],
};

export default function ArtistsPage() {
  return (
    <>
      <Script
        id="ld-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          NUX Mighty Plug Pro Artist Presets — All Artists
        </h1>

        <p className="mb-3">
          Find artist-inspired guitar tones for{" "}
          <strong>NUX Mighty Plug Pro</strong> and <strong>Mighty Space</strong>
          . Each preset is crafted to get you close to the signature
          sound—rhythm and lead variants, sensible gain levels, IR/cab choices,
          and effect chains that just work.
        </p>
        <p className="mb-8">
          Open an artist page to see song-by-song patches and pickup tips.
          Import via <strong>Mighty Editor</strong> (desktop) or{" "}
          <strong>MightyAmp</strong> (mobile) using a .mspatch file or a QR
          code. All downloads are free.
        </p>

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mb-10">
          {artists.map((a) => (
            <li key={a.slug}>
              <a
                className="underline focus:outline-none focus:ring-2 focus:ring-offset-2"
                href={`/artist/${a.slug}`}
              >
                {a.name} presets ({a.count})
              </a>
            </li>
          ))}
        </ul>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Popular right now</h2>
          <ul className="list-disc pl-5">
            <li>
              <a href="/artist/metallica">
                Metallica — Master of Puppets (rhythm/lead)
              </a>
            </li>
            <li>
              <a href="/artist/nirvana">Nirvana — Smells Like Teen Spirit</a>
            </li>
            <li>
              <a href="/artist/red-hot-chili-peppers">
                Red Hot Chili Peppers — Californication
              </a>
            </li>
            <li>
              <a href="/artist/led-zeppelin">Led Zeppelin — Whole Lotta Love</a>
            </li>
            <li>
              <a href="/artist/guns-and-roses">
                Guns N’ Roses — Sweet Child O’ Mine
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">New presets</h2>
          <p>
            Freshly added artist tones for NUX Mighty Plug Pro & Mighty Space.
            Check them out and tell us what to add next.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Explore by genre</h2>
          <p>
            <strong>Metal:</strong> tight high-gain rhythms, palm-mutes, modern
            IRs. <strong>Grunge:</strong> gritty mids with roomy reverbs.{" "}
            <strong>Classic Rock:</strong> crunchy amps, vintage cabs.{" "}
            <strong>Alternative:</strong> edge-of-breakup cleans and modulation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Request a patch</h2>
          <p>
            Can’t find the tone you need?{" "}
            <a className="underline" href="/request">
              Request a patch
            </a>{" "}
            — we’ll add it in a few days and email you when it’s ready.
          </p>
        </section>

        <section className="border-t pt-6 text-sm text-muted-foreground">
          Download free <strong>NUX Mighty Plug Pro</strong> and{" "}
          <strong>Mighty Space</strong> presets inspired by legendary artists.
          Explore metal, grunge, classic rock, and alternative sounds — or
          request a custom patch.
        </section>
      </main>
    </>
  );
}
```

---

## Acceptance Criteria (Checklist)

- [ ] Metadata present (title/description/canonical/OG/Twitter)
- [ ] Single `<h1>`; all additional headings are `<h2>`
- [ ] Intro copy rendered above list
- [ ] Artist anchors follow “{{Artist}} presets ({{count}})”
- [ ] Sections: Popular/New/Genres/Request present
- [ ] FAQ rendered + valid `FAQPage` JSON‑LD
- [ ] `ItemList` JSON‑LD valid with correct item count
- [ ] All internal links are 200 OK
- [ ] No duplicate IDs, no console errors
- [ ] Keyboard navigation works; visible focus
- [ ] Lighthouse (or Next built‑in) shows no regression in Perf/A11y/Best Practices/SEO

---

## Notes for Implementation

- Keep JSON‑LD inline via `next/script` with `dangerouslySetInnerHTML`
- Ensure no stray commas/invalid JSON
- If artist data is dynamic, supply it via server component (no client hydration needed)
- Respect existing tailwind/theme tokens; do not change global styles
- Use semantic HTML; do not wrap headings in links

---

## Handover

- PR with screenshots (desktop + mobile)
- Include links to Google Rich Results test for the page
- Short README in PR describing where to adjust: artists array, Popular list, copy blocks
