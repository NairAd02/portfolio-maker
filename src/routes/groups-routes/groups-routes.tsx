import { ReactNode } from "react";
import { paths } from "../path";
import { BriefcaseBusiness, Cpu, FolderGit2, User } from "lucide-react";

export interface GroupRoute {
  title: string;
  navigationRoutes: NavigationRoute[];
}

export interface NavigationRoute {
  title: string;
  path: string;
  icon?: ReactNode;
  isActive?: boolean;
  children?: NavigationRoute[];
}

export const groupRoutes: GroupRoute[] = [
  {
    title: "Administración",
    navigationRoutes: [
      {
        title: "Proyectos",
        icon: <FolderGit2 />,
        path: paths.projects.root,
      },
      {
        title: "Experiencias Laborales",
        icon: <BriefcaseBusiness />,
        path: paths.experiences.root,
      },
    ],
  },
  {
    title: "Nomencladores",
    navigationRoutes: [
      {
        title: "Tecnologías",
        icon: <Cpu />,
        path: paths.technologies.root,
      },
    ],
  },
  {
    title: "Seguridad",
    navigationRoutes: [
      {
        title: "Usuarios",
        icon: <User />,
        path: paths.users.root,
      },
    ],
  },
];
