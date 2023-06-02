import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
const client = new Client()

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
    console.log('Client Ready!');
})

client.on('message', async (message) => {
    if (message.body === '.stiker') {
        if (message.hasMedia) {
            const media = await message.downloadMedia()
            const chat = await message.getChat()
            chat.sendMessage(media, {
                sendMediaAsSticker: true,
                stickerAuthor: 'Arya',
                stickerName: 'Hehe',
                stickerCategories: 'Lucu'
            })
            chat.sendMessage('Terimakasih')
        } else {
            const chat = await message.getChat()
            chat.sendMessage('Maaf silahkan kirim gambar lalu dengan peasn .stiker')
        }
    } else if (message.body === '.menu') {
        const chat = await message.getChat()
        chat.sendMessage('Untuk saat ini menu yang tersedia\n .stiker untuk membuat stiker dari gambar')
    } else {
        const chat = await message.getChat()
        chat.sendMessage('Silahkan ketik .menu untuk melihat menu yang tersedia')
    }
})

client.initialize();