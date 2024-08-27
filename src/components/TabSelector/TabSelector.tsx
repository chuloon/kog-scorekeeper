import { Tabs } from '@mantine/core';
import { PairsContent } from '../PairsContent/PairsContent';
import { Pair } from '@/classes/Pair';
import { useEffect, useState } from 'react';
import classes from './TabSelector.module.css';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { db } from '@/firebase';
import { MatchUpsContent } from '../MatchUpsContent/MatchUpsContent';
import { MatchUp } from '@/classes/MatchUp';
import * as MatchData from '@/data/MatchUpData';

export function TabSelector() {
    const [pairs, setPairs] = useState([] as Pair[]);
    const [matchUps, setMatchUps] = useState([] as MatchUp[]);

    useEffect(() => {
        getPairsFromDatabase().then(data => setPairs(data));
    }, [])

    //#region PAIR HELPERS
    const addNewPair = async (newPair: Pair) => {
        await addDoc(collection(db, "pairs"), {
            ...newPair.getPairData()
        });
        const serializedPairs = await getPairsFromDatabase();
        setPairs(serializedPairs)
    }

    const deletePair = (pair: Pair) => {
        const q = query(collection(db, "pairs"), where("pairNumber", "==", pair.getPairNumber()))
        getDocs(q).then((querySnapshot) => {
            querySnapshot.docs.forEach(docData => {
                deleteDoc(doc(db, "pairs", docData.id));
            });

            getPairsFromDatabase().then(data => setPairs(data));
        });
    }

    const getPairsFromDatabase = async () => {
        return await getDocs(collection(db, "pairs"))
            .then((querySnapshot) => {
                const pairData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
                const serializedPairData = pairData.map(pair =>
                    new Pair(
                        pair.player1Name,
                        pair.player2Name,
                        pair.pairNumber,
                        pair.cumulativePointDiff,
                        pair.cumulativeWins,
                        pair.hasPaid,
                        pair.standing
                    )
                )
                return serializedPairData;
            });
    }
    //#endregion

    const createBracket = () => {
        if (pairs.length < 16) {
            // Display not enough pairs message
            setMatchUps([]);
        }
        else {
            switch (pairs.length) {
                case 16:
                    setMatchUps(MatchData.SixteenPairs);
                    break;
                case 17:
                    setMatchUps(MatchData.SeventeenPairs);
                    break;
                case 18:
                    setMatchUps(MatchData.EighteenPairs);
                    break;
                case 19:
                    setMatchUps(MatchData.NineteenPairs);
                    break;
                case 20:
                    setMatchUps(MatchData.TwentyPairs);
                    break;
                case 21:
                    setMatchUps(MatchData.TwentyOnePairs);
                    break;
                case 22:
                    setMatchUps(MatchData.TwentyTwoPairs);
                    break;
                case 23:
                    setMatchUps(MatchData.TwentyThreePairs);
                    break;
                case 24:
                    setMatchUps(MatchData.TwentyFourPairs);
                    break;
            }
        }

    }

    return (
        <>
            <Tabs defaultValue="gallery">
                <Tabs.List>
                    <Tabs.Tab value="gallery">
                        Pairs
                    </Tabs.Tab>
                    <Tabs.Tab value="messages">
                        Match-Ups
                    </Tabs.Tab>
                    <Tabs.Tab value="settings">
                        Standings
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel className={classes.tabContent} value="gallery">
                    <PairsContent addNewPair={addNewPair} pairs={pairs} deletePair={deletePair} />
                </Tabs.Panel>

                <Tabs.Panel className={classes.tabContent} value="messages">
                    <MatchUpsContent matchUps={matchUps} />
                </Tabs.Panel>

                <Tabs.Panel className={classes.tabContent} value="settings">
                    Standings content
                </Tabs.Panel>
            </Tabs>
        </>
    )
}