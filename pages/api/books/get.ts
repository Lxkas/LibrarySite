// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db/connect";
import { RequestError } from "@/types/RequertError";
import {
	BookForDisplay,
	bookForDisplayValidator,
} from "@/types/BookForDisplay";

type Data = null | BookForDisplay[] | RequestError;

// TODO: Make password case sensitive
// TODO: Salt the password... like srsly
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== "GET") {
		return res.status(405).json({
			error: "Only GET requests are supported!",
		});
	}

	const result = await prisma.book.findMany({
		include: bookForDisplayValidator,
	});

	// {
	//     BookID: 4,
	//     Title: 'Title 3',
	//     ISBN: 'ISBN3',
	//     AuthorID: 1,
	//     PublisherID: 1,
	//     Description: 'Description for book 3',
	//     Category: 'Mystery',
	//     Language: 'English',
	//     PublicationDate: 2022-06-03T00:00:00.000Z,
	//     Length: 420,
	//     BorrowedByUserID: null,
	//     borrows: [{
	//       BorrowID: 1,
	//       BorrowedBookID: 1,
	//       BorrowerUserID: 1,
	//       BorrowedDate: 2022-06-07T15:47:58.000Z,
	//       BorrowEndDate: 2022-06-14T00:00:00.000Z,
	//       user: {
	//         UserID: 1,
	//         Username: 'Hello',
	//         Password: 'World',
	//         Email: 'hi@hello.com',
	//         FirstName: 'Yaboi',
	//         MiddleName: 'Its',
	//         LastName: 'Froggy'
	//       }
	//     }]
	//   }

	// result.forEach((book) => {
	// 	// sort first so only active borrows
	// 	const borrows = book.borrows;

	// 	let available = borrows.length > 0;

	// 	console.log(
	// 		`"${book.Title} is ${
	// 			available
	// 				? `not available, it was rented by ${borrows[0].user
	// 						.Username!}`
	// 				: "available!"
	// 		}"`
	// 	);

	// 	// console.log(
	// 	// 	`Book title "${book.Title}" is ${true ? `` : "available!"}`
	// 	// );
	// });

	res.status(200).json(result);
}
