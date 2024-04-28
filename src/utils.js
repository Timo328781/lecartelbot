const  { ChatInputCommandInteraction, GuildMember } = require('discord.js')

/**
 * 
 * @param {GuildMember} member 
 * @param {string[]} roleId 
 * @
 */
async function hasRole(member, roleId) {
    const rolesCollection = member.roles.cache
    for (const role of roleId) {
        if (rolesCollection.has(role)) return true
    }
    return false
}

/**
 * 
 * @param {string[]} allowedRoleId 
 * @param {ChatInputCommandInteraction} interaction 
 * @param {() => Promise} callback 
 */
const verifyRole = async (allowedRoleId, interaction, callback) => {

    const member = interaction.member
    const guild = interaction.member.guild
    const temp = await guild.roles.fetch()

    if (!await hasRole(member, allowedRoleId)) {
        await interaction.reply({ content: "Vous n'avez pas la permission d'utiliser cette commande.", ephemeral: true});
        return;
    } else {
        await callback()
    }

}

module.exports = {verifyRole}
