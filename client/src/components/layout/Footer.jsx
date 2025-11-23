const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Cocolab</h3>
            <p className="text-sm">
              Privacy-first marketplace connecting brands with vetted creators.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">For Brands</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Find Creators</a></li>
              <li><a href="#" className="hover:text-white">How It Works</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Creators</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Join Platform</a></li>
              <li><a href="#" className="hover:text-white">Analytics</a></li>
              <li><a href="#" className="hover:text-white">Boost Profile</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Cocolab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
