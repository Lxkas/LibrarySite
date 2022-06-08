export default async function BorrowBook(bookID: number) {
	// TODO: Authenticate on server, make sure user is logged in
	// TODO: !!! CHANGE USERID TO THE LOGGED IN USER'S, DO THIS ON THE SERVER LMAO
	const result = await fetch("http://localhost:3000/api/books/borrow", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			userId: 1,
			bookId: bookID,
		}),
	});

	return result;
}
