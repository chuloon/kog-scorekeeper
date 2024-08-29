import { Flex, Text, Title } from "@mantine/core";
import { CourtTable } from "../CourtTable/CourtTable";
import { MatchUp } from "@/classes/MatchUp";

export function MatchUpsContent({ matchUps }: MatchUpsContentProps) {

    return (
        <>
            <Flex direction="column">
                {
                    matchUps.length > 0 ?
                        <>
                            <Title order={2}>Court 1</Title>
                            <CourtTable matchUps={matchUps} />
                        </> :
                        <Text>Not enough pairs registered!</Text>
                }
            </Flex>
        </>
    )
}

interface MatchUpsContentProps {
    matchUps: MatchUp[];
}