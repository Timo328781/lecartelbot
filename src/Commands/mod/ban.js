const  { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder  } = require('discord.js')
const { verifyRole } = require('../../utils.js')
const { roleRequired } = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannir un utilisateur du serveur.")
    .addUserOption(option => option.setName("user").setDescription("Utilisateur à bannir").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("Raison du bannissement").setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, guild } = interaction
        const user = options.getUser('user');
        const raison = options.getString('raison') || "pas de raison fournie"
        const member = await interaction.guild.members.fetch(user.id)

        await verifyRole(roleRequired.m_ban, interaction, async () => {

            const errEmbed = new EmbedBuilder().setColor("Red").setDescription(`Vous ne pouvez pas executer cette action sur ce membre ${user.username}`)

            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({ embeds: [errEmbed], ephemeral: true})
            }

            try {
                
                await member.send({ embeds: [new EmbedBuilder().setColor("Red").setDescription(`Vous avez été banni de ${guild.name} pour ${raison}`)] })
                await member.ban({ reason: raison })
    
                const embed = new EmbedBuilder().setAuthor({name: `${user.name}#${user.discriminator}`}).setDescription(`A été banni du serveur par ${interaction.user.username} pour ${raison}`).setColor('Red')
                await interaction.reply({ embeds: [embed] })

            } catch (err) {
                console.log(err)
            }
            
           

        })        

    }
}