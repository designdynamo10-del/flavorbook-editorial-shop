import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="TheFlavorBook home">
      <span aria-hidden className="text-primary">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v18H5.5A1.5 1.5 0 0 1 4 19.5v-15Z" />
          <path d="M8 3v18" />
          <path d="M12.5 8.5c1.8 0 3 1.2 3 3 0 1.8-1.6 3.3-3 4.5-1.4-1.2-3-2.7-3-4.5 0-1.8 1.2-3 3-3Z" />
        </svg>
      </span>
      <span className="font-serif text-xl leading-none font-semibold tracking-tight">
        The<span className="text-primary">Flavor</span>Book
      </span>
    </Link>
  );
}