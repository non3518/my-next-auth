// seed.ts 
// prisma/seed.ts
import "dotenv/config"
import bcrypt from "bcryptjs"
// GENERATED PRISMA CLIENT ของใครของมันตาม ตั้งค่า
import { PrismaClient } from "@/lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({connectionString})

const prisma = new PrismaClient({adapter})

async function main() {
  // สร้าง Admin User
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "admin",
    },
  })

  // สร้าง Normal User
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Normal User",
      email: "user@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "user",
    },
  })

  console.log("✅ Seed completed")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

 