import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './module/health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, HealthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
