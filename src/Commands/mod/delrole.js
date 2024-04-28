const { SlashCommandBuilder } = require('@discordjs/builders');
const { roleRequired } = require('../../../config.json');
const { verifyRole } = require('../../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delrole')
        .setDescription('Supprime un rôle à un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur auquel supprimer le rôle')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Rôle à supprimer')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');

        await verifyRole(roleRequired.m_role, interaction, async () => {
            
            try {
                await user.roles.remove(role);
                return interaction.reply({ content: `Le rôle ${role.name} a été supprimé de ${user.displayName}.`, ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la suppression du rôle :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors de la suppression du rôle.', ephemeral: true });
            }

        })
        
    },
};