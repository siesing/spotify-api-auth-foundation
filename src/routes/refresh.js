const axios = require("axios");
const helpers = require("../helpers/helpers");
const settings = require("../configuration/settings");

async function routes(fastify, options) {
  fastify.get("/refreshtoken", async (req, reply) => {
    // Requesting a new access token from refresh token
    const refresh_token = req.cookies[settings.cookies.spotifyRefresh];

    const options = {
      url: `${settings.urls.tokenUrl}`,
      method: "post",
      params: {
        grant_type: "refresh_token",
        refresh_token: refresh_token
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
      reply.clearCookie(settings.cookies.spotifyCookie);
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
  });
}

module.exports = routes;
