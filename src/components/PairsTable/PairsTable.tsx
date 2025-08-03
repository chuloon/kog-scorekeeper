import { Pair } from "@/classes/Pair"
import { Table } from "@mantine/core";
import { PairsRow } from "./PairsRow";

export function PairsTable({ pairs, isStandings = false, deletePair = () => { } }: PairsTableProps) {
    const rows = pairs.filter(pair => pair.getPairNumber() !== -1).map((pair: Pair, index: number) => {
        return (
            <PairsRow key={`${pair.getPairKey()}`} pair={pair} isStandings={isStandings} deletePair={deletePair} index={index} />
        )
    })

    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        {
                            isStandings ?
                                <Table.Th>Rank</Table.Th> :
                                null
                        }
                        <Table.Th>Pair #</Table.Th>
                        <Table.Th>Player 1 Name</Table.Th>
                        <Table.Th>Player 2 Name</Table.Th>
                        <Table.Th>Wins</Table.Th>
                        <Table.Th>Point Diff</Table.Th>
                        {
                            !isStandings ?
                                <Table.Th>Has Paid</Table.Th> :
                                null
                        }
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
    deletePair?: (pair: Pair) => any;
    isStandings?: boolean;
}