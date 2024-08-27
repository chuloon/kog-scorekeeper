import { MatchUp } from "@/classes/MatchUp";
import { Table, TextInput } from "@mantine/core";

export function CourtTable({ matchUps }: CourtTableProps) {
    const rows = matchUps?.map((matchUp: MatchUp) => {
        return (
            <Table.Tr key={`${matchUp.getMatchId()}`}>
                <Table.Td>{matchUp.getPair1()}</Table.Td>
                <Table.Td>{matchUp.getPair2()}</Table.Td>
                <Table.Td><TextInput value={matchUp.getT1Score()} onChange={event => matchUp.setT1Score(parseInt(event.currentTarget.value))} /></Table.Td>
                <Table.Td>vs</Table.Td>
                <Table.Td>{matchUp.getPair3()}</Table.Td>
                <Table.Td>{matchUp.getPair4()}</Table.Td>
                <Table.Td><TextInput value={matchUp.getT2Score()} onChange={event => matchUp.setT2Score(parseInt(event.currentTarget.value))} /></Table.Td>
            </Table.Tr>
        );
    })

    return (
        <>
            <Table striped withColumnBorders withRowBorders={false}>
                <Table.Thead>
                    <Table.Tr>
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
    matchUps: MatchUp[];
}