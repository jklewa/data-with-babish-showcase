import Image from "next/image";
import Link from "next/link";
import type { Reference } from "@/lib/references";
import { typeLabel } from "@/lib/references";

export function ReferenceCard({ reference }: { reference: Reference }) {
  const featured = reference.episodes_inspired[0];
  const img = reference.image_link ?? featured?.image_link ?? null;
  const count = reference.episodes_inspired.length;

  return (
    <Link
      href={`/reference/${reference.slug}`}
      className="group relative block aspect-[16/10] overflow-hidden rounded-md bg-surface ring-1 ring-border transition hover:ring-accent"
    >
      {img ? (
        <Image
          src={img}
          alt={`Dish from ${reference.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-muted">
          <span className="font-mono text-xs">no image</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span className="rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/90 backdrop-blur">
          {typeLabel(reference.type)}
        </span>
        {count > 1 && (
          <span className="rounded-sm bg-accent/90 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-black">
            {count} dishes
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-serif text-lg leading-tight text-foreground drop-shadow-sm sm:text-xl">
          {reference.name}
        </h3>
        {featured?.name && (
          <p className="mt-1 line-clamp-1 text-sm text-foreground/70">
            {stripInspiredBy(featured.name)}
          </p>
        )}
      </div>
    </Link>
  );
}

function stripInspiredBy(epName: string): string {
  return epName.replace(/\s*(inspired by|from)\s+.*$/i, "").trim();
}
