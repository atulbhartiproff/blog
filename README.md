# Personal Blog

A modern personal blog website built with Next.js, TypeScript, and Tailwind CSS. Features posts about albums, games, books, films, and essays with full author identity support.

## Features

- ✨ Modern, responsive design
- 📝 Support for multiple post categories (albums, games, books, films, essays)
- 👤 Author identity with name, bio, and about page
- 🎨 Beautiful UI with Tailwind CSS
- 🔍 SEO-friendly structure
- 📱 Fully responsive

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Update author information in `data/author.ts`:
   - Change the name, bio, email, and social links
   - Add your author image to the `public` folder

3. Add your posts in `data/posts.ts` or create new ones following the same structure.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Blog/
├── app/              # Next.js app directory
│   ├── about/       # About page
│   ├── posts/       # Posts pages
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── data/            # Data files
│   ├── author.ts    # Author information
│   └── posts.ts     # Blog posts
└── public/          # Static assets
```

## Customization

- **Author Info**: Edit `data/author.ts` to update your personal information
- **Posts**: Add or modify posts in `data/posts.ts`
- **Styling**: Customize colors and styles in `tailwind.config.js` and `app/globals.css`
- **Images**: Add images to the `public` folder and reference them in your posts

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

