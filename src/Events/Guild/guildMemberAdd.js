const { GuildMember, Client, EmbedBuilder } = require('discord.js')
const { join_channel, rules_channel, general_channel } = require('../../../config.json')


module.exports = {
    name: "guildMemberAdd",
    once: false,
    /**
     * @param {GuildMember} member 
     * @param {Client} client
     */
    execute(member, client) {
        
        const channel = client.channels.cache.get(join_channel)
        const r_channel = client.channels.cache.get(rules_channel)
        const discu_channel = client.channels.cache.get(general_channel)

        const embed = new EmbedBuilder()
                        .setTitle(`Bienvenue sur le serveur, ${member.user.username}!`)
                        .setDescription(`Nous sommes ravis de te recevoir !`)
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
                        .setColor('Random')
                        .addFields(
                            {name: 'Règlement', value: `<#${r_channel.id}>`},
                            {name: 'Discussion', value: `<#${discu_channel.id}>`},
                        )

        if (channel) {
            channel.send({ embeds: [embed] });
        } else {
            console.log('Erreur lié a l\'event de join guildMemberAdd')
        }

    }

}
