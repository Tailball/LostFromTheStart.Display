const Scraper = require('../persistence/scraper');

const getFacebookLikes = (req, res) => {
    const scraper = new Scraper(process.env.SCRAPE_LOCATION);

    console.log('process', process.env.SCRAPE_LOCATION);
    console.log('process2', process.env.SCRAPE_IDENTIFIER_METADATA);
    console.log('process3', process.env.SCRAPE_IDENTIFIER_VALUES);
    
    scraper.getPageLikes()
        
        .then(likes => {
            return res.json({
                success: true,
                payload: likes
            });
        })

        .catch(err => {
            return res.status(500).json({
                success: false,
                reason: err
            });
        });
};

module.exports = {
    getFacebookLikes
};