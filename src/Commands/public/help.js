const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Commande d'aide du bot"),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        
        const menu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('helpMenu')
                .setPlaceholder('Sélectionner une catégorie')
                .addOptions([
                    {
                        label: "Commandes utilisables par tous",
                        description: "Afficher les commandes utilisables par tous",
                        value: "public"
                    },
                    {
                        label: "Commandes de modération",
                        description: "Afficher les commandes de modération",
                        value: "mod"
                    },
                    {
                        label: "Commandes outils",
                        description: "Afficher les commandes outils et de debug",
                        value: "tools"
                    }
                ])
        )

        const embedPublic = new EmbedBuilder()
            .setTitle("Commandes utilisables par tous")
            .setDescription("Voici la liste des commandes utilisables par tous:")
        const embedMod = new EmbedBuilder()
            .setTitle("Commandes de modération")
            .setDescription("Voici la liste des commandes de modération:")
        const embedTool = new EmbedBuilder()
            .setTitle("Commandes outils ou de debug")
            .setDescription("Voici la liste des commandes outils ou de debug:")

        await interaction.reply({ 
            embeds: [new EmbedBuilder().setColor('Purple').setDescription("Veuillez sélectionner une catégorie")],
            components: [menu],

        });

        const filter = (i) => i.customId === 'helpMenu' && i.user.id === interaction.user.id;

        const channel = await interaction.member.guild.channels.fetch(interaction.channelId)
        
        const collector = channel.createMessageComponentCollector({
            filter,
            time: 10000
        });

        collector.on("collect", async (i) => {
            const selectedValue = i.values[0];
            const embed = new EmbedBuilder().setTitle(`Commandes ${selectedValue}`)
            const commandFiles = readdirSync(join(__dirname, "..", selectedValue)).filter((file) => file.endsWith('.js'))
        
            for (const file of commandFiles) {
                const command = require(`../${selectedValue}/${file}`)
                embed.addFields({name: `${command.data.name}`, value: `${command.data.description}`})
            }
        
            await i.reply({ embeds: [embed] })

        })

    }
}
