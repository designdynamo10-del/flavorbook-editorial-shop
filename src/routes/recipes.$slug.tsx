import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Flame, Printer, Users } from "lucide-react";
import { recipes } from "@/data/content";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = recipes.find((r) => r.slug === params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Recipe not found — TheFlavorBook" }, { name: "robots", content: "noindex" }] };
    }
    const { recipe } = loaderData;
    return {
      meta: [
        { title: `${recipe.title} — TheFlavorBook` },
        { name: "description", content: recipe.excerpt },
        { property: "og:title", content: recipe.title },
        { property: "og:description", content: recipe.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: RecipePage,
});

function RecipePage() {
  const { recipe } = Route.useLoaderData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Recipe",
        name: recipe.title,
        description: recipe.excerpt,
        recipeCategory: recipe.category,
        prepTime: recipe.prep,
        cookTime: recipe.cook,
        totalTime: recipe.time,
        recipeYield: recipe.servings,
        recipeIngredient: recipe.ingredients,
        recipeInstructions: recipe.instructions.map((text) => ({ "@type": "HowToStep", text })),
        author: { "@type": "Organization", name: "TheFlavorBook" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Recipes", item: "/recipes" },
          { "@type": "ListItem", position: 3, name: recipe.title },
        ],
      },
    ],
  };

  return (
    <article className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="px-2">/</span>
        <Link to="/recipes" className="hover:text-primary">Recipes</Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{recipe.title}</span>
      </nav>

      <header className="mx-auto mt-8 max-w-3xl text-center">
        <p className="eyebrow text-primary">{recipe.category}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{recipe.title}</h1>
        <p className="mt-4 text-muted-foreground">{recipe.intro}</p>
        <Button variant="outline" className="mt-6" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print recipe
        </Button>
      </header>

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl">
        <img src={recipe.image} alt={recipe.title} className="w-full object-cover" />
      </div>

      <dl className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 rounded-2xl bg-secondary/50 p-6 sm:grid-cols-4">
        <Stat icon={<Clock className="h-4 w-4" />} label="Prep" value={recipe.prep} />
        <Stat icon={<Flame className="h-4 w-4" />} label="Cook" value={recipe.cook} />
        <Stat icon={<Users className="h-4 w-4" />} label="Serves" value={recipe.servings} />
        <Stat icon={<Flame className="h-4 w-4" />} label="Difficulty" value={recipe.difficulty} />
      </dl>

      <div className="mx-auto mt-12 grid max-w-4xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <section>
          <h2 className="font-serif text-2xl">Ingredients</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {recipe.ingredients.map((i) => (
              <li key={i} className="border-b border-border/60 pb-3">{i}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-2xl">Instructions</h2>
          <ol className="mt-4 space-y-5">
            {recipe.instructions.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-serif text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-8">
        <ListBlock title="Tips from our kitchen" items={recipe.tips} />
        <ListBlock title="Substitutions" items={recipe.substitutions} />
        <section>
          <h2 className="font-serif text-2xl">Storage</h2>
          <p className="mt-3 text-muted-foreground">{recipe.storage}</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl">FAQ</h2>
          <div className="mt-4 space-y-4">
            {recipe.faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-1 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow flex items-center gap-1.5 text-muted-foreground">{icon}{label}</dt>
      <dd className="mt-1 font-serif text-lg">{value}</dd>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="font-serif text-2xl">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}