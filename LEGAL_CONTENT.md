# Legal content synchronization

Run `npm run legal:sync` after changing the canonical pack in `NutriTrackBeta/web/getnutria_gdpr_starter_pack_v1_0`. When that sibling checkout is available, the command regenerates the seven committed public documents. Standalone cloud builds validate those committed generated copies instead; they never require an absolute or sibling repository path. Set `LEGAL_SOURCE_DIR` only when the canonical pack lives elsewhere locally. Never place internal policy, ROPA, DPIA, breach or retention documents in `content/legal` or `public`.
