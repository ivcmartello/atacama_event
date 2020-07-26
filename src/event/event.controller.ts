/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '../guards/AuthGuard';
import { EventDto } from './event.dto';
import { User } from '../user/user.decorator';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Get()
  get(@User() user: any) {
    return this.eventService.find({ user_id: user.id, cancelled_at: null });
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@User() user: any, @Body() eventDto: EventDto) {
    eventDto['user_id'] = user.id;

    return this.eventService.createEvent(eventDto);
  }
}
