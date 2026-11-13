import { defineEnvVars } from "@sveltejs/kit/env";

const required = (name: string) => (value: string | undefined) => {
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

export const variables = defineEnvVars({
  PUBLIC_SUPABASE_URL: {
    public: true,
    static: true,
    description:
      "Supabase project URL (local stack in dev, see .env.development.local).",
    schema: (value) => {
      const url = required("PUBLIC_SUPABASE_URL")(value);
      new URL(url); // throws on a malformed URL
      return url;
    },
  },
  PUBLIC_SUPABASE_PUBLISHABLE_KEY: {
    public: true,
    static: true,
    description:
      "Supabase publishable key (sb_publishable_…); safe for browsers by design.",
    schema: required("PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  },
});
