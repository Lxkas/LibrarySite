import { Prisma } from "@prisma/client";

export const bookForDisplayValidator = Prisma.validator<Prisma.bookInclude>()({
	borrows: {
		include: {
			user: {
				select: {
					Username: true,
				},
			},
		},
		where: {
			BorrowEndDate: {
				gt: new Date(),
			},
		},
	},
});

export type BookForDisplay = Prisma.bookGetPayload<{
	include: typeof bookForDisplayValidator;
}>;
