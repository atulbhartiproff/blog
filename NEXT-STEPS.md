# Next Steps After Sanity Setup

## 1. Deploy Schemas to Sanity

Run this command to deploy your schemas:

```bash
npx sanity schema deploy
```

Or start Sanity Studio to see and deploy schemas:

```bash
npx sanity start
```

## 2. Create Author in Sanity Studio

1. Open Sanity Studio: `npx sanity start`
2. Go to "Author" section
3. Create a new author with your details:
   - Name: Blakfield
   - Bio: Just want to document stuff I learn along the way.
   - Email: atulbhartiproff@gmail.com
   - Social links (optional)
   - Image (optional - upload your pfp.jpeg)

## 3. Get API Token

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (blog)
3. Go to API → Tokens
4. Click "Add API token"
5. Name it (e.g., "Blog API Token")
6. Set permissions to **Editor** (for write access)
7. Copy the token

## 4. Add API Token to Environment Variables

Add this to your `.env.local` file:

```env
SANITY_API_TOKEN=your-api-token-here
```

## 5. Add to Vercel (for production)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `sgfn7xbv`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_API_TOKEN` = your-api-token

## 6. Test the Integration

1. Start your dev server: `npm run dev`
2. Try creating a post from the home page
3. Check Sanity Studio to see if the post appears

## What's Been Set Up

✅ Schema files created (post.js and author.js)
✅ Sanity client configured
✅ API routes updated to use Sanity
✅ Image uploads configured for Sanity
✅ Post fetching from Sanity

Your blog is now fully integrated with Sanity CMS!


