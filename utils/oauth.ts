export const isClient = typeof window !== "undefined";
export const CSRF_TOKEN = "csrfToken";


const generateCsrfToken = (): string => {
  // Generate a random token (replace with a more secure method)
  const csrfToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return csrfToken;
};

export const getGoogleUrl = (from: string) => {
  const csrfToken = generateCsrfToken()
  if (isClient) sessionStorage.setItem(CSRF_TOKEN, csrfToken)
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT as string,
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      state: JSON.stringify({from, csrfToken}),
    };
  
    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  };