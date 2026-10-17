// B2B sorğuları üçün email bildirişi.
// SMTP konfiqurasiya olunmayıbsa (env yoxdursa) email ötürülür — sorğu yenə bazaya yazılır.
// Aktivləşdirmək üçün .env-ə əlavə edin: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_EMAIL

export interface LeadEmail {
  type: string;
  path?: string | null;
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  businessType?: string | null;
  comments?: string | null;
  data?: Record<string, string>;
  fileName?: string | null;
}

export async function sendLeadEmail(lead: LeadEmail): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const to = process.env.LEADS_EMAIL || "info@komfy.az";

  if (!host) {
    console.log(
      `[mail] SMTP konfiqurasiya olunmayıb — sorğu bazaya yazıldı, email ötürüldü (${lead.type}: ${lead.name})`
    );
    return false;
  }

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transport = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    const lines: string[] = [
      `New ${lead.type.toUpperCase()} enquiry from komfy.az`,
      ``,
      lead.path ? `Path: ${lead.path}` : "",
      `Name: ${lead.name}`,
      lead.company ? `Company: ${lead.company}` : "",
      lead.email ? `Email: ${lead.email}` : "",
      lead.phone ? `Phone: ${lead.phone}` : "",
      lead.country ? `Country: ${lead.country}` : "",
      lead.businessType ? `Business type: ${lead.businessType}` : "",
      ``,
      ...Object.entries(lead.data || {}).map(([k, v]) => `${k}: ${v}`),
      ``,
      lead.comments ? `Comments: ${lead.comments}` : "",
      lead.fileName ? `Attachment: ${lead.fileName}` : "",
    ].filter(Boolean);

    await transport.sendMail({
      from: process.env.SMTP_FROM || `KOMFY Website <${to}>`,
      to,
      replyTo: lead.email || undefined,
      subject: `New ${lead.type} enquiry — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: lines.join("\n"),
    });
    return true;
  } catch (e) {
    console.error("[mail] göndərmə uğursuz oldu:", e);
    return false;
  }
}
