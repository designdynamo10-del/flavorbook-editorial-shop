import { Link } from "@tanstack/react-router";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const image = p.images?.edges?.[0]?.node;
  return (
    <Link
      to="/cookbooks/$handle"
      params={{ handle: p.handle }}
      className="group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        <p className="eyebrow text-muted-foreground">Digital PDF</p>
        <h3 className="mt-1 font-serif text-lg leading-snug">{p.title}</h3>
        <p className="mt-2 font-medium">
          {formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}
        </p>
      </div>
    </Link>
  );
}