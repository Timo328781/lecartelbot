const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Le texte a dire')
    .addStringOption(option =>
        option
            .setName('message')
            .setDescription('Fais dire ton texte au bot')
            .setRequired(true)  
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        
        const toSay = interaction.options.getString('message')

        await interaction.reply(`${toSay}`)
        
    }
}