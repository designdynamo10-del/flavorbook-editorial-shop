import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Download, Heart, Printer } from "lucide-react";
import heroImage from "@/assets/hero-cookbook.jpg";
import newsletterBg from "@/assets/newsletter-bg.jpg";
import { featuredCategories, recipes, blogPosts } from "@/data/content";
import { productsQueryOptions } from "@/lib/shopify";
import { ProductCard } from "@/components/site/ProductCard";
import { RecipeCard } from "./recipes.index";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TheFlavorBook — Premium Digital Cookbooks & Easy Recipes" },
      { name: "description", content: "Beautifully designed digital cookbooks and free tested recipes. Instant PDF download, print friendly, made for real home kitchens." },
      { property: "og:title", content: "TheFlavorBook — Premium Digital Cookbooks" },
      { property: "og:description", content: "Digital cookbooks and free tested recipes, delivered instantly as PDFs." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: products, isLoading } = useQuery(productsQueryOptions(6));
  const featured = products?.[0];

  return (
    <>
      {/* Hero */}
      <section className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow text-primary">Digital cookbooks</p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">
            Cook something worth sharing tonight
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Tested recipes and beautifully designed cookbooks, delivered instantly as PDFs you can read anywhere and print any time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/cookbooks">Shop cookbooks</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/free-recipes">Get free recipes</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img src={heroImage} alt="Open cookbook surrounded by fresh ingredients" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl md:text-4xl">Browse by category</h2>
          <Link to="/categories" className="text-sm text-primary underline">View all</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-2xl p-5"
            >
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/45" />
              <div className="relative text-background">
                <h3 className="font-serif text-2xl">{c.name}</h3>
                <p className="mt-1 text-sm opacity-90">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container-page py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl md:text-4xl">Best-selling cookbooks</h2>
          <Link to="/cookbooks" className="text-sm text-primary underline">Shop all</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />)
            : (products ?? []).slice(0, 3).map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      </section>

      {/* Featured product */}
      {featured && (
        <section className="bg-secondary/50 py-16">
          <div className="container-page grid items-center gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-muted">
              {featured.node.images?.edges?.[0]?.node && (
                <img
                  src={featured.node.images.edges[0].node.url}
                  alt={featured.node.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="eyebrow text-primary">Featured cookbook</p>
              <h2 className="mt-3 font-serif text-4xl">{featured.node.title}</h2>
              <p className="mt-4 line-clamp-5 text-muted-foreground">{featured.node.description}</p>
              <Button asChild size="lg" className="mt-6">
                <Link to="/cookbooks/$handle" params={{ handle: featured.node.handle }}>
                  View cookbook
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Recipes */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl md:text-4xl">What's cooking today?</h2>
          <Link to="/recipes" className="text-sm text-primary underline">All recipes</Link>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

      {/* Lead magnet */}
      <section className="relative overflow-hidden py-20">
        <img src={newsletterBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="container-page relative mx-auto max-w-xl text-center text-background">
          <h2 className="font-serif text-4xl">Get 10 free recipes</h2>
          <p className="mt-3 opacity-90">
            Join the newsletter for a free sample chapter and a new tested recipe every week.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Download, title: "Instant download", text: "Your PDF arrives by email seconds after checkout." },
          { icon: Printer, title: "Print friendly", text: "Clean layouts sized for A4 and US Letter." },
          { icon: BookOpen, title: "Tested recipes", text: "Cooked and re-cooked in a real home kitchen." },
          { icon: Heart, title: "Yours forever", text: "No subscription, no expiry, no shipping." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border/70 bg-card p-6">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-serif text-xl">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      {/* Blog */}
      <section className="container-page pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl md:text-4xl">From the kitchen</h2>
          <Link to="/blog" className="text-sm text-primary underline">Read the blog</Link>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
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
                <h3 className="mt-2 font-serif text-xl leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
