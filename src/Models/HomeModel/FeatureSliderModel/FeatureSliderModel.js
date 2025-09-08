const fetchProjects = async (size) => { // Accept size as a parameter
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const token = localStorage.getItem("user_token");
  const response = await fetch(`${apiUrl}/api/projectlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      api_token: `${apiToken}`,
    },
    body: JSON.stringify({ page: 1, size }), // Use dynamic size
  });

  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data.data;
};

export default fetchProjects;
