import React from 'react';

export const metadata = {
  title: "An-Luxuries Privacy Policy",
  description: "Learn about how An-Luxuries collects, uses, and protects your personal information. Our privacy policy ensures transparency and security for our customers when they shop for branded bags, glasses, and watches on our website."
};

const PrivacyPolicy = () => {


  return (
    <div className="p-6 md:p-12 lg:p-24 bg-gray-50 text-gray-900">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="mb-4 text-center text-gray-600"><strong>Last Updated:</strong> [Date]</p>

        <p className="mb-6">
          At An-Luxuries, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website and make purchases.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">We may collect the following types of information:</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping address, payment information, and other details you provide when making a purchase or contacting us.</li>
          <li><strong>Usage Information:</strong> Information about how you use our website, including your IP address, browser type, pages visited, and the time and date of your visit.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use your information for the following purposes:</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>To Process Orders:</strong> To process and fulfill your orders, including sending order confirmations, processing payments, and shipping products.</li>
          <li><strong>To Communicate:</strong> To send you updates, newsletters, marketing communications, and other information you may find useful.</li>
          <li><strong>To Improve Our Services:</strong> To analyze and improve our website, products, and services, ensuring a better shopping experience for you.</li>
          <li><strong>To Comply with Legal Obligations:</strong> To comply with any applicable laws, regulations, or legal processes.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">We do not sell, trade, or otherwise transfer your personal information to outside parties except as follows:</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep your information confidential.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information when required by law or to protect our rights, property, or safety, or that of others.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
        <p className="mb-6">We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

        <h2 className="text-2xl font-semibold mb-4">5. Your Choices</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Access Your Information:</strong> Request a copy of the personal information we hold about you.</li>
          <li><strong>Update Your Information:</strong> Update or correct your personal information.</li>
          <li><strong>Opt-Out:</strong> Opt-out of receiving marketing communications from us by following the unsubscribe instructions provided in our emails.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
        <p className="mb-6">We use cookies to enhance your experience on our website. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information.</p>

        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
        <p className="mb-6">Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these third-party sites.</p>

        <h2 className="text-2xl font-semibold mb-4">8. Changes to Our Privacy Policy</h2>
        <p className="mb-6">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p className="mt-4">
          <strong>An-Luxuries</strong><br />
          Email: <a href="mailto:[Your Email Address]" className="text-blue-500">[Your Email Address]</a><br />
          Phone: <a href="tel:[Your Phone Number]" className="text-blue-500">[Your Phone Number]</a><br />
          Address: [Your Physical Address]
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
