declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      NEXT_PUBLIC_SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
      JWT_SECRET: string;
      NEXT_PUBLIC_SUPABASE_PROJECT_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_ROLE_KEY: string;
    }
  }
}

export {};
