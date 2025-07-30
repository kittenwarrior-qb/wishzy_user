// Tạo config cho next-intl/plugin

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);


