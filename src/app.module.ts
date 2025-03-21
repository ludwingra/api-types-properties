import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypesModule } from './types/types.module';
import { PropertiesModule } from './properties/properties.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'technical_test_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'auth',
          limit: 5,
          ttl: 60,
        }
      ]
    }),
    UsersModule,
    AuthModule,
    TypesModule,
    PropertiesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerModule,
    },
  ],
})
export class AppModule { }
