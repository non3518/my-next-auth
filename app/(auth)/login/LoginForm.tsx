"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import OAuthButtons from "./OAuthButtons"

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setIsPending(false)

    if (res?.error) {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-center mb-6">🔐 เข้าสู่ระบบ</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">อีเมล</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="your@email.com"
            defaultValue="admin@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
            defaultValue="password123"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "⏳ กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>
      <OAuthButtons />
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>ทดสอบด้วย:</p>
        <p>Admin: admin@example.com / password123</p>
        <p>User: user@example.com / password123</p>
      </div>

      
    </div>
  )
}