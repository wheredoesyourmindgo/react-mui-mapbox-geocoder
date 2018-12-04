import fetch from 'isomorphic-unfetch';
import es6promise from 'es6-promise';
import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';

es6promise.polyfill();

/**
 * Proximity Object that contains longitude and latitude properties.
 * @typedef {Object} Proximity
 * @property {number} longitude
 * @property {number} latitude
 */

/**
 * On result handler callback Function.
 * @callback onResultCallback
 * @param {Object} err - Error Object.
 * @param {Object} res - Response Object.
 * @param {Date} searchTime - Search time as Date.
 * @returns {void}
 */

/**
 *
 * @param {string} endpoint
 * @param {string} source
 * @param {string} accessToken
 * @param {string} query
 * @param {Proximity} [proximity]
 * @param {string} [country]
 * @param {number[]} [bbox]
 * @param {string} [types]
 * @param {number} [limit]
 * @param {boolean} [autocomplete]
 * @param {string} [language]
 * @param {onResultCallback} [onResult] - The callback that handles the result.
 */
export const search = async (
  endpoint,
  source,
  accessToken,
  query,
  proximity,
  country,
  bbox,
  types,
  limit,
  autocomplete,
  language,
  onResult = () => {}
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
    const url = `${baseUrl}?${stringify(searchParams)}`;
    const res = await fetch(url);
    const data = await res.json();
    onResult(null, data, searchTime);
    return {err: null, res, searchTime};
  } catch (err) {
    onResult(err, null, searchTime);
    return {err, res: null, searchTime};
  }
};

/**
 *
 * @param {Object} params - Object containing key/value pairs for query parameters.
 * @returns {string}
 */
function stringify(params) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&');
}
