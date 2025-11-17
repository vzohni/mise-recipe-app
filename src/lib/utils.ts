export const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown date";

  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });

  const getOrdinalSuffix = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
};

export const generateSlug = (title: string) => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const baseSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  return `${baseSlug}-${randomSuffix}`;
};