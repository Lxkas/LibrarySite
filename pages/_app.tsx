import "../styles/globals.css";

import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { AppProps } from "next/app";

import { getCookie, setCookies } from "cookies-next";

import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from "@mantine/core";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "@fortawesome/fontawesome-svg-core/styles.css";
import ApplicationContainer from "@/components/ApplicationContainer";
import Head from "next/head";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;

	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === "dark" ? "light" : "dark");

		setColorScheme(nextColorScheme);
		setCookies("mantine-color-scheme", nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{ colorScheme }}
				withGlobalStyles
				withNormalizeCSS
			>
				<Head>
					<title>Stamford Library</title>
				</Head>
				<ApplicationContainer>
					<Component {...pageProps} />
				</ApplicationContainer>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	// get color scheme from cookie
	colorScheme: getCookie("mantine-color-scheme", ctx) || "dark",
});
