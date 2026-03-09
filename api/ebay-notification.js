const crypto = require('crypto');

const VERIFICATION_TOKEN = 'ArbitraxAI-ebay-verify-token-2024-secure-abc123';
const ENDPOINT_URL = 'https://e-bay-notifications.vercel.app/api/ebay-notification';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const challengeCode = req.query.challenge_code;
    const hash = crypto
      .createHash('sha256')
      .update(challengeCode + VERIFICATION_TOKEN + ENDPOINT_URL)
      .digest('hex');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ challengeResponse: hash });
  }
  return res.status(200).send('OK');
}
