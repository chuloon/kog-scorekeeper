export class MatchUp {
    private _id?: string;
    private _pair1: number;
    private _pair2: number;
    private _pair3: number;
    private _pair4: number;
    private _court: number;
    private _round?: number;
    private _t1Score: number = 0;
    private _t2Score: number = 0;

    constructor(
        pair1: number,
        pair2: number,
        pair3: number,
        pair4: number,
        court: number,
        id?: string,
        round?: number
    ) {
        this._pair1 = pair1;
        this._pair2 = pair2;
        this._pair3 = pair3;
        this._pair4 = pair4;
        this._court = court;
        if (id) this._id = id;
        if (round) this._round = round;
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

    public getT1Score() {
        return this._t1Score;
    }

    public setT1Score(score: number) {
        this._t1Score = score;
    }

    public getT2Score() {
        return this._t2Score;
    }

    public setT2Score(score: number) {
        this._t2Score = score;
    }

    public getRound() {
        return this._round;
    }

    public getMatchUpData() {
        const matchUpData = {
            pair1: this._pair1,
            pair2: this._pair2,
            pair3: this._pair3,
            pair4: this._pair4,
            t1Score: this._t1Score,
            t2Score: this._t2Score,
            court: this._court
        }

        return matchUpData;
    }
}