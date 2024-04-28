const  { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder  } = require('discord.js')
const { verifyRole } = require('../../utils.js')
const { roleRequired } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("add_role")
    .setDescription("Ajouter un role à un utilisateur.")
    .addUserOption(option => option.setName("user").setDescription("Utilisateur ciblé .").setRequired(true))
    .addRoleOption(option => option.setName("role").setDescription("Role a ajouter a l'utilisateur.").setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        
        const member = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');

        await verifyRole(roleRequired.m_role, interaction, async () => {

            try {
                await member.roles.add(role);
                await interaction.reply({ content: `Le rôle ${role.name} a été ajouté à ${member.user.tag}.`, ephemeral: true});
            } catch (error) {
                await interaction.reply({ content: `Echec de l'ajout du role.`, ephemeral: true});
            }
        
        })

    }
}