"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  Clock,
  MessageSquare,
  Megaphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { submitContact } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { SITE_NAME } from "@/lib/constants";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactReasons = [
  {
    icon: MessageSquare,
    title: "Report a Wrong Solution",
    desc:
      "If you find an incorrect answer in one of our puzzle guides, let us know and we will update it quickly.",
  },
  {
    icon: Mail,
    title: "Puzzle Request",
    desc:
      "Need help solving a puzzle not listed on our website? Send us the puzzle details and we may publish a solution.",
  },
  {
    icon: Clock,
    title: "Feature Your Product",
    desc:
      "Want your puzzle book, tool, or product featured on our Shop page? Contact us with details.",
  },
  {
    icon: Megaphone,
    title: "Advertising & Partnerships",
    desc:
      "Businesses can advertise or collaborate with our puzzle community through sponsored placements.",
  },
];

export default function ContactPage() {
  const { toast } = useToast();

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.subject.trim()) newErrors.subject = "Subject is required";

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });

      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll respond within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    mutation.mutate(form);
  };

  return (
    <main className="pt-6 pb-12">
      <div className="container max-w-4xl">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Contact {SITE_NAME}
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Found an incorrect puzzle solution? Need help solving another puzzle,
            want to feature a product on our shop page, or discuss advertising?
            Send us a message and our team will review it.
          </p>
        </motion.div>

        {/* Reasons */}

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactReasons.map((r) => (
            <div
              key={r.title}
              className="rounded-xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <r.icon className="h-6 w-6" />
              </div>

              <h3 className="font-display text-sm font-bold">{r.title}</h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}

        <div className="max-w-2xl mx-auto">

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center"
            >
              <CheckCircle className="h-14 w-14 text-primary" />

              <h3 className="font-display text-2xl font-bold">
                Message Sent Successfully!
              </h3>

              <p className="text-muted-foreground max-w-md">
                Thank you for contacting the {SITE_NAME} team. We typically
                respond within 24 hours. If your request was about puzzle
                solutions, product listings, or advertising opportunities,
                our team will review it shortly.
              </p>

              <Button
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="rounded-full px-6"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-1 text-sm font-medium">
                    Your Name
                  </label>

                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />

                  {errors.name && (
                    <p className="text-xs text-destructive flex gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 text-sm font-medium">
                    Email Address
                  </label>

                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />

                  {errors.email && (
                    <p className="text-xs text-destructive flex gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

              </div>

              <div>
                <label className="mb-1 text-sm font-medium">
                  Subject
                </label>

                <Input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Wrong puzzle answer / Feature request / Advertising"
                />
              </div>

              <div>
                <label className="mb-1 text-sm font-medium">
                  Message
                </label>

                <Textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                />

                {errors.message && (
                  <p className="text-xs text-destructive flex gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full gap-2 rounded-full py-6 text-base font-semibold"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}

                {mutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* SEO Content */}

        <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6 text-center">
          <h2 className="mb-2 font-display text-lg font-bold">
            Why Contact {SITE_NAME}?
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Our team publishes daily puzzle answers, strategy guides,
            and curated puzzle products. If you discover incorrect puzzle
            solutions, want help solving another puzzle, or wish to suggest
            improvements to the website, contacting us helps maintain
            accuracy and improve the experience for the entire community.
          </p>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            We also review requests from puzzle creators, developers,
            and businesses who want to feature their products on our
            shop page or advertise to our growing community of
            puzzle enthusiasts.
          </p>
        </div>

      </div>
    </main>
  );
}