const qs = require("qs");
const helpers = require("../helpers/helpers");
const settings = require("../configuration/settings");

async function routes(fastify, options) {
  fastify.get("/login", async (req, reply) => {
    reply.clearCookie(settings.cookies.stateCookie);

    const state = helpers.generateState();

    const scopes = settings.scopes;

    reply.setCookie(settings.cookies.stateCookie, state, { httpOnly: true });
    reply.redirect(
      `${settings.urls.authUrl}?${qs.stringify({
        response_type: "code",
        client_id: `${settings.appSettings.clientId}`,
        scope: scopes,
        redirect_uri: `${settings.urls.redirectUrl}`,
        state: state
      })}`
    );
  });
}

module.exports = routes;
