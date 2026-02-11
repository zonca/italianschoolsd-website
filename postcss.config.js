const purgecss = require("@fullhuman/postcss-purgecss");

const isProd =
  process.env.HUGO_ENV === "production" ||
  process.env.NODE_ENV === "production" ||
  process.env.CONTEXT === "production";

const plugins = [
  require("postcss-import"),
  require("postcss-preset-env")({
    browsers: "last 2 versions"
  }),
  require("postcss-custom-media"),
  require("autoprefixer")
];

if (isProd) {
  plugins.push(purgecss({
    content: [
      "./site/layouts/**/*.html",
      "./site/content/**/*.md",
      "./site/content/**/*.html"
    ],
    // Keep dynamic/external classes and common utility patterns.
    safelist: [
      /^DocSearch/,
      /^goog-/,
      /^goog-te/,
      /^program-card/,
      /^news-/,
      /^btn$/,
      /^raise$/,
      /^link$/,
      /^primary$/,
      /^black$/,
      /^white$/,
      /^grey-/,
      /^bg-/,
      /^mw[0-9]/,
      /^w[0-9-]/,
      /^f[0-9]/,
      /^pa[0-9-]/,
      /^ph[0-9-]/,
      /^pv[0-9-]/,
      /^ma[0-9-]/,
      /^mh[0-9-]/,
      /^mv[0-9-]/,
      /^mb[0-9-]/,
      /^mt[0-9-]/,
      /^ml[0-9-]/,
      /^mr[0-9-]/,
      /^br/,
      /^flex/,
      /^items-/,
      /^justify-/,
      /^tc$/,
      /^tl$/,
      /^tr$/,
      /^db$/,
      /^di$/,
      /^dn$/,
      /^b$/,
      /^lh-/,
      /^center$/,
      /^cover$/,
      /^bg-center$/,
      /^no-underline$/,
      /^sans-serif$/,
      /^sr-only$/
    ]
  }));
}

module.exports = { plugins };
