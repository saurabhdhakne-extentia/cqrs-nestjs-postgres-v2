import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'person' })
export class PersonReadonly {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'age' })
    age: number;
}