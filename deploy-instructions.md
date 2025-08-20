# Deployment Instructions for Magic Portfolio

## Option 1: Vercel (Recommended)

### Method A: GitHub Integration
1. Push your code to GitHub
2. Go to https://vercel.com
3. Sign in with GitHub
4. Click "New Project"
5. Import your MagicPortfolio repository
6. Click "Deploy"

### Method B: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project directory
cd /Users/ishaanjamwal/Downloads/Coding/MagicPortfolio
vercel

# Follow the interactive prompts
```

## Option 2: Netlify

### Method A: Git Integration
1. Push code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Connect repository
5. Build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`

### Method B: Manual Deploy
```bash
# Build the project
pnpm build

# Drag the .next folder to Netlify's deploy area
```

## Option 3: Other Platforms

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Render
1. Connect GitHub repository at https://render.com
2. Create new "Web Service"
3. Build command: `pnpm build`
4. Start command: `pnpm start`

## Pre-deployment Checklist

- [ ] All placeholder URLs updated to real links
- [ ] Resume PDF uploaded to public folder
- [ ] All images optimized and in public folder
- [ ] Environment variables configured (if any)
- [ ] Test build locally: `pnpm build`

## Custom Domain Setup

After deployment, you can add a custom domain:

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

## Build Commands Reference

```bash
# Development
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm lint
```
