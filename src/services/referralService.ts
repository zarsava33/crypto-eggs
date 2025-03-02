export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function processReferralBonus(referralCode: string): Promise<boolean> {
  // In production, this would validate the referral code with your backend
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
}