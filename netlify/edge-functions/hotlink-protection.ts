import type { Context } from "<https://edge.netlify.com>";

export default async (
  request: Request,
  context: Context
): Promise<Response> => {

  const url = new URL(request.url);
  if (url.pathname.startsWith('/img/favicon')) {
    return;
  }

  const referer = request.headers.get("referer");
    const prodRegex = /^https?:\/\/(.*\.)?italianschoolsd\.com(\/.*)?$/;
const devRegex = /^https?:\/\/(.*\--)?italianschoolsd\.netlify\.app(\/.*)?$/;

if (
  !referer ||
  !(prodRegex.test(referer) || devRegex.test(referer))
) {
  return new Response("Forbidden", { status: 403 });
}
};
