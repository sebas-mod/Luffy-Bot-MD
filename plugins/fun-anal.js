import fs from 'fs';
import path from 'path';
import { uploadToTelegraph } from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, usedPrefix }) => {
    if (!global.db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply('🚩 *¡Estos comandos están desactivados!*');
    }

    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }

    if (!who) throw m.reply('Etiqueta o menciona a alguien para usar este comando.');

    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);

    await conn.sendMessage(m.chat, { react: { text: '🥵', key: m.key } });

    let str = `${name2} se la metió en el ano a ${name}! >.<`.trim();
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/7185b0be7a315706d086a.mp4';
        let pp2 = 'https://telegra.ph/file/a11625fef11d628d3c8df.mp4';
        let pp3 = 'https://telegra.ph/file/062b9506656e89b069618.mp4';
        let pp4 = 'https://telegra.ph/file/1325494a54adc9a87ec56.mp4';

        const videos = [pp, pp2, pp3, pp4];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(
            m.chat,
            { video: { url: video }, gifPlayback: true, caption: str, mentions: [m.sender] }
        );
    }
};

handler.help = ['anal @tag'];
handler.tags = ['fun'];
handler.command = ['anal', 'culiar'];
handler.register = true;

handler.group = true;

export default handler;
