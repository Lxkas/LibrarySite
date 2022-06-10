import BookCard from "@/components/book/BookCard";
import DetailsModalBody from "@/components/modals/DetailsModalBody";
import { BadgeCardProps } from "@/types/BadgeCardTypes";
import { basicFetcher } from "@/utils/basic-fetcher";
import {
	faArrowUp,
	faFilter,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	ActionIcon,
	Affix,
	Button,
	Divider,
	Grid,
	Input,
	LoadingOverlay,
	Modal,
	Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import useSWR from "swr";

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

	const [scroll, scrollTo] = useWindowScroll();

	// TODO: Type the SWR responses
	const { data, error } = useSWR("/api/books/get", basicFetcher);

	const [searchQuery, setSearchQuery] = useState("");

	const searchbarRef = useRef<HTMLInputElement>(null);

	if (!data || error) {
		return (
			<div className="relative flex h-full w-full ">
				<div className="m-auto text-8xl font-bold uppercase">
					{error ? error : "Loading..."}
				</div>
				<LoadingOverlay visible={!error && !data} />
			</div>
		);
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

			<div className="mb-2 flex h-8 w-full flex-row items-center p-2">
				<div className="ml-auto flex flex-row items-center">
					<ActionIcon
						title="Filter"
						size={"lg"}
						className="mr-2"
						variant="filled"
					>
						<FontAwesomeIcon icon={faFilter} />
					</ActionIcon>
					<Input
						onContextMenu={(e: any) => {
							e.preventDefault();
							e.target.value = "";
							setSearchQuery("");
						}}
						onKeyDown={(e: any) => {
							if (e.key === "Enter") {
								setSearchQuery(e.target.value);
							}
						}}
						onChange={(e: any) => {
							if (e.target.value == "") {
								setSearchQuery("");
							}
						}}
						ref={searchbarRef}
						icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
						placeholder="Search"
					/>
					<Button
						className="ml-2"
						onClick={() => {
							setSearchQuery(searchbarRef?.current?.value ?? "");
						}}
					>
						Search
					</Button>
				</div>
			</div>

			<Divider
				my="xs"
				label={"Stamford Book Browser"}
				labelPosition="center"
			/>

			{/* TODO: Type this */}
			<Grid justify="start" align="center">
				{data
					.filter((book: any) => {
						return !searchQuery
							? true
							: book.Title.toLowerCase().includes(
									searchQuery.toLowerCase()
							  );
					})
					.map((book: any) => {
						return (
							<BookGridCol
								key={"bookcol" + book.Title}
								bookID={book.BookID}
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

			<Affix position={{ bottom: 20, right: 20 }}>
				{/* @ts-ignore */}
				<Transition
					transition="slide-up"
					duration={200}
					mounted={scroll.y > 0}
				>
					{(transitionStyles) => (
						<Button
							leftIcon={<FontAwesomeIcon icon={faArrowUp} />}
							style={transitionStyles}
							//@ts-ignore
							onClick={() => scrollTo({ y: 0 })}
						>
							Scroll to top
						</Button>
					)}
				</Transition>
			</Affix>
		</>
	);
};

export default Home;
