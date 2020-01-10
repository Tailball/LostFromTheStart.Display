const Axios = require('axios');
const Cheerio = require('cheerio');

class Scraper {
    constructor(url) {
        this._url = url;
        
        this._likeMatches = [
            'Totaal aantal vind-ik-leuks',
            'Total Likes'
        ];

        this._followMatches = [
            'Total Follows',
            'Totaal aantal volgers'
        ];

        this._meta = "._4bl7._3xoj > ._3xok";
        this._val = "._4bl7._3xoj > ._3xom";
    }

    getPageLikes() {
        return new Promise(async (res, rej) => {
            
            try {
                const scrape = await this._getHtml();
                const parsed = await this._parseHtml(scrape);
                const likes = this._lookForLikes(parsed);
                
                res(likes);
            }
            catch(err) {
                rej(err);
            }

        });
    }

    _getHtml() {
        return new Promise(async (res, rej) => {

            try {
                const result = await Axios.get(this._url);
                
                if(result && result.data)
                    res(result.data);
                else
                    rej({ message: 'unknown error occured', result });
            }
            catch(err) {
                rej(err);
            }

        });
    }

    _parseHtml(html) {
        return new Promise((res, rej) => {

            try {
                const parsed = Cheerio.load(html);
                res(parsed);
            }
            catch(err) {
                rej(err);
            }

        });
    }

    _lookForLikes(element) {
        const metadata = element(process.env.SCRAPE_IDENTIFIER_METADATA);
        const values = element(process.env.SCRAPE_IDENTIFIER_VALUES);

        for(let i = 0; i < metadata.length; i++) {
            const isLikeNode = this._isLikeNode(metadata[i]);
            
            if(isLikeNode) {
                return this._grabLikes(values[i]);
            }
        }

        return '0';
    }

    _isLikeNode(element) {
        if(!element || !element.children) return false;

        let isLikeNode = false;

        element.children.forEach(child => {
            if(!child.type || !child.data) return;
            if(!child.type === 'text') return;

            if(this._likeMatches.includes(child.data)) isLikeNode = true;
        });     
        
        return isLikeNode;
    }

    _grabLikes(element) {
        let likes = '0';
        
        if(!element || !element.children) return likes;

        element.children.forEach(child => {
            if(!child.type || !child.data) return;
            if(!child.type === 'text') return;

            likes = child.data;
        });

        return likes;
    }
}

module.exports = Scraper;
