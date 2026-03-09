function resolveEndpoint(endpoint: string | undefined) {
  if (!endpoint) {
    throw new Error("Formspree endpoint is not configured.");
  }

  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }

  return `https://formspree.io/f/${endpoint}`;
}

export async function submitToFormspree(
  endpoint: string | undefined,
  payload: Record<string, string>,
) {
  const response = await fetch(resolveEndpoint(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Form submission failed. Check the Formspree endpoint and try again.");
  }
}
