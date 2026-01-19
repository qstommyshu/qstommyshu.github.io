# Personal Website

A personal website and blog built with React, TypeScript, Vite, and TailwindCSS.

## Development

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## Building

Build the project for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## Deployment

This site is deployed to GitHub Pages. To deploy:

```bash
npm run deploy
```

This command will:
1. Build the project for production
2. Deploy the `dist` folder to the `gh-pages` branch
3. Automatically publish to GitHub Pages

### Prerequisites

- Ensure you have push access to the repository
- GitHub Pages should be configured to serve from the `gh-pages` branch

### First-time Setup

If this is your first deployment, make sure GitHub Pages is configured:

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the sidebar
3. Set the source to the `gh-pages` branch
4. Save the settings

After the first deployment, your site will be live at `https://<username>.github.io/<repository-name>`.

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering for blog posts
