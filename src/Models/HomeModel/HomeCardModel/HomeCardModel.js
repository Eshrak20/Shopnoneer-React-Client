const fetchHomeCardData = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const response = await fetch(`${apiUrl}/api/projectlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      api_token: `${apiToken}`,
    },
    body: JSON.stringify({ page: 1, size: 6 }),
  });

  if (!response.ok) throw new Error("Network response was not ok");

  const data = await response.json();

  return data.data;
};

export default fetchHomeCardData;
