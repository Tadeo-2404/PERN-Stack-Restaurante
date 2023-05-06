import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authorization = async (req, res, next) => {
    const token = req.cookies.acceso_token;

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido' });
      }

      res.cookie('acceso_token', token, { httpOnly: true });
      req.user = user;
      console.log(req.user);
      next();
    });
};

export default authorization;