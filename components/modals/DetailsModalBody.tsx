import {
	faCircleInfo,
	faPassport,
	faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ScrollArea, Tabs, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

// TODO: TYPE IT

function TabItem(props: any) {
	const { text } = props;

	return (
		<ScrollArea offsetScrollbars className="h-32 w-full max-w-2xl">
			<Text>{text}</Text>
		</ScrollArea>
	);
}

export default function DetailsModalBody(props: any) {
	const { currentModalObject } = props;

	const theme = useMantineTheme();
	const isPast = useMediaQuery(`(min-width: ${theme.breakpoints.xl}px)`);

	return (
		<Tabs
			variant="pills"
			tabPadding="sm"
			orientation={isPast ? "vertical" : "horizontal"}
		>
			<Tabs.Tab
				label="Description"
				icon={<FontAwesomeIcon icon={faCircleInfo} size={"1x"} />}
			>
				<TabItem text={currentModalObject?.description} />
			</Tabs.Tab>
			<Tabs.Tab
				label="Author"
				icon={<FontAwesomeIcon icon={faUserPen} size={"1x"} />}
			>
				{/* TODO: AUTHOR */}
				<TabItem text={currentModalObject?.authorName} />
			</Tabs.Tab>
			<Tabs.Tab
				label="ISBN"
				icon={<FontAwesomeIcon icon={faPassport} size={"1x"} />}
			>
				{/* TODO: BOOK ISBN */}
				<TabItem text={currentModalObject?.ISBN} />
			</Tabs.Tab>
		</Tabs>
	);
}
