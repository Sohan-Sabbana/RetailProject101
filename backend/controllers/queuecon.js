const Token = require('../models/queue')

const tokenNumber= async (req, res) => {
    try {
        let tokenDoc = await Token.findOne();
        if (!tokenDoc) {
            tokenDoc = new Token();
            await tokenDoc.save();
        }

        const tokenNumber = tokenDoc.currentToken + 1;
        tokenDoc.currentToken = tokenNumber;
        await tokenDoc.save();

        res.status(200).json({ token: tokenNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {tokenNumber}