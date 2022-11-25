import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonReadonly } from 'src/person/entities/person-readonly';
import { Repository } from 'typeorm';
import { GetPersonsQuery } from '../impl/get-persons.query';

@QueryHandler(GetPersonsQuery)
export class GetPersonsHandler implements IQueryHandler<GetPersonsQuery> {
    constructor(
        @InjectRepository(PersonReadonly) private personRepo: Repository<PersonReadonly>,
    ) { }
    async execute(query: GetPersonsQuery): Promise<PersonReadonly[]> {
        return await this.personRepo.find();
    }
} 