// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RequestError } from "@/types/RequestError";
import { UserWithoutPass } from "@/types/UserWithoutPass";
import { prisma } from "@/utils/db/connect";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = UserWithoutPass | null | RequestError;

// TODO: Probably delete this, since next-auth is here
// TODO: Make password case sensitive
// TODO: Salt the password... like srsly
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== "POST") {
		return await res.status(405).json({
			error: "Only POST requests are supported!",
		});
	}

	const { email, password } = req.body;

	if (!email) {
		return await res.status(400).json({ error: "Invalid email!" });
	}

	if (!password) {
		return await res.status(400).json({ error: "Invalid password!" });
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

	if (result === null) {
		return await res.status(200).json({
			error: "Invalid password!",
		});
	}

	res.status(200).json(result);
}

export default withSentry(handler);
