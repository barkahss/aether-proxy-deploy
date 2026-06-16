# Aether Proxy — Deploy Package

Obfuscated `worker.js` only. No readable source.

## Deploy

```bash
npm install -g wrangler
npx wrangler deploy -c wrangler.public.jsonc
```

1. Create a KV namespace and bind it as `KV` in Wrangler.
2. Open `/install/` on your Worker URL.
3. Set admin password in the wizard.

Changelog: `UPDATES.md`
