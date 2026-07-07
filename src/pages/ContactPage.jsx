import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
              <div>Nairobi, Kenya</div>
              <div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-black"
                >
                  Instagram
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
            <iframe
              title="Kithome location"
              src="https://www.google.com/maps?q=Nairobi&output=embed"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
