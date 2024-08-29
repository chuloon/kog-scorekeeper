export class Pair {
    private _player1Name: string;
    private _player2Name: string;
    private _pairNumber: number;
    private _cumulativePointDiff: number = 0;
    private _cumulativeWins: number = 0;
    private _hasPaid: boolean = false;
    private _standing: number = -1;
    private _id: string = '';

    public constructor(
        player1Name: string,
        player2Name: string,
        pairNumber: number,
        cumulativePointDiff?: number,
        cumulativeWins?: number,
        hasPaid?: boolean,
        standing?: number,
        id?: string
    ) {
        this._player1Name = player1Name;
        this._player2Name = player2Name;
        this._pairNumber = pairNumber;
        if (cumulativePointDiff) this._cumulativePointDiff = cumulativePointDiff;
        if (cumulativeWins) this._cumulativeWins = cumulativeWins;
        if (hasPaid !== undefined) this._hasPaid = hasPaid;
        if (standing) this._standing = standing;
        if (id) this._id = id;
    }

    //#region FIREBASE_TOOLS
    public getPairData(): PairData {
        const pairData = {
            player1Name: this._player1Name,
            player2Name: this._player2Name,
            pairNumber: this._pairNumber,
            cumulativePointDiff: this._cumulativePointDiff,
            cumulativeWins: this._cumulativeWins,
            hasPaid: this._hasPaid,
            standing: this._standing,
            id: this._id
        }

        return pairData;
    }
    //#endregion

    //#region MONEY
    public getHasPaid(): boolean {
        return this._hasPaid;
    }

    public setHasPaid(hasPaid: boolean): void {
        this._hasPaid = hasPaid;
    }
    //#endregion

    //#region PAIR_IDS
    public getPairKey(): string {
        return `${this._player1Name}&${this._player2Name}`;
    }

    public getPairNumber(): number {
        return this._pairNumber;
    }
    //#endregion

    //#region PLAYER_NAMES
    public getPlayer1Name(): string {
        return this._player1Name;
    }

    public getPlayer2Name(): string {
        return this._player2Name;
    }
    //#endregion

    //#region POINT_DIFF
    public resetPointDiff(): void {
        this._cumulativePointDiff = 0;
    }

    public addPointDiff(pointDiff: number): void {
        this._cumulativePointDiff += pointDiff;
    }

    public getPointDiff(): number {
        return this._cumulativePointDiff;
    }
    //#endregion

    //#region WINS
    public addWin(): void {
        this._cumulativeWins++;
    }

    public getWins(): number {
        return this._cumulativeWins;
    }
    //#endregion

    //#region STANDING
    public setStanding(standing: number): void {
        this._standing = standing;
    }

    public getStanding(): number {
        return this._standing;
    }
    //#endregion

    //#region ID
    public setId(id: string): void {
        this._id = id;
    }

    public getId(): string {
        return this._id;
    }
    //#endregion
}

interface PairData {
    pairNumber: number;
    player1Name: string;
    player2Name: string;
    cumulativePointDiff: number;
    cumulativeWins: number;
    hasPaid: boolean
}