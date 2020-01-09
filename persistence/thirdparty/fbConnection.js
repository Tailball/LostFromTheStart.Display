const axios = require('axios');

class FbConnection {
  constructor(access_token) {
    this.access_token = access_token;
    
    this.fb_graph = 'https://graph.facebook.com/';
    this.fan_page = 'lostfromthestartband';
    this.fields = [
      'name',
      'fan_count',
      'emails',
      'about',
      'bio',
      'band_members',
      'description',
      'genre',
      'record_label',
      'cover',
      'picture{url}',
      'photos{images,width,height}',
    ];
  
    this.currentLikes = 0;
  }

  get queryString() {
    return `${this.fb_graph}${this.fan_page}?access_token=${this.access_token}&fields=${this.fields.join(',')}`;
  }

  get queryStringLikes() {
    return `${this.fb_graph}${this.fan_page}?access_token=${this.access_token}&fields=fan_count`;
  }

  retrieve(queryString) {
    return new Promise((resolve, reject) => {

      axios.get(queryString)
        .then(response => resolve(response.data))
        .catch(exc => reject(exc));

    });
  }

  retrieveData() {
    return this.retrieve(this.queryString);
  }

  retrieveLikes() {
    return this.retrieve(this.queryStringLikes);    
  }
}

module.exports = FbConnection;

