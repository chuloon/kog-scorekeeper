import { MatchUp } from "@/classes/MatchUp";
import { Table, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export function CourtRow({ matchUp, calculateStandings, onScoreChange }: CourtRowProps) {
    const [t1Score, setT1Score] = useState(matchUp.getT1Score()?.toString());
    const [t2Score, setT2Score] = useState(matchUp.getT2Score()?.toString());

    useEffect(() => {
        matchUp.setT1Score(t1Score === "" ? 0 : parseInt(t1Score as string));
    }, [t1Score]);

    useEffect(() => {
        matchUp.setT2Score(t2Score === "" ? 0 : parseInt(t2Score as string));
    }, [t2Score]);

    useEffect(() => {
        onScoreChange();
        calculateStandings()
    }, [t1Score, t2Score]);

    const getPairText = (pairNumber: number): number | string => {
        if (pairNumber === -1) {
            return 'BYE';
        }
        return pairNumber;
    }

    return (
        <Table.Tr key={`${matchUp.getMatchId()}`}>
            <Table.Td>{matchUp.getRound()}</Table.Td>
            <Table.Td>{getPairText(matchUp.getPair1())}</Table.Td>
            <Table.Td>{getPairText(matchUp.getPair2())}</Table.Td>
            <Table.Td>
                <TextInput value={t1Score} onChange={event => setT1Score(event.currentTarget.value)} />
            </Table.Td>
            <Table.Td>vs</Table.Td>
            <Table.Td>{getPairText(matchUp.getPair3())}</Table.Td>
            <Table.Td>{getPairText(matchUp.getPair4())}</Table.Td>
            <Table.Td>
                <TextInput value={t2Score} onChange={event => setT2Score(event.currentTarget.value)} />
            </Table.Td>
        </Table.Tr>
    )
}

interface CourtRowProps {
    matchUp: MatchUp;
    calculateStandings: () => void;
    onScoreChange: () => void;
}