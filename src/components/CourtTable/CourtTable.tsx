import { MatchUp } from "@/classes/MatchUp";
import { Table } from "@mantine/core";
import { CourtRow } from "./CourtRow";

export function CourtTable({ courtMatchUps, matchUps, setMatchUps, calculateStandings }: CourtTableProps) {
    const courtScoreChange = () => {
        setMatchUps([...matchUps]);
    }

    const rows = courtMatchUps?.map((matchUp: MatchUp) => {
        return (
            <CourtRow key={`${matchUp.getMatchId()}`} matchUp={matchUp} onScoreChange={courtScoreChange} calculateStandings={calculateStandings} />
        );
    })

    return (
        <>
            <Table striped withColumnBorders withRowBorders={false}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Pair 1</Table.Th>
                        <Table.Th>Pair 2</Table.Th>
                        <Table.Th>Team 1 Score</Table.Th>
                        <Table.Th>vs</Table.Th>
                        <Table.Th>Pair 3</Table.Th>
                        <Table.Th>Pair 4</Table.Th>
                        <Table.Th>Team 2 Score</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </>
    )
}

interface CourtTableProps {
    courtMatchUps: MatchUp[];
    matchUps: MatchUp[];
    setMatchUps: (value: MatchUp[]) => void;
    calculateStandings: () => void;
}