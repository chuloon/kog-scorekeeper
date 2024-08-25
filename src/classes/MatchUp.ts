export class MatchUp {
    private _id?: string;
    private _pair1: number;
    private _pair2: number;
    private _pair3: number;
    private _pair4: number;
    private _court: number

    constructor(
        pair1: number,
        pair2: number,
        pair3: number,
        pair4: number,
        court: number
    ) {
        this._pair1 = pair1;
        this._pair2 = pair2;
        this._pair3 = pair3;
        this._pair4 = pair4;
        this._court = court;
    }

    public getMatchId() {
        return this._id;
    }

    public getPair1() {
        return this._pair1;
    }

    public getPair2() {
        return this._pair2;
    }

    public getPair3() {
        return this._pair3;
    }

    public getPair4() {
        return this._pair4;
    }

    public getCourt() {
        return this._court;
    }
}