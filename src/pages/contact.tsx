import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, Mail, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import { submitContact } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactReasons = [
  { icon: MessageSquare, title: "Report a Wrong Solution", desc: "Found an error in one of our daily puzzle answers? Let us know and we will fix it right away." },
  { icon: Mail, title: "General Feedback", desc: "Suggestions for new features, puzzle coverage, or website improvements are always welcome." },
  { icon: Clock, title: "Partnership Inquiries", desc: "Interested in collaborating, guest posting, or advertising? Reach out with your proposal." },
];

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
      toast({ title: "Failed to send", description: "Something went wrong. Please try again.", variant: "destructive" });
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
        title="Contact Us – Report Issues & Get Help"
        description="Have questions about a puzzle solution, found an error, or want to suggest a feature? Contact the PuzzleLogicHub team. We typically respond within 24 hours."
        path="/contact"
        robots="index, follow"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${SITE_NAME}`,
          url: `${SITE_URL}/contact`,
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <main className="pt-6 pb-12">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-3 font-display text-3xl font-extrabold sm:text-4xl">Contact Us</h1>
              <p className="mx-auto max-w-lg text-muted-foreground">
                We read every message and typically respond within 24 hours. Whether you spotted an error in a solution, have a feature request, or just want to say hello, we are here to help.
              </p>
            </div>

            {/* Reasons to Contact */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {contactReasons.map((r) => (
                <div key={r.title} className="rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-display text-sm font-bold">{r.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Form Section */}
            <div className="max-w-2xl mx-auto">
              <h2 className="mb-4 font-display text-xl font-bold text-center">Send Us a Message</h2>

              {mutation.isSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center"
                >
                  <CheckCircle className="h-14 w-14 text-primary" />
                  <h3 className="font-display text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground">Your message has been sent successfully. We will get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => mutation.reset()} className="mt-2 rounded-full px-6">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Your Name</label>
                      <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={errors.name ? "border-destructive" : ""} />
                      {errors.name && <p className="mt-1 flex items-center gap-1 text-xs text-destructive"><AlertCircle className="h-3 w-3" /> {errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email Address</label>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={errors.email ? "border-destructive" : ""} />
                      {errors.email && <p className="mt-1 flex items-center gap-1 text-xs text-destructive"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Subject</label>
                    <Input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Wrong Pinpoint answer on Feb 28" className={errors.subject ? "border-destructive" : ""} />
                    {errors.subject && <p className="mt-1 flex items-center gap-1 text-xs text-destructive"><AlertCircle className="h-3 w-3" /> {errors.subject}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Your Message</label>
                    <Textarea name="message" rows={6} value={form.message} onChange={handleChange} placeholder="Tell us more... (at least 20 characters)" className={errors.message ? "border-destructive" : ""} />
                    {errors.message && <p className="mt-1 flex items-center gap-1 text-xs text-destructive"><AlertCircle className="h-3 w-3" /> {errors.message}</p>}
                  </div>
                  {mutation.isError && <p className="text-sm text-destructive">Failed to send. Please try again.</p>}
                  <Button type="submit" disabled={mutation.isPending} className="w-full gap-2 rounded-full py-6 text-base font-semibold">
                    {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6 text-center">
              <h2 className="mb-2 font-display text-lg font-bold">Other Ways to Reach Us</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You can also reach out through our social media channels. Follow us on YouTube, Twitter, or LinkedIn for instant puzzle solution alerts, strategy tips, and community discussions. For urgent solution corrections, contacting us through the form above is the fastest way to get a response.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Contact;
