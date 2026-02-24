import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAs4XBJUNeYNVtwII6ZX9WC-R3uX1O982g",
  authDomain: "zestraw-92456.firebaseapp.com",
  projectId: "zestraw-92456",
  storageBucket: "zestraw-92456.firebasestorage.app",
  messagingSenderId: "149003938925",
  appId: "1:149003938925:web:59d08d9de507a1561da364",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// @ts-ignore
window.recaptchaVerifier = null;

// Demo mode for testing - set to true to use mock OTP instead of real Firebase SMS
const DEMO_MODE = import.meta.env.MODE === 'development' && localStorage.getItem('DEMO_OTP_MODE') === 'true';

// Store generated OTPs for demo testing
// @ts-ignore
window.demoOtpMap = new Map();

export function ensureRecaptcha(containerId = 'recaptcha-container') {
  // In demo mode, skip reCAPTCHA - just return a dummy verifier
  if (DEMO_MODE) {
    console.log('ℹ️ Demo mode: reCAPTCHA skipped');
    return null as any;
  }

  // @ts-ignore
  if (window.recaptchaVerifier) {
    // @ts-ignore
    return window.recaptchaVerifier;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`reCAPTCHA container with id "${containerId}" not found in DOM`);
  }

  try {
    // @ts-ignore
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'normal',  // Changed from 'invisible' to 'normal' for visibility
      callback: (response: string) => {
        console.log('reCAPTCHA verified:', response);
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
        // @ts-ignore
        window.recaptchaVerifier = null;
      },
      'error-callback': () => {
        console.log('reCAPTCHA error');
        // @ts-ignore
        window.recaptchaVerifier = null;
      }
    });
    // @ts-ignore
    return window.recaptchaVerifier;
  } catch (err) {
    console.error('Recaptcha init error:', err);
    throw err;
  }
}

export function resetRecaptcha() {
  // @ts-ignore
  if (window.recaptchaVerifier) {
    // @ts-ignore
    window.recaptchaVerifier.clear();
    // @ts-ignore
    window.recaptchaVerifier = null;
  }
}

export async function sendOtp(phone: string): Promise<ConfirmationResult> {
  if (!phone) {
    throw new Error('Phone number is required');
  }

  // Validate phone format (basic E.164 check)
  if (!/^\+[1-9]\d{1,14}$/.test(phone)) {
    throw new Error('Please enter a valid phone number in E.164 format (e.g., +15551234567)');
  }

  // DEMO MODE: Generate fake OTP for testing without Firebase Phone Auth enabled
  if (DEMO_MODE) {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    // @ts-ignore
    window.demoOtpMap.set(phone, otp);
    console.log(`✅ DEMO MODE: OTP for ${phone}: ${otp}`);
    
    // Show OTP in a browser notification for easy copying
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Demo OTP', { body: `Your OTP is: ${otp}` });
    }
    
    // Also log to console in an obvious way
    console.warn(`%c📱 DEMO OTP CODE: ${otp}`, 'background: #0f0; color: #000; font-weight: bold; font-size: 16px;');
    
    // Return a mock ConfirmationResult
    return {
      confirm: async (code: string) => {
        if (code === otp) {
          return {
            user: {
              phoneNumber: phone,
              uid: `demo-${Date.now()}`,
            }
          } as any;
        }
        throw new Error('Invalid OTP code');
      }
    } as any;
  }

  try {
    // Reset any previous verifier to ensure clean state
    resetRecaptcha();
    
    // Give DOM a moment to render reCAPTCHA container
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const verifier = ensureRecaptcha();
    console.log('Sending OTP to:', phone);
    
    const result = await signInWithPhoneNumber(auth, phone, verifier);
    console.log('OTP sent successfully to:', phone);
    return result;
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    resetRecaptcha();
    
    // Provide user-friendly error messages
    if (error.code === 'auth/invalid-phone-number') {
      throw new Error('Invalid phone number. Please use E.164 format: +15551234567');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.code === 'auth/missing-phone-number') {
      throw new Error('Phone number is required');
    } else if (error.message?.includes('reCAPTCHA') || error.message?.includes('RECAPTCHA')) {
      throw new Error('Please verify the reCAPTCHA checkbox and try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('This domain is not authorized. Please contact support.');
    } else if (error.code === 'auth/internal-error') {
      throw new Error('Service temporarily unavailable. Please try again.');
    }
    throw new Error(error.message || 'Failed to send OTP. Please try again.');
  }
}

export async function verifyOtp(confirmationResult: ConfirmationResult, code: string) {
  if (!code || code.length < 6) {
    throw new Error('Please enter a valid 6-digit code');
  }

  try {
    const result = await confirmationResult.confirm(code);
    console.log('OTP verified successfully');
    resetRecaptcha();
    return result;
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    if (error.code === 'auth/invalid-verification-code') {
      throw new Error('Invalid verification code. Please try again.');
    }
    throw new Error(error.message || 'Failed to verify OTP. Please try again.');
  }
}

export default auth;
