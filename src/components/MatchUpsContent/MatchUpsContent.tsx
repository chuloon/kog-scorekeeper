import { Flex, Title } from "@mantine/core";
import { AddNewMatchUp } from "../AddNewMatchUp/AddNewMatchUp";
import { CourtTable } from "../CourtTable/CourtTable";
import { MatchUp } from "@/classes/MatchUp";

export function MatchUpsContent({ matchUps, handleAddNewMatchUp }: MatchUpsContentProps) {

    return (
        <>
            <AddNewMatchUp handleAddNewMatchUp={handleAddNewMatchUp} />
            <Flex direction="column">
                <Title order={2}>Court 1</Title>
                <CourtTable matchUps={matchUps} />
            </Flex>
        </>
    )
}

interface MatchUpsContentProps {
    matchUps: MatchUp[];
    handleAddNewMatchUp: (newMatchUp: MatchUp) => void;
}