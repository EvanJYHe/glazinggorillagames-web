Public-site ownership rules:

- `pages/` contains page composition only. `HomePage.jsx` and `GamesPage.jsx` should stay thin shells.
- `layout/` owns the shared public header and footer.
- `sections/` own their private helpers.
- `shared/` is only for cross-section or cross-page primitives.
- `content/publicSiteContractContent.js` is the canonical editable public-site copy contract.
- `content/publicSiteContent.js` hydrates that contract with local media URLs for the current frontend.
- `content/publicSiteMediaAssets.js` is the only allowed entrypoint for public marketing-media slots.
- `data/publicSiteData.js` is the source of API/data shaping for the public site.
