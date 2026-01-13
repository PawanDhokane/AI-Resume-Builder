//   An auth middleware ALWAYS does this:
// 1️⃣ Read token from request
// 2️⃣ Verify token
// 3️⃣ Attach user info to req

import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();

  } catch (error) {
    res.status(401).json({message : 'Unauthorised'});
  }
};

export default protect;
