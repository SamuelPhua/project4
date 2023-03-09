import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
    await serverAuth(req);
    const obj = req.body;
    const { title, description, videoUrl, thumbnailUrl, genre, duration } = obj;

    const moive = await prismadb.movie.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
      },
    });

    return res.status(200).json(moive);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
