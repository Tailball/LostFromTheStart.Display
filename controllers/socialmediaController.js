const Scraper = require('../persistence/scraper');

const getFacebookLikes = (req, res) => {
    const scraper = new Scraper(process.env.SCRAPE_LOCATION);

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