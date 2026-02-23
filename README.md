# Flix - Movies & TV Shows Angular App

A responsive Angular application for browsing movies, TV shows, collections, and people using the TMDB API.

Live Demo : [Flix](https://ganapathydatournament.netlify.app/) Old Version

Live Demo : [Flix](https://ganapathysubramanian.github.io/Flix/) New Version

Demo Video : [Click Here](https://www.linkedin.com/feed/update/urn:li:activity:6889587893023711232/)

## Preview
https://github.com/user-attachments/assets/eb422ae7-a9d9-482a-a7cb-0ac80e5717a0

## Features

- 🎬 **Movies** – Browse popular, trending, and genre-based movies
- 📺 **TV Shows** – Discover TV shows with season and episode browsing
- 🗂️ **Collections** – Explore movie collections
- 🧑 **People** – View cast and crew profiles
- 📄 **Detail Pages** – Full details for movies, TV shows, and people
- ❤️ **Watchlist** – Save titles to a personal watch list (My List)
- 📅 **Seasons & Episodes** – Browse individual seasons and episodes of TV shows

## Technologies Used

| Technology | Version |
|---|---|
| [Angular](https://angular.io/) | ~13.3.0 |
| [Bootstrap](https://getbootstrap.com/) | ^5.1.3 |
| [ng-bootstrap](https://ng-bootstrap.github.io/) | ^12.0.1 |
| [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) | ^2.3.4 |
| [angular-responsive-carousel](https://github.com/zefoy/ngx-carousel) | ^2.1.2 |
| [ngx-google-analytics](https://github.com/maxandriani/ngx-google-analytics) | ^14.0.1 |
| [TMDB API](https://developers.themoviedb.org/3) | v3 |
| TypeScript | ~4.6.2 |

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (LTS recommended)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- A code editor (VS Code recommended)

## TMDB API Key Configuration

This app requires a free API key from [The Movie DB (TMDB)](https://www.themoviedb.org/settings/api).

1. Register at https://www.themoviedb.org/ and obtain an API key.
2. Open `src/environments/environment.prod.ts` and replace the placeholder:

   ```typescript
   export const environment = {
     production: true,
     apiKey: "YOUR_TMDB_API_KEY_HERE"
   };
   ```

3. For local development, update `src/environments/environment.ts` with the same key.

> ⚠️ **Warning:** Never commit your real API key to version control. Add `src/environments/environment.ts` to `.gitignore` or use environment variables in CI/CD pipelines.

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/GanapathySubramanian/Flix.git
cd Flix

# 2. Install dependencies
npm install

# 3. Configure your TMDB API key (see above)

# 4. Start the development server
npm start
# or
ng serve
```

Open your browser at `http://localhost:4200/`. The app reloads automatically on source changes.

## Build

```bash
npm run build
```

The production build artifacts are output to `dist/flix/`.

## Running Unit Tests

```bash
npm test
```

Runs the unit tests via [Karma](https://karma-runner.github.io).

## Additional Documentation

- 📊 [Google Analytics Setup](GOOGLE_ANALYTICS_SETUP.md) – How GA4 tracking is integrated
- ⚡ [Performance Optimization](PERFORMANCE_OPTIMIZATION.md) – AOS and animation tuning notes

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further Help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
