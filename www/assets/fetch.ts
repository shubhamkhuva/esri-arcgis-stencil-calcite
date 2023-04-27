import { _apiHost } from '../utils/constants';

export async function request(endPoint, method = 'GET') {
  try {
    const options = {
      method,
    };
    let response = await fetch(`${_apiHost}${endPoint}`, options);
    if (!response.ok) {
      return null;
    } else {
      return response.json();
    }
  } catch (err) {
    return null;
  }
}
