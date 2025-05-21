import type { Component } from "solid-js";
import { type CaseItem, getItemColor } from "../types";
import styles from "./RouletteItem.module.css";

interface RouletteItemProps {
	item: CaseItem;
	width?: number;
	isWinner?: boolean;
}

const RouletteItem: Component<RouletteItemProps> = (props) => {
	const itemWidth = props.width || 140;
	const rarityColor = getItemColor(props.item);

	return (
		<div
			class={`${styles.itemContainer} ${props.isWinner ? styles.winner : ""}`}
			style={{
				width: `${itemWidth}px`,
				height: `${itemWidth}px`,
				"--rarity-color": rarityColor,
			}}
		>
			<div class={styles.itemContent}>
				<div class={styles.itemImageContainer}>
					<img
						src={props.item.image}
						alt={props.item.name}
						class={styles.itemImage}
					/>
				</div>
				<div class={styles.itemInfo}>
					<div class={styles.itemName} title={props.item.name}>
						{props.item.name}
					</div>
					{/* This is the rarity name inside the roulette */}
					{/* <div class={styles.itemRarity} style={{ color: rarityColor }}>
            {props.item.rarity}
          </div> */}
				</div>
			</div>
		</div>
	);
};

export default RouletteItem;
