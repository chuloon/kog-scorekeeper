import { Pair } from "@/classes/Pair";
import { Button, Checkbox, Table } from "@mantine/core";
import { FC, useEffect, useState } from "react";

interface PairsRowProps {
    pair: Pair;
    isStandings: boolean;
    deletePair: (pair: Pair) => any;
    index: number;
}

export const PairsRow: FC<PairsRowProps> = ({ pair, isStandings, deletePair, index }: PairsRowProps) => {
    const [hasPaid, setHasPaid] = useState(pair.getHasPaid());
    useEffect(() => {
        pair.setHasPaid(hasPaid);
    }, [hasPaid])

    return (
        <>
            <Table.Tr>
                {
                    isStandings ?
                        <Table.Td>{index + 1}</Table.Td> :
                        null
                }
                <Table.Td>{pair.getPairNumber()}</Table.Td>
                <Table.Td>{pair.getPlayer1Name()}</Table.Td>
                <Table.Td>{pair.getPlayer2Name()}</Table.Td>
                <Table.Td>{pair.getWins() + pair.getTotalWins()}</Table.Td>
                <Table.Td>{pair.getPointDiff() + pair.getTotalPointDiff()}</Table.Td>
                {
                    !isStandings ?
                        <>
                            <Table.Td>
                                <Checkbox aria-label="Has paid" checked={hasPaid} onChange={(event) => setHasPaid(!hasPaid)} />
                            </Table.Td>
                            <Table.Td><Button size="compact-xs" onClick={() => deletePair(pair)} variant="filled">Delete</Button></Table.Td>
                        </> :
                        null
                }
            </Table.Tr>
        </>
    )
}