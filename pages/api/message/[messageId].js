import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await serverAuth(req);
      const { messageId } = req.query;

      const result = await prismadb.message.delete({
        where: {
          id: messageId,
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
}
