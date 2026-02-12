"use client"

import { signIn } from "next-auth/react"

export default function OAuthButtons() {
  return (
    <div className="space-y-3">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">หรือเข้าสู่ระบบด้วย</span>
        </div>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
      >
        🔵 เข้าสู่ระบบด้วย Google
      </button>
    </div>
  )
}