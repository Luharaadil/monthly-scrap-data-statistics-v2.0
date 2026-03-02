const https = require('https');
https.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSUYQGdhyZVe--2uuwb4dgfi44pBg_Rk6yj7zdlNmWg0F_rAJg2z2V7gkBWHsGznsg-VsEWAjNeUG5q/pub?gid=0&single=true&output=csv', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data.split('\n').slice(0, 2).join('\n'));
  });
});
