import { loginSchema } from "@/lib/schemas";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

function isDummyJsonUser(value: unknown): value is DummyJsonUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "number" &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.email === "string" &&
    typeof user.image === "string"
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    // Credentials Provider không dùng database adapter nên dùng JWT session.
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Tên đăng nhập", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const response = await fetch("https://dummyjson.com/auth/login", {
          body: JSON.stringify({
            username: parsedCredentials.data.username,
            password: parsedCredentials.data.password,
            expiresInMins: 60,
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });

        if (!response.ok) {
          return null;
        }

        const data: unknown = await response.json();

        if (!isDummyJsonUser(data)) {
          return null;
        }

        // Không đưa access token của DummyJSON vào session của ShopLite.
        return {
          id: String(data.id),
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          image: data.image,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      // proxy.ts chỉ match route cần bảo vệ, nên `false` sẽ redirect về /login.
      return Boolean(auth?.user);
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.id === "string") {
        session.user.id = token.id;
      }

      return session;
    },
  },
});
