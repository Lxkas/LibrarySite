// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db/connect";
import { RequestError } from "@/types/RequertError";
import { UserWithoutPass } from "@/types/UserWithoutPass";

type Data = UserWithoutPass | null | RequestError;

// TODO: Make password case sensitive
// TODO: Salt the password... like srsly
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== "POST") {
		return res.status(405).json({
			error: "Only POST requests are supported!",
		});
	}

	const { email, password } = req.body;

	if (!email) {
		return res.status(400).json({ error: "Invalid email!" });
	}

	if (!password) {
		return res.status(400).json({ error: "Invalid password!" });
	}

	const result = await prisma?.user.findFirst({
		select: {
			UserID: true,
			Email: true,
			FirstName: true,
			MiddleName: true,
			LastName: true,
			Username: true,
		},
		where: {
			Email: email,
			Password: password,
		},
	});

	if (result == null) {
		return res.status(200).json({
			error: "Invalid password!",
		});
	}

	res.status(200).json(result);
}
