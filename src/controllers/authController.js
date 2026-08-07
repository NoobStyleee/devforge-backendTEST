import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
// import { create } from 'handlebars';
import jwt from 'jsonwebtoken';
import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const userWithSameEmail = await User.findOne({ email });
  if (userWithSameEmail) {
    throw createHttpError(409, 'Email in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }
  const token = jwt.sign({ sub: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);
  res.status(200).json(user);

  res.status(200).json({ user });
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  console.log(sessionId, refreshToken);

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });
  console.log(session);

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date();

  if (isRefreshTokenExpired) {
    await session.deleteOne();
    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({ _id: session._id });
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);
  res.status(200).json({
    message: 'Session refreshed',
  });
};
