import Link from 'next/link';
import { MESSAGES } from '@/constants/messages';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-auto border-t border-white/10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-text-secondary text-sm">
            &copy; {currentYear} {MESSAGES.HOME.TITLE}. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              href="/terms" 
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              利用規約・免責事項
            </Link>
            <Link 
              href="/privacy" 
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
