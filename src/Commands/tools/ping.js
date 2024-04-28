const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle("Pong !")
        .addFields({ name: "Latence", value: `${client.ws.ping}ms`})

        interaction.reply({ embeds: [embed]})
    }
}