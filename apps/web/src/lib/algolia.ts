import { liteClient } from "algoliasearch/lite";

export interface AlgoliaSearchResult {
  objectID: string;
  type: "component" | "hook" | "block" | "doc";
  title: string;
  description: string;
  category: string;
  url: string;
  content: string;
  _highlightResult?: {
    title?: { value: string };
    description?: { value: string };
  };
}

const APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID || "3OJO76EK9R";
const SEARCH_KEY = import.meta.env.VITE_ALGOLIA_SEARCH_KEY || "9438669fba1a82c8c8066cc7b8a97453";
const INDEX_NAME = import.meta.env.VITE_ALGOLIA_INDEX_NAME || "nikala_docs";

export const isAlgoliaConfigured = () => Boolean(SEARCH_KEY);

let client: ReturnType<typeof liteClient> | null = null;

function getClient() {
  if (!SEARCH_KEY) return null;
  if (!client) {
    client = liteClient(APP_ID, SEARCH_KEY);
  }
  return client;
}

export async function searchAlgolia(query: string): Promise<AlgoliaSearchResult[]> {
  const c = getClient();
  if (!c || !query.trim()) return [];

  try {
    const response = await c.search<AlgoliaSearchResult>({
      requests: [
        {
          indexName: INDEX_NAME,
          query: query.trim(),
          hitsPerPage: 20,
        },
      ],
    });

    const firstResult = response.results[0];
    if (firstResult && "hits" in firstResult) {
      return (firstResult.hits as AlgoliaSearchResult[]) || [];
    }
    return [];
  } catch (error) {
    console.error("Algolia search error:", error);
    return [];
  }
}
