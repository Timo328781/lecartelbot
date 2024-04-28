const { SlashCommandBuilder } = require('discord.js');
const { roleRequired } = require('../../../config.json');
const { verifyRole } = require('../../utils');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur à unmute')
                .setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getMember('user');

        await verifyRole(roleRequired.m_mute, interaction, async () => {
        
            try {
                const temp = await interaction.guild.channels.fetch()
                interaction.guild.channels.cache.forEach(channel => {
                    channel.permissionOverwrites.edit(user, {
                        SendMessages: true
                    });
                });
                return interaction.reply({ content: `L'utilisateur ${user.displayName} a été unmuté.`, ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors du unmute de l\'utilisateur :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors du unmute de l\'utilisateur.', ephemeral: true });
            }
        
        })
        
    },
};