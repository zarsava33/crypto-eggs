interface SupportRequest {
  message: string;
  email: string;
}

export async function submitBugReport(data: SupportRequest): Promise<void> {
  // In production, this would send the bug report to your backend
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export async function submitSupportRequest(data: SupportRequest): Promise<void> {
  // In production, this would send the support request to your backend
  return new Promise((resolve) => setTimeout(resolve, 1000));
}