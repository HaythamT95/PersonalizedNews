import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'engine-app' }),
        timestamp(),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/engine.log' })
    ]
});

export default logger;