import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // DEBUG LOGS
        console.log("=== AUTH DEBUG ===")
        console.log("Received credentials:", credentials?.email)
        console.log("Expected email:", process.env.ADMIN_EMAIL)
        console.log("Passwords match:", credentials?.password === process.env.ADMIN_PASSWORD)
        console.log("================")

        // Check credentials against environment variables
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          console.log("✅ Authentication successful!")
          return {
            id: "1",
            email: credentials.email,
            name: "Admin",
          }
        }
        
        console.log("❌ Authentication failed!")
        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
