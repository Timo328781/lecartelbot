const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { roleRequired } = require('../../../config.json');
const { verifyRole } = require('../../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute un utilisateur')
        
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur à mute')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du mute')
                .setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'Aucune raison spécifiée';

        await verifyRole(roleRequired.m_mute, interaction, async () => {

            try {
                const temp = await interaction.guild.channels.fetch()
                interaction.guild.channels.cache.forEach(channel => {
                    channel.permissionOverwrites.edit(user, {
                        SendMessages: false
                    });
                });
                return interaction.reply({ content: `L'utilisateur ${user.displayName} a été muté.`, ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors du mute de l\'utilisateur :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors du mute de l\'utilisateur.', ephemeral: true });
            }
        
        })
    },
};
