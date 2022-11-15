import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "../../entities/person";
import { Repository } from "typeorm";
import { UpdatePersonCommand } from "../impl/update-person.command";

@CommandHandler(UpdatePersonCommand)
export class updatePersonHandler implements ICommandHandler<UpdatePersonCommand> {

    constructor(
        @InjectRepository(Person) private personRepo: Repository<Person>,
    ) { }
    async execute(command: UpdatePersonCommand) {
        const personUpdate = new Person();
        const person = await this.personRepo.findOne({
            where: {
                id: command.id
            }
        });
        personUpdate.age = command.age;
        personUpdate.name = command.name;
        await this.personRepo.update(person.id, personUpdate);
    }
}