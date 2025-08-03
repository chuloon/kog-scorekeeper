import { Pair } from "@/classes/Pair";

export const savePairs = (pairs: Pair[]) => {
    const stringifiedPairs = pairs.map(pair => {
        return pair.getPairData()
    })
    localStorage.setItem("pairs", JSON.stringify(stringifiedPairs));
}