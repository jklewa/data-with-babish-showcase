import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getReferenceBySlug,
  getReferences,
  typeLabel,
  youtubeIdFromUrl,
} from "@/lib/references";

function externalLinkLabel(url: string): string {
  try {
    const host = new URL(url).hostname;
    if (host.includes("imdb.com")) return "View on IMDb";
    if (host.includes("youtube.com") || host.includes("youtu.be")) return "Watch on YouTube";
    if (host.includes("steampowered.com")) return "View on Steam";
    return `Visit ${host.replace(/^www\./, "")}`;
  } catch {
    return "External link";
  }
}

export function generateStaticParams() {
  return getReferences().map((r) => ({ id: r.slug }));
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const ref = getReferenceBySlug(id);
  if (!ref) return {};
  return {
    title: `${ref.name} — BWB Archive`,
    description:
      ref.description ??
      `${ref.episodes_inspired.length} dishes inspired by ${ref.name} on Binging with Babish.`,
  };
}

export default async function ReferencePage({ params }: PageProps) {
  const { id } = await params;
  const ref = getReferenceBySlug(id);
  if (!ref) notFound();

  const featured = ref.episodes_inspired[0];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted transition hover:text-accent"
          >
            ← Archive
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {typeLabel(ref.type)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {ref.episodes_inspired.length}{" "}
              {ref.episodes_inspired.length === 1 ? "dish" : "dishes"}
            </span>
          </div>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            {ref.name}
          </h1>
          {ref.description && (
            <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {ref.description}
            </p>
          )}
          {ref.external_link && (
            <a
              href={ref.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-accent hover:underline"
            >
              {externalLinkLabel(ref.external_link)} ↗
            </a>
          )}
        </div>

        <section className="mt-12">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Dishes
          </h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ref.episodes_inspired.map((ep) => {
              const vid = youtubeIdFromUrl(ep.youtube_link);
              return (
                <li
                  key={ep.episode_id}
                  className="overflow-hidden rounded-md bg-surface ring-1 ring-border"
                >
                  <div className="relative aspect-video bg-black">
                    {ep.image_link ? (
                      <Image
                        src={ep.image_link}
                        alt={ep.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : null}
                    {vid && (
                      <a
                        href={ep.youtube_link!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 grid place-items-center bg-black/40 text-foreground opacity-0 transition hover:opacity-100"
                      >
                        <span className="rounded-full bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wider text-black">
                          ▶ Watch
                        </span>
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="font-serif text-lg leading-tight">{ep.name}</h3>
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
                      <span>{ep.published_date ?? "—"}</span>
                      {ep.youtube_link && (
                        <a
                          href={ep.youtube_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          YouTube ↗
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {featured && (
          <p className="mt-12 text-xs text-muted">
            First cooked {featured.published_date ?? "—"}.
          </p>
        )}
      </main>
    </div>
  );
}
