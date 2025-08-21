import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import type { Movie, MovieDetail } from "@/types";

export async function generateMovieRecommendations(favoriteMovies: Movie[]) {
    if (favoriteMovies.length === 0) {
        return [];
    }

    const movieTitles = favoriteMovies.map((movie) => movie.title);
    try {
        const { text } = await generateText({
            model: groq("llama-3.1-8b-instant"),
            prompt: `Based on these favorite movies: ${movieTitles}
                
                Recommend 5 similar movies that the user might enjoy. For each recommendation, provide:
                1. Movie title
                2. Brief reason why it's recommended (1-2 sentences)
                
                Format as JSON array:
                [{"title": "Movie Name", "reason": "Why recommended"}]
                
                Only return the JSON array, no other text.`,
        });
        const cleaned = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        return cleaned;
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return [];
    }
}

export async function generateMovieAnalysis(movie: MovieDetail) {
    try {
        const { text } = await generateText({
            model: groq("llama-3.1-8b-instant"),
            prompt: `Analyze this movie: "${movie.Title}" (${movie.Year})
      
      Genre: ${movie.Genre}
      Director: ${movie.Director}
      Plot: ${movie.Plot}
      
      Provide an intelligent analysis covering:
      1. Themes and deeper meaning
      2. Cinematography and direction style
      3. Cultural impact or significance
      4. What makes it unique or noteworthy
      
      Keep it engaging and insightful, around 150-200 words.`,
        });

        return text;
    } catch (error) {
        console.error("Error generating analysis:", error);
        return "Unable to generate analysis at this time.";
    }
}

export async function generateSearchSuggestions(query: string) {
    if (query.length < 3) return [];

    try {
        const { text } = await generateText({
            model: groq("llama-3.1-8b-instant"),
            prompt: `User is searching for: "${query}"
      
      Suggest 5 movie-related search terms that might help them find what they're looking for.
      Consider:
      - Similar movie titles
      - Related genres
      - Actor/director names
      - Movie themes
      
      Return as JSON array of strings:
      ["suggestion1", "suggestion2", "suggestion3", "suggestion4", "suggestion5"]
      
      Only return the JSON array, no other text.`,
        });

        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating suggestions:", error);
        return [];
    }
}

export async function generateMovieTrivia(movie: MovieDetail) {
    try {
        const { text } = await generateText({
            model: groq("llama-3.1-8b-instant"),
            prompt: `Generate 3 interesting trivia facts about the movie "${movie.Title}" (${movie.Year}).
      
      Focus on:
      - Behind-the-scenes facts
      - Production details
      - Cast or crew interesting stories
      - Box office or awards information
      
      Format as JSON array:
      [{"fact": "Interesting fact about the movie"}]
      
      Only return the JSON array, no other text.`,
        });

        const cleaned = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        return cleaned;
    } catch (error) {
        console.error("Error generating trivia:", error);
        return [];
    }
}

export async function generateMoodRecommendations(mood: string) {
    try {
        const { text } = await generateText({
            model: groq("llama-3.1-8b-instant"),
            prompt: `User is feeling: "${mood}"
      
      Recommend 6 movies that would be perfect for this mood. Consider:
      - Genre that matches the mood
      - Tone and atmosphere
      - Emotional impact
      
      Format as JSON array:
      [{"title": "Movie Title", "year": "Year", "reason": "Why it fits this mood"}]
      
      Only return the JSON array, no other text.`,
        });

        const cleaned = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        return cleaned;
    } catch (error) {
        console.error("Error generating mood recommendations:", error);
        return [];
    }
}
