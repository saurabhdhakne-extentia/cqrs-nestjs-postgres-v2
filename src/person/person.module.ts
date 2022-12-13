import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonsHandler } from './queries/handlers/get-persons.handler';
import { SavePersonHandler } from './commands/handler/save-person.handler';
import { updatePersonHandler } from './commands/handler/update-person.handler';
import { DeletePersonHandler } from './commands/handler/delete-person.handler';
import { PersonService } from './person.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Person]), TypeOrmModule.forFeature([Person], 'secondaryDB')],
  controllers: [PersonController],
  providers: [GetPersonsHandler, SavePersonHandler, updatePersonHandler, DeletePersonHandler, PersonService, PersonService],
})
export class PersonModule { }
