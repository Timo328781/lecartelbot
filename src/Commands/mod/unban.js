const  { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder  } = require('discord.js')
const { verifyRole } = require('../../utils.js')
const { roleRequired } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Débannir un utilisateur du serveur.")
    .addStringOption(option => option.setName("username").setDescription("Pseudo de l'utilisateur à débannir").setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const username = interaction.options.getString('username');
        const bans = await interaction.guild.bans.fetch();
        const bannedUser = bans.find(ban_user => ban_user.user.username === username);

        if (!bannedUser) {
            return interaction.reply({ content: `L'utilisateur ${username} n'est pas banni.`, ephemeral: true });
        }
        
        await verifyRole(roleRequired.m_ban, interaction, async () => {

            try {
                await interaction.guild.bans.remove(bannedUser.user);
                return interaction.reply({ content: `L'utilisateur ${username} a été débanni avec succès.`, ephemeral: true });
            } catch (error) {
                console.error('Une erreur s\'est produite lors du déban de l\'utilisateur :', error);
                return interaction.reply({ content: 'Une erreur s\'est produite lors du déban de l\'utilisateur.', ephemeral: true });
            }

        })        

    }
}