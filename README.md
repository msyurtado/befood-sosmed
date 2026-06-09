# Befood Sosmed Monitoring

Dashboard monitoring sosial media internal Befood — 26 Kanwil, 133 Cabang.

## Cara Deploy ke Vercel

1. Upload folder ini ke GitHub
2. Login ke vercel.com → New Project → Import dari GitHub
3. Klik Deploy — selesai!

## Halaman

- `/` — Dashboard utama (Overview, Detail Cabang, JUMPOST, Ranking)
- `/connect` — Halaman onboarding untuk cabang

## Environment Variables (isi di Vercel setelah deploy)

```
NEXT_PUBLIC_META_APP_ID=your_app_id
META_APP_SECRET=your_app_secret
NEXT_PUBLIC_REDIRECT_URI=https://your-domain.vercel.app/callback
```
