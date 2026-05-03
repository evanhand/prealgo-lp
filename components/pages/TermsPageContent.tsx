'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, CheckCircle, ArrowRight, Lock, FileText } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';

export const TermsPageContent: React.FC = () => {
  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'description', title: '2. Description of Service' },
    { id: 'accounts', title: '3. User Accounts' },
    { id: 'payment', title: '4. Payment Terms' },
    { id: 'analysis', title: '5. Content Analysis' },
    { id: 'content', title: '6. User Content' },
    { id: 'ip', title: '7. Intellectual Property' },
    { id: 'privacy', title: '8. Privacy' },
    { id: 'termination', title: '9. Termination' },
    { id: 'disclaimers', title: '10. Disclaimers' },
    { id: 'liability', title: '11. Limitation of Liability' },
    { id: 'changes', title: '12. Changes to Terms' },
    { id: 'governing', title: '13. Governing Law & Dispute Resolution' },
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
                <Shield className="h-8 w-8 text-primary-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                These Terms of Service govern your access to and use of PreAlgo's services. 
                Please read them carefully.
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
                <p className="text-white/90 text-lg">
                  By using our services, you agree to be bound by these Terms and all applicable laws and regulations. Please read them carefully.
                </p>

                <div id="acceptance" className="mt-12 mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="text-white/80">
                  By accessing or using PreAlgo's services, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
                  </p>
                </div>

                <div id="description" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                  <p className="text-white/80">
                  PreAlgo provides AI-powered content analysis tools for creators. Our services include:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Content performance prediction and analysis',
                      'Engagement metrics and insights',
                      'Retention analysis and recommendations',
                      'Technical quality assessment'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="accounts" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                  <p className="text-white/80">
                  To use our services, you must:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Register for an account with accurate information',
                      'Maintain the security of your account credentials',
                      'Promptly notify us of any unauthorized access',
                      'Be at least 18 years old or have legal guardian consent'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="payment" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
                  <p className="text-white/80">
                  Subscription fees are billed in advance on a monthly or annual basis. You authorize us to charge your payment method for all applicable fees. All payments are non-refundable unless required by law.
                  </p>
                </div>

                <div id="analysis" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">5. Content Analysis</h2>
                  <p className="text-white/80">
                  Our AI analysis is for informational purposes only. While we strive for accuracy, we do not guarantee specific performance outcomes or results. You retain all rights to your content.
                  </p>
                </div>

                <div id="content" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">6. User Content</h2>
                  <p className="text-white/80">
                  You retain ownership of content you upload. By using our services, you grant us a license to analyze, process, and store your content for service provision purposes.
                  </p>
                </div>

                <div id="ip" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
                  <p className="text-white/80">
                  Our services, including software, designs, and algorithms, are protected by intellectual property rights. You may not copy, modify, or redistribute without permission.
                  </p>
                </div>

                <div id="privacy" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">8. Privacy</h2>
                  <p className="text-white/80">
                  Our Privacy Policy explains how we collect and use your data. By using our services, you agree to our data practices as described in the Privacy Policy.
                  </p>
                </div>

                <div id="termination" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
                  <p className="text-white/80">
                  We may suspend or terminate your access to our services:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'For violations of these Terms',
                      'For fraudulent or illegal activities',
                      'To protect our services or other users',
                      'For non-payment of fees'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="disclaimers" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">10. Disclaimers</h2>
                  <p className="text-white/80">
                  Our services are provided "as is" without warranties. We do not guarantee uninterrupted service or specific results from using our platform.
                  </p>
                </div>

                <div id="liability" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">11. Limitation of Liability</h2>
                  <p className="text-white/80">
                  To the maximum extent permitted by law, PreAlgo shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                  </p>
                </div>

                <div id="changes" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                  <p className="text-white/80">
                  We may modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the modified Terms.
                  </p>
                </div>

                <div id="governing" className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law & Dispute Resolution</h2>
                  <p className="text-white/80">
                    These Terms are governed by the laws of the State of Delaware, United States. Any disputes arising from these Terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law. You retain the right to bring claims in small claims court.
                  </p>
                </div>

                <div className="mt-12 mb-8 rounded-xl border border-primary-500/20 bg-primary-900/20 backdrop-blur-md p-6">
                  <h3 className="mb-4 text-xl font-semibold text-white flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-primary-400" />
                    Questions About Our Terms?
                  </h3>
                  <p className="mb-6 text-white/80">
                    If you have any questions about these terms, we're here to help.
                  </p>
                  <Link
                    href="mailto:business@thecontentlabs.io"
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-white transition-all hover:shadow-lg hover:shadow-primary-500/20"
                  >
                    Email Support
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