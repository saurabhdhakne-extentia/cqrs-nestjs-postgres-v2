import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Person } from './person/entities/person';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'toor',
      database: 'cqrsdbv1',
      entities: [Person],
      synchronize: true
    }),
    PersonModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
