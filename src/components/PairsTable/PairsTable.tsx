import { Pair } from "@/classes/Pair"
import { Button, Checkbox, Table } from "@mantine/core";

export function PairsTable({ pairs, deletePair }: PairsTableProps) {
    const hasPaidChanged = (pair: Pair, event: React.ChangeEvent<HTMLInputElement>) => {
        pair.setHasPaid(event.currentTarget.checked);
    }

    const rows = pairs.map((pair: Pair) => {
        return (
            <Table.Tr key={`${pair.getPairKey()}`}>
                <Table.Td>{pair.getPairNumber()}</Table.Td>
                <Table.Td>{pair.getStanding() === -1 ? null : pair.getStanding()}</Table.Td>
                <Table.Td>{pair.getPlayer1Name()}</Table.Td>
                <Table.Td>{pair.getPlayer2Name()}</Table.Td>
                <Table.Td>{pair.getPointDiff()}</Table.Td>
                <Table.Td>{pair.getWins()}</Table.Td>
                <Table.Td>
                    <Checkbox aria-label="Has paid" checked={pair.getHasPaid()} onChange={(event) => hasPaidChanged(pair, event)} />
                </Table.Td>
                <Table.Td><Button size="compact-xs" onClick={() => deletePair(pair)} variant="filled">Delete</Button></Table.Td>
            </Table.Tr >
        )
    })

    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Standing</Table.Th>
                        <Table.Th>Player 1 Name</Table.Th>
                        <Table.Th>Player 2 Name</Table.Th>
                        <Table.Th>Point Diff</Table.Th>
                        <Table.Th>Wins</Table.Th>
                        <Table.Th>Has Paid</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </>
    )
}

interface PairsTableProps {
    pairs: Pair[];
    deletePair: (pair: Pair) => any
}