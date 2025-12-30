// httpClient.ts
export const httpClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(url);
    return res.json();
  },

  post: async <T>(url: string, body: unknown): Promise<T> => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
};
