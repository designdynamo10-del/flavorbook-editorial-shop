import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mail } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Downloads & Account — TheFlavorBook" },
      { name: "description", content: "Find your cookbook download links, resend a purchase email, or get help accessing your digital PDFs." },
      { property: "og:title", content: "Your Downloads & Account" },
      { property: "og:description", content: "Access your TheFlavorBook cookbook downloads." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-serif text-4xl">Your downloads</h1>
        <p className="mt-4 text-muted-foreground">
          Every purchase is delivered instantly by email as a secure PDF link — no account required.
        </p>
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl bg-secondary/50 p-6">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-serif text-xl">Lost your email?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Search your inbox for "TheFlavorBook" and check the promotions folder.
            </p>
          </div>
          <div className="rounded-2xl bg-secondary/50 p-6">
            <Download className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-serif text-xl">Link expired?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Get in touch and we'll issue a fresh download link right away.
            </p>
          </div>
        </div>
        <Link to="/help" className="mt-8 inline-block text-primary underline">
          Visit the help centre
        </Link>
      </div>
    </div>
  );
}