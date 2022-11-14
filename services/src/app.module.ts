/*
 * @Author: vir virs98@outlook.com
 * @Date: 2022-11-08 17:54:22
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-11-14 17:39:50
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongodb from './configs/mongodb';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['development.env', 'production.env'],
      ignoreEnvFile: false,
      ignoreEnvVars: false,
      isGlobal: true,
      load: [mongodb],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config) => config.get('MongoConfig'),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
