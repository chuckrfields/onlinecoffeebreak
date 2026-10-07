# Your Online Coffee Break

Static archive recreation of [OnlineCoffeeBreak.com](https://www.onlinecoffeebreak.com/), the interview podcast hosted by Chuck Fields from about 2017 to November 2023.

The original WordPress theme and theme files are gone. This site is rebuilt from public Wayback Machine captures (20 January 2021 and 18 January 2023), the Apple Podcasts and Spotify show pages, and the YouTube channel [youtube.com/@youronlinecoffeebreak](https://www.youtube.com/@youronlinecoffeebreak).

It is not a pixel copy, and it does not rehost the Blubrry audio. The live domain was serving unrelated spam when this archive was built in October 2026.

## Pages

- Home, episode highlights, Stage Vault and Your Space Journey handoff
- Episodes, filterable highlight catalog
- About, host bio and audience notes from the original About page
- Subscribe, Apple, Spotify, YouTube, iHeart, TuneIn
- Contact, Indianapolis details published on the old site

## Later integration with Stage Vault

This repo is intentionally separate from `chuckrfields/stagevaultpod`. When you want it on StageVaultpod.com, the clean options are:

1. Subdomain, such as `archive.stagevaultpod.com`, pointing at this static site.
2. A path on the Stage Vault deploy, copying `index.html`, `css`, `js`, and `data` into something like `/coffee-break/`.
3. A simple link from the Stage Vault about page until a full merge is worth it.

Episode copy lives in `data/episodes.json`, so a later Stage Vault page can import the same file.

## Local preview

```bash
python3 -m http.server 8080
```

Open http://localhost:8080. Episode JSON will not load from a `file://` URL.
