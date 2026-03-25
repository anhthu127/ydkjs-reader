# Deployment Guide - YDKJS Reader

This guide will help you deploy the YDKJS Reader application to GitHub Pages.

## Prerequisites

1. GitHub account
2. Git installed on your computer
3. Repository with the You Don't Know JS Vietnamese translations

## Step 1: Push Code to GitHub

If you haven't already pushed the code to GitHub:

```bash
# Navigate to the project root
cd c:\Users\IreneDo\Code\You-Dont-Know-JS

# Add all files
git add .

# Commit the changes
git commit -m "Add YDKJS Reader web application with progress tracking and reading planner"

# Push to GitHub
git push origin main
```

Note: If your default branch is named `master` instead of `main`, use `master` in the commands.

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** (top right)
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Save the settings

## Step 3: Trigger Deployment

The deployment will automatically trigger when you push to the main/master branch. You can also manually trigger it:

1. Go to the **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch (main/master)
5. Click "Run workflow"

## Step 4: Wait for Deployment

The deployment process takes a few minutes:

1. Go to the **Actions** tab
2. You'll see the workflow running
3. Wait for both "build" and "deploy" jobs to complete
4. Once complete, you'll see a green checkmark

## Step 5: Access Your Website

Your website will be available at:

```
https://<your-username>.github.io/You-Dont-Know-JS/
```

For example: `https://irenedo.github.io/You-Dont-Know-JS/`

## Troubleshooting

### 404 Error on Navigation

If you get 404 errors when navigating directly to a chapter:
- This is expected behavior and should be handled by the 404.html redirect
- Try refreshing the page or navigating from the home page

### Markdown Files Not Loading

If chapters show "Cannot load content":
1. Check that the markdown files exist in the correct folders
2. Verify the GitHub Actions workflow copied the files correctly
3. Look at the Actions logs for any errors

### Images Not Displaying

If images in chapters are not showing:
1. Ensure the `images` folders are in each book directory
2. Check that the workflow is copying the image folders
3. Verify image paths in the markdown files are relative

### Build Fails

If the build fails in GitHub Actions:
1. Check the Actions logs for error messages
2. Common issues:
   - Missing `package-lock.json`
   - Node version incompatibility
   - Missing markdown files

To fix:
```bash
cd ydkjs-reader
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

## Updating the Website

To update the website after making changes:

```bash
# Make your changes to the code or markdown files
# Then commit and push

git add .
git commit -m "Description of your changes"
git push origin main
```

The website will automatically rebuild and redeploy.

## Local Testing

Before deploying, you can test locally:

```bash
cd ydkjs-reader

# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `ydkjs-reader/public/`:
   ```
   yourdomain.com
   ```

2. Update `vite.config.js`:
   ```javascript
   base: '/'  // instead of '/You-Dont-Know-JS/'
   ```

3. Configure DNS settings with your domain provider

4. In GitHub Settings > Pages, add your custom domain

## Performance Tips

- The website uses browser localStorage - no backend needed
- Images are lazy-loaded for better performance
- All chapter content is loaded on-demand
- The SPA architecture means fast navigation after initial load

## Security Notes

- No user data is sent to any server
- All reading progress is stored locally in the browser
- Clearing browser data will reset all progress

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review the browser console for errors
3. Ensure all markdown files are in the correct format
4. Verify the repository structure matches the expected layout

## Maintenance

Regular maintenance tasks:
- Keep dependencies updated: `npm update`
- Update Node.js version in workflow if needed
- Monitor GitHub Actions for any deprecation warnings
