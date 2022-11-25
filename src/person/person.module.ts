import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonReadonly } from './entities/person-readonly';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonsHandler } from './queries/handlers/get-persons.handler';
import { SavePersonHandler } from './commands/handler/save-person.handler';
import { updatePersonHandler } from './commands/handler/update-person.handler';
import { DeletePersonHandler } from './commands/handler/delete-person.handler';
import { PersonWriteonly } from './entities/person-writeonly';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PersonReadonly]), TypeOrmModule.forFeature([PersonWriteonly], 'secondaryDB')],
  controllers: [PersonController],
  providers: [GetPersonsHandler, SavePersonHandler, updatePersonHandler, DeletePersonHandler],
})
export class PersonModule { }
