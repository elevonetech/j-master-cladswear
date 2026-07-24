import { Helmet } from "react-helmet-async";

const SITE_URL = "https://jmastercladswear.com";
const SITE_NAME = "J. MASTER CLADSWEAR";
const DEFAULT_IMAGE = "https://jmastercladswear.com/og-image.jpg";

export function SEO({
  title,
  description,
  url,
  image,
  type = "website",
  product,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium Footwear Kenya`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const metaDescription = description || "Kenya's premium footwear brand. Shop authentic sneakers, formal shoes, boots, loafers, and more. Quality craftsmanship, timeless style, affordable luxury.";
  const metaImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Product-specific */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description || metaDescription,
            image: product.image || metaImage,
            brand: {
              "@type": "Brand",
              name: product.brand || SITE_NAME,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "KES",
              price: product.price,
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: SITE_NAME,
              },
            },
            ...(product.rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewCount || 1,
              },
            }),
          })}
        </script>
      )}
    </Helmet>
  );
}
