"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatFrom, type Product } from "@/data/products";

type Key = "position" | "build" | "cooling" | "firmness" | "budget";
type Answers = Partial<Record<Key, string>>;

interface Option {
  value: string;
  label: string;
  desc?: string;
}
interface Question {
  key: Key;
  title: string;
  help: string;
  images?: boolean;
  options: Option[];
}

const questions: Question[] = [
  {
    key: "position",
    title: "Adətən hansı vəziyyətdə yatırsınız?",
    help: "Bu, yay sisteminin və komfort qatının seçiminə ən çox təsir edən sualdır. Gecə vəziyyət dəyişirsə, ən çox yatdığınızı seçin.",
    images: true,
    options: [
      { value: "yan", label: "Yan", desc: "Çiyin və bud üçün yumşaqlıq lazımdır" },
      { value: "arxa", label: "Arxası üstə", desc: "Bel dəstəyi vacibdir" },
      { value: "qarin", label: "Qarnı üstə", desc: "Daha sərt matras lazımdır" },
      { value: "deyisir", label: "Dəyişir", desc: "Gecə boyu çevrilirəm" },
    ],
  },
  {
    key: "build",
    title: "Bədən quruluşunuz necədir?",
    help: "Bədən çəkisi yay sisteminin sıxlığını müəyyən edir — ağır bədən daha güclü dəstək tələb edir.",
    options: [
      { value: "yungul", label: "Yüngül", desc: "Daha yumşaq səth kifayətdir" },
      { value: "orta", label: "Orta", desc: "Balanslı dəstək" },
      { value: "iri", label: "İri", desc: "Daha möhkəm dəstək lazımdır" },
    ],
  },
  {
    key: "cooling",
    title: "Gecə isti yatırsınız?",
    help: "İsti yatanlar üçün Dry & Cool və HyperCool parçalar tərləməni azaldır.",
    options: [
      { value: "beli", label: "Bəli, tez qızıram", desc: "Sərinlədici parça vacibdir" },
      { value: "xeyr", label: "Xeyr", desc: "İstilik problem deyil" },
    ],
  },
  {
    key: "firmness",
    title: "Hansı sərtliyi sevirsiniz?",
    help: "Sərtlik nisbi anlayışdır — ümumi hissə görə seçin, dəqiqləşdirməni 30 gün sınaqda edəcəksiniz.",
    options: [
      { value: "yumsaq", label: "Yumşaq", desc: "Bulud kimi, qucaqlayan" },
      { value: "orta", label: "Orta", desc: "Balanslı" },
      { value: "sert", label: "Sərt", desc: "Möhkəm dəstək" },
    ],
  },
  {
    key: "budget",
    title: "Büdcəniz hansı seqmentdədir?",
    help: "Bütün seqmentlərdə ortopedik və hipoallergen modellər var — fərq materiallardadır.",
    options: [
      { value: "Ekonomik", label: "Ekonomik", desc: "199 – 669 AZN" },
      { value: "Komfort", label: "Komfort", desc: "299 – 949 AZN" },
      { value: "Premium", label: "Premium", desc: "759 – 1739 AZN" },
    ],
  },
];

function targetFirmness(a: Answers): number {
  let t = a.firmness === "yumsaq" ? 25 : a.firmness === "sert" ? 80 : 50;
  if (a.position === "yan") t -= 10;
  if (a.position === "qarin") t += 12;
  if (a.build === "yungul") t -= 8;
  if (a.build === "iri") t += 10;
  return Math.max(0, Math.min(100, t));
}

function scoreProduct(p: Product, a: Answers): number {
  let s = 100;
  const target = targetFirmness(a);
  s -= Math.abs(p.firmnessPct - target) * 0.7;
  if (a.budget) s += p.category === a.budget ? 40 : -8;
  if (a.cooling === "beli" && p.cooling) s += 15;
  if (p.popular) s += 4;
  return s;
}

export function MatrasQuiz({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const q = questions[step];
  const current = answers[q?.key];

  function select(value: string) {
    setAnswers((prev) => ({ ...prev, [q.key]: value }));
  }
  function next() {
    if (step < questions.length - 1) setStep((s) => s + 1);
    else setDone(true);
  }
  function back() {
    if (done) setDone(false);
    else if (step > 0) setStep((s) => s - 1);
  }
  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    const ranked = [...products]
      .map((p) => ({ p, score: scoreProduct(p, answers) }))
      .sort((x, y) => y.score - x.score);
    const top = ranked[0].p;
    const alts = ranked.slice(1, 3).map((r) => r.p);

    return (
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-8 px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">Sizin üçün tövsiyə</span>
          <h1 className="font-serif text-[36px] font-light text-komfy-ink sm:text-[42px]">
            Sizə {top.name} yaraşır
          </h1>
        </div>

        <div className="grid w-full gap-6 border border-komfy-line bg-komfy-card p-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-komfy-line">
            <Image src={top.image} alt={top.name} fill className="object-cover" sizes="400px" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-[10.5px]">{top.category}</span>
            <h3 className="font-serif text-[26px] text-komfy-ink">{top.name}</h3>
            <p className="text-[14px] font-light leading-[1.6] text-komfy-muted">
              {top.shortDescription}
            </p>
            <p className="mt-1 font-serif text-[20px] text-komfy-ink">
              {formatFrom(top.priceFrom)}
            </p>
            <Link href={`/mehsullar/${top.slug}`} className="btn-primary mt-2 self-start">
              Modelə bax
            </Link>
          </div>
        </div>

        {alts.length > 0 && (
          <div className="w-full">
            <p className="text-center text-[13px] font-medium text-komfy-muted">
              Digər uyğun seçimlər
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {alts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/mehsullar/${p.slug}`}
                  className="flex items-center gap-4 border border-komfy-line bg-komfy-card p-4 hover:border-komfy-green"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-komfy-line">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <h4 className="font-serif text-[18px] text-komfy-ink">{p.name}</h4>
                    <p className="text-[13px] font-light text-komfy-muted">
                      {formatFrom(p.priceFrom)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={reset}
          className="text-[14px] text-komfy-muted hover:text-komfy-ink"
        >
          ← Yenidən başla
        </button>
      </div>
    );
  }

  const progress = Math.round(((step + (current ? 1 : 0)) / questions.length) * 100);
  const cols =
    q.options.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : q.options.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <div className="flex flex-col items-center gap-9 bg-komfy-panel px-5 py-14 sm:px-8 lg:py-[80px]">
      {/* Progress */}
      <div className="flex w-full max-w-[760px] flex-col gap-3.5">
        <div className="flex justify-between text-[12px] uppercase tracking-[0.16em] text-komfy-muted2">
          <span>Rahatlıq testi</span>
          <span>
            Sual {step + 1} / {questions.length}
          </span>
        </div>
        <div className="h-[2px] bg-komfy-line">
          <div
            className="h-[2px] bg-komfy-green transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex w-full max-w-[760px] flex-col items-center gap-3 text-center">
        <h1 className="font-serif text-[32px] font-light leading-[1.15] text-komfy-ink sm:text-[44px]">
          {q.title}
        </h1>
        <p className="max-w-[480px] text-[15.5px] font-light leading-[1.6] text-komfy-muted">
          {q.help}
        </p>
      </div>

      {/* Options */}
      <div className={`grid w-full max-w-[900px] grid-cols-1 gap-[18px] ${cols}`}>
        {q.options.map((o) => {
          const active = current === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => select(o.value)}
              className={`relative flex flex-col items-center gap-4 bg-komfy-card p-6 text-center transition-all hover:-translate-y-0.5 ${
                active
                  ? "border-[1.5px] border-komfy-green"
                  : "border border-komfy-line hover:border-komfy-border"
              }`}
            >
              {active && (
                <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-komfy-green text-[12px] text-komfy-surface">
                  ✓
                </span>
              )}
              {q.images && (
                <span className="h-24 w-full bg-gradient-to-br from-[#EFE9DE] to-[#E2DACD]" />
              )}
              <span className="font-serif text-[17px] text-komfy-ink">{o.label}</span>
              {o.desc && (
                <span className="text-[12.5px] font-light leading-[1.5] text-komfy-muted">
                  {o.desc}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer nav */}
      <div className="flex w-full max-w-[900px] items-center justify-between border-t border-komfy-line pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="text-[14px] text-komfy-muted enabled:hover:text-komfy-ink disabled:opacity-40"
        >
          ← Geri
        </button>
        <span className="hidden text-[13px] font-light text-komfy-muted2 sm:block">
          Nəticə 9 modeldən birini tövsiyə edəcək
        </span>
        <button
          type="button"
          onClick={next}
          disabled={!current}
          className="rounded-full bg-komfy-green px-8 py-3.5 text-[14.5px] font-medium text-komfy-surface transition enabled:hover:bg-komfy-greenSoft disabled:opacity-40"
        >
          {step === questions.length - 1 ? "Nəticəni gör" : "Növbəti sual"}
        </button>
      </div>
    </div>
  );
}
