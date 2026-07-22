const productionUrl = "https://tagadearpit.vercel.app";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return productionUrl;

  try {
    const url = new URL(configuredUrl);
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return productionUrl;
  }
}

export const siteUrl = resolveSiteUrl();
