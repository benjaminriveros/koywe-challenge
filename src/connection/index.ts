import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class Connection extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });

        return this;
    }

    async onModuleInit() {
        await this.$connect();
    }
}
