import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Person } from "../../entities/person";
import { DeletePersonCommand } from "../impl/delete-person.command";

@CommandHandler(DeletePersonCommand)
export class DeletePersonHandler implements ICommandHandler<DeletePersonCommand> {
    constructor(
        @InjectRepository(Person) private personRepo: Repository<Person>,
    ) { }
    async execute(command: DeletePersonCommand) {
        const person = new Person();
        person.id = command.id;
        await this.personRepo.delete(person);
    }
}
