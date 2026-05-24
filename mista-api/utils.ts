const fetchMistaDirect = (url: string, options?: RequestInit) => {
  const MISTA_DOMAIN = process.env.MISTA_DOMAIN;
  const fullUrl = `${MISTA_DOMAIN}${url}`;

  return fetch(fullUrl, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });
};

const fetchMistaProxy = (url: string, options?: RequestInit) => {
  const MISTA_DOMAIN = process.env.MISTA_DOMAIN;
  const fullUrl = `${MISTA_DOMAIN}${url}`;

  const proxyURL = process.env.PROXY_URL ?? "";

  return fetch(proxyURL, {
    ...options,
    headers: {
      ...options?.headers,
      "PROXY-AUTH": process.env.PROXY_AUTH || "",
      "PROXY-TARGET-URL": fullUrl,
    },
  });
};

export const fetchMista = (url: string, options?: RequestInit) => {
  if (process.env.USE_PROXY?.toLowerCase() === "true") {
    return fetchMistaProxy(url, options);
  } else {
    return fetchMistaDirect(url, options);
  }
};
