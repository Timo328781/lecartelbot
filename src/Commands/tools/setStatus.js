const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, Client } = require('discord.js')
const { roleRequired } = require('../../../config.json')
const { verifyRole } = require('../../utils')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set_status')
    .setDescription('Définir le status du bot')
    .addStringOption(option => 
        option.setName('activity')
                .setDescription('l\'activité du bot ^^')
                .setRequired(true)
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const activity = interaction.options.getString('activity')

        await verifyRole(roleRequired.m_bot_status, interaction, async () => {

            try {
                client.user.setPresence({
                    status: 'idle',
                    activities: [
                        {
                            name: activity
                        }
                    ]
                })

                await interaction.reply({ content: `activité du bot changée pour: ${activity}`, ephemeral: true})
            } catch (err) {
                console.log(err)
            }
        
        })
        
    }
}