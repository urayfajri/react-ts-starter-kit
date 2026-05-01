/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional. When set, must be a valid http(s) URL (`clientEnv`). */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
