const  { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, BaseGuildTextChannel  } = require('discord.js')
const fs = require('fs')
const { verifyRole } = require('../../utils.js')
const { roleRequired, sanction_channel } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Avertir un utilisateur")
    .addUserOption(option => option.setName("user").setDescription("Utilisateur ciblé .").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Raison de l'avertissement.").setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Aucune raison spécifiée';
        /**
         * @type {BaseGuildTextChannel}
         */
        const s_channel = await interaction.member.guild.channels.fetch(sanction_channel)

        const responseEmbed = new EmbedBuilder().setColor('DarkRed')

        let logEmbedDescription = [
            `- Modérateur: ${interaction.member}`,
            `- Membre ciblé: ${user.username}`,
            `- Channel: ${s_channel}`,
            `- Raison: ${reason}`,
        ]

        await verifyRole(roleRequired.m_warn, interaction, async () => {

            try {
                await s_channel.send(
                    { embeds: [responseEmbed.setDescription( logEmbedDescription.join('\n') )] }
                )
                await user.send(`Vous avez reçu un avertissement pour la raison suivante : ${reason}`);
                return interaction.reply({ content: `L'utilisateur ${user.displayName} a été averti.`, ephemeral: true });
            } catch (error) {
                console.log(error)
                return interaction.reply({ content: 'Une erreur s\'est produite lors de l\'envoi de l\'avertissement.', ephemeral: true });
            }

        })

    }

}
