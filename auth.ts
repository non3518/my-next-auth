// auth.ts
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { loginSchema } from "@/lib/validations/authSchema"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),  // ← เพิ่ม Adapter
  session: { strategy: "jwt" },     // ← ใช้ JWT เพราะ Credentials ต้องการ
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials)
        if (!result.success) return null

        const { email, password } = result.data

        // ค้นหา User จาก Database จริง
        const user = await prisma.user.findUnique({
          where: { email },
        })
        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // เพิ่ม role ลงใน JWT Token
      if (user) {
        token.role = (user as { role?: string }).role
      }

      if(account?.provider === "google" && profile) {
        token.name = profile.name
        token.email = profile.email
        token.picture = (profile as any).picture
      }
      return token
    },
    async session({ session, token }) {
      // เพิ่ม role ลงใน Session
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",  // หน้า Login แบบ Custom
  },
  secret: process.env.NEXTAUTH_SECRET,
}
 