import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req);

    const messages = await prismadb.message.findMany();

    return res.status(200).json(messages);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
