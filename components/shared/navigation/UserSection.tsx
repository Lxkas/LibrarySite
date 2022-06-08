import {
	faArrowsLeftRight,
	faChevronLeft,
	faChevronRight,
	faGear,
	faMagnifyingGlass,
	faMessage,
	faPhotoFilm,
	faSignOut,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Box,
	UnstyledButton,
	Group,
	Avatar,
	Text,
	useMantineTheme,
	Menu,
	Divider,
	Button,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React, { forwardRef, useRef } from "react";

import { signOut } from "next-auth/react";

interface UserProps extends React.ComponentPropsWithoutRef<"button"> {
	image: string;
	name: string;
	email: string;
	icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const UserButton = forwardRef<HTMLButtonElement, UserProps>(
	({ image, name, email, icon, ...others }: UserProps, ref) => (
		<UnstyledButton
			ref={ref}
			sx={(theme) => ({
				display: "block",
				width: "100%",
				padding: theme.spacing.md,
				color:
					theme.colorScheme === "dark"
						? theme.colors.dark[0]
						: theme.black,

				"&:hover": {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
			{...others}
		>
			<Group>
				<Avatar src={image} radius="xl" />
				<Box sx={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{name}
					</Text>
					<Text color="dimmed" size="xs">
						{email}
					</Text>
				</Box>

				<FontAwesomeIcon icon={faChevronRight} size={"1x"} />
			</Group>
		</UnstyledButton>
	)
);

export default function UserSection(props: UserProps) {
	const theme = useMantineTheme();
	const matches = useMediaQuery("(min-width: 769px)");

	return (
		<Box
			sx={{
				paddingTop: theme.spacing.sm,
				borderTop: `1px solid ${
					theme.colorScheme === "dark"
						? theme.colors.dark[4]
						: theme.colors.gray[2]
				}`,
			}}
		>
			<Menu
				transition="scale-x"
				transitionDuration={100}
				transitionTimingFunction="ease"
				className="w-full"
				withArrow
				position={matches ? "right" : "top"}
				placement={matches ? "end" : "center"}
				control={
					<UserButton
						image={props.image}
						name={props.name}
						email={props.email}
					/>
				}
			>
				<Menu.Label>Application</Menu.Label>
				<Menu.Item icon={<FontAwesomeIcon icon={faGear} size={"1x"} />}>
					Settings
				</Menu.Item>
				<Menu.Item
					icon={<FontAwesomeIcon icon={faMessage} size={"1x"} />}
				>
					Messages
				</Menu.Item>
				<Menu.Item
					icon={<FontAwesomeIcon icon={faPhotoFilm} size={"1x"} />}
				>
					Gallery
				</Menu.Item>
				<Menu.Item
					icon={
						<FontAwesomeIcon icon={faMagnifyingGlass} size={"1x"} />
					}
					// rightSection={
					// 	<Text size="xs" color="dimmed">
					// 		⌘K
					// 	</Text>
					// }
				>
					Search
				</Menu.Item>
				<Divider />
				<Menu.Label>Danger zone</Menu.Label>

				<Menu.Item
					color="red"
					icon={<FontAwesomeIcon icon={faSignOut} size={"1x"} />}
					onClick={() => {
						signOut();
					}}
				>
					Logout
				</Menu.Item>
			</Menu>
		</Box>
	);
}
