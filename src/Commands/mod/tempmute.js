const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const ms = require('ms');
const { roleRequired } = require('../../../config.json');
const { verifyRole } = require('../../utils');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempmute')
        .setDescription('Mute temporairement un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur à mute')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Durée du mute en MINUTES')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du mute')
                .setRequired(false)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'Aucune raison spécifiée';

        await verifyRole(roleRequired.m_temp_mute, interaction, async () => {
            
            if (user.user.bot) {
                return interaction.reply({ content: 'Vous ne pouvez pas mute un bot.', ephemeral: true });
            }
    
            try {
                const temp = await interaction.guild.channels.fetch()
                interaction.guild.channels.cache.forEach(channel => {
                    channel.permissionOverwrites.edit(user, {
                        SendMessages: false
                    });
                });
                setTimeout(() => {
                    interaction.guild.channels.cache.forEach(channel => {
                        channel.permissionOverwrites.edit(user, {
                            SendMessages: true
                        });
                    });
                }, duration * 60000);
                return interaction.reply({ content: `L'utilisateur ${user.displayName} a été mute pour ${duration}mn.`, ephemeral: true });
    
            } catch (error) {
                console.error('Une erreur s\'est produite lors du mute temporaire :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors du mute temporaire.', ephemeral: true });
            }

        })

    },
};