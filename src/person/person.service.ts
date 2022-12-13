import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter'
import { PersonAddEvent } from './event/person-add.event';
import { PersonEventConstant } from './person.constant';

@Injectable()
export class PersonService {

    @OnEvent(PersonEventConstant.PERSON_CREATED)
    handlePersonCreated(payload: PersonAddEvent) {
        console.log('Person Created', payload)
    }

}
