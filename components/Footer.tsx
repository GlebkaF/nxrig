import { publicConfig } from "lib/public/config";

export default function Footer({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {children}
          <div className="mt-12 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <a
                href={`mailto:${publicConfig.contacts.email}`}
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                {publicConfig.contacts.email}
              </a>
              <span className="text-gray-600">•</span>
              <a
                href={publicConfig.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.145.118.181.344.203.483.023.139.041.562.041.562z" />
                </svg>
                Telegram
              </a>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} nxrig.com - All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
