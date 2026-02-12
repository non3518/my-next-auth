"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div className="mt-6">
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-sm text-red-600 hover:underline"
      >
        🚪 ออกจากระบบ
      </button>
    </div>
  );
}
