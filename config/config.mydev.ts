// config/config.myprod.ts test环境对应的配置文件
import { defineConfig } from '@umijs/max';

// export const DEVELOPMENT_SERVER_IP = 'http://58.56.133.70:16828';

// export const DEVELOPMENT_SERVER_IP = 'http://192.168.0.109:9001';
export const DEVELOPMENT_SERVER_IP = 'http://192.168.0.104:9001';
// export const DEVELOPMENT_SERVER_IP = 'http://192.168.0.114:9001';

// export const DEVELOPMENT_SERVER_IP = 'http://192.168.50.111:7002';

// export const DEVELOPMENT_SERVER_IP = 'http://192.168.0.117:7002';

// export const DEVELOPMENT_SERVER_IP = 'http://223.108.233.254:9001';
// export const DEVELOPMENT_SERVER_IP = 'http://192.168.0.104:9001';

// export const DEVELOPMENT_SERVER_IP = 'http://101.132.40.127:8008';

export const PRODUCTION_SERVER_IP = 'http://192.168.0.104:7002';
// export const PRODUCTION_SERVER_IP = 'http://192.168.0.109:9001';

export const SERVER_IP_ADDRESS = (function () {
  if (process.env.NODE_ENV === 'development') {
    return DEVELOPMENT_SERVER_IP;
  } else {
    return PRODUCTION_SERVER_IP;
  }
})();

/**
 * 导出的多环境变量命名约定：一律大写且采用下划线分割单词
 * 注意：在添加变量后，需要在src/typing.d.ts内添加该变量的声明，否则在使用变量时IDE会报错。
 */
export default defineConfig({
  define: {
    API_URL: SERVER_IP_ADDRESS, // API地址
    API_ENV: 'dev',
    LOGIN_USERNAME: 'changguan012',
    LOGIN_PASSWORD: '123456',
  },
});
