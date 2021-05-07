// cookie helpers

export const makeCookieDict = cookieString => {
  return cookieString.split(';').reduce((acc, el) => {
    const [key, val] = el.trim().split('=');
    acc[key] = val;
    return acc;
  }, {});
};

export const getCookie = cookieName => {
  return makeCookieDict(document.cookie)[cookieName];
};
