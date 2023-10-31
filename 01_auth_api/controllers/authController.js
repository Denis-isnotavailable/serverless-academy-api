const { signInService, signUpService, refreshTokenService } = require('../services/authService');


const signInController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const { user, access_token, refresh_token } = await signInService(email, password);
        
        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                accessToken: access_token,
                refreshToken: refresh_token,
            },
        });
    } catch (e) {
        res.status(502).json({ success: false, message: e.message});
    }
}

const signUpController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const { user, access_token, refresh_token } = await signUpService(email, password);

        return res.status(201).json({
            success: true,
            data: {
                id: user.id,
                accessToken: access_token,
                refreshToken: refresh_token,
            },
        });
    } catch (e) {
        res.status(502).json({ success: false, message: e.message });
    }
}

const refreshTokenController = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
        const { id, access_token } = await refreshTokenService(refreshToken);

        return res.status(200).json({
            success: true,
            data: {
                id,
                accessToken: access_token
            },
        });
    } catch (e) {
        res.status(502).json({ success: false, message: e.message });
    }
}

module.exports = {
    signInController,
    signUpController,
    refreshTokenController
};