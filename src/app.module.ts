import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Person } from './person/entities/person';
import { PersonModule } from './person/person.module';
require('dotenv').config();
console.log(process.env.DATABASE_MAIN_HOST);

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MAIN DB CONNECTION
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        return {
          type: 'postgres',
          host: process.env.DATABASE_MAIN_HOST,
          port: 5432,
          database: process.env.DATABASE_MAIN_DB_NAME,
          username: process.env.DATABASE_MAIN_USERNAME,
          password: process.env.DATABASE_MAIN_PASSWORD,
          entities: [Person],
          synchronize: false,
        };
      },
    }),
    // Secondary db connction
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'secondaryDB',
      useFactory: async () => {
        return {
          type: 'postgres',
          host: process.env.DATABASE_SECONDARY_HOST,
          database: process.env.DATABASE_SECONDARY_DB_NAME,
          port: 5432,
          username: process.env.DATABASE_SECONDARY_USERNAME,
          password: process.env.DATABASE_SECONDARY_PASSWORD,
          entities: [Person],
        };
      },
    }),
    PersonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
