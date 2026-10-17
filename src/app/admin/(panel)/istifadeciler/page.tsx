import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/admin/PageHeader";
import { UsersManager } from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [rows, session] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "asc" } }),
    getSession(),
  ]);

  const users = rows.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col">
      <PageHeader title="İstifadəçi və rollar" subtitle="Admin və satış operatoru hesabları" />
      <div className="p-8">
        <UsersManager
          users={users}
          currentUserId={session?.userId ?? ""}
          canManage={session?.role === "admin"}
        />
      </div>
    </div>
  );
}
