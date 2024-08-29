export class MatchUp {
    private _id?: string;
    private _pair1: number;
    private _pair2: number;
    private _pair3: number;
    private _pair4: number;
    private _court: number;
    private _round?: number = -1;
    private _t1Score?: number = 0;
    private _t2Score?: number = 0;

    constructor(
        pair1: number,
        pair2: number,
        pair3: number,
        pair4: number,
        court: number,
        params?: any,
    ) {
        this._pair1 = pair1;
        this._pair2 = pair2;
        this._pair3 = pair3;
        this._pair4 = pair4;
        this._court = court;
        params?.id ? this._id = params.id : this._id = generateUUID();
        params?.t1Score ? this._t1Score = params.t1Score : 0;
        params?.t2Score ? this._t2Score = params.t2Score : 0;
        params?.round ? this._round = params.round : -1;
    }

    public getMatchId(): string {
        return this._id as string;
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
        return this._round as number;
    }

    public getMatchUpData() {
        const matchUpData = {
            id: this._id,
            pair1: this._pair1,
            pair2: this._pair2,
            pair3: this._pair3,
            pair4: this._pair4,
            t1Score: this._t1Score,
            t2Score: this._t2Score,
            court: this._court,
            round: this._round
        }

        return matchUpData;
    }
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