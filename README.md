# 🎭 Madhuram 2026 — Official Website

> The official website for **Madhuram 2026**, SLIET's annual cultural fest.  
> Live at [madhuramsliet.com](https://madhuramsliet.com)

---

## About

Madhuram is the flagship cultural festival of **Sant Longowal Institute of Engineering and Technology (SLIET), Longowal, Punjab** — bringing together music, dance, art, and performance across two electrifying days.

**Madhuram 2026** is scheduled for **April 10–11, 2026**.

This repository contains the source code for the official Madhuram 2026 website, built to handle event information, artist announcements, schedules, registration, and sponsorship visibility.

---

## Features

- Event schedule and artist lineup
- Registration and ticketing information
- Sponsor showcase
- Countdown timer to the fest
- Mobile-responsive design
- Optimized for performance and fast load times

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) / React
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Domain:** Namecheap (madhuramsliet.com)

> Stack details may vary. Update this section to match your actual implementation.

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
git clone https://github.com/your-org/madhuram-2026.git
cd madhuram-2026
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Deployment

The site is deployed on **Vercel** and connected to the custom domain `madhuramsliet.com` via Namecheap DNS.

Any push to the `main` branch triggers an automatic deployment via Vercel's GitHub integration.

---

## Project Structure

```
madhuram-2026/
├── public/           # Static assets (images, fonts, icons)
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Route pages
│   ├── styles/       # Global styles
│   └── data/         # Static data (schedule, artists, sponsors)
├── .env.example      # Environment variable template
├── next.config.js
└── package.json
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Base URL of the deployed site |
| *(add others as needed)* | |

---

## Contributing

This project is maintained by the **Madhuram 2026 Web Team** under SLIET's cultural committee.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow consistent commit message conventions and keep PRs scoped.

---

## Team

| Role | Name |
|------|------|
| Website Developer | Tanush Singla |
| Design & Branding | Tanush Singla |

---

## License

This project is for internal institutional use by SLIET's cultural committee.  
All rights reserved © Madhuram 2026, SLIET.

---

<p align="center">
  Made with ❤️ for SLIET · <a href="https://madhuramsliet.com">madhuramsliet.com</a>
</p>
