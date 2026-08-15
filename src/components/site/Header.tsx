import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, User, X } from "lucide-react";
import { Logo } from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const nav = [
  { label: "Recipes", to: "/recipes" },
  { label: "Cookbooks", to: "/cookbooks" },
  { label: "Categories", to: "/categories" },
  { label: "Blog", to: "/blog" },
  { label: "Free Recipes", to: "/free-recipes" },
] as const;

export function Header() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) return;
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/search", search: { q: term.trim() } });
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-foreground text-background">
        <p className="container-page py-2 text-center text-[11px] tracking-[0.18em] uppercase">
          New cookbooks every month • Digital PDF downloads
        </p>
      </div>
      <div className="border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] bg-card sm:max-w-sm">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="px-5 pt-4">
                  <Logo />
                </div>
                <nav className="mt-6 flex flex-col px-5">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="border-b border-border/60 py-4 font-serif text-xl"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <form onSubmit={submitSearch} className="mt-6 flex gap-2 px-5">
                  <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search recipes, cookbooks…" />
                  <Button type="submit" size="icon" aria-label="Search">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-1 justify-start md:flex-none">
            <Logo />
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
              aria-label="Search"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            <Link
              to="/account"
              className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-secondary md:inline-flex"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <CartDrawer />
          </div>
        </div>
        {searchOpen && (
          <div className="border-t border-border/60 bg-card">
            <form onSubmit={submitSearch} className="container-page flex gap-2 py-4">
              <Input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search recipes, cookbooks, ingredients, articles…"
                className="h-11"
              />
              <Button type="submit" className="h-11">
                Search
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}