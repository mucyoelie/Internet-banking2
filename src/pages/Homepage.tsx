import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  Lock,
  Globe,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wallet,
      title: 'Smart Accounts',
      description: 'Manage multiple accounts with real-time balance updates and smart categorization.',
    },
    {
      icon: ArrowLeftRight,
      title: 'Instant Transfers',
      description: 'Send money instantly to anyone, anywhere with zero fees between SecureBank accounts.',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Security',
      description: 'Your money is protected with 256-bit encryption and multi-factor authentication.',
    },
    {
      icon: TrendingUp,
      title: 'Investment Options',
      description: 'Grow your wealth with stocks, bonds, mutual funds, and cryptocurrency trading.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your accounts from anywhere in the world, 24/7.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Banking',
      description: 'Bank on the go with our award-winning mobile app.',
    },
  ];

  const stats = [
    { value: '2M+', label: 'Active Users' },
    { value: '$50B+', label: 'Transactions' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9', label: 'App Rating' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      content: 'SecureBank has transformed how I manage my business finances. The instant transfers and detailed analytics are game-changers.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      content: 'The investment features are incredible. I have grown my portfolio by 25% in just one year using their platform.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Freelance Designer',
      content: 'I love how easy it is to send invoices and receive payments. The mobile app is so intuitive!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">SecureBank</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Features
            </a>
            <a href="#security" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Security
            </a>
            <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20 pt-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
              <Star className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300">Trusted by 2 million+ users worldwide</span>
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Banking Made{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Simple & Secure
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Experience the future of banking with SecureBank. Send money instantly, invest wisely,
              and manage your finances all in one place.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-8"
              >
                Open Free Account
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything You Need in One Place
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Powerful features designed to help you manage, save, and grow your money.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-slate-500">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Your Security is Our Priority
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                We use bank-grade security measures to protect your money and personal information.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  '256-bit SSL encryption',
                  'Multi-factor authentication',
                  'Biometric login support',
                  'Real-time fraud monitoring',
                  'FDIC insured up to $250,000',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                    <Lock className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Secure Connection</p>
                    <p className="text-blue-100">Your data is encrypted</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                    <span className="text-sm">Encryption</span>
                    <span className="font-semibold">AES-256</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                    <span className="text-sm">Authentication</span>
                    <span className="font-semibold">MFA Enabled</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                    <span className="text-sm">Last Login</span>
                    <span className="font-semibold">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Loved by Millions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              See what our customers have to say about SecureBank.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-slate-600">"{testimonial.content}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Join millions of users who trust SecureBank for their banking needs.
            Open your free account in minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="gap-2 bg-white px-8 text-blue-600 hover:bg-blue-50"
            >
              Open Free Account
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SecureBank</span>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Modern banking for the modern world. Secure, fast, and reliable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Products</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Personal Banking</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Business Banking</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Investments</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Loans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Support</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-400">
              © 2024 SecureBank. All rights reserved. Member FDIC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;




