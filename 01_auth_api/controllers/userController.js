
const getUser = async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            id: req.userInfo.id,
            email: req.userInfo.email,
        },
    });
}
  
module.exports = getUser;