export interface Result {
  feature: Feature;
  label: string;
}

interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  address: string;
  context: Context[];
}

interface Context {
  id: string;
  text: string;
  wikidata?: string;
  short_code?: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
  interpolated: boolean;
}

interface Properties {
  accuracy: string;
}
