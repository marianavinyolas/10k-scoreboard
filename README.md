# 10k Scoreboard

Welcome to **10k Scoreboard**! 🎲  
An interactive web application to record players' names and scores for the 10,000 dice game.

---

## 🛠️ Technologies Used

This project was built using the following technologies:

- **Vite**: A fast build tool for modern web applications.
- **React**: A library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Tailwind CSS**: A utility-first CSS framework for rapid design.
- **SCSS**: A CSS extension with features like variables and nesting.

---

## 🚀 How to Run the Project

1. Clone this repository:

   ```bash
   git clone https://github.com/marianavinyolas/10k-scoreboard.git
   cd 10k-scoreboard

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Start the development server:

   ```bash
   npm run dev

   ```

4. Open your browser at http://localhost:5173 to view the app.

---

## 🚀 Deployment

The app is deployed to **Vercel** at [10k-scoreboard.vercel.app](https://10k-scoreboard.vercel.app).

| Setting          | Value                                 |
| ---------------- | ------------------------------------- |
| Framework preset | Vite                                  |
| Install command  | `pnpm install` (pnpm 11 via Corepack) |
| Build command    | `pnpm run build`                      |
| Output directory | `dist`                                |
| Node.js version  | 22                                    |

Pushes to `main` deploy automatically; every pull request gets a preview URL.

The project is a single-page app using the browser history API, so `vercel.json`
rewrites every route to `/index.html` to keep deep links (e.g. `/game`) working
on refresh.

### GitHub Actions

`.github/workflows/deploy.yml` runs ESLint and the production build on every push
and pull request as a CI gate. It does **not** deploy — Vercel handles that.
