// src/components/seo.tsx
import { SeoProps } from "@/types";
import { Title, Meta, Link } from "@solidjs/meta";
import { type Component } from "solid-js";

const DEFAULT_SEO = {
  title: "Nikala UI — Copy-Paste SolidJS & Tailwind CSS v4 Component System",
  description: "A simple, copy-paste component system for SolidJS built natively for Tailwind CSS v4. Honoring Georgian painter Niko Pirosmani.",
  siteUrl: "https://nikala.dev",
  ogImage: "/og-image.png",
  twitterHandle: "@magradze",
};

export const Seo: Component<SeoProps> = (props) => {
  const pageTitle = () => (props.title ? `${props.title} — Nikala UI` : DEFAULT_SEO.title);
  const pageDescription = () => props.description || DEFAULT_SEO.description;
  const canonicalUrl = () => `${DEFAULT_SEO.siteUrl}${props.path || ""}`;
  const ogImageUrl = () => props.image || `${DEFAULT_SEO.siteUrl}${DEFAULT_SEO.ogImage}`;

  const jsonLd = () => {
    const mainAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Nikala UI",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "url": canonicalUrl(),
      "description": pageDescription(),
      "author": {
        "@type": "Person",
        "name": "Giorgi Magradze",
        "url": "https://github.com/magradze"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    if (!props.path || props.path === "/") {
      return JSON.stringify(mainAppSchema);
    }

    // Generate BreadcrumbList for inner routes (e.g. /docs/components/button)
    const segments = props.path.split("/").filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": DEFAULT_SEO.siteUrl
      }
    ];

    let currentPath = "";
    segments.forEach((seg, idx) => {
      currentPath += `/${seg}`;
      const name = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": idx + 2,
        "name": name,
        "item": `${DEFAULT_SEO.siteUrl}${currentPath}`
      });
    });

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };

    return JSON.stringify([mainAppSchema, breadcrumbSchema]);
  };

  return (
    <>
      {/* Primary Page Title */}
      <Title>{pageTitle()}</Title>

      {/* Primary Meta Tags */}
      <Meta name="title" content={pageTitle()} />
      <Meta name="description" content={pageDescription()} />
      <Meta name="author" content="Magradze" />
      <Meta name="keywords" content="SolidJS, Tailwind CSS v4, UI Components, SolidStart, Niko Pirosmani, Nikala UI, Design System" />
      {props.noindex && <Meta name="robots" content="noindex, follow" />}

      {/* GEO & Regional Meta Tags */}
      <Meta name="geo.region" content="FR" />
      <Meta name="geo.placename" content="France" />

      {/* Open Graph / Social Sharing (Facebook, Discord, LinkedIn) */}
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={canonicalUrl()} />
      <Meta property="og:title" content={pageTitle()} />
      <Meta property="og:description" content={pageDescription()} />
      <Meta property="og:image" content={ogImageUrl()} />
      <Meta property="og:site_name" content="Nikala UI" />

      {/* Twitter Cards */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content={canonicalUrl()} />
      <Meta name="twitter:title" content={pageTitle()} />
      <Meta name="twitter:description" content={pageDescription()} />
      <Meta name="twitter:image" content={ogImageUrl()} />
      <Meta name="twitter:creator" content={DEFAULT_SEO.twitterHandle} />

      {/* Canonical URL */}
      <Link rel="canonical" href={canonicalUrl()} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" innerHTML={jsonLd()} />
    </>
  );
};