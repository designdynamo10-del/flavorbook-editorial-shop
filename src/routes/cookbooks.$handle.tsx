import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, Check, Download, FileText, Smartphone } from "lucide-react";
import { productQueryOptions, productsQueryOptions, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/cookbooks/$handle")({
  head: ({ params }) => {
    const title = params.handle
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${title} — Digital Cookbook | TheFlavorBook` },
        { name: "description", content: `${title} is a premium digital cookbook from TheFlavorBook. Instant PDF download with tested, beautifully photographed recipes.` },
        { property: "og:title", content: `${title} — Digital Cookbook` },
        { property: "og:description", content: `Download ${title} instantly as a premium PDF cookbook.` },
      ],
    };
  },
  component: ProductPage,
});

const faqs = [
  { q: "How do I receive my cookbook?", a: "Immediately after checkout you receive an email with a secure download link to your PDF." },
  { q: "Can I print the recipes?", a: "Yes. Every page is formatted for clean printing on A4 and US Letter." },
  { q: "Which devices can I read it on?", a: "Any device that opens a PDF — phone, tablet, laptop or e-reader." },
  { q: "Do you offer refunds?", a: "Because the files are delivered instantly, digital purchases are final. Contact us if a file will not open and we'll fix it." },
];

function ProductPage() {
  const { handle } = Route.useParams();
  const { data, isLoading } = useQuery(productQueryOptions(handle));
  const { data: related } = useQuery(productsQueryOptions(6));
  const addItem = useCartStore((s) => s.addItem);
  const [active, setActive] = useState(0);
  const [adding, setAdding] = useState(false);

  if (isLoading) {
    return (
      <div className="container-page grid gap-10 py-14 md:grid-cols-2">
        <Skeleton className="aspect-[4/5] rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-serif text-3xl">Cookbook not found</h1>
        <Link to="/cookbooks" className="mt-4 inline-block text-primary underline">
          Back to all cookbooks
        </Link>
      </div>
    );
  }

  const p = data.node;
  const images = p.images?.edges?.map((e) => e.node) ?? [];
  const variant = p.variants?.edges?.[0]?.node;
  const price = variant?.price ?? p.priceRange.minVariantPrice;

  const handleAdd = async () => {
    if (!variant) return;
    setAdding(true);
    try {
      await addItem({
        product: data,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions ?? [],
      });
      toast.success("Added to cart", { description: p.title });
    } finally {
      setAdding(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: p.title,
        description: p.description,
        image: images.map((i) => i.url),
        brand: { "@type": "Brand", name: "TheFlavorBook" },
        offers: {
          "@type": "Offer",
          price: price.amount,
          priceCurrency: price.currencyCode,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Cookbooks", item: "/cookbooks" },
          { "@type": "ListItem", position: 3, name: p.title },
        ],
      },
    ],
  };

  return (
    <div className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="px-2">/</span>
        <Link to="/cookbooks" className="hover:text-primary">Cookbooks</Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{p.title}</span>
      </nav>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
            {images[active] && (
              <img src={images[active].url} alt={images[active].altText ?? p.title} className="h-full w-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  onClick={() => setActive(i)}
                  aria-label={`Preview ${i + 1}`}
                  className={`h-20 w-16 overflow-hidden rounded-lg border ${i === active ? "border-primary" : "border-border"}`}
                >
                  <img src={img.url} alt={img.altText ?? p.title} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            <FileText className="h-3.5 w-3.5" /> Digital PDF
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">{p.title}</h1>
          <p className="mt-4 font-serif text-3xl">{formatPrice(price.amount, price.currencyCode)}</p>
          <p className="mt-4 whitespace-pre-line text-muted-foreground">{p.description}</p>

          <Button size="lg" className="mt-6 w-full" onClick={handleAdd} disabled={adding || !variant}>
            {adding ? "Adding…" : "Add to cart"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Instant download • No shipping • Read on any device
          </p>

          <div className="mt-8 rounded-2xl bg-secondary/50 p-6">
            <h2 className="font-serif text-xl">What's inside</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { icon: BookOpen, text: "Beautifully designed, photo-led recipe pages" },
                { icon: Check, text: "Every recipe tested in a home kitchen" },
                { icon: Download, text: "Instant PDF download after checkout" },
                { icon: Smartphone, text: "Mobile, tablet and print friendly layout" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-serif text-xl">Frequently asked</h2>
            <Accordion type="single" collapsible className="mt-2">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {(related ?? []).filter((r) => r.node.handle !== handle).length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-3xl">You may also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(related ?? [])
              .filter((r) => r.node.handle !== handle)
              .slice(0, 3)
              .map((r) => (
                <ProductCard key={r.node.id} product={r} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}