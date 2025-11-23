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
