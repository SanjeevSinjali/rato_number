export const paths = {
  home: {
    path: "/",
    getHref: () => "/"
  },
  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`
    },
    signup: {
      path: "/register",
      getHref: (redirectTo) =>
        `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`
    },
    forgotPassword: {
      path: "/forgot-password",
      getHref: () => "/forgot-password"
    }
  },
  public: {
    about: {
      path: "/about",
      getHref: () => "/about"
    },
    contact: {
      path: "/contact",
      getHref: () => "/contact"
    }
  },
  app: {
    dashboard: {
      path: "/dashboard",
      getHref: () => "/dashboard"
    },
    profile: {
      path: "/profile",
      getHref: () => "/profile"
    },
    vehicles: {
      path: "/vehicles",
      getHref: () => "/vehicles"
    }
  },
  admin: {
    root: {
      path: "/admin",
      getHref: () => "/admin"
    }
  }
};

