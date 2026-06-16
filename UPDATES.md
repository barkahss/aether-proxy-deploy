# Aether Proxy - Build Updates

Public deploy package. Readable worker source is **not** included.

## Latest - v0.2.2

- Obfuscated `worker.js` (production build)
- Admin panel assets (`assets/public/`)
- Self-hosted clean IP lists (`assets/public/data/`)
- Deploy with `wrangler.public.jsonc` (bind your own KV namespace)

```bash
npx wrangler deploy -c wrangler.public.jsonc
```

Open `/install/` on your Worker URL to set the admin password.
