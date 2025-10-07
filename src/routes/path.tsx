interface Path {
  root: string;
  isProtected: boolean;
}

interface ApplicationPath {
  landing: Path;
  sign_in: Path;
  generalData: Path & {
    personalInformation: string;
    projectsSection: string;
    experiencesSection: string;
    skillsSection: string;
    certificationsSection: string;
  };
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
  createExperience: Path;
  editExperience: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  deleteExperience: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  experienceDetails: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  skillGroups: Path;
  skillGroupDetails: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  createSkillGroup: Path;
  editSkillGroup: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  deleteSkillGroup: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  certifications: Path;
  certificationDetails: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  createCertification: Path;
  editCertification: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  deleteCertification: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  certificationGroups: Path;
  certificationGroupDetails: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  createCertificationGroup: Path;
  editCertificationGroup: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  deleteCertificationGroup: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  blogs: Path;
  blogDetails: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  createBlog: Path;
  editBlog: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
  deleteBlog: (
    params?: Record<string, string>,
    query?: Record<string, string>
  ) => Path;
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
  generalData: {
    root: "/dashboard/general-data",
    personalInformation: "/@personal_information",
    projectsSection: "/@projects",
    experiencesSection: "/@experiences",
    skillsSection: "@/skills",
    certificationsSection: "@/certifications",
    isProtected: true,
  },
  projects: {
    root: "/dashboard/projects",
    isProtected: true,
  },
  createProject: {
    root: "/dashboard/projects/create",
    isProtected: true,
  },
  editProject: (params = {}, query = {}) => {
    const basePath = "/dashboard/projects/edit/[id]";
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
    const basePath = "/delete-project/[id]";
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
    root: "/create-technology",
    isProtected: true,
  },
  deleteTechnology: (params = {}, query = {}) => {
    const basePath = "/delete-technology/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  editTechnology: (params = {}, query = {}) => {
    const basePath = "/edit-technology/[id]";
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
  experienceDetails: (params = {}, query = {}) => {
    const basePath = "/experience-details/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  createExperience: {
    root: "/create-experience",
    isProtected: true,
  },
  editExperience: (params = {}, query = {}) => {
    const basePath = "/edit-experience/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  deleteExperience: (params = {}, query = {}) => {
    const basePath = "/delete-experience/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  skillGroups: {
    root: "/dashboard/skill-groups",
    isProtected: true,
  },
  skillGroupDetails: (params = {}, query = {}) => {
    const basePath = "/skill-group-details/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  createSkillGroup: {
    root: "/create-skill-group",
    isProtected: true,
  },
  editSkillGroup: (params = {}, query = {}) => {
    const basePath = "/edit-skill-group/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  deleteSkillGroup: (params = {}, query = {}) => {
    const basePath = "/delete-skill-group/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  certifications: {
    root: "/dashboard/certifications",
    isProtected: true,
  },
  certificationDetails: (params = {}, query = {}) => {
    const basePath = "/certification-details/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  createCertification: {
    root: "/create-certification",
    isProtected: true,
  },
  editCertification: (params = {}, query = {}) => {
    const basePath = "/edit-certification/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  deleteCertification: (params = {}, query = {}) => {
    const basePath = "/delete-certification/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  certificationGroups: {
    root: "/dashboard/certification-groups",
    isProtected: true,
  },
  certificationGroupDetails: (params = {}, query = {}) => {
    const basePath = "/certification-group-details/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  createCertificationGroup: {
    root: "/create-certification-group",
    isProtected: true,
  },
  editCertificationGroup: (params = {}, query = {}) => {
    const basePath = "/edit-certification-group/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  deleteCertificationGroup: (params = {}, query = {}) => {
    const basePath = "/delete-certification-group/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  blogs: {
    root: "/dashboard/blogs",
    isProtected: true,
  },
  blogDetails: (params = {}, query = {}) => {
    const basePath = "/blog-details/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  createBlog: {
    root: "/create-blog",
    isProtected: true,
  },
  editBlog: (params = {}, query = {}) => {
    const basePath = "/edit-blog/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
  },
  deleteBlog: (params = {}, query = {}) => {
    const basePath = "/delete-blog/[id]";
    const pathWithParams = replaceParamsInPath(basePath, params);
    const queryString = buildQueryString(query);
    return {
      root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
      isProtected: true,
    };
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
