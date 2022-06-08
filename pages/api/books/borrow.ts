// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/utils/db/connect";
import { RequestError } from "@/types/RequertError";

type Data =
	| null
	| {
			success: true;
	  }
	| RequestError;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== "POST") {
		return res.status(405).json({
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
		return res.status(200).json({
			success: true,
		});
	} else {
		return res.status(400).json({
			error: "Wtf?",
		});
	}
}
