export const formatTime = (dateLike) =>
  new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateLike));

export const formatFileSize = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const truncate = (value, length = 44) => {
  if (!value) return '';
  return value.length > length ? `${value.slice(0, length - 1)}...` : value;
};
