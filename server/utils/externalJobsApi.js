export const fetchRapidJobs = async (query, page) => {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
    query
  )}&page=${page}&num_pages=1&country=in`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (!data.data) throw new Error("RapidAPI failed");

  return data.data.map((job) => ({
    id: job.job_id,
    title: job.job_title,
    company: job.employer_name,
    location: job.job_city,
    description: job.job_description,
    applyLink: job.job_apply_link,
  }));
};

export const fetchArbeitJobs = async () => {
  const response = await fetch(
    "https://www.arbeitnow.com/api/job-board-api"
  );

  const data = await response.json();

  return data.data.map((job) => ({
    id: job.slug,
    title: job.title,
    company: job.company_name,
    location: job.location,
    description: job.description,
    applyLink: job.url,
  }));
};