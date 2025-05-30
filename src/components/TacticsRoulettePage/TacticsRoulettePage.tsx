import type { Component } from "solid-js";
import { createSignal, createMemo, createEffect } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase, getCachedTacticsForMap } from "./tacticsCase";
import { tacticsPresets } from "./tacticsPresets";
import TacticSelectionModal from "./modals/TacticSelectionModal/TacticSelectionModal";
import SideSelectionModal from "./modals/SideSelectionModal/SideSelectionModal";
import { mapCase } from "../MapRoulette/mapCase";
import type { Side } from "./types";
import type { MapName } from "../MapRoulette/mapCase";

const TacticsRoulettePage: Component = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
    const [isMapSelectionModalOpen, setIsMapSelectionModalOpen] =
        createSignal(false);
    const [isSideSelectionModalOpen, setIsSideSelectionModalOpen] =
        createSignal(false);
    const [activeMapNamesForTactics, setActiveMapNamesForTactics] =
        createSignal<string[]>([]);
    const [selectedSide, setSelectedSide] = createSignal<Side | null>(null);

    // Helper functions for URL encoding/decoding
    const mapNameToUrl = (mapName: string): string => {
        return mapName.toLowerCase().replace(/\s+/g, "-");
    };

    const urlToMapName = (urlParam: string): MapName | null => {
        const normalizedParam = urlParam.toLowerCase().replace(/-/g, " ");
        const foundMap = mapCase.find(
            (map) =>
                map.name.toLowerCase() === normalizedParam ||
                map.name.toLowerCase() === urlParam.toLowerCase(),
        );
        return foundMap ? (foundMap.name as MapName) : null;
    };

    const sideParamToSide = (sideParam: string): Side | null => {
        const lowerSide = sideParam.toUpperCase();
        if (lowerSide === "CT") return "CT";
        if (lowerSide === "T") return "T";
        if (lowerSide === "BOTH") return "Both";
        return null;
    };

    const sideToParam = (side: Side): string => {
        return side.toLowerCase();
    };

    // Effect to handle route parameters
    createEffect(() => {
        const mapParam = params.map;
        const sideParam = params.side;

        if (mapParam && sideParam) {
            // We have route parameters, validate and use them
            const mapName = urlToMapName(mapParam);
            const side = sideParamToSide(sideParam);

            if (mapName && side) {
                setActiveMapNamesForTactics([mapName]);
                setSelectedSide(side);
            } else {
                // Invalid parameters, redirect to tactics selection
                navigate("/tactics", { replace: true });
            }
        } else if (!mapParam && !sideParam) {
            // No route parameters, show selection modals if not already selected
            if (activeMapNamesForTactics().length === 0) {
                setIsMapSelectionModalOpen(true);
            }
        }
    });

    const handleItemWon = (item: CaseItem): void => {
        setWonItems([item, ...wonItems()]);
        console.log("Won item:", item);
    };

    const handleClearHistory = () => {
        setWonItems([]);
    };

    const handleSaveMapSelectionForTactics = (selectedMapNames: string[]) => {
        setActiveMapNamesForTactics(selectedMapNames);
        console.log("Selected maps for tactics updated:", selectedMapNames);
        setIsMapSelectionModalOpen(false);

        // Reset side selection before opening the side modal
        setSelectedSide(null);

        // Always open side selection modal after a choice is made in the map modal
        setIsSideSelectionModalOpen(true);
    };

    const handleSideSelected = (side: Side) => {
        setSelectedSide(side);
        console.log("Selected side:", side);
        setIsSideSelectionModalOpen(false);

        // Navigate to the new route with parameters
        const mapName = activeMapNamesForTactics()[0];
        if (mapName) {
            const mapParam = mapNameToUrl(mapName);
            const sideParam = sideToParam(side);
            navigate(`/tactics/${mapParam}/${sideParam}`);
        }
    };

    // Filter tactics for the roulette based on activeMapNamesForTactics
    const currentTacticsForRoulette = createMemo(() => {
        const selectedMaps = activeMapNamesForTactics();
        const currentSide = selectedSide();
        console.log(
            "[currentTacticsForRoulette] Memo re-evaluated. Selected Maps:",
            selectedMaps,
            "Current Side:",
            currentSide,
        );

        let filteredTactics = [...tacticsCase];
        console.log(
            "[currentTacticsForRoulette] Initial tactics count:",
            filteredTactics.length,
        );

        if (selectedMaps.length > 0) {
            const selectedMap = selectedMaps[0] as MapName;
            const validTactics = getCachedTacticsForMap(selectedMap);
            filteredTactics = filteredTactics.filter((tactic) =>
                validTactics.some(
                    (validTactic) => validTactic.name === tactic.name,
                ),
            );
            console.log(
                `[currentTacticsForRoulette] Tactics count after map filter with validation ('${selectedMap}'):`,
                filteredTactics.length,
            );
        }

        // Filter by side
        if (currentSide && currentSide !== "Both") {
            console.log(
                `[currentTacticsForRoulette] Applying side filter for: ${currentSide}`,
            );
            const tacticsBeforeSideFilter = [...filteredTactics];
            filteredTactics = filteredTactics.filter(
                (tactic) =>
                    tactic.side === currentSide || tactic.side === "Both",
            );
            console.log(
                `[currentTacticsForRoulette] Tactics count after side filter ('${currentSide}'):`,
                filteredTactics.length,
            );
            if (tacticsBeforeSideFilter.length !== filteredTactics.length) {
                const removed = tacticsBeforeSideFilter.filter(
                    (t) => !filteredTactics.some((ft) => ft.name === t.name),
                );
                console.log(
                    "[currentTacticsForRoulette] Tactics removed by side filter (example):",
                    removed.map((t) => ({
                        name: t.name,
                        side: t.side,
                        map: t.map,
                    })),
                );
            }
        } else if (currentSide === "Both") {
            console.log(
                "[currentTacticsForRoulette] Side is 'Both', no specific side filtering applied to map-filtered tactics.",
            );
        } else {
            console.log(
                "[currentTacticsForRoulette] No side selected (null) or 'Both', so no specific (CT/T) side filtering applied.",
            );
        }

        console.log(
            "[currentTacticsForRoulette] Final tactics for roulette (names, sides, maps):",
            filteredTactics.map((t) => ({
                name: t.name,
                side: t.side,
                map: t.map,
            })),
        );
        return filteredTactics;
    });

    // Display current selection in the title
    const pageTitle = createMemo(() => {
        const mapName = activeMapNamesForTactics()[0];
        const side = selectedSide();

        if (mapName && side) {
            return `${mapName.toUpperCase()} (${side})`;
        }
        if (mapName) {
            return `${mapName.toUpperCase()}`;
        }
        return "TACTICS ROULETTE";
    });

    const handleChangeSelection = () => {
        setIsMapSelectionModalOpen(true);
    };

    const handleSideSwitch = (newSide: "CT" | "T") => {
        setSelectedSide(newSide);

        // Update route params
        const mapName = activeMapNamesForTactics()[0];
        if (mapName) {
            const mapParam = mapNameToUrl(mapName);
            const sideParam = sideToParam(newSide);
            navigate(`/tactics/${mapParam}/${sideParam}`);
        }
    };

    const hasRouteParams = () => params.map && params.side;

    return (
        <div class="container">
            <h1 style={{ "font-size": "3.5rem" }}>{pageTitle()}</h1>

            {hasRouteParams() &&
            activeMapNamesForTactics().length > 0 &&
            selectedSide() ? (
                <div
                    style={{ "margin-bottom": "20px", "text-align": "center" }}
                >
                    <p style={{ "margin-bottom": "10px" }}>
                        Map: <strong>{activeMapNamesForTactics()[0]}</strong> |
                        Side: <strong>{selectedSide()}</strong>
                    </p>
                    <button
                        type="button"
                        class="cs-btn"
                        onClick={handleChangeSelection}
                        style={{
                            "margin-right": "10px",
                            padding: "15px 25px",
                            "font-size": "18px",
                        }}
                    >
                        CHOOSE MAP
                    </button>
                    <button
                        type="button"
                        class="cs-btn"
                        onClick={() => handleSideSwitch("CT")}
                        style={{
                            "margin-right": "5px",
                            padding: "15px 25px",
                            "font-size": "18px",
                            "background-color":
                                selectedSide() === "CT" ? "#5a8de6" : undefined,
                        }}
                    >
                        CT
                    </button>
                    <button
                        type="button"
                        class="cs-btn"
                        onClick={() => handleSideSwitch("T")}
                        style={{
                            "margin-right": "10px",
                            padding: "15px 25px",
                            "font-size": "18px",
                            "background-color":
                                selectedSide() === "T" ? "#f0c14b" : undefined,
                            color: selectedSide() === "T" ? "#111" : undefined,
                        }}
                    >
                        T
                    </button>
                </div>
            ) : (
                <p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>
            )}

            <CaseRoulette
                items={currentTacticsForRoulette()}
                allMaps={[...tacticsCase]}
                initialActiveMaps={currentTacticsForRoulette()}
                onItemWon={handleItemWon}
                enableMapManagement={true}
                enableSpinDurationSlider={true}
                initialSpinDuration={8}
                presets={tacticsPresets}
                showWonItemsHistory={true}
                wonItems={wonItems()}
                onClearWonItemsHistory={handleClearHistory}
                historyTitle="Tactic History"
                selectItemsButtonText="Select Tactics"
                itemWeightsButtonText="Tactic Weights"
            />

            <TacticSelectionModal
                isOpen={isMapSelectionModalOpen()}
                onClose={() => {
                    setIsMapSelectionModalOpen(false);
                    // If on base route and modal is closed without selection, navigate home
                    if (
                        !hasRouteParams() &&
                        activeMapNamesForTactics().length === 0
                    ) {
                        navigate("/");
                    }
                }}
                allMaps={[...mapCase]}
                activeMapNames={activeMapNamesForTactics()}
                onSave={handleSaveMapSelectionForTactics}
            />

            <SideSelectionModal
                isOpen={isSideSelectionModalOpen()}
                onClose={() => setIsSideSelectionModalOpen(false)}
                onSelectSide={handleSideSelected}
            />
        </div>
    );
};

export default TacticsRoulettePage;
