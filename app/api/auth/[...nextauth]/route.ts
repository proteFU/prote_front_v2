import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { config } from "@/utils/config";

export const authOptions = {
    providers: [
      GithubProvider({
        clientId: config.github.clientId as string,
        clientSecret: config.github.clientSecret as string,
      }),
    ],
    secret : config.github.jwtSecret as string,
  };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
  