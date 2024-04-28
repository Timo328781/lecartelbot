const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                const nocommand = new EmbedBuilder().setColor("Red")
                interaction.reply({ embeds: [nocommand.setDescription("Cette commande n'existe pas")]})
            }

            command.execute(interaction, client)

        } else {
            return
        }
    }

}