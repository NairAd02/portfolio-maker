interface Path {
  root: string;
  isProtected: boolean;
}

interface ApplicationPath {
  landing: Path;
  sign_in: Path;
  projects: Path;
  createProject: Path;
  editProject: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  projectDetails: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  deleteProject: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  technologies: Path;
  createTechnology: Path;
  editTechnology: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  deleteTechnology: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  experiences: Path;
  users: Path;
}

function buildQueryString(query: Record<string, string> = {}): string {
  const params = new URLSearchParams(query);
  return params.toString();
}

function replaceParamsInPath(
  path: string,
  params: Record<string, string> = {}
): string {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`[${key}]`, value);
  }, path);
}

export const paths: ApplicationPath = {
  landing: {
    root: "/",
    isProtected: false,
  },
  sign_in: {
    root: "/sign-in",
    isProtected: false,
  },
  projects: {
    root: "/dashboard/projects",
    isProtected: true,
  },
  createProject: {
    root: "/dashboard/create-project",
    isProtected: true,
  },
  editProject: (params = {}, query = {}) => {
    const basePath = "/dashboard/edit-project/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  projectDetails: (params = {}, query = {}) => {
    const basePath = "/dashboard/projects/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  deleteProject: (params = {}, query = {}) => {
    const basePath = "/dashboard/delete-project/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  technologies: {
    root: "/dashboard/technologies",
    isProtected: true,
  },
  createTechnology: {
    root: "/dashboard/create-technology",
    isProtected: true,
  },
  deleteTechnology: (params = {}, query = {}) => {
    const basePath = "/dashboard/delete-technology/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  editTechnology: (params = {}, query = {}) => {
    const basePath = "/dashboard/edit-technology/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  experiences: {
    root: "/dashboard/experiences",
    isProtected: true,
  },
  users: {
    root: "/dashboard/user",
    isProtected: true,
  },
} as const;

export const isProtectedRoute = (route: string): boolean => {
  const [routeWithoutQuery, _] = route.split("?");

  // Primero intentamos hacer match con rutas estáticas
  for (const key in paths) {
    const path = paths[key as keyof ApplicationPath];

    if (typeof path !== "function") {
      if (path.root === routeWithoutQuery) {
        return path.isProtected;
      }
    }
  }

  // Luego intentamos con rutas dinámicas
  for (const key in paths) {
    const path = paths[key as keyof ApplicationPath];

    if (typeof path === "function") {
      // Obtenemos el path base sin parámetros reemplazados
      const basePath = path({} as any).root.split("?")[0];

      // Creamos un regex para hacer match con los parámetros
      const regexPattern =
        basePath.replace(/\[([^\]]+)\]/g, "([^/]+)").replace(/\//g, "\\/") +
        "$";

      const regex = new RegExp(regexPattern);

      if (regex.test(routeWithoutQuery)) {
        const pathObj = path({} as any);
        return pathObj.isProtected;
      }
    }
  }

  return false;
};
