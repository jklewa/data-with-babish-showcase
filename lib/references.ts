import raw from "@/data/references.json";

export type ReferenceType =
  | "movie"
  | "tv_show"
  | "video_game"
  | "youtube_channel"
  | "comedy_special"
  | "other";

export type EpisodeInspired = {
  episode_id: string;
  name: string;
  published_date: string | null;
  youtube_link: string | null;
  official_link: string | null;
  image_link: string | null;
};

export type Reference = {
  reference_id: number;
  slug: string;
  type: ReferenceType;
  name: string;
  description: string | null;
  external_link: string | null;
  image_link: string | null;
  episodes_inspired: EpisodeInspired[];
};

const TYPE_LABEL: Record<ReferenceType, string> = {
  movie: "Movie",
  tv_show: "TV Show",
  video_game: "Video Game",
  youtube_channel: "YouTube",
  comedy_special: "Comedy",
  other: "Other",
};

export function typeLabel(t: ReferenceType): string {
  return TYPE_LABEL[t] ?? "Other";
}

function slugify(name: string, id: number): string {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base ? `${base}-${id}` : String(id);
}

let cached: Reference[] | null = null;

export function getReferences(): Reference[] {
  if (cached) return cached;
  const all = raw as Array<Record<string, unknown>>;
  const typed = all
    .filter((r) => typeof r.type === "string" && r.type)
    .map<Reference>((r) => {
      const id = r.reference_id as number;
      const name = r.name as string;
      return {
        reference_id: id,
        slug: slugify(name, id),
        type: r.type as ReferenceType,
        name,
        description: (r.description as string | null) ?? null,
        external_link: (r.external_link as string | null) ?? null,
        image_link: (r.image_link as string | null) ?? null,
        episodes_inspired: ((r.episodes_inspired as EpisodeInspired[]) ?? [])
          .slice()
          .sort((a, b) => (b.published_date ?? "").localeCompare(a.published_date ?? "")),
      };
    });
  typed.sort((a, b) => {
    const diff = b.episodes_inspired.length - a.episodes_inspired.length;
    return diff !== 0 ? diff : a.name.localeCompare(b.name);
  });
  cached = typed;
  return typed;
}

export function getReferenceBySlug(slug: string): Reference | undefined {
  return getReferences().find((r) => r.slug === slug);
}

export function youtubeIdFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/[?&]v=([\w-]+)/) ?? url.match(/youtu\.be\/([\w-]+)/);
  return m ? m[1] : null;
}
