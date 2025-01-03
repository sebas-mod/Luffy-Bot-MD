import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `Gunakan format: ${usedPrefix + command} <link TikTok>`, m);
  }

  try {
    const videoResult = await ttsave.video(text);
    const { 
      type, 
      nickname, 
      username, 
      description, 
      videoInfo, 
      slides, 
      audioUrl 
    } = videoResult;

    let message = `
📛 *Nickname*: ${nickname || "-"}
🆔 *Username*: ${username || "-"}
📝 *Deskripsi*: ${description || "-"}
`.trim();

    if (type === "slide") {
      message += "\n📷 *Tipe*: Slide (Gambar)";
      await conn.reply(m.chat, message, m);

      for (let slide of slides) {
        await conn.sendFile(m.chat, slide.url, `slide-${slide.number}.jpg`, "", m);
      }
    } 
    else if (type === "video") {
      message += "\n🎥 *Tipe*: Video";
      if (videoInfo.nowm) {
        message += ``;
        await conn.sendFile(m.chat, videoInfo.nowm, "tiktok.mp4", message, m);
      } else {
        conn.reply(m.chat, "Gagal mengambil video tanpa watermark.", m);
      }
    } 
//hapus wm?=sdm rendah https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    if (audioUrl) {
      message += "\n🎵 *Tipe*: Audio";
      await conn.sendFile(m.chat, audioUrl, "tiktok.mp3", "", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. Pastikan link TikTok valid dan coba lagi.`, m);
  }
};
//wwmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
handler.help = ["tiktok <link>","tiktokdl <link>"];
handler.tags = ["downloader"];
handler.command = ["tiktok","tiktokdl"];
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
export default handler;
//hapus wm?=mandul https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
// Scrape By Daffa https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/321
const headers = {
  authority: "ttsave.app",
  accept: "application/json, text/plain, */*",
  origin: "https://ttsave.app",
  referer: "https://ttsave.app/en",
  "user-agent": "Postify/1.0.0",
};

const ttsave = {
  submit: async function (url, referer) {
    const headerx = { ...headers, referer };
    const data = { query: url, language_id: "1" };
    return axios.post("https://ttsave.app/download", data, { headers: headerx });
  },

  parse: function ($) {
    const uniqueId = $("#unique-id").val();
    const nickname = $("h2.font-extrabold").text();
    const profilePic = $("img.rounded-full").attr("src");
    const username = $("a.font-extrabold.text-blue-400").text();
    const description = $("p.text-gray-600").text();

    const dlink = {
      nowm: $("a.w-full.text-white.font-bold").first().attr("href"),
      wm: $("a.w-full.text-white.font-bold").eq(1).attr("href"),
      audio: $("a[type='audio']").attr("href"),
      profilePic: $("a[type='profile']").attr("href"),
      cover: $("a[type='cover']").attr("href"),
    };

    const stats = {
      plays: "",
      likes: "",
      comments: "",
      shares: "",
    };

    $(".flex.flex-row.items-center.justify-center").each((index, element) => {
      const $element = $(element);
      const svgPath = $element.find("svg path").attr("d");
      const value = $element.find("span.text-gray-500").text().trim();

      if (svgPath && svgPath.startsWith("M10 18a8 8 0 100-16")) {
        stats.plays = value;
      } else if (svgPath && svgPath.startsWith("M3.172 5.172a4 4 0 015.656")) {
        stats.likes = value || "0";
      } else if (svgPath && svgPath.startsWith("M18 10c0 3.866-3.582")) {
        stats.comments = value;
      } else if (svgPath && svgPath.startsWith("M17.593 3.322c1.1.128")) {
        stats.shares = value;
      }
    });

    const songTitle = $(".flex.flex-row.items-center.justify-center.gap-1.mt-5")
      .find("span.text-gray-500")
      .text()
      .trim();

    const slides = $("a[type='slide']")
      .map((i, el) => ({
        number: i + 1,
        url: $(el).attr("href"),
      }))
      .get();

    return {
      uniqueId,
      nickname,
      profilePic,
      username,
      description,
      dlink,
      stats,
      songTitle,
      slides,
    };
  },

  video: async function (link) {
    try {
      const response = await this.submit(link, "https://ttsave.app/en");
      const $ = cheerio.load(response.data);
      const result = this.parse($);

      if (result.slides && result.slides.length > 0) {
        return { type: "slide", ...result };
      }

      return {
        type: "video",
        ...result,
        videoInfo: {
          nowm: result.dlink.nowm,
          wm: result.dlink.wm,
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};