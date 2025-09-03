export const config = {
    supabase: {
        clientId: process.env.NEXT_PUBLIC_SUPABASE_CLIENT_ID,
        clientSecret: process.env.SUPABASE_CLIENT_SECRET,
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        jwtSecret: process.env.JWT_SECRET,
    },
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    },
}