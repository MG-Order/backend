import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import dayjs from 'dayjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		this.logger.error(exception.message);

		response.status(status).json({ statusCode: status, message: exception.message, timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'), path: '' });
	}
}
