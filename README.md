# CineScope — Movie Search (SSR)

A fully server-side rendered movie search application built with Next.js, TypeScript, and Tailwind CSS v4. Features Redux Toolkit for client-side favorites management with localStorage persistence.

## Features

- 🎬 **Movie Search**: Search movies using the OMDb API
- 🖥️ **Server-Side Rendering**: Fast, SEO-friendly pages
- ❤️ **Favorites System**: Add/remove movies from favorites with Redux Toolkit
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS v4
- 🔍 **Detailed Movie Pages**: Complete movie information with metadata
- 📄 **Pagination**: Navigate through search results
- 🎨 **Modern UI**: Clean, accessible interface with dark mode support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (configless)
- **State Management**: Redux Toolkit
- **Data Source**: OMDb API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- OMDb API key (get one free at [omdbapi.com](https://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/pritesh-mendapara/movie-search-ssr.git
cd movie-search-ssr
\`\`\`

2. Install dependencies:
\`\`\`bash
yarn
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

4. Add your OMDb API key to `.env.local`:
\`\`\`env
OMDB_API_KEY=your_actual_api_key_here
\`\`\`

5. Run the development server:
\`\`\`bash
yarn run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `yarn run dev` - Start development server
- `yarn run build` - Build for production
- `yarn run start` - Start production server
- `yarn run lint` - Run ESLint  

## API Integration

The app uses the OMDb API for movie data. All API calls are made server-side to keep the API key secure. The API key is never exposed to the client.

## State Management

Redux Toolkit manages the favorites system:
- Add/remove movies from favorites
- Persist favorites to localStorage
- Rehydrate on app load

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Add `OMDB_API_KEY` environment variable in Vercel dashboard
4. Deploy

## License
MIT © [Pritesh Mendapara](https://github.com/pritesh-mendapara)
