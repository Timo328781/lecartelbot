const { Client, Collection, GatewayIntentBits } = require("discord.js")

const client = new Client({ 
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
        ]
})

client.commands = new Collection()


const config = require('./config.json')

const { loadCommands } = require("./src/Handlers/commandsHandler")
const { loadEvents } = require('./src/Handlers/eventsHandler')

client.login(config.token).then(async () => {

    loadCommands(client)
    loadEvents(client)

    client.user.setPresence({
        status: 'online',
        activities: [
            {
                name: 'Status: Online 🟢'
            }
        ]
    })

})

