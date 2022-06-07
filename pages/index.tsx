import React, { useState } from "react";
import { NextPage } from "next";

import { Button, Grid, Modal, ScrollArea } from "@mantine/core";
import BookCard from "@/components/book/BookCard";
import { BadgeCardProps } from "@/types/BadgeCardTypes";
import DetailsModalBody from "@/components/modals/DetailsModalBody";

function BookGridCol(props: BadgeCardProps) {
	return (
		<Grid.Col md={6} lg={3}>
			<BookCard {...props} />
		</Grid.Col>
	);
}

const bookData: BadgeCardProps[] = [
	{
		title: "A Hitchhiker's Guide to the Galaxy",
		main_category: "Adventure",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sunt perspiciatis voluptatum beatae dolorem deleniti harum sapiente minima voluptas modi!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: true,
	},

	{
		title: "Something wonk",
		main_category: "Mystery",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sunt perspiciatis voluptatum beatae dolorem deleniti harum sapiente minima voluptas modi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sunt perspiciatis voluptatum beatae dolorem deleniti harum sapiente minima voluptas modi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sunt perspiciatis voluptatum beatae dolorem deleniti harum sapiente minima voluptas modi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sunt perspiciatis voluptatum beatae dolorem deleniti harum sapiente minima voluptas modi!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: true,
	},

	{
		title: "Some Title 5",
		main_category: "Horror",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nemo rem voluptates optio. Illum voluptate similique laudantium, in molestias amet omnis corrupti vitae eum, atque harum tempore adipisci accusamus molestiae!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: false,
	},

	{
		title: "Some Title 4",
		main_category: "Romance",
		description:
			"Lorem ipsum dolis corrupti vitae eum, atque harum tempore adipisci accusamus molestiae!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: true,
	},
	{
		title: "Some Title 0",
		main_category: "Romance",
		description:
			"Lorem ipsum dolis corrupti vitae eum, atque harum tempore adipisci accusamus molestiae!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: true,
	},
	{
		title: "Some Title 1",
		main_category: "Romance",
		description:
			"Lorem ipsum dolis corrupti vitae eum, atque harum tempore adipisci accusamus molestiae!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: true,
	},
	{
		title: "Some Title 2",
		main_category: "Romance",
		description:
			"Lorem ipsum dolis corrupti vitae eum, atque harum tempore adipisci accusamus molestiae!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: true,
	},
	{
		title: "Some Title 3",
		main_category: "Romance",
		description:
			"Lorem ipsum dolis corrupti vitae eum, atque harum tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipsci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!tempore adipisci accusamus molestiae!",
		image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
		available: false,
	},
];

const Home: NextPage = () => {
	const [detailsModalOpen, setDetailsModalOpen] = useState(false);
	const [currentModalObject, setCurrentModalObject] =
		useState<BadgeCardProps>();

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
				{bookData.map((book) => {
					return (
						<BookGridCol
							key={"bookcol" + book.title}
							{...book}
							setDetailsOpen={setDetailsModalOpen}
							setCurrentModalObject={setCurrentModalObject}
						/>
					);
				})}
			</Grid>
		</>
		// <ScrollArea className="relative h-full max-h-1 min-h-full w-full max-w-full overflow-x-hidden">

		// </ScrollArea>
	);
};

export default Home;
