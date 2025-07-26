import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Heart, Users, ArrowRight, Star, Sparkles, Phone, Mail, MapPin, Menu, X } from "lucide-react";

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Patient",
      content: "Tumaini made my screening experience so much easier. The risk assessment helped me understand my health better.",
      rating: 5
    },
    {
      name: "Dr. Grace W.",
      role: "Healthcare Provider",
      content: "This platform has revolutionized how we manage cervical cancer screening. The tools are intuitive and comprehensive.",
      rating: 5
    },
    {
      name: "Maria K.",
      role: "Patient",
      content: "I was nervous about my first screening, but Tumaini's guidance made me feel confident and informed.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "What is cervical cancer screening?",
      answer: "Cervical cancer screening involves tests to detect precancerous changes in the cervix before they develop into cancer. Early detection saves lives."
    },
    {
      question: "How often should I get screened?",
      answer: "Screening frequency depends on your age, risk factors, and previous results. Our platform provides personalized recommendations based on your profile."
    },
    {
      question: "Is the screening process painful?",
      answer: "Most women experience minimal discomfort during screening. The procedure is quick and our healthcare providers are trained to make you as comfortable as possible."
    },
    {
      question: "What if I can't afford screening?",
      answer: "Tumaini connects you with affordable screening options and insurance resources. We believe cost should never be a barrier to health."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-yellow-200 rounded-full opacity-40 animate-spin"></div>
      </div>

      {/* Navigation */}
      <nav className={`backdrop-blur-lg border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/60 shadow-lg' : 'bg-white/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className="h-8 w-8 mr-3 animate-pulse group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-purple-700 transition-all duration-300">
                  Tumaini
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-pink-600 transition-colors relative group font-medium"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-pink-600 transition-colors relative group font-medium"
              >
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-pink-600 transition-colors relative group font-medium"
              >
                Stories
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-pink-600 transition-colors relative group font-medium"
              >
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group hidden sm:block"
              >
                Sign In
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join Now
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
              >
                Stories
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
              >
                FAQ
              </button>
              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to account for fixed navigation */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-800 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Empowering Women's Health
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Early Detection
            <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Saves Lives
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Tumaini is your comprehensive cervical cancer screening platform that connects you with healthcare providers, 
            making early detection <span className="font-semibold text-pink-600">accessible</span>, <span className="font-semibold text-purple-600">affordable</span>, and <span className="font-semibold text-blue-600">effective</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white/80 backdrop-blur-sm py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Tumaini</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with compassionate care to make cervical cancer screening 
              accessible, affordable, and effective for every woman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-pink-100">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center">Early Detection</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm lg:text-base">
                Advanced screening tools and comprehensive risk assessment to detect cervical cancer at its earliest, 
                most treatable stage. Our AI-powered system provides personalized recommendations.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-purple-100">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center">Compassionate Care</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm lg:text-base">
                Connect with experienced healthcare providers who understand your concerns. Our platform prioritizes 
                your comfort and privacy throughout the screening process.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-blue-100">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center">Community Support</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm lg:text-base">
                Join a supportive community of women who understand the importance of regular screening. Share experiences, 
                ask questions, and find encouragement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Tumaini</span> Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to take control of your health and get the screening you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create Your Profile</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Sign up and complete a brief health questionnaire to help us understand your risk factors and provide personalized recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Assessment</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Receive a comprehensive risk assessment and personalized screening schedule based on your health profile and medical guidelines.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect & Screen</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Connect with healthcare providers in your area, schedule your screening, and get the care you need with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Community</span> Says
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from women who have taken control of their health with Tumaini.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 lg:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {testimonials.map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${index < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Everything you need to know about cervical cancer screening and our platform.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Making a <span className="text-pink-200">Difference</span>
            </h2>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto">
              Join thousands of women who have taken control of their health with Tumaini.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">10,000+</div>
              <div className="text-pink-200 text-sm lg:text-base">Women Screened</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-pink-200 text-sm lg:text-base">Healthcare Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-pink-200 text-sm lg:text-base">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-pink-200 text-sm lg:text-base">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Take <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Control</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of women who have made their health a priority. Start your journey with Tumaini today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className="h-8 w-8 mr-3" />
                <span className="text-xl font-bold">Tumaini</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering women's health through accessible, affordable, and effective cervical cancer screening.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition-colors">Stories</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +254 700 000 000
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@tumaini.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Nairobi, Kenya
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Tumaini. All rights reserved. Empowering women's health across Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 