import { Tabs } from '@mantine/core';
import { PairsContent } from '../PairsContent/PairsContent';
import { Pair } from '@/classes/Pair';
import { useState } from 'react';

export function TabSelector() {
    const [pairs, setPairs] = useState([] as Pair[]);
    const addNewPair = (newPair: Pair) => {
        setPairs([...pairs, newPair]);
        console.log(pairs);
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

                <Tabs.Panel value="gallery">
                    <PairsContent addNewPair={addNewPair} pairs={pairs} />
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    Match-Ups content
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                    Standings content
                </Tabs.Panel>
            </Tabs>
        </>
    )
}