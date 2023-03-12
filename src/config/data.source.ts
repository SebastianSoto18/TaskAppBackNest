import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";


ConfigModule.forRoot({
    envFilePath: '.dev.env',
});


const configService = new ConfigService();

console.log('DB_HOST: ', configService.get('DB_HOST'));
console.log('DB_PORT: ', configService.get('DB_PORT'));
console.log('DB_USER: ', configService.get('DB_USER'));
console.log('DB_PASSWORD: ', configService.get('DB_PASSWORD'));
console.log('DB_NAME: ', configService.get('DB_NAME'));

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);