export class UpdatePersonCommand {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly age: number,
    ) { }
}