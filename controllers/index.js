displayName = (req, res) => {
    const data = 'Tyler Lewis';
    res.status(200).send(data);
};

module.exports = {
    displayName,
};