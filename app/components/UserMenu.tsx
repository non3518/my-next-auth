"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function UserMenu() {
  const { data: session, status } = useSession()

  // กำลังโหลด Session
  if (status === "loading") {
    return <div className="animate-pulse w-8 h-8 bg-gray-200 rounded-full" />
  }

  // ยังไม่ได้ Login
  if (!session) {
    return (
      <Link
        href="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        เข้าสู่ระบบ
      </Link>
    )
  }

  // Login แล้ว
  return (
    <div className="flex items-center gap-3">
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      )}
      <span className="text-sm font-medium">{session.user?.name}</span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-sm text-red-600 hover:underline"
      >
        ออกจากระบบ
      </button>
    </div>
  )
}