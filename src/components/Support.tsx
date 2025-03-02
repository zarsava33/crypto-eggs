import React, { useState } from 'react';
import { HelpCircle, Bug } from 'lucide-react';
import { submitBugReport, submitSupportRequest } from '../services/supportService';

export function Support() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'bug' | 'support' | null>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      if (formType === 'bug') {
        await submitBugReport({ message, email });
      } else {
        await submitSupportRequest({ message, email });
      }
      setStatus('success');
      setMessage('');
      setEmail('');
      setTimeout(() => setShowForm(false), 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  if (!showForm) {
    return (
      <div className="fixed bottom-4 right-4 flex gap-2">
        <button
          onClick={() => { setShowForm(true); setFormType('bug'); }}
          className="p-3 bg-red-500 text-white rounded-full hover:opacity-90 transition-opacity"
          title="Report a Bug"
        >
          <Bug size={20} />
        </button>
        <button
          onClick={() => { setShowForm(true); setFormType('support'); }}
          className="p-3 bg-blue-500 text-white rounded-full hover:opacity-90 transition-opacity"
          title="Get Support"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--tg-theme-bg-color)] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          {formType === 'bug' ? <Bug className="text-red-500" /> : <HelpCircle className="text-blue-500" />}
          {formType === 'bug' ? 'Report a Bug' : 'Get Support'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 rounded-lg border border-white/10"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 rounded-lg border border-white/10 h-32"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm opacity-70 hover:opacity-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-4 py-2 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          {status === 'success' && (
            <p className="text-green-500 text-sm">Successfully submitted!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}