export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const formatShortUrl = (shortUrl: string): string => {
  return `${window.location.origin}/${shortUrl}`;
};

export const getDomainFromUrl = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch {
    return url;
  }
}; 