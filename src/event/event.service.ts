/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Repository, FindConditions } from 'typeorm';
import { Event } from './event.entity';

const logger = new Logger('Event');

@Injectable()
export class EventService {
  constructor(
    @Inject('CUSTOMER_CLIENT')
    private readonly client: ClientProxy,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async find(query: FindConditions<Event>) {
    const events = await this.eventRepository.find(query);
    const { user_id } = query;

    const customer_ids = events.map(function(event) {
      return event.customer_id;
    });

    let customers = [];

    try {
      customers = await this.client
        .send(
          { role: 'customer', cmd: 'get_list' },
          { ids: customer_ids, user_id },
        )
        .pipe(
          timeout(5000),
          catchError(error => {
            if (error instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(error);
          }),
        )
        .toPromise();
    } catch (error) {
      logger.log(error);
    }

    return events.map(event => event.set_customer(customers));
  }

  createEvent(event: any) {
    try {
      const eventEntity = this.eventRepository.create(event);
      const res = this.eventRepository.insert(eventEntity);

      logger.log('Created');

      return res;
    } catch (error) {
      logger.log(error);
      throw error;
    }
  }
}
