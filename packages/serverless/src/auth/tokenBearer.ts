/**
 * Function that simply parses a given req with headers for a bearer token and returns it.
 *
 *  e.g.:
 *  input: req: {
 *    headers: {
 *      'Authorization': 'Bearer $token'
 *    }
 *  }
 *  output: $token
 * @param req
 */
export const parseBearerToken = (req?: { headers: { [name: string]: string | undefined } }): string | undefined => {
  const auth: string | undefined = req && req.headers ?
    req.headers.authorization || req.headers.Authorization : undefined;
  if (!auth) {
    return;
  }

  const parts = auth.split(' ');
  // Malformed header.
  if (parts.length < 2) {
    return;
  }

  const schema = (parts.shift() as string).toLowerCase();
  const token = parts.join(' ');
  if (schema !== 'bearer') {
    return;
  }

  return token;
};
