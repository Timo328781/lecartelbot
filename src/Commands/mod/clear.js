const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const { roleRequired, log_channel } = require('../../../config.json')
const { verifyRole } = require('../../utils.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Permet de supprimer des messages dans un channel ou une personne ciblée')
    .addNumberOption(option => option.setName("amount")
                                     .setDescription("Nombre de messages à supprimer")
                                     .setMinValue(1)
                                     .setMaxValue(100)
                                     .setRequired(true))
    .addUserOption(option => option.setName('user')
                                   .setDescription('Personne ciblée par le clear')
                                   .setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const channel = await interaction.member.guild.channels.fetch(interaction.channelId)
        const logChannel = await interaction.member.guild.channels.fetch(log_channel)

        const amount = interaction.options.getNumber("amount");
        const user = interaction.options.getUser('user')

        const channelMessages = await channel.messages.fetch()

        const responseEmbed = new EmbedBuilder().setColor('DarkNavy')
        const logEmbed = new EmbedBuilder().setColor('DarkAqua')
                                           .setAuthor({name: "Commande de clear exécutée"})

        await verifyRole(roleRequired.m_clear, interaction, () => {
            
            let logEmbedDescription = [
                `- Modérateur: ${interaction.member}`,
                `- Membre ciblé: ${user || "Aucun"}`,
                `- Channel: ${channel}`
            ];
    
            if (user) {
                let i = 0
                let messagesToDelete = []
    
                channelMessages.filter((msg) => {
                    if (msg.author.id === user.id && amount > 1) {
                        messagesToDelete.push(msg)
                        i++
                    }
                })
    
                channel.bulkDelete(messagesToDelete, true).then((msg) => {
                    interaction.reply({ embeds: [responseEmbed.setDescription(`Supprimé: ${msg.size} messages de ${user}`)]})
    
                    logEmbedDescription.push(`- Nombre de messages: ${msg.size}`)
                    logChannel.send({embeds: [logEmbed.setDescription(logEmbedDescription.join('\n'))], files: [] })
    
                })
            } else {
    
                channel.bulkDelete(amount, true).then((msg) => {
                    interaction.reply({ embeds: [responseEmbed.setDescription(`Supprimé: ${msg.size} messages du channel`)] })
    
                    logEmbedDescription.push(`- Nombre de messages : ${msg.size}`)
                    logChannel.send({ embeds: [logEmbed.setDescription(logEmbedDescription.join('\n'))], files: [] }) 
                })
    
            }

        })        

    }
}