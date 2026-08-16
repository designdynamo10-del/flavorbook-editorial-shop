import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allCategories, recipes, blogPosts } from "@/data/content";
import { RecipeCard } from "./recipes.index";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = allCategories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — TheFlavorBook" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} Recipes — TheFlavorBook` },
        { name: "description", content: `${category.description} Browse ${category.name.toLowerCase()} recipes and cookbooks from TheFlavorBook.` },
        { property: "og:title", content: `${category.name} Recipes` },
        { property: "og:description", content: category.description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const key = category.name.toLowerCase();
  const matchedRecipes = recipes.filter((r) => r.category.toLowerCase().includes(key) || key.includes(r.category.toLowerCase()));
  const matchedPosts = blogPosts.filter((p) => p.category.toLowerCase() === key);

  return (
    <div className="container-page py-14">
      <nav className="text-sm text-muted-foreground">
        <Link to="/categories" className="hover:text-primary">Categories</Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>
      <h1 className="mt-6 font-serif text-4xl md:text-5xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{category.description}</p>

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
        <section className="mt-14">
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

      {matchedRecipes.length === 0 && matchedPosts.length === 0 && (
        <p className="mt-12 text-muted-foreground">
          New {category.name.toLowerCase()} content is on the way.{" "}
          <Link to="/cookbooks" className="text-primary underline">Browse cookbooks</Link>
        </p>
      )}
    </div>
  );
}