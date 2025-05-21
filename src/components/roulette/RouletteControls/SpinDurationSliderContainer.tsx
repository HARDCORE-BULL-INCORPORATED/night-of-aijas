import type { Component, Accessor, Setter } from "solid-js";
import { Show } from "solid-js";
import SpinDurationSlider from "./SpinDurationSlider";

interface SpinDurationSliderContainerProps {
	enableSlider?: Accessor<boolean | undefined>;
	value: Accessor<number>; // This will now be the 'committed' value
	onChange: Setter<number>; // This will be called when the slider value is committed
	disabled: Accessor<boolean>;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
}

const SpinDurationSliderContainer: Component<
	SpinDurationSliderContainerProps
> = (props) => {
	const showSlider = () =>
		props.enableSlider === undefined || props.enableSlider();

	return (
		<Show when={showSlider()}>
			<div
				style={{
					display: "flex",
					"justify-content": "center",
					"margin-bottom": "5px",
				}}
			>
				<SpinDurationSlider
					initialValue={props.value} // Pass the current committed value as initialValue
					onCommit={props.onChange} // onCommit from slider will call onChange of container (which is the Setter)
					min={props.min || 1}
					max={props.max || 30}
					step={props.step || 1}
					disabled={props.disabled}
				/>
			</div>
		</Show>
	);
};

export default SpinDurationSliderContainer;
