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
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Use the form below or reach us instantly on WhatsApp for order support and product questions."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <form
          className="bg-[#f8f8f8] rounded-[2rem] p-7 md:p-10"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your name"
              className="rounded-full bg-white px-5 py-4 text-sm text-[#111] outline-none placeholder:text-black/30 border border-black/10"
            />
            <input
              type="email"
              placeholder="Email address"
              className="rounded-full bg-white px-5 py-4 text-sm text-[#111] outline-none placeholder:text-black/30 border border-black/10"
            />
          </div>
          <div className="mt-5 grid gap-5">
            <input
              type="text"
              placeholder="Subject"
              className="rounded-full bg-white px-5 py-4 text-sm text-[#111] outline-none placeholder:text-black/30 border border-black/10"
            />
            <textarea
              rows={6}
              placeholder="Tell us what you need"
              className="rounded-[1.5rem] bg-white px-5 py-4 text-sm text-[#111] outline-none placeholder:text-black/30 border border-black/10"
            />
          </div>
          <button
            type="submit"
            className="btn-secondary mt-5 px-6 py-4"
          >
            Send message
          </button>
          {submitted ? (
            <p className="mt-4 text-sm text-[#666]">
              Thanks, your message was captured locally. Connect on WhatsApp for
              the fastest response.
            </p>
          ) : null}
        </form>

        <div className="space-y-5">
          <div className="bg-[#f8f8f8] rounded-[2rem] p-7">
            <h2 className="text-2xl font-semibold text-[#111]">
              Contact details
            </h2>
            <div className="mt-5 grid gap-4 text-sm text-[#666]">
              <div>0712 643 440</div>
              <div>
                <a
                  href="mailto:jamesmngandu@gmail.com"
                  className="transition hover:text-black"
                >
                  jamesmngandu@gmail.com
                </a>
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
                  className="transition hover:text-black"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <a
              href="https://wa.me/254712643440"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-6 px-5 py-3"
            >
              WhatsApp us
            </a>
          </div>

          <div className="bg-[#f8f8f8] overflow-hidden rounded-[2rem] shadow-sm">
            <div className="px-6 py-5 text-xs uppercase tracking-[0.35em] text-black/40">
              Google Map Placeholder
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
