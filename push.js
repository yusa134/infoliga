const webPush = require('web-push');
 
const vapidKeys = 
   {"publicKey":"BJJdXmAbi0eIUetWPDgXhwRO-ji1TS1Pq3wxLYnLIQKUpHJAXwc6qVqh4qKZgcHI5Bm9ptiggqV2fCkhRnD4LB0",
   "privateKey":"qIowZ_BAKaSagXp19tKdXVeJl42pwCBUOgAGC-z-Y9w"}
 
 
webPush.setVapidDetails(
   'mailto:infoliga.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f5okcBvDvhQ:APA91bGn7ZduaQFTygOe-actZVX8NnD--IsNZHX1VZYRvPyvUjq3yN0OUW4e-aIkivZWRRxVhGRaT6o59RcBcKz4FmUFAJHsCAlUAgg4nF8FyUwU2oVNTgjC4H130CyECdFn3lFRNuJe",
   "keys": {
       "p256dh": "BCiFHPeoVZCW/kyOdVATMhJOw+/JZIejhZ2Z986e7gzU5GH/+kfI9XBXbppx5ZAFQKlWUi3w+maRUzr0yeMk/i4=",
       "auth": "t8/R+i5RI8ZvQ7bJodH9Fg=="
   }
};
const payload = 'Ada berita baru mengenai liga primer Ayo check!';
 
const options = {
   gcmAPIKey: '779501550038',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);