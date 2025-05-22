import type { Tactic } from "../tacticsCase";

export const officeCase: readonly Tactic[] = [
	{
		name: "Office: T Side Main Hall Push",
		image: "/tactics/office_main_hall_push.png",
		rarity: "Mil-spec",
		weight: 1.2,
		map: "Office",
	},
	{
		name: "Office: CT Connector Hold",
		image: "/tactics/office_ct_connector_hold.png",
		rarity: "Restricted",
		weight: 1,
		map: "Office",
	},
	{
		name: "Office: Paper Shredder Room Ambush",
		image: "/tactics/office_shredder_ambush.png",
		rarity: "Industrial",
		weight: 0.8,
		map: "Office",
	},
];
