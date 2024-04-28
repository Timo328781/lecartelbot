const  { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder  } = require('discord.js')
const { verifyRole } = require('../../utils.js')
const { roleRequired } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("new_embed")
    .setDescription("Créer un nouvel embed.")
    .addStringOption(option => option.setName("description").setDescription("Description de l'embed.").setRequired(true))
    .addStringOption(option => option.setName("color").setDescription("Couleur de l'embed au fromat hexadécimale: #000000 -> noir, #ffffff -> blanc...").setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        
        const description = interaction.options.getString('description');
        const color = interaction.options.getString('color');
        const channel = await interaction.member.guild.channels.fetch(interaction.channelId)

        await verifyRole(roleRequired.m_createEmbed, interaction, async () => {
        
            try {
                const embed = new EmbedBuilder().setDescription(description).setColor(color)
                await interaction.reply({ embeds: [embed] })
            } catch {
                await interaction.reply({ embeds: [ new EmbedBuilder().setDescription("Erreur de création de l'embed").setColor('Red') ]})
            }
        
        })
    }   
}       