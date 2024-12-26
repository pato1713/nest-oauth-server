import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { OAuthClientsSeederService } from './seeders/oauth-clients/oauth-clients.seeder';
import { UsersSeederService } from './seeders/users/users.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const seeders = [
    app.get(OAuthClientsSeederService),
    app.get(UsersSeederService),
  ];

  for (const seeder of seeders) {
    try {
      console.log(`Seeding ${seeder.constructor.name}...`);
      await seeder.seed();
      console.log(`${seeder.constructor.name} seeded successfully.`);
    } catch (error) {
      console.error(`Error seeding ${seeder.constructor.name}:`, error);
    }
  }
  await app.close();
}

bootstrap();
