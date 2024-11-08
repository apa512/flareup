import { onRequestPost as __api_sessions_js_onRequestPost } from "/home/erik/Code/flareup/flareup/functions/api/sessions.js"
import { onRequestPost as __api_users_js_onRequestPost } from "/home/erik/Code/flareup/flareup/functions/api/users.js"

export const routes = [
    {
      routePath: "/api/sessions",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_sessions_js_onRequestPost],
    },
  {
      routePath: "/api/users",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_users_js_onRequestPost],
    },
  ]