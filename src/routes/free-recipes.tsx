import { createFileRoute, Link } from "@tanstack/react-router";
import { recipes } from "@/data/content";
import { RecipeCard } from "./recipes.index";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export const Route = createFileRoute("/free-recipes")({
  head: () => ({
    meta: [
      { title: "Free Recipes & Sample Cookbook — TheFlavorBook" },
      { name: "description", content: "Get free tested recipes plus a sample chapter of our digital cookbooks, delivered straight to your inbox." },
      { property: "og:title", content: "Free Recipes & Sample Cookbook" },
      { property: "og:description", content: "Free tested recipes and a sample cookbook chapter from TheFlavorBook." },
    ],
  }),
  component: FreeRecipesPage,
});

function FreeRecipesPage() {
  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-primary">Free</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Free recipes, on the house</h1>
        <p className="mt-4 text-muted-foreground">
          Join the newsletter and we'll send a free 10-recipe sample chapter, plus a new recipe every week.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>

      <p className="mt-10 text-center text-muted-foreground">
        Want the full collection?{" "}
        <Link to="/cookbooks" className="text-primary underline">Browse the cookbooks</Link>
      </p>
    </div>
  );
}