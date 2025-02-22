
export const validateAdminAccount = async (user,res) => {
        try {
            if (!user) {
                return res.status(500).json({
                    success: false,
                    message: "It is necessary to verify your token before continuing."
                })
            }
            if(user.type !== "ADMIN"){
                return res.status(401).json({
                    success: false,
                    message: `This service requires an admin account`
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to validate account type",
                error: err
            })
        }
}