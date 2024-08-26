import { Tabs } from '@mantine/core';
import { PairsContent } from '../PairsContent/PairsContent';
import { Pair } from '@/classes/Pair';
import { useEffect, useState } from 'react';
import classes from './TabSelector.module.css';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { db } from '@/firebase';
import { MatchUpsContent } from '../MatchUpsContent/MatchUpsContent';
import { MatchUp } from '@/classes/MatchUp';

export function TabSelector() {
    const [pairs, setPairs] = useState([] as Pair[]);
    const [matchUps, setMatchUps] = useState([] as MatchUp[]);

    useEffect(() => {
        getPairsFromDatabase().then(data => setPairs(data));
        getMatchUpsFromDatabase().then(data => setMatchUps(data));
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

    const addNewMatchUp = async (matchUp: MatchUp) => {
        const docRef = await addDoc(collection(db, "matchUps"), {
            ...matchUp.getMatchUpData()
        });

        const matchUpId = docRef.id;
        await updateDoc(doc(db, "matchUps", matchUpId), {
            ...matchUp.getMatchUpData(), id: matchUpId
        });

        const serializedMatchUps = await getMatchUpsFromDatabase();
        setMatchUps(serializedMatchUps);
    }

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
                        matchUp.id
                    )
                )
                return serializedMatchUpData;
            })
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
                    <MatchUpsContent matchUps={matchUps} handleAddNewMatchUp={addNewMatchUp} />
                </Tabs.Panel>

                <Tabs.Panel className={classes.tabContent} value="settings">
                    Standings content
                </Tabs.Panel>
            </Tabs>
        </>
    )
}