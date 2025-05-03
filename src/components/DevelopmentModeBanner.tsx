
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface DevelopmentModeBannerProps {
  className?: string;
}

const DevelopmentModeBanner = ({ className }: DevelopmentModeBannerProps) => {
  return (
    <Alert className={`bg-purple-100 border-purple-300 ${className}`}>
      <Info className="h-4 w-4 text-purple-700" />
      <AlertDescription className="flex items-center justify-between w-full text-sm text-purple-800">
        <span>
          This site is in development mode. Ordering functionality is not yet live.
        </span>
        <Link to="/contact" className="underline font-medium hover:text-purple-900">
          Contact us
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default DevelopmentModeBanner;
