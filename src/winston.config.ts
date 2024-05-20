import winston from 'winston';
import { WinstonModule } from 'nest-winston';
import dayjs from 'dayjs';

const logFormat = winston.format.printf((info) => {
	info.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
	return `${info.timestamp} - ${info.context} ${info.level} [${process.pid}]: ${info.message} ${info.ms}`;
});

export const winstonLogger = WinstonModule.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()],
	format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.ms(), winston.format.json(), logFormat),
});
