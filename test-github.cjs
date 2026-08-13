const https = require('https');
https.get('https://api.github.com/users/lansmasigon', { headers: { 'User-Agent': 'Node.js' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('User stats:', JSON.parse(data));
  });
});
https.get('https://api.github.com/users/lansmasigon/repos', { headers: { 'User-Agent': 'Node.js' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const repos = JSON.parse(data);
    let stars = 0;
    repos.forEach(r => { stars += r.stargazers_count; });
    console.log('Stars:', stars);
  });
});
