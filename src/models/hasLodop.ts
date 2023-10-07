import { useEffect, useState } from 'react';

export default () => {
  const [lodopStatus, setLodopStatus] = useState(true);

  useEffect(() => {
    console.log(`进入请求方法了`);

    fetch('http://localhost:8000/CLodopfuncs.js', { method: 'HEAD' })
      .then((res) => {
        console.log(`有回调`);

        console.log(`res`, res);

        if (res.ok) {
          // file is present at URL
          console.log(`请求本机8000端口的CLodopfuncs.js文件成功,web服务运行中,可以打印!`);

          setLodopStatus(true);
        } else {
          // file is not present at URL
          console.log(`请求本机8000端口的CLodopfuncs.js文件成功, 出现异常`, JSON.stringify(res));
        }
      })
      .catch(() => {
        console.log(`请求本机8000端口的CLodopfuncs.js文件失败,web服务已停止或未安装,暂不可以打印!`);

        setLodopStatus(false);
      });

    fetch('http://localhost:18000/CLodopfuncs.js', { method: 'HEAD' })
      .then((res) => {
        console.log(`有回调1`);

        console.log(`res18000`, res);

        if (res.ok) {
          // file is present at URL
          setLodopStatus(true);

          console.log(`请求本机18000端口的CLodopfuncs.js文件成功,web服务运行中,可以打印!`);
        } else {
          console.log(`请求本机18000端口的CLodopfuncs.js文件成功, 出现异常`, JSON.stringify(res));
          // file is not present at URL
        }
      })
      .catch(() => {
        console.log(`请求本机8000端口的CLodopfuncs.js文件失败,web服务已停止或未安装,暂不可以打印!`);
        setLodopStatus(false);
      });
  }, []);

  window.localStorage.setItem('lodopStatus', String(lodopStatus) ? String(lodopStatus) : 'false');

  return { lodopStatus };
};
