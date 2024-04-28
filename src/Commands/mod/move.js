const { SlashCommandBuilder, VoiceChannel } = require('discord.js');
const { roleRequired } = require('../../../config.json');
const { verifyRole } = require('../../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Déplacer un utilisateur vers un autre canal vocal')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur à déplacer')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Canal vocal de destination')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const channel = interaction.options.getChannel('channel');

        await verifyRole(roleRequired.m_move, interaction, async () => {
            if (!(channel instanceof VoiceChannel)) {
                return interaction.reply({ content: 'Le canal de destination doit être un canal vocal.', ephemeral: true });
            }
    
            try {
                await user.voice.setChannel(channel);
                return interaction.reply({ content: `L'utilisateur ${user.displayName} a été déplacé vers ${channel.name}.`, ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors du déplacement de l\'utilisateur :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors du déplacement de l\'utilisateur.', ephemeral: true });
            }
        })

    },
};