import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

// Custom Instagram Icon
const InstagramIcon = ({ size = 14, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const contactItems = [
    {
      icon: Phone,
      text: "0712 643 440",
      href: "tel:+254712643440",
    },
    {
      icon: Mail,
      text: "jamesmngandu@gmail.com",
      href: "mailto:jamesmngandu@gmail.com",
    },
    {
      icon: MapPin,
      text: "Nairobi, Kenya",
      href: null,
    },
    {
      icon: InstagramIcon,
      text: "Instagram",
      href: "https://instagram.com",
      external: true,
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-white border-b border-black/5 py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Contact"
            title="Get in Touch"
            description="Have a question about an order, a product, or anything else? We'd love to hear from you."
          />
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#faf9f7] py-20 pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] items-start">
            {/* Contact Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="rounded-3xl bg-white border border-black/5 p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <h2 className="mb-7 text-2xl font-bold font-heading text-stone">
                Send us a Message
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-light"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-light"
                />
              </div>

              <div className="mt-4 grid gap-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="input-light"
                />

                <textarea
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="input-light !rounded-2xl !px-5 !py-4 resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary mt-6 w-full !py-3.5 !text-[0.75rem]"
              >
                Send Message
              </button>

              {submitted && (
                <p className="mt-4 text-center text-[0.8rem] text-stone/60">
                  ✓ Thank you! We'll get back to you as soon as possible.
                </p>
              )}
            </form>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="rounded-3xl bg-white border border-black/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <h2 className="mb-6 text-xl font-bold font-heading text-stone">
                  Contact Details
                </h2>

                <div className="space-y-5">
                  {contactItems.map(
                    ({ icon: Icon, text, href, external = false }) => (
                      <div key={text} className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne/10 border border-champagne/20">
                          <Icon size={16} className="text-champagne" />
                        </div>

                        {href ? (
                          <a
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="text-sm text-stone/70 transition-colors duration-300 hover:text-champagne"
                          >
                            {text}
                          </a>
                        ) : (
                          <span className="text-sm text-stone/70">{text}</span>
                        )}
                      </div>
                    ),
                  )}
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/254712643440"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-8 flex w-full items-center justify-center gap-2 !py-3 !text-[0.72rem]"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-3xl bg-white border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="border-b border-black/5 px-6 py-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-stone/45 font-semibold">
                    Our Location
                  </p>
                </div>

                <iframe
                  title="Kithome Shoes Location"
                  src="https://www.google.com/maps?q=Nairobi&output=embed"
                  loading="lazy"
                  className="h-72 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
