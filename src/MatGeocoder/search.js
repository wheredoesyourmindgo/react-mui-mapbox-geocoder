// @flow
import fetch from 'isomorphic-unfetch';
import es6promise from 'es6-promise';
import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';

es6promise.polyfill();

export const search = async (
  endpoint: string,
  source: string,
  accessToken: string,
  query: string,
  onResult?: (err: any, res: ?Response, searchTime: Date) => void,
  proximity?: {longitude: number, latitude: number},
  country?: string,
  bbox?: Array<number>,
  types?: string,
  limit?: number,
  autocomplete?: boolean,
  language?: string
) => {
  const searchTime = new Date();
  try {
    const baseUrl = `${endpoint}/geocoding/v5/${source}/${query}.json`;
    // Don't send empty query params to Mapbox geocoding api.
    const searchParams = omitBy(
      {
        access_token: accessToken,
        proximity:
          proximity && Object.keys(proximity).length === 2
            ? `${proximity.longitude},${proximity.latitude}`
            : null,
        bbox: bbox && bbox.length > 0 ? bbox.join(',') : null,
        types,
        country,
        limit,
        autocomplete,
        language
      },
      isNil
    );
    const url = `${baseUrl}?${toUrlString(searchParams)}`;
    const res = await fetch(url);
    const data = await res.json();
    onResult && onResult(null, data, searchTime);
    return {err: null, res, searchTime};
  } catch (err) {
    onResult && onResult(err, null, searchTime);
    return {err, res: null, searchTime};
  }
};

function toUrlString(params) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&');
}
