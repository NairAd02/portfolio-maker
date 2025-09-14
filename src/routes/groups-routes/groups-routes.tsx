import { ReactNode } from "react";
import { paths } from "../path";
import {
  BriefcaseBusiness,
  ChartNetwork,
  Cpu,
  Files,
  FolderGit2,
  ScrollText,
  User,
} from "lucide-react";

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
      {
        title: "Grupos de Habilidades",
        icon: <ChartNetwork />,
        path: paths.skillGroups.root,
      },
      {
        title: "Certificaciones obtenidas",
        icon: <ScrollText />,
        path: paths.certifications.root,
        children: [
          {
            title: "Grupos",
            icon: <Files />,
            path: paths.certificationGroups.root,
          },
          {
            title: "Certificaciones",
            icon: <ScrollText />,
            path: paths.certifications.root,
          },
        ],
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
