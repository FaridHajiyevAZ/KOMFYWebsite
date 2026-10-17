export function FirmnessBar({
  pct,
  labels = false,
  dark = false,
  size = "sm",
}: {
  pct: number;
  labels?: boolean;
  dark?: boolean;
  size?: "sm" | "lg";
}) {
  const dot = size === "lg" ? 13 : 10;
  const offset = dot / 2 + 2;
  return (
    <div className="flex flex-col gap-2">
      {labels && (
        <div className="flex justify-between text-[11px] font-normal uppercase tracking-[0.1em] text-komfy-muted2">
          <span>Yumşaq</span>
          <span>Sərt</span>
        </div>
      )}
      <div
        className="relative"
        style={{ height: size === "lg" ? 3 : 2, background: "#E2DACD" }}
      >
        <span
          className="absolute rounded-full"
          style={{
            left: `${pct}%`,
            top: -offset + 1,
            width: dot,
            height: dot,
            transform: "translateX(-50%)",
            background: dark ? "#2F3B33" : "#9C7A45",
          }}
        />
      </div>
    </div>
  );
}
