import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
    await serverAuth(req);

    const { message, userName, userEmail } = req.body;

    const messageres = await prismadb.message.create({
      data: {
        message,
        userEmail,
        userName,
      },
    });

    return res.status(200).json(messageres);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
