import { Pair } from "@/classes/Pair"
import { PairsTable } from "../PairsTable/PairsTable";
import { useEffect, useState } from "react";

export function StandingsContent({ pairs }: StandingsContentProps) {
    const [sortedPairs, setSortedPairs] = useState(pairs);

    useEffect(() => {
        sortPairs()
    }, [])

    useEffect(() => {
        sortPairs()
    }, [pairs])

    const sortPairs = () => {
        const sp = sortedPairs.sort((a, b) => b.getWins() - a.getWins() || b.getPointDiff() - a.getPointDiff() || a.getPairNumber() - b.getPairNumber());
        setSortedPairs(sp);
    }

    return (
        <>
            <PairsTable pairs={sortedPairs} isStandings={true} />
        </>
    )
}

interface StandingsContentProps {
    pairs: Pair[];
}