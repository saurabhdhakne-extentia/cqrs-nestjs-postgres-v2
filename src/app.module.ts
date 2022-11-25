import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonReadonly } from './person/entities/person-readonly';
import { PersonWriteonly } from './person/entities/person-writeonly';
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
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          database: 'cqrsdbv1',
          username: 'postgres',
          password: 'toor',
          // schema: ,
          entities: [PersonReadonly],
          synchronize: false,
        };
      },
    }),
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
          entities: [PersonWriteonly],
        };
      },
    }),
    PersonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
