import { Tabs } from '@mantine/core';
import { PairsContent } from '../PairsContent/PairsContent';
import { Pair } from '@/classes/Pair';
import { useState } from 'react';
import classes from './TabSelector.module.css';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '@/firebase';

export function TabSelector() {
    const [pairs, setPairs] = useState([] as Pair[]);
    const addNewPair = async (newPair: Pair) => {
        await addDoc(collection(db, "pairs"), {
            ...newPair.getPairData()
        })
        setPairs([...pairs, newPair]);
    }

    const deletePair = (pair: Pair) => {
        const tempArray = pairs.filter(p => p.getPairKey() !== pair.getPairKey())
        setPairs(tempArray);
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
                    Match-Ups content
                </Tabs.Panel>

                <Tabs.Panel className={classes.tabContent} value="settings">
                    Standings content
                </Tabs.Panel>
            </Tabs>
        </>
    )
}