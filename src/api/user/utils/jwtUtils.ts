import jwt from 'jsonwebtoken';

export const generateToken = (res:any,userId: number) => {
  const token =  jwt.sign({userId}, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h',
  });

  return res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 24*60*60*1000,
  })
};