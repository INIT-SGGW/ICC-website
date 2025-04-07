export function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split('; ').reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
