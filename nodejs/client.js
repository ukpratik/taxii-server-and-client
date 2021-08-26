const axios = require('axios')

// axios.post('http://192.168.2.182:5000/api2/abcd', {
//   todo: 'Buy the milk'
// },{
//     headers: {
//     'Content-Type': `application/taxii+json; version=2.1` ,
//     'Accept' : 'application/json'
//   }})


axios.get('http://192.168.2.182:5000/taxii2/', {
  params: {
    
  }
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
.then(function () {
  console.log('done')
  // always executed
});  