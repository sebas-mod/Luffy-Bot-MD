const { prepareWAMessageMedia, generateWAMessageFromContent } = require("baileys");
const { randomBytes } = require("crypto");
            const { imageMessage } = await prepareWAMessageMedia({
                image: { url: "https://i.pinimg.com/736x/1c/b9/dc/1cb9dce731c1544b0bd018b02567fd1f.jpg" }
            }, { upload: sock.waUploadToServer });

            const sections = [
                {
                    title: "Tags Relacionados",
                    rows: [
                        {
                            title: 'Example',
                            highlight_label: "test",
                            description: "Example description",
                            id: "example_id",
                        },
                    ],
                },
            ];

            const messageContent = {
                interactiveMessage: {
                    body: { text: '...' },
                    footer: { text: '...' },
                    header: {
                        title: 'Example Title',
                        subtitle: 'Example Subtitle',
                        hasMediaAttachment: true,
                        documentMessage: {
                            ...imageMessage,
                            pageCount: 1,
                            fileLength: 99999999999,
                            fileName: 'example_file',
                            jpegThumbnail: imageMessage.jpegThumbnail
                        },
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                buttonParamsJson: "{\"display_text\":\"Example Button 2\",\"id\":\"example_id_2\"}",
                                name: "quick_reply"
                            },
                            {
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'Example Button 3',
                                    id: 'example_id_3',
                                    copy_code: 'Example copy code'
                                }),
                                name: "cta_copy"
                            },
                            {
                                buttonParamsJson: "{\"display_text\":\"Example Button 4\",\"phone_number\":\"1234567890\"}",
                                name: "cta_call"
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "Example Section",
                                    sections: sections,
                                }),
                            }
                        ],
                        messageParamsJson: "{}",
                        messageVersion: 1
                    }
                },
                messageContextInfo: {
                    messageSecret: randomBytes(32)
                }
            };

            const message = generateWAMessageFromContent(m.cht, messageContent, { userJid: sock.user.id });
            await sock.relayMessage(m.cht, message.message, { messageId: message.key.id });