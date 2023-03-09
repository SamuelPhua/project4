import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await serverAuth(req);
      const { movieId } = req.query;
      if (typeof movieId !== "string") {
        throw new Error("Invalid Id");
      }
      if (!movieId) {
        throw new Error("Missing Id");
      }
      const movies = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      return res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await serverAuth(req);
      const { movieId } = req.query;

      const result = await prismadb.movie.delete({
        where: {
          id: movieId,
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
    try {
      await serverAuth(req);
      const { movieId } = req.query;
      const { title, description, videoUrl, thumbnailUrl, genre, duration } =
        req.body;

      const result = await prismadb.movie.update({
        where: {
          id: movieId,
        },
        data: {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          genre,
          duration,
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
}
