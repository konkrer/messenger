// cookie helpers

/** Make a dictionary object from cookie string. */
export const makeCookieDict = cookieString => {
  return cookieString.split(';').reduce((acc, el) => {
    const [key, val] = el.trim().split('=');
    acc[key] = val;
    return acc;
  }, {});
};

/** Get a cookie value from document cookies. */
export const getCookie = cookieName => {
  return makeCookieDict(document.cookie)[cookieName];
};
