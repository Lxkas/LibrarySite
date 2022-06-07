import React from "react";

import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	Button,
	UnstyledButton,
	ActionIcon,
	createStyles,
	useMantineTheme,
	ScrollArea,
	Divider,
	ThemeIcon,
	Overlay,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { classNames } from "@/utils/classNames";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { BadgeCardProps } from "@/types/BadgeCardTypes";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	section: {
		borderBottom: `1px solid ${
			theme.colorScheme === "dark"
				? theme.colors.dark[4]
				: theme.colors.gray[3]
		}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},

	like: {
		color: theme.colors.red[6],
	},

	button: {
		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.blue[7]
					: theme.colors.gray[2],
		},
	},

	label: {
		textTransform: "uppercase",
		fontSize: theme.fontSizes.xs,
		fontWeight: 700,
	},
}));

function OverlayLabel() {
	return (
		<div>
			<Text>Unavailable</Text>
		</div>
	);
}

// TODO: Color the main_category pills
export default function BookCard(props: BadgeCardProps) {
	const {
		image,
		title,
		description,
		main_category,
		available,
		setDetailsOpen,
		setCurrentModalObject,
	} = props;

	const { classes } = useStyles();

	// const theme = useMantineTheme();

	// const features = badges.map((badge) => (
	// 	<Badge
	// 		color={theme.colorScheme === "dark" ? "dark" : "gray"}
	// 		key={badge.label}
	// 		leftSection={badge.emoji}
	// 	>
	// 		{badge.label}
	// 	</Badge>
	// ));

	// Current has bug at a certain width where the hearticon will go down a bit.
	// idk how I'd fix that unless I hook onto the card's size,
	// then turn it into a Menu xdddd
	return (
		<Card
			withBorder
			radius="md"
			p="md"
			className={classNames(
				classes.card,
				"relative min-h-full w-full max-w-md"
			)}
		>
			<Card.Section>
				<Image src={image} alt={title} height={180} />
			</Card.Section>

			<Card.Section className={classes.section} mt="md">
				<Group position="apart">
					<Group
						direction="row"
						spacing={0}
						align="center"
						className="w-full"
					>
						<div className="flex w-full items-center">
							<div className="flex-grow truncate">
								<Text
									title={title}
									size="lg"
									weight={500}
									className="truncate"
								>
									{title}
								</Text>
							</div>
							<Badge size="sm" className="min-w-min">
								{main_category}
							</Badge>
						</div>
						{/* <Text size="xs" color={"dimmed"} className="ml-2">
							Available
						</Text> */}
					</Group>
				</Group>
				<ScrollArea className="h-48 max-h-full">
					<Text size="sm" mt="xs" className="min-h-full">
						{title}: {description}
					</Text>
				</ScrollArea>
			</Card.Section>

			{/* <Card.Section className={classes.section}>
				<Text mt="md" className={classes.label} color="dimmed">
					Perfect for you, if you enjoy
				</Text>
				<Group spacing={7} mt={5}>
					{features}
				</Group>
			</Card.Section> */}

			<Group mt="xs">
				<div className="flex flex-row items-center justify-center">
					<UnstyledButton
						className={classNames(
							classes.button,
							"rounded-md px-4 py-2"
						)}
						onClick={() => {
							if (setDetailsOpen && setCurrentModalObject) {
								setCurrentModalObject(props);
								setDetailsOpen(true);
							}
						}}
					>
						Details
					</UnstyledButton>
					<Divider className="m-2 h-8" orientation="vertical" />
					<UnstyledButton
						className={classNames(
							classes.button,
							"rounded-md px-4 py-2"
						)}
					>
						Borrow
					</UnstyledButton>
				</div>

				<ActionIcon
					variant="default"
					radius="md"
					size={36}
					className="ml-auto"
				>
					<FontAwesomeIcon
						icon={faHeart}
						size={"1x"}
						className={classes.like}
					/>
				</ActionIcon>
			</Group>

			{!available && (
				<>
					<Text className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 text-2xl font-bold uppercase text-white">
						Unavailable
					</Text>
					<Overlay color="#000" zIndex={5} />
				</>
			)}
		</Card>
	);
}
