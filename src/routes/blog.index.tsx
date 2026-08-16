import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Cooking Guides & Kitchen Notes — TheFlavorBook Blog" },
      { name: "description", content: "Long-form cooking guides, baking tips and recipe round-ups from TheFlavorBook kitchen." },
      { property: "og:title", content: "Cooking Guides & Kitchen Notes" },
      { property: "og:description", content: "Cooking guides, baking tips and recipe round-ups from TheFlavorBook." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="container-page py-14">
      <p className="eyebrow text-muted-foreground">Journal</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">From the kitchen</h1>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-lg"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="eyebrow text-primary">{post.category}</p>
              <h2 className="mt-2 font-serif text-xl leading-snug">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">{post.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}