import { getSettings } from "@/lib/content";
import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsForm, type SettingsValues } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [s, session] = await Promise.all([getSettings(), getSession()]);

  const initial: SettingsValues = {
    fullName: s.fullName,
    slogan: s.slogan,
    phone: s.phone,
    whatsapp: s.whatsapp,
    instagram: s.instagram,
    instagramHandle: s.instagramHandle,
    email: s.email,
    address: s.address,
    since: s.since,
  };

  return (
    <div className="flex flex-col">
      <PageHeader title="Parametrlər" subtitle="Sayt üzrə ümumi məlumatlar və əlaqə" />
      <div className="p-8">
        <SettingsForm initial={initial} canEdit={session?.role === "admin"} />
      </div>
    </div>
  );
}
