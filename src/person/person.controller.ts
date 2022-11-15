import { Body, Controller, Get, HttpCode, Post, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { DeletePersonCommand } from './commands/impl/delete-person.command';
import { SavePersonCommand } from './commands/impl/save-person.command';
import { UpdatePersonCommand } from './commands/impl/update-person.command';
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

    @Patch('update')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateEmployee(@Body() updatedPerson: UpdatePersonCommand) {
        return await this.commandBus.execute(updatedPerson);
    }

    @Delete('delete')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform: true }))
    async deleteEmployee(@Body() updatedPerson: DeletePersonCommand) {
        return await this.commandBus.execute(updatedPerson);
    }

}
