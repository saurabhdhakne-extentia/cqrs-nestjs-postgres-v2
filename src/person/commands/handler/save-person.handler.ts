import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "../../entities/person";
import { Repository } from "typeorm";
import { SavePersonCommand } from "../impl/save-person.command";
import {
    InternalServerErrorException,
} from '@nestjs/common';
@CommandHandler(SavePersonCommand)
export class SavePersonHandler implements ICommandHandler<SavePersonCommand> {

    constructor(
        @InjectRepository(Person, 'secondaryDB') private personRepo: Repository<Person>,
    ) { }
    async execute(command: SavePersonCommand) {
        try {
            var person = new Person();
            person.age = command.age;
            person.name = command.name;
            await this.personRepo.insert(person);

        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException(err);
        }

    }
}