export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getDateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 1) {
    return `${diffDays} días`;
  } else if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? "mes" : "meses"}`;
  } else {
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    return `${years} ${years === 1 ? "año" : "años"}${
      remainingMonths > 0
        ? ` y ${remainingMonths} ${remainingMonths === 1 ? "mes" : "meses"}`
        : ""
    }`;
  }
};
