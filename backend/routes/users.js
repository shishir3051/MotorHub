import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      verificationToken,
      isVerified: false,
    });
    await user.save();

    // Construct the verification URL
    const clientUrl = process.env.FRONTEND_URL || 'https://motor-hub-three.vercel.app';
    const verifyUrl = `${clientUrl}/verify/${verificationToken}`;
    
    // HTML message
    const message = `
      <h2>Welcome to MotorHub!</h2>
      <p>Please verify your email address to activate your account by clicking the link below:</p>
      <a href="${verifyUrl}" style="display:inline-block;padding:10px 20px;background-color:#FF6B35;color:#ffffff;text-decoration:none;border-radius:5px;">Verify Email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${verifyUrl}</p>
    `;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendEmail({
        email: user.email,
        subject: 'MotorHub - Verify Your Email',
        html: message,
      });
      res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
    } else {
      console.log(`[MOCK EMAIL] Verify link: ${verifyUrl}`);
      res.status(201).json({ message: 'Registration successful! (Check server console for the verification link since email is not configured).' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    if (!user.isVerified) {
      return res.status(403).json({ error: 'Please verify your email before logging in.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Email
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      // Return success even if not found to prevent enumeration
      return res.status(200).json({ message: 'If an account exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const clientUrl = process.env.FRONTEND_URL || 'https://motor-hub-three.vercel.app';
    const resetUrl = `${clientUrl}/login?resetToken=${resetToken}`;

    const message = `
      <h2>MotorHub Password Reset</h2>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background-color:#FF6B35;color:#ffffff;text-decoration:none;border-radius:5px;">Reset Password</a>
      <p>If you did not request this, please ignore this email. The link will expire in 1 hour.</p>
    `;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendEmail({
        email: user.email,
        subject: 'MotorHub - Password Reset',
        html: message,
      });
      res.status(200).json({ message: 'If an account exists, a reset link has been sent.' });
    } else {
      console.log(`[MOCK EMAIL] Password Reset link: ${resetUrl}`);
      res.status(200).json({ message: 'Password reset link generated. (Check server console since email is not configured).' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password has been successfully reset. You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;