// src\components\home\FAQSection.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FAQ_DATA } from "@/lib/constants";

const FAQSection = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-lg border border-border bg-card px-5 data-[state=open]:bg-accent/30"
              >
                <AccordionTrigger className="py-4 font-display text-sm font-semibold hover:no-underline sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
