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
                className="btn-secondary mt-6 flex items-center gap-2 px-5 py-3"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-[#f8f8f8] overflow-hidden rounded-[2rem] shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.04625952178!2d36.7878668!3d-1.2863893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c05772b45%3A0x3e733ece125d5974!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dapper Footwear location in Nairobi"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
