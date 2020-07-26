import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.REDIS,
        options: {
          url: process.env.BROKER_URL,
        },
      },
      {
        name: 'CUSTOMER_CLIENT',
        transport: Transport.REDIS,
        options: {
          url: process.env.BROKER_URL,
        },
      },
    ]),
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
