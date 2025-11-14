# GitHub Pages Deployment Guide

## Step-by-Step Instructions

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/efthemiosprime/interactive-graphics-learning`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 2: Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This will:
- Build your project for production
- Create/update the `gh-pages` branch
- Push the built files to GitHub

### Step 3: Wait for Deployment

- GitHub Pages typically takes 1-2 minutes to deploy
- You can check the deployment status in the **Actions** tab of your repository

### Step 4: Access Your Site

Your site will be available at:
- **GitHub Pages URL**: `https://efthemiosprime.github.io/interactive-graphics-learning/`

### Step 5: (Optional) Set Up Custom Domain

If you want to use `graphics.efthemiosprime.com`:

1. In your repository **Settings** → **Pages**, add your custom domain:
   - **Custom domain**: `graphics.efthemiosprime.com`
   - Check **Enforce HTTPS** (after DNS propagates)

2. Add a CNAME file to your `public` folder (we'll create this automatically on next deploy)

3. Configure DNS with your domain provider:
   - **Type**: CNAME
   - **Name**: `graphics`
   - **Value**: `efthemiosprime.github.io`
   - **TTL**: 3600 (or default)

4. Wait for DNS propagation (can take up to 48 hours, usually much faster)

5. Re-deploy: `npm run deploy`

## Troubleshooting

### Routes Not Working (404 errors)

The `404.html` file in the `public` folder handles React Router routing. If routes still don't work:
- Make sure `404.html` is in the `public` folder (it will be copied to `dist` during build)
- Verify the `basename` in `src/main.jsx` matches your repository name

### Assets Not Loading

- Check that `vite.config.js` has the correct `base` path
- Ensure all asset paths use relative paths or the base path

### Build Errors

- Make sure all dependencies are installed: `npm install`
- Check Node.js version (should be 18+)
- Try cleaning and rebuilding: `rm -rf dist node_modules && npm install && npm run build`

## Updating Your Site

Every time you make changes:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

The site will automatically update within a few minutes.

