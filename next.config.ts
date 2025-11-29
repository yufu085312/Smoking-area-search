import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "standalone",
};
 
export default withNextIntl(nextConfig);
