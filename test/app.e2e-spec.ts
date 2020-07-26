import { EventDto } from '../src/event/event.dto';
import { EventController } from '../src/event/event.controller';
import { EventService } from '../src/event/event.service';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(() => {
    eventService = new EventService(null, null);
    eventController = new EventController(eventService);
  });

  describe('get', () => {
    it('should return an array of events', async () => {
      const result = [{ id: 1 }] as any;
      jest.spyOn(eventService, 'find').mockImplementation(() => result);

      expect(await eventController.get({ id: 1 })).toBe(result);
    });
  });

  describe('create', () => {
    it('should create an event', async () => {
      const result = { id: 1 } as any;
      jest.spyOn(eventService, 'createEvent').mockImplementation(() => result);

      const eventDto = new EventDto();
      expect(await eventController.create({ id: 1 }, eventDto)).toBe(result);
    });
  });
});
