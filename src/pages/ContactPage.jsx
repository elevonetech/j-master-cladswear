import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SEO } from "@/components/SEO";

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
    <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

export function ContactPage() {
  const contactItems = [
    {
      icon: Phone,
      text: "0702 364 786",
      href: "tel:+254702364786",
    },
    {
      icon: Mail,
      text: "Kithomejoseph88@gmail.com",
      href: "mailto:Kithomejoseph88@gmail.com",
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
    <div className="bg-gradient-to-br from-[#faf9f6] via-white to-[#f5efe3] relative overflow-hidden">
      <SEO
        title="Contact Us"
        description="Get in touch with J. MASTER CLADSWEAR. Reach us via WhatsApp, phone, or email for style advice, sizing, orders, and customer support in Nairobi, Kenya."
        url="/contact"
      />
      <div className="absolute left-0 top-32 h-72 w-72 rounded-full bg-[#C9A227]/10 blur-[120px]" />
      <div className="absolute right-0 bottom-40 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[40px] mt-10 shadow-2xl ring-1 ring-slate-900/10">
          <img
            src="https://images.unsplash.com/photo-1528701800489-20b9f299b80e?auto=format&fit=crop&w=1800&q=80"
            alt="Modern sneaker silhouette"
            className="h-[460px] w-full object-cover sm:h-[560px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-slate-950/10" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-8 py-10 md:px-16">
              <span className="inline-flex rounded-full bg-[#C9A227]/20 px-5 py-2 text-sm font-semibold tracking-wide text-[#F7D774] backdrop-blur-xl">
                Footwear Concierge
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Step into your next statement.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Whether you want luxury leather, all-day comfort, or a bold new
                silhouette, our fit experts are here to guide you to the perfect
                pair.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:Kithomejoseph88@gmail.com"
                  className="inline-flex items-center rounded-full bg-[#F7D774] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#C9A227]/20 transition hover:brightness-95"
                >
                  Contact our fit experts
                </a>
                <span className="text-sm text-white/70">
                  Fast replies for style, sizing, and shipping.
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="group relative overflow-hidden rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4AF37]/10 blur-[90px]" />
            <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[#C9A227]/10 blur-[80px]" />

            <div className="relative">
              <span className="inline-flex items-center rounded-full bg-[#C9A227]/10 px-4 py-2 text-sm font-semibold text-[#C9A227]">
                Customer Care
              </span>

              <h2 className="mt-5 text-4xl font-bold text-[#111]">
                We're Here to Help
              </h2>

              <p className="mt-5 max-w-2xl text-[16px] leading-8 text-stone-600">
                Whether you're searching for the perfect fit, checking product
                availability, tracking your order or simply looking for style
                advice, we're committed to giving you the best shopping
                experience.
              </p>

              <div className="mt-10 grid gap-5">
                <div className="group/item flex items-start gap-5 rounded-3xl border border-stone-200 bg-[#fafafa] p-5 transition-all duration-300 hover:border-[#C9A227]/40 hover:bg-[#fffdf8] hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227]/10 transition-all duration-300 group-hover/item:bg-[#C9A227]">
                    <CheckCircle2
                      size={24}
                      className="text-[#C9A227] transition-all duration-300 group-hover/item:text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111]">
                      Find Your Perfect Fit
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      Unsure about sizing? Our team will help you choose
                      footwear that fits comfortably before you place your
                      order.
                    </p>
                  </div>
                </div>

                <div className="group/item flex items-start gap-5 rounded-3xl border border-stone-200 bg-[#fafafa] p-5 transition-all duration-300 hover:border-[#C9A227]/40 hover:bg-[#fffdf8] hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227]/10 transition-all duration-300 group-hover/item:bg-[#C9A227]">
                    <CheckCircle2
                      size={24}
                      className="text-[#C9A227] transition-all duration-300 group-hover/item:text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111]">
                      Product Availability
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      Looking for a specific size or style? Reach out and we'll
                      quickly check stock availability for you.
                    </p>
                  </div>
                </div>

                <div className="group/item flex items-start gap-5 rounded-3xl border border-stone-200 bg-[#fafafa] p-5 transition-all duration-300 hover:border-[#C9A227]/40 hover:bg-[#fffdf8] hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227]/10 transition-all duration-300 group-hover/item:bg-[#C9A227]">
                    <CheckCircle2
                      size={24}
                      className="text-[#C9A227] transition-all duration-300 group-hover/item:text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111]">
                      Delivery Support
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      Need help tracking your package or understanding delivery
                      options? We're only a message away.
                    </p>
                  </div>
                </div>

                <div className="group/item flex items-start gap-5 rounded-3xl border border-stone-200 bg-[#fafafa] p-5 transition-all duration-300 hover:border-[#C9A227]/40 hover:bg-[#fffdf8] hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227]/10 transition-all duration-300 group-hover/item:bg-[#C9A227]">
                    <CheckCircle2
                      size={24}
                      className="text-[#C9A227] transition-all duration-300 group-hover/item:text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111]">
                      Returns & Exchanges
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      We want you to love every purchase. Contact us if you need
                      assistance with returns or exchanges.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-[28px] bg-gradient-to-r from-[#111] to-[#232323] p-8 text-white">
                <h3 className="text-2xl font-bold">Need a Quick Response?</h3>
                <p className="mt-3 max-w-lg text-white/75 leading-7">
                  The fastest way to reach us is through WhatsApp. Whether you
                  have a question before buying or need help after your
                  purchase, we're here for you.
                </p>
                <a
                  href="https://wa.me/254702364786"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#C9A227] px-7 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[32px] bg-[#171717] p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#C9A227]/20 blur-[90px]" />

              <div className="relative">
                <span className="inline-flex rounded-full bg-[#C9A227]/20 px-4 py-2 text-sm font-medium text-[#F6D66B]">
                  Contact Details
                </span>

                <h2 className="mt-5 text-3xl font-bold">
                  We'd Love To Hear From You
                </h2>

                <p className="mt-4 leading-7 text-white/70">
                  Reach us through your preferred channel. Whether you have a
                  question before placing an order or need assistance
                  afterwards, we're always happy to help.
                </p>

                <div className="mt-10 space-y-5">
                  {contactItems.map(
                    ({ icon: Icon, text, href, external = false }) => (
                      <div
                        key={text}
                        className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#C9A227]/40 hover:bg-white/10"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A227]/15 transition-all duration-300 group-hover:bg-[#C9A227]">
                          <Icon
                            size={18}
                            className="text-[#F6D66B] transition-all duration-300 group-hover:text-black"
                          />
                        </div>
                        {href ? (
                          <a
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="transition-colors text-white/80 hover:text-[#F6D66B]"
                          >
                            {text}
                          </a>
                        ) : (
                          <span className="text-white/80">{text}</span>
                        )}
                      </div>
                    ),
                  )}
                </div>

                <a
                  href="https://wa.me/254702364786"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-[#C9A227] px-6 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#d9b84a]"
                >
                  <MessageCircle size={20} />
                  Start WhatsApp Chat
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="px-3 pb-5">
                <h3 className="text-2xl font-bold text-[#111]">
                  Visit Our Store
                </h3>
                <p className="mt-2 text-stone-600">
                  You're always welcome to visit us and explore our latest
                  footwear collection in person.
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.04625952178!2d36.7878668!3d-1.2863893!2m3!1f0!3f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c05772b45%3A0x3e733ece125d5974!2sNairobi!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                  className="transition duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
