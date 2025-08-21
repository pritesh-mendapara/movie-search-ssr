# CineScope — Movie Search (SSR)

A fully server-side rendered movie search application built with Next.js, TypeScript, and Tailwind CSS v4. Features AI-powered recommendations, intelligent movie analysis, and server-side favorites management with secure cookie persistence for optimal performance and SEO.

## Demo

👉 [Live Demo on Vercel](https://cinescopemovie.vercel.app/)

## Features

- 🎬 **Movie Search**: Search movies using the OMDb API with server-side rendering
- 🤖 **AI Recommendations**: Get personalized movie suggestions based on your favorites
- 🎭 **Mood-Based Suggestions**: Find movies that match your current mood
- 🧠 **AI Movie Analysis**: Intelligent insights and analysis for each movie
- 🎯 **Movie Trivia**: AI-generated interesting facts about movies
- 🖥️ **Full SSR**: Complete server-side rendering for all pages and data
- ❤️ **Favorites System**: Add/remove movies from favorites with cookie persistence
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS v4 (configless)
- 🔍 **Detailed Movie Pages**: Complete movie information with AI-powered insights
- 📄 **Pagination**: Navigate through search results
- 🎨 **Modern UI**: Clean, accessible interface with custom dark theme
- 🍪 **Cookie-Based State**: Secure server-side state management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (configless)
- **State Management**: Server Actions + Cookies
- **Data Source**: OMDb API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- OMDb API key (get one free at [omdbapi.com](https://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/pritesh-mendapara/movie-search-ssr.git
    cd movie-search-ssr
    ```

2. Install dependencies:

    ```bash
    yarn
    ```

3. Set up environment variables:

    ```bash
    cp .env.local.example .env.local
    ```

4. Add your OMDb API key to `.env.local`:

    ```env
    OMDB_API_KEY=your_actual_api_key_here
    ```

5. Run the development server:

    ```bash
    yarn run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Features

### Movie Recommendations

- **Personal Recommendations**: Based on your favorite movies
- **Mood-Based Suggestions**: Movies that match your current mood (happy, sad, excited, etc.)
- **Intelligent Matching**: AI analyzes themes, genres, and styles

### Movie Analysis

- **Deep Insights**: AI-powered analysis of themes, cinematography, and cultural impact
- **Trivia Generation**: Interesting behind-the-scenes facts and production details
- **Context Understanding**: Analysis considers director, genre, and historical context

### Available Moods

- Happy, Sad, Excited, Relaxed, Romantic, Adventurous, Thoughtful, Energetic

## Scripts

- `yarn run dev` - Start development server
- `yarn run build` - Build for production
- `yarn run start` - Start production server
- `yarn run lint` - Run ESLint

## API Integration

### OMDb API

The app uses the OMDb API for movie data. All API calls are made server-side to keep the API key secure.

### Groq AI

AI features powered by Groq's llama-3.1-8b-instant model:

- Movie recommendations based on user preferences
- Mood-based movie suggestions
- Intelligent movie analysis and insights
- Trivia and interesting facts generation

## State Management

Server-side state management with cookies:

- Add/remove movies from favorites using server actions
- Persist favorites to secure HTTP-only cookies
- Server-side rendering with immediate data availability
- No client-side hydration delays

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Add `OMDB_API_KEY` environment variable in Vercel dashboard
4. Deploy

## Performance Features

- **Server-Side Rendering**: All pages render on the server for optimal SEO
- **Cookie-Based State**: No client-side hydration delays
- **AI Caching**: Intelligent caching of AI responses
- **Optimized Images**: Automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loads

## License

MIT © [Pritesh Mendapara](https://github.com/pritesh-mendapara)
