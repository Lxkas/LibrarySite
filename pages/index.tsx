import React from "react";
import { NextPage } from "next";

import { ScrollArea } from "@mantine/core";

const Home: NextPage = () => {
	return (
		<ScrollArea className="relative h-full max-h-1 min-h-full">
			<div className="h-screen">This overflows!</div>
		</ScrollArea>
	);
};

export default Home;
