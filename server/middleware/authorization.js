import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authorization = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido' });
      }

      res.cookie('acceso_token', token, { httpOnly: true });
      req.user = user;
      next();
    });
};

export default authorization;