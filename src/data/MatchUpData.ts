import { MatchUp } from "@/classes/MatchUp";

export const SixteenPairs: MatchUp[] = [];

export const SeventeenPairs: MatchUp[] = [];

export const EighteenPairs: MatchUp[] = [];

export const NineteenPairs: MatchUp[] = [];

export const TwentyPairs: MatchUp[] = [];

export const TwentyOnePairs: MatchUp[] = [];

export const TwentyTwoPairs: MatchUp[] = [];

export const TwentyThreePairs: MatchUp[] = [];

export const TwentyFourPairs: MatchUp[] = [
    //#region COURT 1
    new MatchUp(17, 18, 19, 20, 1, { round: 1 }),
    new MatchUp(1, 2, 3, 4, 1, { round: 2 }),
    new MatchUp(3, 8, 19, 23, 1, { round: 3 }),
    new MatchUp(3, 7, 11, 15, 1, { round: 4 }),
    new MatchUp(11, 24, 17, 23, 1, { round: 5 }),
    new MatchUp(5, 10, 16, 23, 1, { round: 6 }),
    new MatchUp(11, 16, 19, 24, 1, { round: 7 }),
    new MatchUp(3, 5, 12, 14, 1, { round: 8 }),
    //#endregion

    //#region COURT 2
    new MatchUp(21, 22, 23, 24, 2, { round: 1 }),
    new MatchUp(5, 6, 7, 8, 2, { round: 2 }),
    new MatchUp(4, 7, 20, 24, 2, { round: 3 }),
    new MatchUp(4, 8, 12, 16, 2, { round: 4 }),
    new MatchUp(16, 20, 21, 14, 2, { round: 5 }),
    new MatchUp(3, 6, 18, 24, 2, { round: 6 }),
    new MatchUp(12, 15, 20, 23, 2, { round: 7 }),
    new MatchUp(4, 6, 11, 13, 2, { round: 8 }),
    //#endregion

    //#region COURT 3
    new MatchUp(1, 5, 9, 13, 3, { round: 1 }),
    new MatchUp(9, 10, 11, 12, 3, { round: 2 }),
    new MatchUp(10, 13, 17, 22, 3, { round: 3 }),
    new MatchUp(1, 6, 17, 21, 3, { round: 4 }),
    new MatchUp(-1, -1, -1, -1, 3, { round: 5 }),
    new MatchUp(4, 9, 15, 22, 3, { round: 6 }),
    new MatchUp(1, 7, 10, 18, 3, { round: 7 }),
    new MatchUp(2, 15, 19, 21, 3, { round: 8 }),
    //#endregion

    //#region COURT 4
    new MatchUp(2, 6, 10, 14, 4, { round: 1 }),
    new MatchUp(13, 14, 15, 16, 4, { round: 2 }),
    new MatchUp(9, 14, 18, 21, 4, { round: 3 }),
    new MatchUp(2, 5, 18, 22, 4, { round: 4 }),
    new MatchUp(-1, -1, -1, -1, 4, { round: 5 }),
    new MatchUp(7, 12, 13, 19, 4, { round: 6 }),
    new MatchUp(2, 8, 9, 17, 4, { round: 7 }),
    new MatchUp(1, 8, 20, 22, 4, { round: 8 }),
    //#endregion
];