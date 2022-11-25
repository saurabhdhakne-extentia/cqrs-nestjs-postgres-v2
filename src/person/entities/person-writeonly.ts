import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'person' })
export class PersonWriteonly {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'age' })
    age: number;
}