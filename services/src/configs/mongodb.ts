/*
 * @Author: vir virs98@outlook.com
 * @Date: 2022-11-14 17:38:39
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-11-14 17:38:58
 */
import { registerAs } from '@nestjs/config';

export default registerAs('MongoConfig', () => ({
  uri: `mongodb://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_host}:${process.env.mongo_port}/${process.env.mongo_database}`,
}));
