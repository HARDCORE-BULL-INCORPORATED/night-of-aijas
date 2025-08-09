import type { CaseItem } from "../roulette/types";

export const mapCase = [
	{
		name: "Dust II",
		rarity: "Consumer",
		weight: 1,
		image: "/maps/de_dust2.png",
	},
	{
		name: "Mirage",
		image: "/maps/de_mirage.png",
		rarity: "Consumer",
		weight: 1,
	},
	{
		name: "Inferno",
		image: "/maps/de_inferno.png",
		rarity: "Industrial",
		weight: 1,
	},
	{
		name: "Vertigo",
		image: "/maps/de_vertigo.png",
		rarity: "Industrial",
		weight: 1,
	},
	{
		name: "Train",
		image: "/maps/de_train.png",
		rarity: "Mil-spec",
		weight: 1,
		description: "Kun juna kulkee vaan :D",
	},
	{
		name: "Anubis",
		image: "/maps/de_anubis.png",
		rarity: "Classified",
		weight: 1,
		description: "A ryysi LÄÄLÄÄ HEI",
	},
	{
		name: "Ancient",
		image: "/maps/de_ancient.png",
		rarity: "Industrial",
		weight: 1,
	},
	{
		name: "Overpass",
		image: "/maps/de_overpass.png",
		rarity: "Mil-spec",
		weight: 1,
	},
	{
		name: "Nuke",
		image: "/maps/de_nuke.png",
		rarity: "Mil-spec",
		weight: 1,
	},
	{
		name: "Jura",
		image: "/maps/de_jura.png",
		rarity: "Classified",
		weight: 1,
		description: "Kumpi tuplaovi pusketaan !??!",
	},
	{
		name: "Grail",
		image: "/maps/de_grail.png",
		rarity: "Industrial",
		weight: 1,
	},
	{
		name: "Agency",
		image: "/maps/cs_agency.png",
		rarity: "Covert",
		weight: 1,
	},
	{
		name: "Office",
		image: "/maps/cs_office.png",
		rarity: "Rare Special Item",
		weight: 1,
		description: "OFFICEEN OFFICEEN",
	},
	{
		name: "Italy",
		image: "/maps/cs_italy.png",
		rarity: "Classified",
		weight: 1,
	},
] as const satisfies readonly CaseItem[];

export type MapName = (typeof mapCase)[number]["name"];
