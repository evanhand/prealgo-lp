'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ChevronRight, CheckCircle, ArrowRight, Shield, FileText, Bell } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';

export const PrivacyPageContent: React.FC = () => {
  const sections = [
    { id: 'information', title: '1. Information We Collect' },
    { id: 'usage', title: '2. How We Use Your Information' },
    { id: 'security', title: '3. Data Security' },
    { id: 'sharing', title: '4. Data Sharing' },
    { id: 'rights', title: '5. Your Rights' },
    { id: 'retention', title: '6. Data Retention' },
    { id: 'cookies', title: '7. Cookies and Tracking' },
    { id: 'children', title: '8. Children\'s Privacy' },
    { id: 'international', title: '9. International Data Transfers' },
    { id: 'gdpr-ccpa', title: '10. GDPR & CCPA Rights' },
    { id: 'changes', title: '11. Changes to Privacy Policy' },
  ];

  return (
    <>
            <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-primary-950 to-secondary-900">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
          {/* Background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent)]" />
          <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-secondary-500/10 blur-3xl" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center justify-center rounded-full bg-primary-500/20 p-3 mb-4">
                <Lock className="h-8 w-8 text-primary-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                At PreAlgo, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
              </p>
              <p className="text-sm text-white/50 mt-2">
                Effective Date: January 1, 2025 | Last Updated: February 1, 2025
              </p>
            </motion.div>
            
            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 max-w-3xl mx-auto"
            >
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary-400" />
                  Table of Contents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sections.map((section) => (
                    <a 
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center rounded-lg border border-white/10 bg-white/5 p-3 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 text-primary-400" />
                      <span>{section.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="prose prose-lg max-w-3xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div id="information" className="mt-12 mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                  <p className="text-white/80">
                    We collect the following types of information:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Account information (name, email, password)',
                      'Content you upload for analysis',
                      'Usage data and analytics',
                      'Payment information',
                      'Device and browser information',
                      'Log data and performance metrics'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="usage" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                  <p className="text-white/80">
                    We use your information to:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Provide and improve our services',
                      'Process payments and prevent fraud',
                      'Analyze content performance',
                      'Send important updates and notifications',
                      'Customize and optimize your experience',
                      'Comply with legal obligations'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="security" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                  <p className="text-white/80">
                    We implement industry-standard security measures to protect your data, including:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Encryption in transit and at rest',
                      'Secure server infrastructure',
                      'Regular security audits',
                      'Access controls and authentication',
                      'Monitoring and threat detection'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="sharing" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
                  <p className="text-white/80">
                    We never sell your personal information. We share data only with:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Service providers who help operate our platform',
                      'Payment processors for transactions',
                      'Legal authorities when required by law'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="rights" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
                  <p className="text-white/80">
                    You have the right to:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Access your personal data',
                      'Correct inaccurate information',
                      'Request data deletion',
                      'Export your data',
                      'Opt-out of marketing communications',
                      'Withdraw consent for processing'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="retention" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
                  <p className="text-white/80">
                    We retain your data for specific periods based on type: Account data is kept while your account is active and for 30 days after deletion. Video uploads are deleted within 24 hours of analysis completion. Analysis results are retained while your account is active. Payment records are kept for 7 years as required by law. You can request full data deletion at any time by contacting us or through your account settings.
                  </p>
                </div>

                <div id="cookies" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
                  <p className="text-white/80">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Maintain your session',
                      'Remember your preferences',
                      'Analyze platform usage',
                      'Improve our services'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="children" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                  <p className="text-white/80">
                    Our services are not intended for children under 13. We do not knowingly collect data from children under 13.
                  </p>
                </div>

                <div id="international" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
                  <p className="text-white/80">
                    Your data is primarily stored and processed in the United States via Supabase (hosted on AWS). If you are located outside the US, your data will be transferred to and processed in the US. We rely on standard contractual clauses and other lawful transfer mechanisms to ensure your data is protected in accordance with applicable privacy laws including GDPR and CCPA.
                  </p>
                </div>

                <div id="gdpr-ccpa" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">10. GDPR & CCPA Rights</h2>
                  <p className="text-white/80 mb-4">
                    If you are a resident of the European Economic Area (EEA) or California, you have additional rights:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Right to know what personal data we collect and how it is used',
                      'Right to request deletion of your personal data',
                      'Right to opt out of the sale of your personal data (we do not sell your data)',
                      'Right to non-discrimination for exercising your privacy rights',
                      'Right to data portability - receive your data in a machine-readable format',
                      'Right to lodge a complaint with your local data protection authority'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-white/80">
                    To exercise any of these rights, contact us at business@thecontentlabs.io. We will respond within 30 days.
                  </p>
                </div>

                <div id="changes" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Privacy Policy</h2>
                  <p className="text-white/80">
                    We may update this policy periodically. We will notify you of significant changes via email or platform notifications.
                  </p>
                </div>

                <div className="mt-12 mb-8 rounded-xl border border-primary-500/20 bg-primary-900/20 backdrop-blur-md p-6">
                  <h3 className="mb-4 text-xl font-semibold text-white flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-primary-400" />
                    Privacy Concerns?
                  </h3>
                  <p className="mb-6 text-white/80">
                    If you have any questions about our privacy practices, we're here to help.
                  </p>
                  <Link
                    href="mailto:business@thecontentlabs.io"
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-white transition-all hover:shadow-lg hover:shadow-primary-500/20"
                  >
                    Email Privacy Team
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};