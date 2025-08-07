import type { CaseItem } from "../roulette/types";

// Type definitions for each rarity tier
type ConsumerItem = CaseItem & { rarity: "Consumer" };
type IndustrialItem = CaseItem & { rarity: "Industrial" };
type MilSpecItem = CaseItem & { rarity: "Mil-spec" };

type RestrictedItem = CaseItem & { rarity: "Restricted" };
type ClassifiedItem = CaseItem & { rarity: "Classified" };
type CovertItem = CaseItem & { rarity: "Covert" };
type ContrabandItem = CaseItem & { rarity: "Contraband" };
type RareSpecialItem = CaseItem & { rarity: "Rare Special Item" };

const consumerGradeItems: ConsumerItem[] = [
	{
		name: "Smirnoff",
		rarity: "Consumer",
		weight: 1,
		image: "viinat/smirnoff.jpg",
		description: "",
	},
];

const industrialGradeItems: IndustrialItem[] = [
	{
		name: "Kyrö",
		rarity: "Industrial",
		weight: 1,
		image: "viinat/kyro.jpg",
		description: "",
	},
	{
		name: "Finlandia",
		rarity: "Industrial",
		weight: 1,
		image: "viinat/finlandia.jpg",
		description: "",
	},
];

const milSpecItems: MilSpecItem[] = [
	{
		name: "Koskenkorva 38%",
		rarity: "Mil-spec",
		weight: 1,
		image: "viinat/koskenkorva-38.jpg",
		description: "",
	},
	{
		name: "Leijona",
		rarity: "Mil-spec",
		weight: 1,
		image: "viinat/leijona.jpg",
		description: "",
	},
	{
		name: "Suomi Viina",
		rarity: "Mil-spec",
		weight: 1,
		image: "viinat/suomi-viina.jpg",
		description: "",
	},
	{
		name: "Saunalahden Viina",
		rarity: "Mil-spec",
		weight: 1,
		image: "viinat/saunalahden-viina.jpg",
		description: "",
	},
];

const restrictedItems: RestrictedItem[] = [
	{
		name: "Puolustuslaitos",
		rarity: "Restricted",
		weight: 1,
		image: "viinat/puolustuslaitos.jpg",
		description: "",
	},
	{
		name: "Koskenkorva 40%",
		rarity: "Restricted",
		weight: 1,
		image: "viinat/koskenkorva-40.jpg",
		description: "",
	},
];

const classifiedItems: ClassifiedItem[] = [
	{
		name: "Sisuviina",
		rarity: "Classified",
		weight: 1,
		image: "viinat/sisuviina.jpg",
		description: "",
	},
	{
		name: "Saaremaa",
		rarity: "Classified",
		weight: 1,
		image: "viinat/saaremaa.jpg",
		description: "",
	},

	{
		name: "Tapio",
		rarity: "Classified",
		weight: 1,
		image: "viinat/tapio-39.jpg",
		description: "",
	},
];

const covertItems: CovertItem[] = [
	{
		name: "Dry Vodka",
		rarity: "Covert",
		weight: 1,
		image: "viinat/dry-vodka.jpg",
		description: "",
	},
	{
		name: "Sisuviina",
		rarity: "Covert",
		weight: 1,
		image: "viinat/sisuviina.jpg",
		description: "",
	},
];

const rareSpecialItems: RareSpecialItem[] = [
	{
		name: "Koskenkorva Vodka 60%",
		rarity: "Rare Special Item",
		weight: 1,
		image: "/viinat/kossu-60.jpg",
		description: "",
	},
];

const contrabandItems: ContrabandItem[] = [
	{
		name: "762 Viina",
		rarity: "Contraband",
		weight: 0.08,
		image: "viinat/762-viina.jpg",
		description: "Onnittelut :D",
	},
];

export const boozeCase: CaseItem[] = [
	...consumerGradeItems,
	...industrialGradeItems,
	...milSpecItems,
	...restrictedItems,
	...classifiedItems,
	...covertItems,
	...rareSpecialItems,
	...contrabandItems,
];
