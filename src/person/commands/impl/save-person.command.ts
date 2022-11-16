export class SavePersonCommand {
    constructor(
        public readonly name: string,
        public readonly age: number,
    ) { }
}