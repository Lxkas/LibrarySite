import "../styles/globals.css";

import { GetServerSidePropsContext } from "next";
import { PropsWithChildren, ReactNode, useState } from "react";
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

import { getSession, SessionProvider, useSession } from "next-auth/react";
import { NotificationsProvider } from "@mantine/notifications";

// TODO: Make loading better
function Auth({ children }: PropsWithChildren) {
	// if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
	const { status } = useSession({ required: true });

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	return children;
}

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
				{/* @ts-ignore */}
				<SessionProvider session={props.session}>
					<NotificationsProvider>
						<ApplicationContainer>
							{/* @ts-ignore */}
							{Component.requireAuth ? (
								// @ts-ignore
								<Auth>
									<Component {...pageProps} />
								</Auth>
							) : (
								<Component {...pageProps} />
							)}
						</ApplicationContainer>
					</NotificationsProvider>
				</SessionProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

// App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
// 	// get color scheme from cookie
// 	colorScheme: getCookie("mantine-color-scheme", ctx) || "dark",
// });

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
	const session = await getSession(ctx);

	return {
		session,
		colorScheme: getCookie("mantine-color-scheme", ctx) || "dark",
	};
};
