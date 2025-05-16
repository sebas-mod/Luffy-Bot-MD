const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "cum",
    aliases: ["cumear"],
    category: "-",
    permissions: {},
    code: async (ctx) => {
        try {
        
            let pp = 'https://telegra.ph/file/9243544e7ab350ce747d7.mp4'
    let pp2 = 'https://telegra.ph/file/fadc180ae9c212e2bd3e1.mp4'
let pp3 = 'https://telegra.ph/file/79a5a0042dd8c44754942.mp4'
let pp4 = 'https://telegra.ph/file/035e84b8767a9f1ac070b.mp4'
let pp5 = 'https://telegra.ph/file/0103144b636efcbdc069b.mp4'
let pp6 = 'https://telegra.ph/file/4d97457142dff96a3f382.mp4'
let pp7 = 'https://telegra.ph/file/b1b4c9f48eaae4a79ae0e.mp4'
let pp8 = 'https://telegra.ph/file/5094ac53709aa11683a54.mp4'
let pp9 = 'https://telegra.ph/file/90ad889125a3ba40bceb8.jpg'
let pp10 = 'https://telegra.ph/file/dc279553e1ccfec6783f3.mp4'
let pp11 = 'https://telegra.ph/file/acdb5c2703ee8390aaf33.mp4'

    const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11];
    const video = videos[Math.floor(Math.random() * videos.length)];
            const senderName = ctx.sender.pushName;
            const senderJid = ctx.sender.jid;
            const senderId = tools.general.getID(senderJid);

                
                let texto = `${senderName} cumeo a `

            try {
                return await ctx.reply({
                    video: {
                        url: video
                    },
                    mimetype: mime.lookup("mp4"),
                    caption: text,
                    gifPlayback: true
                });
            } catch (error) {
                if (error.status !== 200) return await ctx.reply(text);
            }
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};