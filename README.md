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

| Setting          | Value                                     |
| ---------------- | ----------------------------------------- |
| Framework preset | Vite                                      |
| Install command  | `corepack pnpm install --frozen-lockfile` |
| Build command    | `corepack pnpm run build`                 |
| Output directory | `dist`                                    |
| Node.js version  | 22                                        |

Pushes to `main` deploy automatically; every pull request gets a preview URL.

The install and build commands go through `corepack pnpm` rather than a bare
`pnpm` so that the exact pnpm version pinned in `package.json`
(`packageManager: pnpm@11.10.0`) is used, without relying on Vercel to put a
`pnpm` shim on the PATH.

The project is a single-page app using the browser history API, so `vercel.json`
rewrites every route to `/index.html` to keep deep links (e.g. `/game`) working
on refresh.

### GitHub Actions

`.github/workflows/deploy.yml` runs ESLint and the production build on every push
and pull request as a CI gate. It does **not** deploy — Vercel handles that.

---

## 🌿 Branching

`main` is the production branch and `development` is the buffer that sits in
front of it.

```
feature/*  ──▶  development  ──▶  main
```

| Branch        | Role                                                        |
| ------------- | ----------------------------------------------------------- |
| `feature/*`   | Cut from `development`. All work starts here.               |
| `development` | Integration branch. Every feature PR targets it.            |
| `main`        | Production. Only receives fast-forwards from `development`. |

### The flow

1. **Cut the branch from `development`**, never from `main`:
   ```bash
   git checkout development
   git pull
   git checkout -b feature/my-change
   ```
2. **Open the PR against `development`.** CI runs on it and Vercel opens a
   preview deployment.
3. **Merge into `development`** once CI is green.
4. **Promote to `main`** by opening a `development → main` pull request. Merging
   that triggers the production deployment on Vercel.

Because `development` is a fast-forward of `main`, promoting is just a
fast-forward merge:

```bash
git checkout main
git pull
git merge --ff-only development
git push origin main
```

### Branch protection

Both `main` and `development` require the `build (22.x)` status check, so a
pull request cannot be merged while the build is failing. `main` additionally
requires a pull request, which keeps the promotion step explicit.

> The required check is named after the job (`build (22.x)`). If you change the
> `node-version` matrix in the workflow, the context changes with it and the
> branch protection rule has to be updated to match, or pull requests will wait
> forever for a check that never reports.
