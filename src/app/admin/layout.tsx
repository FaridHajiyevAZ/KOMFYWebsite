export const metadata = {
  title: "KOMFY Admin",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-komfy-bg">{children}</div>;
}
