const { SlashCommandBuilder } = require('@discordjs/builders');
const { roleRequired } = require('../../../config.json');
const { verifyRole } = require('../../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Ferme le ticket en cours'),
    async execute(interaction) {
        
        const channel = await interaction.member.guild.channels.fetch(interaction.channelId)

        await verifyRole(roleRequired.m_close, interaction, async () => {
            if (!channel.name.startsWith('ticket-')) {
                return interaction.reply({ content: 'Ce n\'est pas un canal de ticket.', ephemeral: true });
            }
    
            try {
                await channel.delete();
                return interaction.reply({ content: 'Le ticket a été fermé.', ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la fermeture du ticket :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors de la fermeture du ticket.', ephemeral: true });
            }
        })
    },
};
