import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { date, region } = req.query;
  const url = `http://13.209.14.189:8080/matches/${date}?region=${region}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network Error");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("데이터를 불러오는데 실패했습니다. ", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
