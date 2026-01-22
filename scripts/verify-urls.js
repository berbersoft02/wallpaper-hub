const https = require('https');

const urls = [
  "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Shiina%20Mahiru/1.jpg",
  "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Shiina%20Mahiru/4-2.jpg",
  "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Akane%20Kurokawa/11.jpg",
  "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Mixed/photo_3_2026-01-22_00-32-43.jpg"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} : ${url}`);
  }).on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });
});
