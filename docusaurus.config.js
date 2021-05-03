/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Learn Netdata',
  tagline: 'Here you\'ll find documentation, guides, and reference material for monitoring and troubleshooting your systems with Netdata. Discover new insights of your systems, containers, and applications using per-second metrics, insightful visualizations, and every metric imaginable.',
  url: 'https://learn.netdata.cloud',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'netdata', // Usually your GitHub org/user name.
  projectName: 'netdata-learn-docusaurus', // Usually your repo name.
  themeConfig: {
    gtag: {
      trackingID: 'GTM-N6CBMJD',
    },
    image: 'img/netdata_meta-default.png',
    prism: {
      theme: require('prism-react-renderer/themes/duotoneDark'),
      darkTheme: require('prism-react-renderer/themes/duotoneDark'),
    },
    navbar: {
      title: 'Learn',
      logo: {
        alt: 'Netdata Learn logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'docs',
          position: 'left',
          label: 'Tutorials',
        },
        {
          type: 'doc',
          docId: 'docs',
          position: 'left',
          label: 'Contribute',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'Agent',
              href: 'https://netdata.cloud/agent',
            },
            {
              label: 'Cloud',
              href: 'https://netdata.cloud/cloud',
            },
            {
              label: 'Integrations',
              to: 'https://www.netdata.cloud/integrations/',
            },
            {
              label: 'Status',
              href: 'https://status.netdata.cloud',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Learn',
              to: '/',
            },
            {
              label: 'Blog',
              to: 'https://netdata.cloud/blog',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/netdata/netdata',
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Overview',
              to: 'https://www.netdata.cloud/community-overview/',
            },
            {
              label: 'Forums',
              to: 'https://community.netdata.cloud/',
            }
          ]
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://netdata.cloud',
            },
            {
              label: 'News',
              href: 'https://www.netdata.cloud/news/',
            },
            {
              label: 'Careers',
              href: 'https://careers.netdata.cloud/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Netdata, Inc.`,
    },
  },
  plugins: ['docusaurus-plugin-sass', 'docusaurus-tailwindcss-loader'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/netdata/netdata/edit/master/',
          showLastUpdateTime: true,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: '/font/ibm-plex-sans-v8-latin-regular.woff2',
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      crossorigin: '',
    },
    {
      href: '/font/ibm-plex-sans-v8-latin-500.woff2',
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    },
    {
      href: '/font/ibm-plex-sans-v8-latin-700.woff2',
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      crossorigin: '',
    },
    {
      href: '/font/ibm-plex-mono-v6-latin-regular.woff2',
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      crossorigin: '',
    },
  ],
  scripts: [
    {
      src:
        'https://js.hs-scripts.com/4567453.js',
      async: true,
      defer: true,
    },
  ],
};
