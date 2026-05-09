# Jelma

Website for [jelma.be](https://jelma.be) — a Belgian consultancy combining prevention advice and software development for the energy sector.

## About

Jelma offers two core services:

**Prevention advice** — practical support around PPE, machine safety, risk analysis, workplace inspections, compliance with Belgian welfare legislation, and safety training.

**Software development** — backend systems for monitoring, EMS, and energy data applications. Built with Django, PostgreSQL, Redis, and deployed on Kubernetes via Terraform on Azure and GCP.

The team: [Lynn Delanote](mailto:lynn@jelma.be) (Prevention advisor level 2, certified expert machinery safety) and [Kristof Wybo](mailto:kristof@jelma.be) (Industrial engineer, automation & energy software).

## Stack

Single-page static site — vanilla HTML, CSS, and JavaScript. No build step, no dependencies.

- Responsive layout with CSS Grid and custom properties
- System dark mode support via `prefers-color-scheme`
- Contact form submitting to `api.jelma.be` with a `mailto:` fallback

## Structure

```
index.html              Main page (NL)
cookies.html            Cookie policy
privacy.html            Privacy statement
wettelijke-informatie.html  Legal information
legal.css               Shared styles for the three policy pages
*.webp / *.png          Images and logos
CNAME                   GitHub Pages domain (jelma.be)
```

## Local development

No build tooling needed. Open `index.html` directly in a browser, or use any static file server:

```sh
npx serve .
# or
python3 -m http.server
```

## Contact

[jelma.be](https://jelma.be) · [kristof@jelma.be](mailto:kristof@jelma.be) · [lynn@jelma.be](mailto:lynn@jelma.be)
