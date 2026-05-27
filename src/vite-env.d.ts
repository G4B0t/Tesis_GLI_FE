/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_API_DEBUG?: string;
  readonly VITE_REACT_APP_BACKEND_URL?: string;
  readonly VITE_REACT_APP_COGNITO_CLIENT_ID?: string;
  readonly VITE_REACT_APP_COGNITO_DOMAIN?: string;
  readonly VITE_REACT_APP_COGNITO_REDIRECT_URI?: string;
  readonly VITE_REACT_APP_MUI_PRO_LICENCE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
