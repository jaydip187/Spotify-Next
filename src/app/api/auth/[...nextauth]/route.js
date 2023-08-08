import spotifyAPI, { LOGIN_URL } from "@/lib/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const refreshAccessToken = async (token) => {
  try {
    spotifyAPI.setAccessToken(token.accessToken);
    spotifyAPI.setRefreshToken(token.refreshToken);

    const { body } = await spotifyAPI.refreshAccessToken();
    // console.log("====================================");
    console.log(body, "qwertyu23456789");
    // console.log("====================================");

    return {
      ...token,
      accessToken: body.access_token,
      accessTokenExpires: Date.now() + body.expires_in * 100,
      refreshToken: body.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");

    return {
      ...token,
      error: "RefresTokenError",
    };
  }
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    singIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //frist Sing in

      console.log(token, "token inn auth");
      if (account && user) {
        console.log("====================================");
        console.log("frist Sing in");
        console.log("====================================");
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_in * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          user,
        };
      }

      // Return previous token if the access token has not expired yet

      if (Date.now() < token.accessTokenExpires) {
        console.log("====================================");
        console.log(
          "Return previous token if the access token has not expired yet"
        );
        console.log("====================================");
        return token;
      }

      console.log("====================================");
      console.log("Return previous token if the access token has expired yet");
      console.log("====================================");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log(token, "in Session");
      // console.log(user, "user");
      try {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

// export default NextAuth(authOptions);
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
