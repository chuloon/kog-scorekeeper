import { Pair } from "@/classes/Pair";
import { AddNewPair } from "../AddNewPair/AddNewPair";
import { PairsTable } from "../PairsTable/PairsTable";
import { Flex } from "@mantine/core";

export function PairsContent({ addNewPair, pairs, deletePair }: PairsContentProps) {
    return (
        <Flex gap="md" direction="column">
            <AddNewPair handleAddNewPair={addNewPair} currentNumberOfPairs={pairs.length} />
            <PairsTable pairs={pairs} deletePair={deletePair} />
        </Flex>
    )
}

interface PairsContentProps {
    addNewPair: (newPair: Pair) => void;
    pairs: Pair[];
    deletePair: (pair: Pair) => any;
}