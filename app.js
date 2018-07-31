const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);
var stream = T.stream('user');

// Setup your search parameters
const params = {
  q: '#css3',
  count: 2,
  result_type: 'recent',
  lang: 'en'
}

stream.on('follow', followed);

function followed(event) {
  console.log('Follow event is running..');
  const
    name = event.source.name,
    screenName = event.source.screen_name;

  if (screenName !== 'nswebstudio') {  
    tweetNow(`@${screenName} Thank you for follow up 🙏.`, screenName);  
  }
}

function tweetNow(tweetTxt, scrName) {
  const tweet = {
    status: tweetTxt
  }
  const today = new Date(); 
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
  const now = date + ' ' + time;

  T.post('statuses/update', tweet, function (error, data, response) {
    if (error) throw error;
    console.log(`Gratitude shown successfully to @${scrName} at ${now}`);
  })
}

// Search Tag and Favorite the tweets
// T.get('search/tweets', params, function (err, data, response) {
//   // If there is no error, proceed
//   if (!err) {
//     // Loop through the returned tweets
//     for (let i = 0; i < data.statuses.length; i++) {
//       // Get the tweet Id from the returned data
//       let id = { id: data.statuses[i].id_str }
//       // Try to Favorite the selected Tweet
//       T.post('favorites/create', id, function (err, response) {
//         // If the favorite fails, log the error message
//         if (err) {
//           console.log(err[0].message);
//         }
//         // If the favorite is successful, log the url of the tweet
//         else {
//           let username = response.user.screen_name;
//           let tweetId = response.id_str;
//           console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
//         }
//       });
//     }
//   } else {
//     console.log(err);
//   }
// })