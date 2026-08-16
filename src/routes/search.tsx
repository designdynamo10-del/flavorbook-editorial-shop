import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { recipes, blogPosts, allCategories } from "@/data/content";
import { productsQueryOptions } from "@/lib/shopify";
import { ProductCard } from "@/components/site/ProductCard";
import { RecipeCard } from "./recipes.index";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Recipes, Cookbooks & Articles — TheFlavorBook" },
      { name: "description", content: "Search TheFlavorBook for recipes, digital cookbooks, categories and cooking articles." },
      { property: "og:title", content: "Search — TheFlavorBook" },
      { property: "og:description", content: "Find recipes, cookbooks and articles across TheFlavorBook." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const { data: products } = useQuery(productsQueryOptions(24));

  const matchedProducts = (products ?? []).filter(
    (p) => !term || `${p.node.title} ${p.node.description}`.toLowerCase().includes(term),
  );
  const matchedRecipes = recipes.filter(
    (r) => !term || `${r.title} ${r.category} ${r.excerpt} ${r.ingredients.join(" ")}`.toLowerCase().includes(term),
  );
  const matchedPosts = blogPosts.filter(
    (p) => !term || `${p.title} ${p.category} ${p.excerpt}`.toLowerCase().includes(term),
  );
  const matchedCategories = allCategories.filter((c) => !term || c.name.toLowerCase().includes(term));

  const total = matchedProducts.length + matchedRecipes.length + matchedPosts.length + matchedCategories.length;

  return (
    <div className="container-page py-14">
      <p className="eyebrow text-muted-foreground">Search</p>
      <h1 className="mt-2 font-serif text-4xl">
        {term ? <>Results for “{q}”</> : "Search TheFlavorBook"}
      </h1>
      <p className="mt-2 text-muted-foreground">{total} result{total === 1 ? "" : "s"}</p>

      {matchedCategories.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl">Categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {matchedCategories.map((c) => (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {matchedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl">Cookbooks</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedProducts.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {matchedRecipes.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl">Recipes</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {matchedRecipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}

      {matchedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl">Articles</h2>
          <ul className="mt-6 space-y-4">
            {matchedPosts.map((p) => (
              <li key={p.slug}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="font-serif text-xl hover:text-primary">
                  {p.title}
                </Link>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {total === 0 && (
        <p className="mt-12 text-muted-foreground">
          Nothing matched that search. Try “pasta”, “cookies” or{" "}
          <Link to="/cookbooks" className="text-primary underline">browse the cookbooks</Link>.
        </p>
      )}
    </div>
  );
}