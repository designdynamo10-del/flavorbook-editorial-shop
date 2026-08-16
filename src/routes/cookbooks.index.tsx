import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/lib/shopify";
import { ProductCard } from "@/components/site/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/cookbooks/")({
  head: () => ({
    meta: [
      { title: "Digital Cookbooks — TheFlavorBook" },
      { name: "description", content: "Browse premium digital cookbooks from TheFlavorBook. Instant PDF download, beautifully designed, tested recipes." },
      { property: "og:title", content: "Digital Cookbooks — TheFlavorBook" },
      { property: "og:description", content: "Premium digital cookbooks, delivered instantly as PDF downloads." },
    ],
  }),
  component: CookbooksPage,
});

function CookbooksPage() {
  const { data, isLoading } = useQuery(productsQueryOptions(24));

  return (
    <div className="container-page py-14">
      <p className="eyebrow text-muted-foreground">Shop</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Digital Cookbooks</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every cookbook is a downloadable PDF — print-friendly, mobile-ready and yours forever.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />)
          : (data ?? []).map((product) => <ProductCard key={product.node.id} product={product} />)}
      </div>
      {!isLoading && (data ?? []).length === 0 && (
        <p className="mt-10 text-muted-foreground">No cookbooks available right now. Please check back soon.</p>
      )}
    </div>
  );
}