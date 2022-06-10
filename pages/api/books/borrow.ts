// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RequestError } from "@/types/RequestError";
import { prisma } from "@/utils/db/connect";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| null
	| {
			success: true;
	  }
	| RequestError;

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== "POST") {
		return await res.status(405).json({
			error: "Only POST requests are supported!",
		});
	}

	const { userId, bookId } = req.body;

	const todayPlusOne = new Date();
	todayPlusOne.setDate(todayPlusOne.getDate() + 1);

	// TODO: Make it so that you can't borrow same ID more than once, prolly at a db level
	const result = await prisma.borrows.create({
		data: {
			BorrowEndDate: todayPlusOne,
			BorrowedBookID: bookId,
			BorrowerUserID: userId,
		},
	});

	if (result) {
		return await res.status(200).json({
			success: true,
		});
	} else {
		return await res.status(400).json({
			error: "Wtf?",
		});
	}
}

export default withSentry(handler);
