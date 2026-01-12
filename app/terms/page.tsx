import Link from "next/link";

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <div className="font-body text-gray-300 space-y-6 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: January 2026</p>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Only_dias Ocean (&quot;the website&quot;), you accept and agree to be bound 
              by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">2. Description of Service</h2>
            <p>
              Only_dias Ocean is a website that provides anime and pixel art wallpapers for personal use. 
              We offer free wallpapers that users can download and use on their personal devices.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">3. Use of Wallpapers</h2>
            <p>The wallpapers provided on our website are for:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li><strong>Personal use only:</strong> You may download and use wallpapers for your personal devices</li>
              <li><strong>Non-commercial:</strong> Wallpapers may not be sold, redistributed, or used for commercial purposes</li>
              <li><strong>No modification for resale:</strong> You may not modify wallpapers and sell them</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">4. Intellectual Property</h2>
            <p>
              The wallpapers displayed on this website feature characters from various anime series. 
              These characters are the intellectual property of their respective creators and copyright holders. 
              We do not claim ownership of these characters. The wallpapers are provided for fan appreciation 
              and personal use only.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">5. User Conduct</h2>
            <p>When using our website, you agree not to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Use the website for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Upload malicious content or spam through our recommendation form</li>
              <li>Scrape or download content in bulk without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">6. Recommendations</h2>
            <p>
              Users may submit wallpaper recommendations through our website. By submitting a recommendation, 
              you agree that:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Your submission does not contain harmful or inappropriate content</li>
              <li>We may or may not act on your recommendation</li>
              <li>We may contact you via the email you provide</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">7. Advertisements</h2>
            <p>
              Our website displays advertisements through Google AdSense. These ads help us maintain 
              and improve our website. By using our website, you acknowledge that advertisements may 
              be displayed during your visit.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">8. Disclaimer</h2>
            <p>
              The website and its content are provided &quot;as is&quot; without warranties of any kind. 
              We do not guarantee that:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>The website will be available at all times</li>
              <li>The website will be error-free</li>
              <li>Downloaded files will be free of viruses (though we make every effort to ensure they are safe)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Only_dias Ocean shall not be liable for any 
              indirect, incidental, special, or consequential damages arising from your use of the website.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">10. External Links</h2>
            <p>
              Our website may contain links to external websites (such as TikTok, PayPal). We are not 
              responsible for the content or privacy practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be 
              effective immediately upon posting on this page. Your continued use of the website 
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:{" "}
              <a 
                href="mailto:berbersoft@gmail.com" 
                className="text-neon-cyan hover:text-neon-pink underline"
              >
                berbersoft@gmail.com
              </a>
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

