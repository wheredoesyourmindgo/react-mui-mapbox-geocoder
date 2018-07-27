// @flow
import axios from 'axios';
import type {$AxiosXHR} from 'axios';
import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';

export const search = async (
  endpoint: string,
  source: string,
  accessToken: string,
  query: string,
  onResult?: (err: any, res: ?$AxiosXHR<any>, searchTime: Date) => void,
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
    const uri = `${endpoint}/geocoding/v5/${source}/${query}.json`;
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
    const res = await axios.get(uri, {
      params: searchParams
    });
    onResult && onResult(null, res, searchTime);
    return {err: null, res, searchTime};
  } catch (err) {
    onResult && onResult(err, null, searchTime);
    return {err, res: null, searchTime};
  }
};
