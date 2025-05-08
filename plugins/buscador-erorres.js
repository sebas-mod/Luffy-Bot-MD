import fs from 'fs';
import path from 'path';

let Fruatre = async (m, { conn }) => {
    let pluginFolder = './plugins';
    let errorList = [];

    // Cek apakah folder plugin ada
    if (!fs.existsSync(pluginFolder)) {
        return m.reply('❌ Carpeta de complementos no encontrada!');
    }

    // Baca semua file dalam folder plugins
    let files = fs.readdirSync(pluginFolder).filter(file => file.endsWith('.js'));

    for (let file of files) {
        try {
            // Import file sebagai modul ESM
            let plugin = await import(file://${path.resolve(pluginFolder, file)});
            if (typeof plugin.default !== 'function') {
                throw new Error('La exportación predeterminada no es una función');
            }
        } catch (err) {
            errorList.push(❌ ${file}: ${err.message});
        }
    }

    // Kirim hasil pengecekan
    if (errorList.length === 0) {
        m.reply('✅ ¡Todas las funciones son seguras, sin errores!');
    } else {
        m.reply(🚨 Se Encontró ${errorList.length} errores:\n\n + errorList.join('\n'));
    }
};

Fruatre.help = ['viewerror'];
Fruatre.tags = ['owner'];
Fruatre.command = /^viewerror$/i;
Fruatre.rowner = true; // Hanya untuk owner

export default Fruatre;
