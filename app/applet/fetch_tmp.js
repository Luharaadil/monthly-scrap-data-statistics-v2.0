const https = require('https');

const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec";

https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    https.get(res.headers.location, (res2) => {
      let data = '';
      res2.on('data', chunk => data += chunk);
      res2.on('end', () => console.log(data.substring(0, 500)));
    });
  } else {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data.substring(0, 500)));
  }
});
