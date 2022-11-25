import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonWriteonly } from "../../entities/person-writeonly";
import { Repository } from "typeorm";
import { SavePersonCommand } from "../impl/save-person.command";
import {
    InternalServerErrorException,
} from '@nestjs/common';
@CommandHandler(SavePersonCommand)
export class SavePersonHandler implements ICommandHandler<SavePersonCommand> {

    constructor(
        @InjectRepository(PersonWriteonly, 'secondaryDB') private personRepo: Repository<PersonWriteonly>,
    ) { }
    async execute(command: SavePersonCommand) {
        try {
            var person = new PersonWriteonly();
            person.age = command.age;
            person.name = command.name;
            await this.personRepo.insert(person);
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }
}