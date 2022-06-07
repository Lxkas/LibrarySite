import React, { useState } from "react";
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	ActionIcon,
	useMantineColorScheme,
	Transition,
} from "@mantine/core";
import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSun, faMoon, faStamp } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	return (
		<AppShell
			styles={{
				main: {
					transition: "padding-left 200ms ease",
					background:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			navbar={
				<Transition
					mounted={opened}
					transition={"slide-right"}
					duration={200}
					timingFunction="ease"
				>
					{(styles) => (
						<Navbar
							width={{
								sm: opened ? 200 : 0,
								lg: opened ? 300 : 0,
							}}
							className="overflow-hidden"
							style={{ ...styles }}
						>
							<Text p="md" sx={{ whiteSpace: "nowrap" }}>
								Application navbar
							</Text>
						</Navbar>
					)}
				</Transition>

				// <Navbar
				// 	p="md"
				// 	hiddenBreakpoint="sm"
				// 	hidden={!opened}
				// 	width={{ sm: 200, lg: 300 }}
				// >
				// 	<Text>Application navbar</Text>
				// </Navbar>
			}
			header={
				<Header height={70} p="md" className="flex ">
					<div className="flex h-full w-full flex-row items-center">
						<Burger
							opened={opened}
							onClick={() => setOpened((o) => !o)}
							size="sm"
							color={theme.colors.gray[6]}
							mr="xl"
						/>

						<span className="flex flex-row items-center gap-x-2">
							<span>
								<FontAwesomeIcon
									icon={faStamp}
									size={"lg"}
									color={theme.colors.gray[6]}
									opacity={"80%"}
								/>
							</span>
							<Text
								className="text-2xl font-bold uppercase"
								variant={dark ? "gradient" : "text"}
								gradient={{
									to: dark
										? theme.colors.indigo[7]
										: theme.colors.gray[7],

									from: dark
										? theme.colors.cyan[7]
										: theme.colors.gray[7],

									deg: 45,
								}}
							>
								Stamford Library
							</Text>
						</span>

						<div className="flex flex-grow items-center justify-end">
							<ActionIcon
								variant="outline"
								color={dark ? "yellow" : "blue"}
								onClick={() => toggleColorScheme()}
								title="Toggle color scheme"
							>
								{/* {dark ? <Sun size={18} /> : <MoonStars size={18} />} */}
								{dark ? (
									<FontAwesomeIcon icon={faSun} />
								) : (
									<FontAwesomeIcon icon={faMoon} />
								)}
							</ActionIcon>
						</div>
					</div>
				</Header>
			}
		>
			<Text>Resize app to see responsive navbar in action</Text>
		</AppShell>
	);
};

export default Home;
