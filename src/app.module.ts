import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Person } from './person/entities/person';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
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
          host: 'localhost',
          port: 5432,
          database: 'cqrsdbv1',
          username: 'postgres',
          password: 'toor',
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
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: 'cqrsdbv2',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'toor',
          authentication: {
            type: 'default',
            options: {
              userName: 'postgres',
              password: 'toor',
            },
          },
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
