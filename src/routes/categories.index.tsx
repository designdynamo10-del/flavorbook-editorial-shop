import { createFileRoute, Link } from "@tanstack/react-router";
import { allCategories } from "@/data/content";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Recipe Categories — TheFlavorBook" },
      { name: "description", content: "Browse recipes and cookbooks by category: baking, desserts, air fryer, healthy, dinner, breakfast and more." },
      { property: "og:title", content: "Recipe Categories — TheFlavorBook" },
      { property: "og:description", content: "Browse recipes and cookbooks by category." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="container-page py-14">
      <p className="eyebrow text-muted-foreground">Explore</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Categories</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCategories.map((c) => (
          <Link
            key={c.slug}
            to="/categories/$slug"
            params={{ slug: c.slug }}
            className="group relative flex min-h-40 flex-col justify-end overflow-hidden rounded-2xl border border-border/70 bg-secondary p-5"
          >
            {c.image && (
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {c.image && <div className="absolute inset-0 bg-foreground/45" />}
            <div className={`relative ${c.image ? "text-background" : ""}`}>
              <h2 className="font-serif text-2xl">{c.name}</h2>
              <p className="mt-1 text-sm opacity-85">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}