const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://pack-n-go-814f3-default-rtdb.asia-southeast1.firebasedatabase.app', // Replace with your DB URL
});

module.exports = admin;
