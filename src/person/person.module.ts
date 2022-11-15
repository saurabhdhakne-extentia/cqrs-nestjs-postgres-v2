import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonsHandler } from './queries/handlers/get-persons.handler';
import { SavePersonHandler } from './commands/handler/save-person.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [GetPersonsHandler, SavePersonHandler]
})
export class PersonModule { }
