# MainHub

The central root domain showcase, infrastructure dashboard, and vanity router for **achinta.me**.

Built natively with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 Getting Started (Native Node.js)

### 1. Development Mode (with Turbopack)
```bash
cd "/home/achinta/PROGRAMMING/Hobby Projects/Achinta-Portal"
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Production Build & Run
```bash
npm run build
npm start
```
By default, this serves on port `3000` (or pass `-p 4000` to serve on port 4000).

---

## 📁 Key Features

1. **Showcase & Filter Dashboard**:
   - Filter by categories: *Web Apps*, *Desktop Apps*, *Mobile Apps*, *Backend & APIs*, *Extensions*, and *Utilities*.
   - Instant search (`/` keyboard shortcut) across project titles, tags, and descriptions.

2. **Live Previews (Web Apps)**:
   - Interactive iframe preview modal and full-page **Live Previews** tab.
   - Device viewport switchers: Desktop (100%), Tablet (768px), and Mobile (390px).
   - Only appears for `Web Apps` with active live URLs.

3. **Status Page & Real-Time Health Telemetry**:
   - Edge health-check endpoint (`/api/health-check?url=...`) measures live ping latency in ms.
   - Monitors active service up/down status and uptime percentage.

4. **Vanity Redirects for `achinta.me`**:
   - Configured in `next.config.ts`:
     - `/mail` ➔ `https://mail.achinta.me`
     - `/drive` ➔ `https://drive.achinta.me`
     - `/nexus` ➔ `https://nexus.achinta.me`
     - `/ficxus` ➔ `https://api.achinta.me`
     - `/search` ➔ `https://search.achinta.me`
     - `/code` ➔ `https://code.achinta.me`
     - `/github` ➔ `https://github.com/Achinta005`
   - Projects without a redirect URL automatically hide the vanity box without error.

5. **Headless System Theme Sync**:
   - Automatically detects and mirrors the operating system's color scheme (Dark / Light) with zero UI buttons or toggles.

---

## 🌐 Deployment to Root Domain (`achinta.me`)

- **Vercel / Cloudflare Pages:** Connect repository and deploy in 1 click.
- **Systemd / PM2 on Linux VPS:**
  ```bash
  pm2 start npm --name "achinta-portal" -- start -- -p 3000
  ```
