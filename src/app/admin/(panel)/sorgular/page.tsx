import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LeadActions } from "@/components/admin/LeadActions";

export const dynamic = "force-dynamic";

function fmtDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()} ${hh}:${mi}`;
}

function parseData(s: string): [string, string][] {
  try {
    const o = JSON.parse(s);
    return Object.entries(o).map(([k, v]) => [k.replace(/_/g, " "), String(v)]);
  } catch {
    return [];
  }
}

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Sorğular"
        subtitle={`${leads.length} form sorğusu · Quote və OEM formalarından`}
      />
      <div className="flex flex-col gap-4 p-8">
        {leads.length === 0 && (
          <div className="rounded-[4px] border border-dashed border-komfy-line2 bg-komfy-panel p-10 text-center text-[13.5px] font-light text-komfy-muted2">
            Hələ sorğu yoxdur. Saytdakı Quote və ya OEM forması doldurulanda burada görünəcək.
          </div>
        )}

        {leads.map((l) => {
          const fields = parseData(l.data);
          return (
            <div key={l.id} className="border border-komfy-line bg-komfy-card p-5">
              <div className="flex flex-wrap items-center gap-3 border-b border-komfy-line/60 pb-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] ${
                    l.type === "oem"
                      ? "bg-komfy-green text-komfy-surface"
                      : "bg-komfy-gold text-komfy-ink"
                  }`}
                >
                  {l.type}
                </span>
                <span className="font-serif text-[18px] text-komfy-ink">{l.name}</span>
                {l.company && <span className="text-[13.5px] text-komfy-muted">· {l.company}</span>}
                <span className="ml-auto text-[12.5px] text-komfy-muted2">{fmtDate(l.createdAt)}</span>
                <LeadActions id={l.id} status={l.status} />
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-komfy-text2">
                {l.email && (
                  <a href={`mailto:${l.email}`} className="font-medium text-komfy-green">
                    {l.email}
                  </a>
                )}
                {l.phone && <span>{l.phone}</span>}
                {l.country && <span>{l.country}</span>}
                {l.businessType && <span>{l.businessType}</span>}
                {l.path && <span className="text-komfy-muted2">Yol: {l.path}</span>}
              </div>

              {fields.length > 0 && (
                <div className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {fields.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-komfy-line/40 py-1.5 text-[12.5px]">
                      <span className="capitalize text-komfy-muted2">{k}</span>
                      <span className="text-right font-medium text-komfy-ink">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {l.comments && (
                <p className="mt-3 text-[13px] italic leading-[1.6] text-komfy-text3">
                  “{l.comments}”
                </p>
              )}
              {l.fileName && (
                <div className="mt-2 text-[12.5px] text-komfy-muted2">
                  📎 Fayl: {l.fileName}{" "}
                  <span className="text-komfy-muted/70">(uploads/ qovluğunda)</span>
                </div>
              )}
            </div>
          );
        })}

        {leads.length > 0 && (
          <p className="text-[12.5px] font-light text-komfy-muted2">
            Email bildirişi üçün .env-ə SMTP məlumatları əlavə edin (SMTP_HOST, SMTP_USER, SMTP_PASS,
            LEADS_EMAIL). Konfiqurasiya olmasa sorğular yalnız burada saxlanılır.
          </p>
        )}
      </div>
    </div>
  );
}
