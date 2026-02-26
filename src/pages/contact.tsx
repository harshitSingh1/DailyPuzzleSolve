import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import AdSenseAd from "@/components/AdSenseAd";
import { submitContact } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();

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
    } else if (form.message.trim().length < 20) {
      newErrors.message = "Message should be at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      toast({ title: "Message sent!", description: "We'll get back to you as soon as possible." });
    },
    onError: () => {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <>
      <SEOHead
        title="Contact Us – Get Help with Puzzle Solutions"
        description="Have questions, feedback, or need help with a puzzle? Get in touch with the PuzzleLogicHub team. We typically respond within 24 hours."
        path="/contact"
        robots="index, follow"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact PuzzleLogicHub",
          url: "https://dailypuzzlesolve.com/contact",
          publisher: { "@type": "Organization", name: "PuzzleLogicHub" },
        }}
      />
      <main className="pt-6 pb-12">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-3 font-display text-3xl font-extrabold sm:text-4xl">Contact Us</h1>
              <p className="mx-auto max-w-lg text-muted-foreground">
                Have questions, suggestions, or found a bug? We&apos;d love to hear from you!
              </p>
            </div>

            {mutation.isSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center"
              >
                <CheckCircle className="h-14 w-14 text-primary" />
                <h2 className="font-display text-2xl font-bold">Message Sent!</h2>
                <p className="text-muted-foreground">
                  Your message has been sent successfully. We&apos;ll get back to you soon.
                </p>
                <Button variant="outline" onClick={() => mutation.reset()} className="mt-2 rounded-full px-6">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-lg transition-shadow hover:shadow-xl sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Your Name</label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Subject</label>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Your Message</label>
                  <Textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more... (at least 20 characters)"
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {mutation.isError && <p className="text-sm text-destructive">Failed to send. Please try again.</p>}

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full gap-2 rounded-full py-6 text-base font-semibold"
                >
                  {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}

            <AdSenseAd slot="3923231851" className="mt-8" />
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Contact;
