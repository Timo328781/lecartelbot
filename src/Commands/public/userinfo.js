const  { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder,  } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Permet d'obtenir des informtions sur une personne")
    .setDMPermission(false)
    .addUserOption(option => option.setName("user").setDescription("Sélectionner un utilisateur").setRequired(false)),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction
        const user = options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id)
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: tag, iconURL: icon })
        .addFields(
            {name: "Utilisateur", value: `${user}`, inline: false },
            {name: 'Roles', value: `${member.roles.cache.map(r => r).join(``)}`},
            { name: "A rejoins le serveur", value: `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`, inline: true},
            { name: "A rejoins discord", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true}
        )
        .setFooter({ text: `ID: ${user.id}` })
        .setTimestamp()

        await interaction.reply({ embeds: [embed]})
    }
}
