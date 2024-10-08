import { Button, Group, Tabs, Text } from '@mantine/core';
import { PairsContent } from '../PairsContent/PairsContent';
import { Pair } from '@/classes/Pair';
import { useEffect, useState } from 'react';
import classes from './TabSelector.module.css';
import { MatchUpsContent } from '../MatchUpsContent/MatchUpsContent';
import { MatchUp } from '@/classes/MatchUp';
import * as MatchData from '@/data/MatchUpData';
import { StandingsContent } from '../StandingsContent/StandingsContent';
import { useNavigate, useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';

export function TabSelector() {
    const navigate = useNavigate();
    const { tabValue } = useParams();
    const [pairs, setPairs] = useState([] as Pair[]);
    const [matchUps, setMatchUps] = useState([] as MatchUp[]);

    useEffect(() => {
        getPairsFromDatabase();
        getMatchUpsFromDatabase();
    }, []);

    useEffect(() => {
        debugger;
        if (pairs.length > 0 && (matchUps.length === 0)) createBracket();

        const stringifiedPairs = pairs.map(pair => {
            return pair.getPairData()
        })
        localStorage.setItem("pairs", JSON.stringify(stringifiedPairs));
    }, [pairs]);

    useEffect(() => {
        if (pairs.length > 0 && (matchUps.length === 0)) createBracket();
        const stringifiedMatchUps = matchUps.map(matchUp => {
            return matchUp.getMatchUpData()
        })
        localStorage.setItem('matchUps', JSON.stringify(stringifiedMatchUps));
    }, [matchUps])

    const calculateStandings = () => {
        pairs.map(pair => {
            pair.resetPointDiff();
            pair.resetWins();
        });

        matchUps.map(async (matchUp) => {
            const pair1: Pair = pairs.find(pair => matchUp.getPair1() === pair.getPairNumber()) as Pair;
            const pair2: Pair = pairs.find(pair => matchUp.getPair2() === pair.getPairNumber()) as Pair;
            const pair3: Pair = pairs.find(pair => matchUp.getPair3() === pair.getPairNumber()) as Pair;
            const pair4: Pair = pairs.find(pair => matchUp.getPair4() === pair.getPairNumber()) as Pair;

            if (pair1 && pair2 && pair3 && pair4) {
                const t1PointDiff = (matchUp.getT1Score() as number) - (matchUp.getT2Score() as number);
                const t2PointDiff = (matchUp.getT2Score() as number) - (matchUp.getT1Score() as number);

                if (t1PointDiff > 0) {
                    pair1.addWin();
                    pair2.addWin();
                }
                if (t2PointDiff > 0) {
                    pair3.addWin();
                    pair4.addWin();
                }

                pair1?.addPointDiff(t1PointDiff);
                pair2?.addPointDiff(t1PointDiff);
                pair3?.addPointDiff(t2PointDiff);
                pair4?.addPointDiff(t2PointDiff);
                const pairArray = [pair1?.getPairNumber(), pair2?.getPairNumber(), pair3?.getPairNumber(), pair4?.getPairNumber()]
                const filteredPairs = pairs.filter(pair => !pairArray.includes(pair.getPairNumber()));
                const placedPairs = [...filteredPairs, pair1, pair2, pair3, pair4]
                placedPairs.sort((a, b) => a.getPairNumber() - b.getPairNumber());
                setPairs([...placedPairs]);
            }
        })
    }

    //#region PAIR HELPERS

    const addNewPair = (newPair: Pair) => {
        setPairs([...pairs, newPair])
    }

    const deletePair = (pair: Pair) => {
        const filteredPairs = pairs.filter(p => p.getPairNumber() !== pair.getPairNumber());
        setPairs([...filteredPairs]);
        setMatchUps([]);
    }

    const getPairsFromDatabase = async () => {
        const fetchedPairData = localStorage.getItem('pairs') ? JSON.parse(localStorage.getItem('pairs') as string) : undefined;
        const serializedPairData: Pair[] = [];

        fetchedPairData?.map((pair: any) => {
            const serializedData = new Pair(
                pair.player1Name,
                pair.player2Name,
                pair.pairNumber,
                pair.cumulativePointDiff,
                pair.cumulativeWins,
                pair.hasPaid,
                pair.standing,
                pair.id,
                pair.totalWins,
                pair.totalPointDiff
            );

            serializedPairData.push(serializedData);
        });
        serializedPairData.sort((a, b) => a.getPairNumber() - b.getPairNumber());
        if (serializedPairData.length === 0) serializedPairData.push(new Pair('BYE', 'BYE', -1));
        debugger;
        setPairs(serializedPairData);
    }
    //#endregion

    //#region MATCHUP HELPERS
    const getMatchUpsFromDatabase = async () => {
        const fetchedMatchUpData = localStorage.getItem('matchUps') ? JSON.parse(localStorage.getItem('matchUps') as string) : undefined;
        const serializedMatchUpData: MatchUp[] = [];

        fetchedMatchUpData?.map((m: any) => {
            const serializedData = new MatchUp(
                m.pair1,
                m.pair2,
                m.pair3,
                m.pair4,
                m.court,
                {
                    id: m.id,
                    t1Score: m.t1Score,
                    t2Score: m.t2Score,
                    round: m.round
                }
            )

            serializedMatchUpData.push(serializedData);
        });

        serializedMatchUpData.sort((a, b) => a.getRound() - b.getRound());
        setMatchUps([...serializedMatchUpData]);
    }

    const createBracket = async () => {
        switch (pairs.length - 1) {
            case 16:
                setMatchUps([...MatchData.SixteenPairs]);
                break;
            case 17:
                setMatchUps([...MatchData.SeventeenPairs]);
                break;
            case 18:
                setMatchUps([...MatchData.EighteenPairs]);
                break;
            case 19:
                setMatchUps([...MatchData.NineteenPairs]);
                break;
            case 20:
                setMatchUps([...MatchData.TwentyPairs]);
                break;
            case 21:
                setMatchUps([...MatchData.TwentyOnePairs]);
                break;
            case 22:
                setMatchUps([...MatchData.TwentyTwoPairs]);
                break;
            case 23:
                setMatchUps([...MatchData.TwentyThreePairs]);
                break;
            case 24:
                setMatchUps([...MatchData.TwentyFourPairs]);
                break;
        }
    }
    //#endregion

    const addTestData = () => {
        const tempArray = [];
        for (let i = 1; i < 25; i++) {
            const tempItem = new Pair(generateUUID(), generateUUID(), i);
            tempArray.push(tempItem);
        }
        setPairs([...pairs, ...tempArray]);
    }

    const reset = () => {
        setPairs([new Pair('BYE', 'BYE', -1)]);
        setMatchUps([]);
    }

    const round2Confirm = () => modals.openConfirmModal({
        title: 'Are you sure you want to start round 2?',
        children: (
            <Text size="sm">
                You can not undo this! Make sure all the scores are correct before proceeding
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Do not move on to round 2'),
        onConfirm: () => beginRound2(),
    });

    const beginRound2 = () => {
        const rankedPairs = pairs.filter(pair => pair.getPairNumber() !== -1).sort((a, b) => b.getWins() - a.getWins() || b.getPointDiff() - a.getPointDiff() || a.getPairNumber() - b.getPairNumber());
        rankedPairs.map((pair: Pair, i: number) => {
            pair.setPairNumber(i + 1);
            pair.setTotalPointDiff(pair.getPointDiff());
            pair.setTotalWins(pair.getWins());
        });

        setPairs([new Pair('BYE', 'BYE', -1), ...rankedPairs]);
        setMatchUps([]);
    }

    const generateUUID = () => {
        let
            d = new Date().getTime(),
            d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
    };

    return (
        <>
            <Group p="15px">
                <Button onClick={addTestData}>Add Test Data</Button>
                <Button onClick={reset}>Reset</Button>
                <Button onClick={round2Confirm}>Begin Round 2</Button>
            </Group>
            <Tabs defaultValue="gallery" value={tabValue} onChange={(value) => navigate(`/${value}`)}>
                <Tabs.List>
                    <Tabs.Tab value="pairs">
                        Pairs
                    </Tabs.Tab>
                    <Tabs.Tab value="matchups">
                        Match-Ups
                    </Tabs.Tab>
                    <Tabs.Tab value="standings">
                        Standings
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel className={classes.tabContent} value="pairs">
                    <PairsContent addNewPair={addNewPair} pairs={pairs} deletePair={deletePair} />
                </Tabs.Panel>

                <Tabs.Panel className={classes.tabContent} value="matchups">
                    {
                        matchUps.length > 0 ?
                            <MatchUpsContent setMatchUps={setMatchUps} calculateStandings={calculateStandings} matchUps={matchUps} /> :
                            null
                    }
                </Tabs.Panel>

                <Tabs.Panel className={classes.tabContent} value="standings">
                    {
                        pairs.length > 0 ?
                            <StandingsContent pairs={pairs} /> :
                            null
                    }
                </Tabs.Panel>
            </Tabs>
        </>
    )
}