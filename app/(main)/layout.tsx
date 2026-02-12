import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import Link from "next/link"
import UserMenu from "@/app/components/UserMenu"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <nav className="flex gap-4">
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          {(session?.user as any)?.role === "admin" && (
            <Link href="/admin" className="hover:text-red-600">Admin</Link>
          )}
        </nav>
        <UserMenu />
      </header>
      <main>{children}</main>
    </div>
  )
}