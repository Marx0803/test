const net = require('net');

const tcpServer = net.createServer((socket) => {
  socket.on('data', (data) => {
    const str = data.toString().trim();

    if (str.startsWith("wqx8|")) {
      try {
        const parts = str.split('|')[1].split(',');
        const mac = parts[0];
        const timestampHex = parts[1];
        const values = parts.slice(2).map(Number); // 8個 float 數值

        const record = {
          MAC: mac,
          時間: new Date(parseInt(timestampHex, 16) * 1000).toLocaleString(),
          溫度: values[0],
          濕度: values[1],
          壓力: values[2],
          聲音: values[3],
          風速: values[4],
          風向: values[5],
          "PM2.5": values[6],
          PM10: values[7]
        };

        console.log(' 接收到資料：', record);
      } catch (err) {
        console.error(' 解析失敗：', err.message);
      }
    } else {
      console.warn(' 收到非預期資料：', str);
    }
  });
});

tcpServer.listen(9000, () => {
  console.log(' TCP Server 已啟動，監聽 port 9000');
});//123123
