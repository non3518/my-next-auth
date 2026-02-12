import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // ถ้าไม่ได้ Login → Redirect ไปหน้า Login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          ข้อมูล Session (Server-side)
        </h2>

        <div className="space-y-2">
          <p>
            👤 ชื่อ: <strong>{session.user?.name}</strong>
          </p>
          <p>
            📧 อีเมล: <strong>{session.user?.email}</strong>
          </p>
          <p>
            🔑 Role: <strong>{(session.user as any)?.role || "user"}</strong>
          </p>
        </div>

        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full mt-4"
          />
        )}
        <LogoutButton />
      </div>
    </div>
  );
}
