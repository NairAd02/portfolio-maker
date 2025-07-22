import { ReactNode } from "react";
import { paths } from "../path";
import { FolderCog, User } from "lucide-react";

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
        icon: <FolderCog />,
        path: paths.projects.root,
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
