import { Flex, Group, Text, Title } from "@mantine/core";
import { CourtTable } from "../CourtTable/CourtTable";
import { MatchUp } from "@/classes/MatchUp";

export function MatchUpsContent({ matchUps, calculateStandings }: MatchUpsContentProps) {

    return (
        <>
            <Flex direction="column">
                {
                    matchUps.length > 0 ?
                        <>
                            <Flex gap={'xl'} direction={'column'}>
                                <Group gap='xs' justify="center">
                                    <Title order={2}>Court 1</Title>
                                    <CourtTable calculateStandings={calculateStandings} matchUps={matchUps.filter(matchUp => matchUp.getCourt() === 1)} />
                                </Group>

                                <Group gap='xs' justify="center">
                                    <Title order={2}>Court 2</Title>
                                    <CourtTable calculateStandings={calculateStandings} matchUps={matchUps.filter(matchUp => matchUp.getCourt() === 2)} />
                                </Group>

                                <Group gap='xs' justify="center">
                                    <Title order={2}>Court 3</Title>
                                    <CourtTable calculateStandings={calculateStandings} matchUps={matchUps.filter(matchUp => matchUp.getCourt() === 3)} />
                                </Group>

                                <Group gap='xs' justify="center">
                                    <Title order={2}>Court 4</Title>
                                    <CourtTable calculateStandings={calculateStandings} matchUps={matchUps.filter(matchUp => matchUp.getCourt() === 4)} />
                                </Group>
                            </Flex>
                        </> :
                        <Text>Not enough pairs registered!</Text>
                }
            </Flex>
        </>
    )
}

interface MatchUpsContentProps {
    matchUps: MatchUp[];
    calculateStandings: () => void;
}