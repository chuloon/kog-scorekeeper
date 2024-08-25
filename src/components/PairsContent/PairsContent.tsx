import { Pair } from "@/classes/Pair";
import { AddNewPair } from "../AddNewPair/AddNewPair";
import { PairsTable } from "../PairsTable/PairsTable";

export function PairsContent({ addNewPair, pairs }: PairsContentProps) {
    return (
        <>
            <AddNewPair handleAddNewPair={addNewPair} />
            <PairsTable pairs={pairs} />
        </>
    )
}

interface PairsContentProps {
    addNewPair: (newPair: Pair) => void;
    pairs: Pair[];
}