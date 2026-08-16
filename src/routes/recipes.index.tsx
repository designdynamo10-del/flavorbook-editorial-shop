import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";
import { recipes } from "@/data/content";

export const Route = createFileRoute("/recipes/")({
  head: () => ({
    meta: [
      { title: "Easy Recipes for Every Day — TheFlavorBook" },
      { name: "description", content: "Tested, easy recipes for weeknight dinners, baking, desserts and healthy eating from TheFlavorBook kitchen." },
      { property: "og:title", content: "Easy Recipes for Every Day — TheFlavorBook" },
      { property: "og:description", content: "Tested, easy recipes for dinners, baking and healthy eating." },
    ],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  return (
    <div className="container-page py-14">
      <p className="eyebrow text-muted-foreground">Recipes</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">What's cooking today?</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Free recipes from our kitchen — each one tested until it works every single time.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export function RecipeCard({ recipe }: { recipe: (typeof recipes)[number] }) {
  return (
    <Link
      to="/recipes/$slug"
      params={{ slug: recipe.slug }}
      className="group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="eyebrow text-primary">{recipe.category}</p>
        <h3 className="mt-2 font-serif text-xl leading-snug">{recipe.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{recipe.excerpt}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{recipe.time}</span>
          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}