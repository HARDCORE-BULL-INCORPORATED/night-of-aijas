import { type Component, createSignal, onCleanup, onMount } from "solid-js";
import { type TacticItem, tacticPool } from "./tacticsTypes";
import { TacticRoulette } from "./roulette.classes";
import tacticStyles from "./TacticRoller.module.css";
import RollerSection from "./RollerSection/RollerSection";
import DetailsSection from "./DetailsSection/DetailsSection";
import Modal from "./modals/Modal";
import InventoryModal from "./modals/InventoryModal";

const TacticRoller: Component = () => {
    const [isOpening, setIsOpening] = createSignal(false);
    const [inventory, setInventory] = createSignal<TacticItem[]>([]);
    const [selectedTactic, setSelectedTactic] = createSignal<TacticItem | null>(
        null,
    );
    const [rouletteTactics, setRouletteTactics] = createSignal<TacticItem[]>(
        [],
    );
    const [prizeTacticId, setPrizeTacticId] = createSignal<number>(-1);
    const [isSpinEnded, setIsSpinEnded] = createSignal(false);
    const [showModal, setShowModal] = createSignal(false);
    const [showInventoryModal, setShowInventoryModal] = createSignal(false);
    const [currentInventoryIndex, setCurrentInventoryIndex] = createSignal(0);

    // In SolidJS, refs are just variables that get assigned during render
    let rouletteContainerRef: HTMLDivElement | undefined;
    let tacticsRef: HTMLDivElement | undefined;

    const handleKeyPress = (e: KeyboardEvent) => {
        if (!showInventoryModal()) return;

        if (e.key === "ArrowLeft") {
            navigateInventory("prev");
        } else if (e.key === "ArrowRight") {
            navigateInventory("next");
        } else if (e.key === "Escape") {
            closeInventoryModal();
        }
    };

    const navigateInventory = (direction: "prev" | "next") => {
        const currentIndex = currentInventoryIndex();
        const inventorySize = inventory().length;

        if (direction === "prev") {
            setCurrentInventoryIndex(
                (currentIndex - 1 + inventorySize) % inventorySize,
            );
        } else {
            setCurrentInventoryIndex((currentIndex + 1) % inventorySize);
        }
        setSelectedTactic(inventory()[currentInventoryIndex()]);
    };

    const initializeRoulette = () => {
        if (!rouletteContainerRef || !tacticsRef) return;

        try {
            // Create a dummy roulette just to get a filled roulette
            const initialRoulette = new TacticRoulette({
                winner: tacticPool[0], // Just use the first item as a placeholder
                tactics: tacticPool,
                rouletteContainerRef: rouletteContainerRef,
                tacticsRef: tacticsRef,
                tacticsCount: 100,
                transitionDuration: 5,
                itemWidth: 200,
            });

            initialRoulette.set_tactics();
            setRouletteTactics(initialRoulette.tactics);
        } catch (error) {
            console.error("Error initializing roulette:", error);
        }
    };

    onMount(() => {
        const savedInventory = localStorage.getItem("tacticInventory");
        if (savedInventory) {
            setInventory(JSON.parse(savedInventory));
        }

        setTimeout(initializeRoulette, 100);

        // Add keyboard event listener
        window.addEventListener("keydown", handleKeyPress);
    });

    onCleanup(() => {
        // Remove keyboard event listener
        window.removeEventListener("keydown", handleKeyPress);
    });

    const saveInventory = () => {
        if (inventory().length > 0) {
            localStorage.setItem(
                "tacticInventory",
                JSON.stringify(inventory()),
            );
        }
    };

    const openCase = () => {
        setIsOpening(true);
        setIsSpinEnded(false);

        // Ensure refs are set
        if (!rouletteContainerRef || !tacticsRef) {
            console.error("Refs not properly initialized");
            setIsOpening(false);
            return;
        }

        // Get a random winner tactic using weighted selection
        const randomTactic = getWeightedRandomTactic(tacticPool);

        try {
            // Create a new roulette with the selected winner
            const roulette = new TacticRoulette({
                winner: randomTactic,
                tactics: tacticPool,
                rouletteContainerRef: rouletteContainerRef,
                tacticsRef: tacticsRef,
                tacticsCount: 100,
                transitionDuration: 5,
                itemWidth: 200,
            });

            roulette.set_tactics();
            setRouletteTactics(roulette.tactics);

            setTimeout(() => {
                const prizeId = roulette.spin();
                setPrizeTacticId(prizeId);
            }, 1000);
        } catch (error) {
            console.error("Error setting up roulette:", error);
            setIsOpening(false);
        }
    };
    const getWeightedRandomTactic = (items: TacticItem[]): TacticItem => {
        // Calculate total weight
        const totalWeight = items.reduce(
            (acc, item) => acc + (item.chance || 1),
            0,
        );

        // Get a random value between 0 and total weight
        const randomValue = Math.random() * totalWeight;

        // Find the tactic based on weight distribution
        let weightSum = 0;
        for (const item of items) {
            weightSum += item.chance || 1;
            if (randomValue <= weightSum) {
                return item;
            }
        }

        // Fallback (should never reach here if weights are positive)
        return items[0];
    };

    const handleTransitionEnd = () => {
        // This needs to correctly identify the winning tactic
        const winningTactic = rouletteTactics()[prizeTacticId()];

        if (!winningTactic) {
            console.error("Winning tactic not found at index", prizeTacticId());
            return;
        }

        console.log(
            "Prize ID:",
            prizeTacticId(),
            "Winner:",
            winningTactic.name,
        );

        setIsOpening(false);
        setIsSpinEnded(true);
        setSelectedTactic(winningTactic);
        setShowModal(true);

        // Add to inventory
        setInventory((prev) => [winningTactic, ...prev]);
        saveInventory();
    };

    const clearInventory = () => {
        setInventory([]);
        setSelectedTactic(null);
        localStorage.removeItem("tacticInventory");
    };

    const selectTactic = (tactic: TacticItem) => {
        const index = inventory().findIndex(
            (item) => item.name === tactic.name,
        );
        setCurrentInventoryIndex(index);
        setSelectedTactic(tactic);
        setShowInventoryModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTactic(null);
    };

    const closeInventoryModal = () => {
        setShowInventoryModal(false);
        setSelectedTactic(null);
    };

    return (
        <div class={tacticStyles.container}>
            <div class={tacticStyles.wrapper}>
                <div class={tacticStyles.header}>
                    <h1>Tactics</h1>
                </div>

                <div class={tacticStyles.mainContent}>
                    <RollerSection
                        isOpening={isOpening()}
                        onOpenCase={openCase}
                        obtainedItem={selectedTactic()}
                        inventory={inventory()}
                        selectedTactic={selectedTactic()}
                        onClearInventory={clearInventory}
                        onSelectTactic={selectTactic}
                        rouletteContainerRef={(el) =>
                            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                            (rouletteContainerRef = el)
                        }
                        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                        tacticsRef={(el) => (tacticsRef = el)}
                        handleTransitionEnd={handleTransitionEnd}
                        rouletteTactics={rouletteTactics()}
                        prizeTacticId={prizeTacticId()}
                        isSpinEnded={isSpinEnded()}
                    />
                </div>
            </div>

            {/* Result Modal */}
            <Modal isOpen={showModal()} onClose={closeModal}>
                <div class={tacticStyles.modalContent}>
                    <h2>You got:</h2>
                    <DetailsSection selectedTactic={selectedTactic()} />
                </div>
            </Modal>

            <InventoryModal
                isOpen={showInventoryModal()}
                onClose={closeInventoryModal}
            >
                <div class={tacticStyles.modalContent}>
                    <div class={tacticStyles.modalNavigation}>
                        <button
                            type="button"
                            class={tacticStyles.navButton}
                            onClick={() => navigateInventory("prev")}
                        >
                            ←
                        </button>
                        <DetailsSection selectedTactic={selectedTactic()} />
                        <button
                            type="button"
                            class={tacticStyles.navButton}
                            onClick={() => navigateInventory("next")}
                        >
                            →
                        </button>
                    </div>
                </div>
            </InventoryModal>
        </div>
    );
};

export default TacticRoller;
