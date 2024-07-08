const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendTemporaryPassword = functions.https.onCall(
  async (data, context) => {
    const { displayName, email } = data;

    if (!displayName || !email) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with the displayName and email arguments.',
      );
    }

    try {
      const temporaryPassword = Math.random().toString(36).slice(-8);

      const user = await admin.auth().getUserByEmail(email);

      if (user.displayName !== displayName) {
        throw new functions.https.HttpsError(
          'not-found',
          'User not found or display name does not match.',
        );
      }

      await admin.auth().updateUser(user.uid, { password: temporaryPassword });

      const mailOptions = {
        from: gmailEmail,
        to: email,
        subject: 'Cuspot 임시 비밀번호 발급',
        text: `Your temporary password is ${temporaryPassword}`,
      };

      await transporter.sendMail(mailOptions);

      return { message: '임시 비밀번호를 메일로 발송하엿습니다.' };
    } catch (error) {
      console.error('Error resetting password: ', error);
      if (error.code && error.code.startsWith('auth/')) {
        throw new functions.https.HttpsError(
          'not-found',
          'Error finding or updating user: ' + error.message,
        );
      } else if (error.response && error.response.code === 535) {
        throw new functions.https.HttpsError(
          'internal',
          'Error sending email: Authentication failed',
        );
      } else {
        throw new functions.https.HttpsError(
          'internal',
          'Error resetting password: ' + error.message,
        );
      }
    }
  },
);
