import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { NODE_ENV } from 'src/app/constants/app.constant';
import { z } from 'zod';

const configSchema = z
  .object({
    PORT: z.number().positive().max(65535).default(3000),
    NODE_ENV: z.nativeEnum(NODE_ENV),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.number().positive().max(65535).default(5432),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
  })
  .required();

const parseConfig = (
  config: Record<keyof z.infer<typeof configSchema>, any>,
) => {
  return {
    ...config,
    PORT: parseInt(config.PORT),
    POSTGRES_PORT: parseInt(config.POSTGRES_PORT),
  };
};

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: (config) => {
        const parsedConfig = parseConfig(config);
        return configSchema.parse(parsedConfig);
      },
    }),
  ],
})
export class ConfigModule {}
