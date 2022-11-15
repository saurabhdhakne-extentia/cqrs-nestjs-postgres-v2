import { Body, Controller, Get, HttpCode, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { SavePersonCommand } from './commands/impl/save-person.command';
import { GetPersonsQuery } from './queries/impl/get-persons.query';

@Controller('person')
export class PersonController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) { }

    @Get('all')
    async getAll() {
        return await this.queryBus.execute(new GetPersonsQuery());
    }

    @Post('add')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform: true }))
    async createEmployee(@Body() newPerson: SavePersonCommand) {
        return await this.commandBus.execute(newPerson);
    }

    @Put('update')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateEmployee(@Body() updatedPerson: SavePersonCommand) {
        return await this.commandBus.execute(updatedPerson);
    }

}
