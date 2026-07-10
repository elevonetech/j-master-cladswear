import { SectionHeading } from "@/components/SectionHeading";

export function AboutPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <div className="bg-white border-b border-black/06 py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About"
            title="The Kithome story"
            description="A premium footwear destination built on minimal aesthetics, thoughtful curation, and fast commerce." />
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-[#f8f8f8] rounded-[2rem] p-7 md:p-10">
              <h2 className="text-3xl font-semibold text-[#111]">Company story</h2>
              <p className="mt-4 text-sm leading-8 text-[#666]">
                Kithome Shoe Collection was created to make premium footwear feel
                more direct, more stylish, and more accessible. The visual language
                stays dark, elegant, and precise while the buying experience remains
                simple and mobile friendly.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  [
                    "Mission",
                    "Deliver a luxury-inspired footwear experience with high-quality curation and frictionless ordering.",
                  ],
                  [
                    "Vision",
                    "Become a trusted destination for premium monochrome footwear across every occasion.",
                  ],
                ].map(([title, copy]) => (
                  <div
                    key={title}
                    className="rounded-[1.5rem] bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                      {title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#666]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#f8f8f8] rounded-[2rem] p-7">
                <h3 className="text-2xl font-semibold text-[#111]">
                  Why choose Kithome
                </h3>
                <ul className="mt-5 grid gap-3 text-sm text-[#666]">
                  {[
                    "Premium black and white visual identity",
                    "Clear size, color, and stock details",
                    "Responsive shopping across desktop and mobile",
                    "Fast WhatsApp-based ordering",
                  ].map((item) => (
                    <li
                      key={item}
                      className="rounded-[1.25rem] bg-white px-4 py-3 shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f8f8f8] rounded-[2rem] p-7">
                <p className="text-xs uppercase tracking-[0.35em] text-black/40">
                  Customer satisfaction
                </p>
                <p className="mt-4 text-sm leading-8 text-[#666]">
                  We prioritize clear product information, fast response time, and a
                  premium checkout experience so customers can order with
                  confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
