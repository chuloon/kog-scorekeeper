import { Pair } from "@/classes/Pair"
import { Table } from "@mantine/core";

export function PairsTable({ pairs }: PairsTableProps) {
    console.log(pairs);
    const rows = pairs.map((pair: Pair) => {
        return <Table.Tr key={`${pair.getPairKey()}`}>
            <Table.Td>{pair.getPlayer1Name()}</Table.Td>
            <Table.Td>{pair.getPlayer2Name()}</Table.Td>
        </Table.Tr>
    })

    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Player 1 Name</Table.Th>
                        <Table.Th>Player 2 Name</Table.Th>
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
}