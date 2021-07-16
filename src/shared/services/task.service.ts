/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);
    constructor() {}

    @Cron('45 * * * * *')
    handleCron() {
        this.logger.debug('Called when the current second is 45');
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    handleCronUsingEnum() {
        this.logger.debug('Called every 30 seconds');
    }
}
