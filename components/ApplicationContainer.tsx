import React, { PropsWithChildren, useState } from "react";
import Link from "next/link";

import {
	AppShell,
	Navbar,
	Header,
	Text,
	Burger,
	useMantineTheme,
	ActionIcon,
	useMantineColorScheme,
	Transition,
	UnstyledButton,
	Group,
	Divider,
	ScrollArea,
	Accordion,
	Menu,
	SegmentedControl,
	Center,
	Box,
	MediaQuery,
} from "@mantine/core";

import {
	faSun,
	faMoon,
	faHome,
	faBookOpen,
	faClock,
	faGear,
	faMagnifyingGlass,
	faPhotoFilm,
	faMessage,
	faArrowsLeftRight,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserSection from "./shared/navigation/UserSection";

const NAV_SLIDE_OUT = {
	in: { transform: "translateX(0)" },
	out: { transform: "translateX(-100%)" },
	common: { transformOrigin: "right" },
	transitionProperty: "transform",
};

const NAVIGATION_DATA = [
	{ icon: <FontAwesomeIcon icon={faHome} />, label: "Home", href: "/" },
	{
		icon: <FontAwesomeIcon icon={faClock} />,
		label: "History",
		href: "/history",
	},
	{
		icon: <FontAwesomeIcon icon={faBookOpen} />,
		label: "My Books",
		href: "/mybooks",
	},
];

const LIGHT_DARK_DATA = [
	{
		value: "light",
		label: (
			<Center>
				<FontAwesomeIcon icon={faSun} size={"1x"} />
				<Box ml={10}>Light</Box>
			</Center>
		),
	},
	{
		value: "dark",
		label: (
			<Center>
				<FontAwesomeIcon icon={faMoon} size={"1x"} />
				<Box ml={10}>Dark</Box>
			</Center>
		),
	},
];

interface MainLinkProps {
	icon: React.ReactNode;
	label: string;
	href: string;
}

function NavItem({ icon, label, href }: MainLinkProps) {
	return (
		<Link href={href} passHref>
			<UnstyledButton
				component="a"
				sx={(theme) => ({
					display: "block",
					width: "100%",
					padding: theme.spacing.xs,
					borderRadius: theme.radius.sm,
					color:
						theme.colorScheme === "dark"
							? theme.colors.dark[0]
							: theme.black,

					"&:hover": {
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[6]
								: theme.colors.gray[0],
					},
				})}
			>
				<Group>
					<span>{icon}</span>

					<Text size="sm">{label}</Text>
				</Group>
			</UnstyledButton>
		</Link>

		// <Button leftIcon={icon} variant="subtle" className="w-full">
		// 	{label}
		// </Button>
	);
}

export default function ApplicationContainer({ children }: PropsWithChildren) {
	const theme = useMantineTheme();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const [opened, setOpened] = useState(false);

	const dark = colorScheme === "dark";

	return (
		<AppShell
			fixed
			styles={{
				main: { transition: "padding-left 200ms ease" },
			}}
			navbar={
				<Transition
					mounted={opened}
					transition={NAV_SLIDE_OUT}
					duration={200}
					timingFunction="ease"
				>
					{(styles) => (
						<Navbar
							width={
								opened
									? {
											sm: 200,
											lg: 300,
									  }
									: {
											sm: 0,
									  }
							}
							sx={{
								overflow: "hidden",
							}}
							style={{ ...styles }}
						>
							<div className="flex h-full w-full flex-col gap-y-2 p-2">
								<Navbar.Section>
									First Section idk
									<Divider my="sm" />
								</Navbar.Section>

								{/* Grow section will take all available space that is not taken by first and last sections */}
								<Navbar.Section grow component={ScrollArea}>
									{NAVIGATION_DATA.map((link) => (
										<NavItem
											{...link}
											key={"navItem" + link.label}
										/>
									))}

									<Accordion multiple iconPosition="right">
										<Accordion.Item label="Customization">
											Colors, fonts, shadows and many
											other parts are customizable to fit
											your design needs
										</Accordion.Item>

										<Accordion.Item label="Flexibility">
											Configure components appearance and
											behavior with vast amount of
											settings or overwrite any part of
											component styles
										</Accordion.Item>

										<Accordion.Item label="No annoying focus ring">
											With new :focus-visible pseudo-class
											focus ring appears only when user
											navigates with keyboard
										</Accordion.Item>
									</Accordion>
								</Navbar.Section>

								{/* Last section with normal height (depends on section content) */}
								<Navbar.Section>
									<UserSection
										image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
										name="Some Guy Here"
										email="Someone@person.com"
									/>
								</Navbar.Section>
							</div>
						</Navbar>
					)}
				</Transition>
			}
			header={
				<Header height={70} p="md">
					<div className="flex h-full flex-row items-center">
						{/* Burger button */}
						<span>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</span>

						{/* "Logo" lmfao */}
						<span className="flex-grow">
							<div className="w-max">
								<Link href="/" passHref>
									<Text
										component="a"
										className="text-2xl font-bold uppercase"
										variant={dark ? "gradient" : "text"}
										gradient={{
											from: "cyan",
											to: "indigo",
											deg: 45,
										}}
									>
										Stamford Library
									</Text>
								</Link>
							</div>
						</span>

						{/* Dark / Light switcher */}
						<span>
							<Group position="center" my="xl">
								{/* If bigger than MD, hide */}
								<MediaQuery
									largerThan={"md"}
									styles={{ display: "none" }}
								>
									<SegmentedControl
										value={colorScheme}
										onChange={(val) => {
											if (val != "light" && val != "dark")
												return;

											toggleColorScheme(val);
										}}
										size="xs"
										data={LIGHT_DARK_DATA}
									/>
								</MediaQuery>

								{/* If smaller than MD, hide*/}
								<MediaQuery
									smallerThan={"md"}
									styles={{ display: "none" }}
								>
									<SegmentedControl
										value={colorScheme}
										onChange={(val) => {
											if (val != "light" && val != "dark")
												return;

											toggleColorScheme(val);
										}}
										size="sm"
										data={LIGHT_DARK_DATA}
									/>
								</MediaQuery>
							</Group>
							{/* <ActionIcon
								variant="outline"
								color={dark ? "yellow" : "blue"}
								onClick={() => toggleColorScheme()}
								title="Toggle dark mode"
							>
								<FontAwesomeIcon
									icon={dark ? faSun : faMoon}
									size={"1x"}
								/>
							</ActionIcon> */}
						</span>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}
