import { ReactNode } from "react";
import { paths } from "../path";
import {
  BookOpenText,
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
  scroll?: boolean;
}

export const groupRoutes: GroupRoute[] = [
  {
    title: "Administración",
    navigationRoutes: [
      {
        title: "Información General",
        icon: <User />,
        path: paths.generalData.root,
        scroll: false,
      },
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
        title: "Certificaciones",
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
      {
        title: "Publicaciones",
        icon: <BookOpenText />,
        path: paths.blogs.root,
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
];
