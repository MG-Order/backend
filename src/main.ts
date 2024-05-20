import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { winstonLogger } from './winston.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: winstonLogger });

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		})
	);

	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(3000);
}
bootstrap();
