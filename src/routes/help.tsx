import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Centre & FAQ — TheFlavorBook" },
      { name: "description", content: "Answers about downloads, printing, refunds, privacy and getting in touch with TheFlavorBook team." },
      { property: "og:title", content: "Help Centre & FAQ — TheFlavorBook" },
      { property: "og:description", content: "Downloads, printing, refunds and contact information." },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  { q: "How do I download my cookbook?", a: "A secure download link is emailed to you the moment your payment is confirmed." },
  { q: "Can I print the PDF?", a: "Yes — every page is print-ready on A4 and US Letter." },
  { q: "What is your refund policy?", a: "Digital files are delivered instantly, so sales are final. If a file is faulty we will replace it or refund you." },
  { q: "How do you handle my data?", a: "We only store the email address needed to deliver your purchase and newsletter, and never sell it." },
  { q: "How do I contact you?", a: "Email hello@theflavorbook.com and we reply within two business days." },
];

function HelpPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-4xl">Help centre</h1>
        <p className="mt-3 text-muted-foreground">Downloads, printing, refunds and everything in between.</p>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}