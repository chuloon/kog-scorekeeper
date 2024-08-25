export class Pair {
    private _player1Name: string;
    private _player2Name: string;

    public constructor(player1Name: string, player2Name: string) {
        this._player1Name = player1Name;
        this._player2Name = player2Name;
    }

    public getPairKey(): string {
        return `${this._player1Name}&${this._player2Name}`;
    }

    public getPlayer1Name(): string {
        return this._player1Name;
    }

    public getPlayer2Name(): string {
        return this._player2Name;
    }
}