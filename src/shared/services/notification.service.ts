/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name, true);

    @Cron('* * 0 * * *', {
        name: 'notifications',
        timeZone: 'Europe/Paris'
    })
    triggerNotification() {
        this.logger.debug('Called at 0 hour');
    }
}