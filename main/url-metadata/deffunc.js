// window.urlMetadata = require('url-metadata')

const urlMetadata = require('url-metadata')
urlMetadata('http://sonae.pt').then(
  function (metadata) { // success handler
    console.log(metadata)
  },
  function (error) { // failure handler
    console.log(error)
  })
