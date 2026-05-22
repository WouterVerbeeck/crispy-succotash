# OctoFit frontend

Set `VITE_CODESPACE_NAME` (for example in `.env.local`) when running in Codespaces so the app can call:

`https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/...`

When `VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000`.
