export class TokenNotMatch extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TokenNotMatch';
    }
}
