interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object | object[];
}

const BASE_URL = "https://pointersconsulting.com.au";
const DEFAULT_IMAGE = `${BASE_URL}/images/Pointers-logo.png`;

function setMeta(attr: string, content: string, attrType: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attrType}="${attr}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrType, attr);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  (el as HTMLLinkElement).href = href;
}

function setJsonLd(id: string, data: object | object[]) {
  let el = document.querySelector(`script[data-seo="${id}"]`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function applySEO({ title, description, canonical, ogType = "website", ogImage, schema }: SEOProps) {
  document.title = title;

  const url = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${window.location.pathname}`;
  const img = ogImage ?? DEFAULT_IMAGE;

  if (description) {
    setMeta("description", description);
    setMeta("og:description", description, "property");
    setMeta("twitter:description", description, "name");
  }

  setLink("canonical", url);
  setMeta("og:title", title, "property");
  setMeta("og:type", ogType, "property");
  setMeta("og:url", url, "property");
  setMeta("og:image", img, "property");
  setMeta("og:site_name", "Pointers Consulting", "property");
  setMeta("twitter:card", "summary_large_image", "name");
  setMeta("twitter:title", title, "name");
  setMeta("twitter:image", img, "name");

  if (schema) {
    setJsonLd("page", schema);
  }
}
