const  { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder  } = require('discord.js')
const { verifyRole } = require('../../utils.js')
const { roleRequired } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Déverrouiller un canal."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        await verifyRole(roleRequired.m_lock, interaction, async () => {

            const channel = await interaction.member.guild.channels.fetch(interaction.channelId)

            if (channel.permissionsLocked) {
                return interaction.reply({ content: 'Ce canal n\'est pas verrouillé.', ephemeral: true });
            }
            
            try {
                await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SendMessages: true
                });
    
                return interaction.reply({ content: 'Le canal a été déverrouillé avec succès.', ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors du déverrouillage du canal :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors du déverrouillage du canal.', ephemeral: true });
            }

        })  

    }
}