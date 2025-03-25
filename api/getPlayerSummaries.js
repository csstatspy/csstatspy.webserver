const axios = require("axios");

module.exports = async (req, res) => {
  const steamid = req.query.steamid;

  if (!steamid) {
    return res.status(400).json({ error: "SteamID64 is required" });
  }

  try {
    const response = await axios.get(
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
      {
        params: {
          key: process.env.STEAM_API_KEY,
          steamids: steamid,
        },
      }
    );

    const playerData = response.data.response.players[0];

    if (playerData) {
      res.json(playerData);
    } else {
      res.status(404).json({ error: "Player not found" });
    }
  } catch (error) {
    console.error("Error fetching player summaries:", error);
    res.status(500).json({ error: "Server error" });
  }
};
