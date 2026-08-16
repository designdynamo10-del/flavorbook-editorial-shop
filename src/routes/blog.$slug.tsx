import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts } from "@/data/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — TheFlavorBook" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — TheFlavorBook` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.updated,
        author: { "@type": "Organization", name: post.author },
        publisher: { "@type": "Organization", name: "TheFlavorBook" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
          { "@type": "ListItem", position: 3, name: post.title },
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
        <Link to="/blog" className="hover:text-primary">Blog</Link>
      </nav>
      <header className="mx-auto mt-8 max-w-3xl text-center">
        <p className="eyebrow text-primary">{post.category}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {post.author} • Updated {post.updated} • {post.readTime}
        </p>
      </header>
      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl">
        <img src={post.image} alt={post.title} className="w-full object-cover" />
      </div>
      <div className="mx-auto mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
        {post.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}