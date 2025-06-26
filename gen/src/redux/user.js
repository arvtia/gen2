export const getUserId = () => {
  const match = document.cookie.match(/userId=([^;]+)/);
  if (match) return match[1];

  const newId = btoa(Date.now() + Math.random().toString(36));
  document.cookie = `userId=${newId}; path=/; max-age=31536000`; // 1 year
  return newId;
};


