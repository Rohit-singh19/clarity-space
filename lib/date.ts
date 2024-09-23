/**
 * formats a date relative to the current time
 * @example
 * const now = new Date();
 * const past = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30);
 * const result = formatDate(past);
 * // result: "1 month ago"
 * @param date the date to be formatted
 * @returns a string representing the date relative to the current time
 */

export const formatDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  if (diffYears > 0) {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`; // 1 year ago
  } else if (diffMonths > 0) {
    if (diffMonths > 1) {
      return `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`; // 1 month ago
    }
  } else if (diffWeeks > 0) {
    return `${diffWeeks}w${diffWeeks > 1 ? "s" : ""} ago`; // 1 week ago
  } else if (diffDays > 0) {
    return `${diffDays}d${diffDays > 1 ? "s" : ""} ago`; // 1 day ago
  } else if (diffHours > 0) {
    return `${diffHours}hr${diffHours > 1 ? "s" : ""} ago`; // 1 hour ago
  } else if (diffMinutes > 0) {
    return `${diffMinutes}min${diffMinutes > 1 ? "s" : ""} ago`; // 1 minute ago
  }
};
