import { Button, Tabs } from '@mantine/core';
import { PairsContent } from '../PairsContent/PairsContent';
import { Pair } from '@/classes/Pair';
import { useEffect, useState } from 'react';
import classes from './TabSelector.module.css';
import { addDoc, collection, deleteDoc, doc, getDocs, or, query, updateDoc, where } from '@firebase/firestore';
import { db } from '@/firebase';
import { MatchUpsContent } from '../MatchUpsContent/MatchUpsContent';
import { MatchUp } from '@/classes/MatchUp';
import * as MatchData from '@/data/MatchUpData';

export function TabSelector() {
    const [pairs, setPairs] = useState([] as Pair[]);
    const [matchUps, setMatchUps] = useState([] as MatchUp[]);

    useEffect(() => {
        getPairsFromDatabase().then(data => setPairs(data));
    }, []);

    useEffect(() => {
        if (pairs.length > 0) createBracket();
    }, [pairs]);

    const calculateStandings = () => {
        pairs.map(pair => pair.resetPointDiff());

        matchUps.map(matchUp => {
            const pair1: Pair = pairs.find(pair => matchUp.getPair1() === pair.getPairNumber()) as Pair;
            const pair2: Pair = pairs.find(pair => matchUp.getPair2() === pair.getPairNumber()) as Pair;
            const pair3: Pair = pairs.find(pair => matchUp.getPair3() === pair.getPairNumber()) as Pair;
            const pair4: Pair = pairs.find(pair => matchUp.getPair4() === pair.getPairNumber()) as Pair;

            const t1PointDiff = (matchUp.getT1Score() as number) - (matchUp.getT2Score() as number);
            const t2PointDiff = (matchUp.getT2Score() as number) - (matchUp.getT1Score() as number);

            pair1?.addPointDiff(t1PointDiff);
            pair2?.addPointDiff(t1PointDiff);
            pair3?.addPointDiff(t2PointDiff);
            pair4?.addPointDiff(t2PointDiff);

            console.log(pair1);

            const pairArray = [pair1?.getPairNumber(), pair2?.getPairNumber(), pair3?.getPairNumber(), pair4?.getPairNumber()]
            const filteredPairs = pairs.filter(pair => !pairArray.includes(pair.getPairNumber()))

            setPairs([...filteredPairs, pair1, pair2, pair3, pair4])
        })
    }

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

                serializedPairData.sort((a, b) => { return a.getPairNumber() - b.getPairNumber() });
                return serializedPairData;
            });
    }
    //#endregion

    //#region MATCHUP HELPERS
    const getMatchUpsFromDatabase = async () => {
        return await getDocs(collection(db, "matchUps"))
            .then((querySnapshot) => {
                const matchUpData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
                const serializedMatchUpData = matchUpData.map(matchUp =>
                    new MatchUp(
                        matchUp.pair1,
                        matchUp.pair2,
                        matchUp.pair3,
                        matchUp.pair4,
                        matchUp.court,
                        {
                            id: matchUp.id,
                            t1Score: matchUp.t1Score,
                            t2Score: matchUp.t2Score,
                            round: matchUp.round
                        }
                    )
                )

                serializedMatchUpData.sort((a, b) => { return a.getRound() - b.getRound() });
                return serializedMatchUpData;
            });
    }

    const createBracket = async () => {
        const serializedMatchUps: MatchUp[] = await getMatchUpsFromDatabase();
        if (serializedMatchUps.length > 0) {
            setMatchUps(serializedMatchUps);
        }
        else {
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
                        console.log(MatchData.TwentyFourPairs)
                        break;
                }
            }
        }
    }
    //#endregion

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
                    {
                        matchUps.length > 0 ?
                            <MatchUpsContent calculateStandings={calculateStandings} matchUps={matchUps} /> :
                            null
                    }
                </Tabs.Panel>

                <Tabs.Panel className={classes.tabContent} value="settings">
                    Standings content
                </Tabs.Panel>
            </Tabs>
        </>
    )
}