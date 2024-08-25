import { Pair } from "@/classes/Pair";
import { AddNewPair } from "../AddNewPair/AddNewPair";
import { PairsTable } from "../PairsTable/PairsTable";
import { Flex } from "@mantine/core";

export function PairsContent({ addNewPair, pairs }: PairsContentProps) {
    return (
        <Flex gap="md" direction="column">
            <AddNewPair handleAddNewPair={addNewPair} />
            <PairsTable pairs={pairs} />
        </Flex>
    )
}

interface PairsContentProps {
    addNewPair: (newPair: Pair) => void;
    pairs: Pair[];
}