const  { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder  } = require('discord.js')
const { verifyRole } = require('../../utils.js')
const { roleRequired } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick un utilisateur du serveur.")
    .addUserOption(option => option.setName("user").setDescription("Utilisateur à expulser").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("Raison du kick").setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, guild } = interaction

        const user = options.getUser('user');
        const raison = options.getString('raison') || "pas de raison fournie"

        const member = await interaction.guild.members.fetch(user.id)

        await verifyRole(roleRequired.m_kick, interaction, async () => {

            const errEmbed = new EmbedBuilder().setColor("Red").setDescription(`Vous ne pouvez pas executer cette action sur ce membre ${user.username}`)

            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({ embeds: [errEmbed], ephemeral: true})
            }

            if (!member.kickable) {
                return interaction.reply({embeds: [errEmbed], ephemeral: true})
            }

            try {
                member.send({ embeds: [new EmbedBuilder().setDescription(`Vous avez été kick de ${guild.name} pour ${raison}`).setColor("Red")]})
            } catch {
                console.log('err kick message')
            }
            
            await member.kick({ reason: raison })

            const embed = new EmbedBuilder().setAuthor({name: `${user.username}#${user.discriminator}`}).setDescription(`A été kick du serveur par ${interaction.user.username} pour ${raison}`).setColor('Red')

            await interaction.reply({ embeds: [embed] })

        })

        

    }
}