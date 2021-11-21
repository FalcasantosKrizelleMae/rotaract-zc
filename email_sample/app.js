const axios = require('axios').default;

const options = {
   method: 'POST',
   url: 'https://api.paymongo.com/v1/sources',
   headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
   data: { data: { attributes: { amount: 10000 } } },
};

axios
   .request(options)
   .then(function (response) {
      console.log(response.data);
   })
   .catch(function (error) {
      console.error(error);
   });
