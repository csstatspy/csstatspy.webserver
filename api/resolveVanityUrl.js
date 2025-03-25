const axios = require("axios");

module.exports = async (req, res) => {
  const vanityUrl = req.query.vanityurl;

  if (!vanityUrl) {
    return res.status(400).json({ error: "Vanity URL is required" });
  }

  try {
    const response = await axios.get(
      "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/",
      {
        params: {
          key: process.env.STEAM_API_KEY,
          vanityurl: vanityUrl,
        },
      }
    );

    const result = response.data.response;

    if (result.success === 1) {
      res.setHeader("Access-Control-Allow-Origin", "https://csstatspy.github.io");
      res.json({ steamid: result.steamid });
    } else {
      res.status(404).json({ error: "Vanity URL not found" });
    }
  } catch (error) {
    console.error("Error resolving vanity URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};
