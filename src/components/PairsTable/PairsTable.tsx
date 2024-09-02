import { Pair } from "@/classes/Pair"
import { Button, Checkbox, Table } from "@mantine/core";

export function PairsTable({ pairs, isStandings = false, deletePair = () => { } }: PairsTableProps) {
    const hasPaidChanged = (pair: Pair, event: React.ChangeEvent<HTMLInputElement>) => {
        pair.setHasPaid(event.currentTarget.checked);
    }

    const rows = pairs.filter(pair => pair.getPairNumber() !== -1).map((pair: Pair, index: number) => {
        return (
            <Table.Tr key={`${pair.getPairKey()}`}>
                {
                    isStandings ?
                        <Table.Td>{index + 1}</Table.Td> :
                        null
                }
                <Table.Td>{pair.getPairNumber()}</Table.Td>
                <Table.Td>{pair.getStanding() === -1 ? null : pair.getStanding()}</Table.Td>
                <Table.Td>{pair.getPlayer1Name()}</Table.Td>
                <Table.Td>{pair.getPlayer2Name()}</Table.Td>
                <Table.Td>{pair.getWins()}</Table.Td>
                <Table.Td>{pair.getPointDiff()}</Table.Td>
                {
                    !isStandings ?
                        <>
                            <Table.Td>
                                <Checkbox aria-label="Has paid" checked={pair.getHasPaid()} onChange={(event) => hasPaidChanged(pair, event)} />
                            </Table.Td>
                            <Table.Td><Button size="compact-xs" onClick={() => deletePair(pair)} variant="filled">Delete</Button></Table.Td>
                        </> :
                        null
                }

            </Table.Tr >
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
                        <Table.Th>Standing</Table.Th>
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