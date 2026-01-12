import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-block mb-8 font-pixel text-neon-cyan hover:text-neon-pink transition-colors"
        >
          ← Back to Home
        </Link>

        <h1 className="font-pixel text-4xl md:text-5xl text-neon-pink mb-8 drop-shadow-[0_0_20px_rgba(255,42,109,0.6)]">
          Privacy Policy
        </h1>

        <div className="font-body text-gray-300 space-y-6 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: January 2026</p>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">1. Introduction</h2>
            <p>
              Welcome to Only_dias Ocean (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed 
              to protecting your personal data. This privacy policy explains how we collect, use, and 
              safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li><strong>Personal Information:</strong> Name and email address when you submit a recommendation</li>
              <li><strong>Usage Data:</strong> Information about how you use our website (pages visited, time spent)</li>
              <li><strong>Device Information:</strong> Browser type, device type, and operating system</li>
              <li><strong>Cookies:</strong> Small files stored on your device to improve your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Provide and maintain our website</li>
              <li>Respond to your recommendations and inquiries</li>
              <li>Improve our website and user experience</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Analyze website traffic and usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">4. Google AdSense</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies 
              to serve ads based on your prior visits to our website or other websites. You can opt out 
              of personalized advertising by visiting{" "}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-neon-pink underline"
              >
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">5. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. Cookies are small text files 
              stored on your device. You can control cookies through your browser settings. Note that 
              disabling cookies may affect some features of our website.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">6. Third-Party Services</h2>
            <p>We may use third-party services that collect information, including:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Google AdSense (advertising)</li>
              <li>Cloudinary (image hosting)</li>
              <li>Vercel (website hosting)</li>
              <li>Resend (email service)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">7. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, 
              no method of transmission over the Internet is 100% secure, and we cannot guarantee 
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a 
                href="mailto:berbersoft@gmail.com" 
                className="text-neon-cyan hover:text-neon-pink underline"
              >
                berbersoft@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <Link 
            href="/" 
            className="font-pixel text-neon-pink hover:text-neon-cyan transition-colors"
          >
            ← Back to Only_dias Ocean
          </Link>
        </div>
      </div>
    </div>
  );
}

