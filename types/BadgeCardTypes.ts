import { Dispatch, SetStateAction } from "react";

export type BadgeCardProps = {
	image: string;
	title: string;
	main_category: string;
	description: string;
	available: boolean;
	setDetailsOpen?: Dispatch<SetStateAction<boolean>>;
	setCurrentModalObject?: Dispatch<
		SetStateAction<BadgeCardProps | undefined>
	>;
};
