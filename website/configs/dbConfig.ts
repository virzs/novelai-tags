/*
 * @Author: vir virs98@outlook.com
 * @Date: 2022-11-07 10:12:22
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-11-07 10:21:02
 */

export interface DBConfig {
  dataPath?: string;
  host: string;
  port?: number;
  database: string;
  username: string;
  password: string;
}

const dbConfig: DBConfig = {
  host: "localhost",
  port: 27017,
  dataPath: "./data/mongodb",
  database: "stable-diffusion-tags",
  username: "",
  password: "",
};

export default dbConfig;
