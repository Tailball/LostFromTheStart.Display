const returnNotFound = (req, res, next) => {
    res.status(404).json({
        success: false, 
        reason: 'resource not found'
    });
}

module.exports = returnNotFound;