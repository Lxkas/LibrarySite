import { useSession } from "next-auth/react";
import React from "react";

export default function FavoritesPage() {
	const session = useSession();

	return (
		<div>
			This is the favorites page, accessible only by signed in users, your
			email is {session.data?.user?.email}!
		</div>
	);
}

FavoritesPage.requireAuth = true;
