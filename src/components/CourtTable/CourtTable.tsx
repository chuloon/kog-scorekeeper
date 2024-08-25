import { MatchUp } from "@/classes/MatchUp";
import { Table } from "@mantine/core";

export function CourtTable({ matchUps }: CourtTableProps) {
    const rows = matchUps?.map((matchUp: MatchUp) => {
        return (
            <Table.Tr key={matchUp.getMatchId()}>
                <Table.Td>{matchUp.getPair1()}</Table.Td>
                <Table.Td>{matchUp.getPair2()}</Table.Td>
                <Table.Td>{matchUp.getPair3()}</Table.Td>
                <Table.Td>{matchUp.getPair4()}</Table.Td>
                <Table.Td>{matchUp.getCourt()}</Table.Td>
            </Table.Tr>
        );
    })

    return (
        <>
            <Table striped withColumnBorders withRowBorders={false}>
                <Table.Thead>
                    <Table.Th>Pair 1</Table.Th>
                    <Table.Th>Pair 2</Table.Th>
                    <Table.Th>Score</Table.Th>
                    <Table.Th>vs</Table.Th>
                    <Table.Th>Pair 3</Table.Th>
                    <Table.Th>Pair 4</Table.Th>
                    <Table.Th>Score</Table.Th>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </>
    )
}

interface CourtTableProps {
    matchUps: MatchUp[]
}