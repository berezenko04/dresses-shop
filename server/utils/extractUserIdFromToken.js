import jwt from "jsonwebtoken";

export const extractUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, "secret123");
    return decodedToken._id;
  } catch (err) {
    return null;
  }
};
