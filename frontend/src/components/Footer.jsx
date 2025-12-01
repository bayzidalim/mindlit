import { Facebook, Instagram, Mail, MapPin, GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">MindLit</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              AI-powered book summaries and interactive learning tools to help you unlock knowledge instantly.
            </p>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Developed By</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <GraduationCap size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Shahadat Hossain Hridoy</p>
                  <p className="text-sm text-gray-400">Student, New Model Degree College</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Dhanmondi-32, Shukrabad, Dhaka-1209
                </p>
              </div>

              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.facebook.com/shahadatXhridoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Facebook size={18} />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/shahadat__hridoy?igsh=MWJhbzg5b2Z0NnAxMg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Instagram size={18} />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MindLit. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Built with ❤️ by Shahadat Hossain Hridoy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
