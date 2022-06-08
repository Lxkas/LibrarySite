import React, { useState } from "react";
import { NextPage } from "next";

import { Button, Grid, LoadingOverlay, Modal, ScrollArea } from "@mantine/core";
import BookCard from "@/components/book/BookCard";
import { BadgeCardProps } from "@/types/BadgeCardTypes";
import DetailsModalBody from "@/components/modals/DetailsModalBody";
import useSWR from "swr";
import { basicFetcher } from "@/utils/basic-fetcher";

function BookGridCol(props: BadgeCardProps) {
	return (
		<Grid.Col md={6} lg={3}>
			<BookCard {...props} />
		</Grid.Col>
	);
}

const Home: NextPage = () => {
	const [detailsModalOpen, setDetailsModalOpen] = useState(false);
	const [currentModalObject, setCurrentModalObject] =
		useState<BadgeCardProps>();

	console.log(currentModalObject);

	// TODO: Type the SWR responses
	const { data, error } = useSWR("/api/books/get", basicFetcher);

	if (!data) {
		console.log("Loading...");
		return (
			<div className="relative flex h-full w-full ">
				<div className="m-auto text-8xl font-bold uppercase">
					Loading...
				</div>
				<LoadingOverlay visible={true} />
			</div>
		);
	} else {
		console.log(data);
	}

	return (
		<>
			<Modal
				centered
				overflow="inside"
				opened={detailsModalOpen}
				onClose={() => setDetailsModalOpen(false)}
				title={currentModalObject?.title}
				size="50%"
			>
				<DetailsModalBody currentModalObject={currentModalObject} />
				<Button onClick={() => {}} className="my-2">
					Borrow
				</Button>
			</Modal>

			<Grid justify="start" align="center">
				{data.map((book: any) => {
					return (
						<BookGridCol
							key={"bookcol" + book.Title}
							title={book.Title}
							main_category={book.Category}
							authorName={`${book.author.FirstName} ${book.author.MiddleName} ${book.author.LastName}`}
							authorDetails={book.author.Details}
							ISBN={book.ISBN}
							description={book.Description}
							available={book.borrows.length == 0}
							image="https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
							setDetailsOpen={setDetailsModalOpen}
							setCurrentModalObject={setCurrentModalObject}
						/>
					);
				})}
			</Grid>
		</>
	);
};

export default Home;
