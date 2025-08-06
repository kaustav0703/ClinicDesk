import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function getUser(req, res, next) {
    const doctorToken = req.cookies.doctorToken;
    if (!doctorToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access - no token"
        });
    }

    try {
        const payload = jwt.verify(doctorToken, JWT_SECRET);
        req.user = payload.user; // Attach user to request for next middlewares
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            user: payload.user
        })
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access - invalid token"
        });
    }
}


export function setUser(res, user) {
    const token = jwt.sign({
        _id: user._id,
        user: {
            name: user.name,
            email: user.email
        }
    }, JWT_SECRET);

    res.cookie('doctorToken', token, {
        expires: new Date(Date.now() + 900000), // 15 minutes
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    return token;
}
