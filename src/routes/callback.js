const axios = require("axios");
const qs = require("qs");
const helpers = require("../helpers/helpers");
const settings = require("../configuration/settings");

async function routes(fastify, options) {
  fastify.get("/callback", async (req, reply) => {
    // Retrieve access token after checking the state parameter
    const storedState = req.cookies
      ? req.cookies[settings.cookies.stateCookie]
      : null;
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null || state !== storedState) {
      reply.send("state_error");
    } else {
      reply.clearCookie(settings.cookies.stateCookie); // remove cookie since we don't need it anymore.

      const options = {
        url: `${settings.urls.tokenUrl}`,
        method: "post",
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: `${settings.urls.redirectUrl}`
        },
        headers: {
          Accept: "application/json",
          "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: settings.appSettings.clientId,
          password: settings.appSettings.clientSecret
        }
      };

      try {
        const result = await axios(options);

        reply.setCookie(
          settings.cookies.spotifyRefresh,
          result.data.refresh_token,
          { httpOnly: true }
        );

        reply.setCookie(
          settings.cookies.spotifyCookie,
          JSON.stringify({
            access_token: result.data.access_token,
            token_type: result.data.token_type,
            expires: helpers.setExpiry(),
            scopes: result.data.scope
          }),
          { httpOnly: true }
        );
      } catch (error) {
        fastify.log.error(error);
      }
    }
    reply.redirect(`${settings.urls.webUrl}`);
  });
}

module.exports = routes;
