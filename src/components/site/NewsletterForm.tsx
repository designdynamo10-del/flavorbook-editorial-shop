import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmail("");
    toast.success("Welcome to TheFlavorBook!", {
      description: "Your free 10 Easy Weeknight Recipes PDF is on its way.",
      position: "top-center",
    });
  };

  return (
    <form onSubmit={submit} className={compact ? "flex flex-col gap-2" : "flex flex-col gap-3 sm:flex-row"}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className={compact ? "h-10 bg-card" : "h-12 bg-card sm:flex-1"}
      />
      <Button type="submit" className={compact ? "h-10" : "h-12 px-7"}>
        {compact ? "Get Free Recipes" : "Join TheFlavorBook"}
      </Button>
    </form>
  );
}