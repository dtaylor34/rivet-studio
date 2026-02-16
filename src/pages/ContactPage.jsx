import React from 'react';
import BridgeImage from '../assets/bay-bridge-foggy.jpg';
import { trackFormSubmit } from '../utils/analytics';

const ContactPage = () => {
  const [contactForm, setContactForm] = React.useState({
    message: '', firstName: '', lastName: '', email: '', budget: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.message.trim()) { alert('Please enter a message'); return; }
    if (!contactForm.firstName.trim() || !contactForm.lastName.trim()) { alert('Please enter your full name'); return; }
    if (!contactForm.email.trim() || !contactForm.email.includes('@')) { alert('Please enter a valid email address'); return; }
    if (!contactForm.budget) { alert('Please select a budget'); return; }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/manpkpew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${contactForm.firstName} ${contactForm.lastName}`,
          email: contactForm.email,
          message: contactForm.message,
          budget: contactForm.budget,
        }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        trackFormSubmit('success', contactForm.budget);
        setContactForm({ message: '', firstName: '', lastName: '', email: '', budget: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else { throw new Error('Failed'); }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      trackFormSubmit('error', contactForm.budget);
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally { setIsSubmitting(false); }
  };

  const inputClasses = 'w-full bg-input border border-input-border rounded-lg px-4 py-3 text-heading placeholder-faint focus:outline-none focus:border-muted transition-colors';

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left — Bridge Image */}
        <div className="relative bg-base min-h-[400px] lg:min-h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(${BridgeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </div>

        {/* Right — Form */}
        <div className="bg-base flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-xl">
            <h1 className="text-4xl md:text-5xl font-light text-heading mb-4 tracking-tight">Contact Us</h1>
            <p className="text-muted mb-12 font-light">
              Please fill out all fields, and we will get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div>
                <label htmlFor="contact-message" className="block text-heading mb-3 text-sm">Tell us more about your project*</label>
                <textarea id="contact-message" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Your message*" rows="5" className={inputClasses} required />
              </div>

              <div>
                <p className="block text-heading mb-3 text-sm">Enter your contact details*</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" aria-label="First name" value={contactForm.firstName} onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })} placeholder="First name*" className={inputClasses} required />
                  <input type="text" aria-label="Last name" value={contactForm.lastName} onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })} placeholder="Last name*" className={inputClasses} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="email" aria-label="Email address" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="Email address*" className={inputClasses} required />
                  <select aria-label="Project budget" value={contactForm.budget} onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })} className={inputClasses} required>
                    <option value="">Budget*</option>
                    <option value="less-than-10k">Less than $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k-50k">$25k - $50k</option>
                    <option value="50k-plus">$50k+</option>
                  </select>
                </div>
              </div>

              <div aria-live="polite" aria-atomic="true">
                {submitStatus === 'success' && (
                  <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded-lg" role="alert">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg" role="alert">
                    Oops! There was an error sending your message. Please try again or email us directly.
                  </div>
                )}
              </div>

              <button type="button" onClick={handleContactSubmit} disabled={isSubmitting} className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-4 rounded-lg transition-colors duration-300 uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
