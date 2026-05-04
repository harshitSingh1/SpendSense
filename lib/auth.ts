import { ExpressAuth } from "@auth/express";
import { CredentialsSignin } from "@auth/core/errors";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import dbConnect, { clientPromise } from "./mongodb";
import User from "./models/User";

export const authConfig = {
  adapter: MongoDBAdapter(clientPromise),
  basePath: "/api/auth",
  debug: false,
  useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: `__Secure-authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-authjs.callback-url`,
      options: {
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `__Secure-authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `__Secure-authjs.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    state: {
      name: `__Secure-authjs.state`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    nonce: {
      name: `__Secure-authjs.nonce`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" }, // used for signup
        action: { label: "Action", type: "text" } // 'signin' or 'signup'
      },
      async authorize(credentials) {
        try {
          await dbConnect();
        } catch (dbErr) {
          // A real system configuration error we WANT to be marked as Configuration
          throw new Error("Database blocked.");
        }
        
        const { email, password, name, action } = credentials as Record<string, string>;
        
        if (!email || !password) {
          return null; // Signals invalid credentials
        }

        if (action === "signup") {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return null; // Map duplicate user back to standard credential error
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            name: name || email.split("@")[0],
            email,
            password: hashedPassword
          });
          return { id: newUser.id, name: newUser.name, email: newUser.email };
        }

        // Default act as signin
        const user = await User.findOne({ email });
        if (!user || !user.password) {
          return null; // Signals invalid credentials
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null; // Signals invalid credentials
        }
        
        return { id: user.id, name: user.name, email: user.email };
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: profile.email });
          
          if (existingUser) {
            // Update image if missing or changed, but keep existing DB name if preferred
            // Alternatively, sync Google name if you want it always fresh
            await User.updateOne(
              { email: profile.email },
              { 
                $set: { 
                  image: profile.picture || existingUser.image,
                  // Uncomment if you want to force sync the name too
                  // name: profile.name || existingUser.name 
                } 
              }
            );
          } else {
            // Create new user record
            await User.create({
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              onboardingCompleted: false
            });
          }
        } catch (error) {
          console.error("Error syncing Google user to MongoDB:", error);
          return false; // Stop sign in if DB sync fails
        }
      }
      return true;
    },
    async jwt({ token, user, trigger }: any) {
      await dbConnect();
      
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        token.userId = dbUser._id.toString();
        token.name = dbUser.name;
        token.picture = dbUser.image;
        token.isAdmin = dbUser.isAdmin;
        // Compute active Pro status
        const isActuallyPro = Boolean(dbUser.proExpiresAt && new Date(dbUser.proExpiresAt) > new Date());
        token.isPro = dbUser.isPro || isActuallyPro;
        token.plan = dbUser.plan;
        token.proExpiresAt = dbUser.proExpiresAt;
      }
      
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.userId;
        session.user.name = token.name;
        session.user.image = token.picture;
        (session.user as any).isAdmin = token.isAdmin;
        (session.user as any).isPro = token.isPro;
        (session.user as any).plan = token.plan;
        (session.user as any).proExpiresAt = token.proExpiresAt;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.AUTH_SECRET || "fallback_secret_for_development_only_1234567890",
  trustHost: true,
};

export const auth = ExpressAuth(authConfig as any);
