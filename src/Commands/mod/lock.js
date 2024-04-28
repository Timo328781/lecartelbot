const  { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, BaseGuildTextChannel  } = require('discord.js')
const { verifyRole } = require('../../utils.js')
const { roleRequired } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Verrouiller un canal."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        await verifyRole(roleRequired.m_lock, interaction, async () => {

            /**
             * @type {BaseGuildTextChannel}
             */
            const channel = await interaction.member.guild.channels.fetch(interaction.channelId)

            if (channel.permissionsLocked) {
                return interaction.reply({ content: 'Ce canal est déjà verrouillé.', ephemeral: true });
            }
    
            try {
                await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SendMessages: false
                });
                return await interaction.reply({ content: 'Le canal a été verrouillé avec succès.', ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors du verrouillage du canal :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors du verrouillage du canal.', ephemeral: true });
            }  
        
        })
            
    }
}