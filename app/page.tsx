import { Gallery } from "@/components/Gallery";
import { getReferences } from "@/lib/references";

export default function Home() {
  const references = getReferences();
  const totalEpisodes = references.reduce((n, r) => n + r.episodes_inspired.length, 0);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            The Binging with Babish Archive
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Every film, show & game{" "}
            <span className="text-accent">cooked</span> on Binging with Babish.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            An interactive archive of {references.length} references and{" "}
            {totalEpisodes} dishes drawn from the{" "}
            <a
              href="https://github.com/jklewa/data-with-babish"
              className="text-foreground underline decoration-border underline-offset-4 transition hover:decoration-accent"
            >
              data-with-babish
            </a>{" "}
            dataset. Browse by medium, search by name, click a tile to see every dish.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <Gallery references={references} />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-muted">
          Data scraped from{" "}
          <a href="https://www.bingingwithbabish.com" className="hover:text-foreground">
            bingingwithbabish.com
          </a>{" "}
          and YouTube. Not affiliated with Andrew Rea or Babish Culinary Universe.
        </div>
      </footer>
    </div>
  );
}
