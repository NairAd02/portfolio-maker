import { Review } from "@/lib/types/reviews";
import React from "react";
import LandingReviewsList from "./landing-reviews-list";

export const reviews: Review[] = [
  {
    id: "1",
    review: "Excelente servicio, muy profesional y atento a los detalles.",
    grade: 5,
    user: {
      username: "juan_perez",
      specialty: "Cardiología",
    },
  },
  {
    id: "2",
    review: "Buen trato pero la espera fue un poco larga.",
    grade: 4,
    user: {
      username: "maria_gomez",
      specialty: "Pediatría",
    },
  },
  {
    id: "3",
    review:
      "No quedé satisfecho con la consulta, faltó profundidad en el diagnóstico.",
    grade: 2,
    user: {
      username: "carlos_ruiz",
      specialty: "Neurología",
    },
  },
  {
    id: "4",
    review: "Increíble experiencia, resolvió todas mis dudas con paciencia.",
    grade: 5,
    user: {
      username: "laura_sanchez",
      specialty: "Dermatología",
    },
  },
  {
    id: "5",
    review: "Regular, el consultorio no estaba muy limpio.",
    grade: 3,
    user: {
      username: "pedro_martinez",
      specialty: "Ortopedia",
    },
  },
];

export default function LandingReviewsListContainer() {
  return <LandingReviewsList reviews={reviews} />;
}
