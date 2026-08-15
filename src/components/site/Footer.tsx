import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Delicious recipes. Inspiring cookbooks.
          </p>
          <div className="mt-6 max-w-xs">
            <NewsletterForm compact />
          </div>
        </div>

        <FooterColumn
          title="Shop"
          links={[
            { label: "Cookbooks", to: "/cookbooks" },
            { label: "Best Sellers", to: "/cookbooks" },
            { label: "New Releases", to: "/cookbooks" },
            { label: "Bundles", to: "/cookbooks" },
          ]}
        />
        <FooterColumn
          title="Recipes"
          links={[
            { label: "Breakfast", to: "/recipes" },
            { label: "Dinner", to: "/recipes" },
            { label: "Baking", to: "/recipes" },
            { label: "Desserts", to: "/recipes" },
            { label: "Healthy", to: "/recipes" },
          ]}
        />
        <FooterColumn
          title="Help"
          links={[
            { label: "Contact", to: "/help" },
            { label: "FAQ", to: "/help" },
            { label: "Download Help", to: "/help" },
            { label: "Refund Policy", to: "/help" },
            { label: "Terms", to: "/help" },
            { label: "Privacy", to: "/help" },
          ]}
        />
        <div>
          <h3 className="eyebrow text-muted-foreground">Follow Us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
              { label: "Pinterest", icon: Sparkles, href: "https://pinterest.com" },
              { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
              { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
            ].map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} TheFlavorBook</p>
          <p className="font-serif text-base text-foreground">Cook. Create. Enjoy.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; to: string }> }) {
  return (
    <div>
      <h3 className="eyebrow text-muted-foreground">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link, i) => (
          <li key={`${link.label}-${i}`}>
            <Link to={link.to} className="text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}