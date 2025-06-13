const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "help",
        description: "Zeigt alle verfügbaren Befehle an"
    },
    slashData: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Zeigt alle verfügbaren Befehle an")
        .addStringOption(option =>
            option.setName("command")
                .setDescription("Spezifischer Command für detaillierte Hilfe")
                .setRequired(false)),
    async execute(message, args) {
        const embed = createHelpEmbed();
        message.reply({ embeds: [embed] });
    },
    async executeSlash(interaction) {
        const commandName = interaction.options.getString("command");
        
        if (commandName) {
            // Detaillierte Hilfe für spezifischen Command
            const embed = createDetailedHelpEmbed(commandName);
            await interaction.reply({ embeds: [embed] });
        } else {
            // Allgemeine Hilfe
            const embed = createHelpEmbed();
            await interaction.reply({ embeds: [embed] });
        }
    }
};

function createHelpEmbed() {
    return new EmbedBuilder()
        .setTitle("🤖 Bot-Befehle")
        .setDescription("Hier sind alle verfügbaren Befehle mit dem `!` Präfix oder als Slash Commands:")
        .setColor(0x0099ff)
        .addFields(
            {
                name: "🎫 Ticket-System",
                value: "`!ticket setup <kategorie-id>` oder `/ticket setup`\n`!ticket panel` oder `/ticket panel`\n`!ticket close [grund]` oder `/ticket close`\n`!ticket add <@user>` oder `/ticket add`\n`!ticket remove <@user>` oder `/ticket remove`",
                inline: false
            },
            {
                name: "🎉 Giveaway-System",
                value: "`!giveaway create <zeit> <gewinner> <preis>` oder `/giveaway create`\n`!giveaway end <id>` oder `/giveaway end`\n`!giveaway reroll <id>` oder `/giveaway reroll`\n`!giveaway list` oder `/giveaway list`\n`!giveaway delete <id>` oder `/giveaway delete`",
                inline: false
            },
            {
                name: "📈 Leveling-System",
                value: "`!rank [@user]` oder `/rank [user]`\n`!leaderboard [limit]` oder `/leaderboard [limit]`\n`!level check [@user]` oder `/level check [user]`\n`!level set <@user> <level>` oder `/level set`",
                inline: false
            },
            {
                name: "⚙️ Moderation",
                value: "`!kick <@user> [grund]` oder `/kick`\n`!ban <@user> [grund]` oder `/ban`\n`!unban <user-id>` oder `/unban`\n`!warn <@user> <grund>` oder `/warn`\n`!warnings <@user>` oder `/warnings`\n`!mute <@user> [grund]` oder `/mute`\n`!unmute <@user> [grund]` oder `/unmute`\n`!timeout <@user> <dauer> [grund]` oder `/timeout`\n`!rtimeout <@user> [grund]` oder `/rtimeout`\n`!lock [#channel] [grund]` oder `/lock`\n`!unlock [#channel] [grund]` oder `/unlock`\n`!purge <anzahl> [@user]` oder `/purge`",
                inline: false
            },
            {
                name: "📊 Statistiken",
                value: "`!stats [user]` oder `/stats [user]`\n`!serverinfo` oder `/serverinfo`\n`!botinfo` oder `/botinfo`",
                inline: false
            },
            {
                name: "🔧 Konfiguration",
                value: "`!config view` oder `/config view`\n`!config set <option> <value>` oder `/config set`\n`!prefix <neuer-prefix>` oder `/prefix`",
                inline: false
            },
            {
                name: "💡 Utility",
                value: "`!avatar [@user]` oder `/avatar [user]`\n`!userinfo [@user]` oder `/userinfo [user]`",
                inline: false
            }
        )
        .setFooter({ text: "Verwende !help <command> oder /help command:<command> für detaillierte Informationen" })
        .setTimestamp();
}

function createDetailedHelpEmbed(commandName) {
    const commandHelp = {
        "ticket": {
            title: "🎫 Ticket-System",
            description: "Vollständiges Ticket-Management-System",
            fields: [
                { name: "Setup", value: "`!ticket setup <kategorie-id>` - Richtet das Ticket-System ein" },
                { name: "Panel", value: "`!ticket panel` - Erstellt ein interaktives Ticket-Panel" },
                { name: "Schließen", value: "`!ticket close [grund]` - Schließt das aktuelle Ticket" },
                { name: "Benutzer hinzufügen", value: "`!ticket add <@user>` - Fügt einen Benutzer zum Ticket hinzu" },
                { name: "Benutzer entfernen", value: "`!ticket remove <@user>` - Entfernt einen Benutzer vom Ticket" }
            ]
        },
        "giveaway": {
            title: "🎉 Giveaway-System",
            description: "Erweiterte Giveaway-Verwaltung",
            fields: [
                { name: "Erstellen", value: "`!giveaway create <zeit> <gewinner> <preis>` - Erstellt ein neues Giveaway" },
                { name: "Beenden", value: "`!giveaway end <id>` - Beendet ein Giveaway manuell" },
                { name: "Neu auslosen", value: "`!giveaway reroll <id>` - Lost neue Gewinner aus" },
                { name: "Auflisten", value: "`!giveaway list` - Zeigt alle Giveaways an" },
                { name: "Löschen", value: "`!giveaway delete <id>` - Löscht ein Giveaway" }
            ]
        },
        "rank": {
            title: "📈 Leveling-System (Rank)",
            description: "Zeigt den aktuellen Level- und XP-Status eines Benutzers an.",
            fields: [
                { name: "Nutzung", value: "`!rank [@user]` oder `/rank [user]`", inline: false }
            ]
        },
        "leaderboard": {
            title: "📈 Leveling-System (Leaderboard)",
            description: "Zeigt die Top-Benutzer auf dem Server basierend auf XP an.",
            fields: [
                { name: "Nutzung", value: "`!leaderboard [limit]` oder `/leaderboard [limit]`", inline: false }
            ]
        },
        "level": {
            title: "📈 Leveling-System (Level Management)",
            description: "Verwaltet das Level eines Benutzers (Admin-only).",
            fields: [
                { name: "Level setzen", value: "`!level set <@user> <level>` oder `/level set <user> <level>`", inline: false },
                { name: "Level prüfen", value: "`!level check [@user]` oder `/level check [user]`", inline: false }
            ]
        },
        "kick": {
            title: "⚙️ Moderation (Kick)",
            description: "Entfernt einen Benutzer vom Server.",
            fields: [
                { name: "Nutzung", value: "`!kick <@user> [grund]` oder `/kick user:<user> reason:[grund]`", inline: false }
            ]
        },
        "ban": {
            title: "⚙️ Moderation (Ban)",
            description: "Bannt einen Benutzer vom Server.",
            fields: [
                { name: "Nutzung", value: "`!ban <@user> [grund]` oder `/ban user:<user> reason:[grund]`", inline: false }
            ]
        },
        "unban": {
            title: "⚙️ Moderation (Unban)",
            description: "Entbannt einen Benutzer vom Server.",
            fields: [
                { name: "Nutzung", value: "`!unban <user-id>` oder `/unban user_id:<user-id>`", inline: false }
            ]
        },
        "warn": {
            title: "⚙️ Moderation (Warn)",
            description: "Verwarnt einen Benutzer.",
            fields: [
                { name: "Nutzung", value: "`!warn <@user> <grund>` oder `/warn user:<user> reason:<grund>`", inline: false }
            ]
        },
        "warnings": {
            title: "⚙️ Moderation (Warnings)",
            description: "Zeigt alle Verwarnungen eines Benutzers an.",
            fields: [
                { name: "Nutzung", value: "`!warnings <@user>` oder `/warnings user:<user>`", inline: false }
            ]
        },
        "mute": {
            title: "⚙️ Moderation (Mute)",
            description: "Mutet einen Benutzer (benötigt eine Rolle namens 'Muted').",
            fields: [
                { name: "Nutzung", value: "`!mute <@user> [grund]` oder `/mute user:<user> reason:[grund]`", inline: false }
            ]
        },
        "unmute": {
            title: "⚙️ Moderation (Unmute)",
            description: "Entmutet einen Benutzer.",
            fields: [
                { name: "Nutzung", value: "`!unmute <@user> [grund]` oder `/unmute user:<user> reason:[grund]`", inline: false }
            ]
        },
        "timeout": {
            title: "⚙️ Moderation (Timeout)",
            description: "Setzt einen Benutzer in Timeout.",
            fields: [
                { name: "Nutzung", value: "`!timeout <@user> <dauer> [grund]` oder `/timeout user:<user> duration:<dauer> reason:[grund]`", inline: false }
            ]
        },
        "rtimeout": {
            title: "⚙️ Moderation (Remove Timeout)",
            description: "Entfernt den Timeout von einem Benutzer.",
            fields: [
                { name: "Nutzung", value: "`!rtimeout <@user> [grund]` oder `/rtimeout user:<user> reason:[grund]`", inline: false }
            ]
        },
        "lock": {
            title: "⚙️ Moderation (Lock Channel)",
            description: "Sperrt einen Kanal für @everyone.",
            fields: [
                { name: "Nutzung", value: "`!lock [#channel] [grund]` oder `/lock channel:[#channel] reason:[grund]`", inline: false }
            ]
        },
        "unlock": {
            title: "⚙️ Moderation (Unlock Channel)",
            description: "Entsperrt einen Kanal für @everyone.",
            fields: [
                { name: "Nutzung", value: "`!unlock [#channel] [grund]` oder `/unlock channel:[#channel] reason:[grund]`", inline: false }
            ]
        },
        "purge": {
            title: "⚙️ Moderation (Purge Messages)",
            description: "Löscht eine bestimmte Anzahl von Nachrichten in einem Kanal.",
            fields: [
                { name: "Nutzung", value: "`!purge <anzahl> [@user]` oder `/purge amount:<anzahl> user:[@user]`", inline: false }
            ]
        },
        "avatar": {
            title: "💡 Utility (Avatar)",
            description: "Zeigt das Avatar eines Benutzers an.",
            fields: [
                { name: "Nutzung", value: "`!avatar [@user]` oder `/avatar [user]`", inline: false }
            ]
        },
        "userinfo": {
            title: "💡 Utility (Userinfo)",
            description: "Zeigt detaillierte Informationen über einen Benutzer an.",
            fields: [
                { name: "Nutzung", value: "`!userinfo [@user]` oder `/userinfo [user]`", inline: false }
            ]
        },
        "stats": {
            title: "📊 Statistiken (Stats)",
            description: "Zeigt detaillierte Statistiken für einen Benutzer oder den Bot an.",
            fields: [
                { name: "Nutzung", value: "`!stats [user]` oder `/stats [user]`", inline: false }
            ]
        },
        "serverinfo": {
            title: "📊 Statistiken (Serverinfo)",
            description: "Zeigt detaillierte Informationen über den Server an.",
            fields: [
                { name: "Nutzung", value: "`!serverinfo` oder `/serverinfo`", inline: false }
            ]
        },
        "botinfo": {
            title: "📊 Statistiken (Botinfo)",
            description: "Zeigt detaillierte Informationen über den Bot an.",
            fields: [
                { name: "Nutzung", value: "`!botinfo` oder `/botinfo`", inline: false }
            ]
        },
        "config": {
            title: "🔧 Konfiguration (Config)",
            description: "Verwaltet die Konfiguration des Bots für den Server.",
            fields: [
                { name: "Konfiguration anzeigen", value: "`!config view` oder `/config view`", inline: false },
                { name: "Konfiguration setzen", value: "`!config set <option> <value>` oder `/config set option:<option> value:<value>`", inline: false }
            ]
        },
        "prefix": {
            title: "🔧 Konfiguration (Prefix)",
            description: "Ändert das Prefix für Prefix-Commands.",
            fields: [
                { name: "Nutzung", value: "`!prefix <neuer-prefix>` oder `/prefix new_prefix:<neuer-prefix>`", inline: false }
            ]
        }
    };
    
    const help = commandHelp[commandName];
    if (!help) {
        return new EmbedBuilder()
            .setTitle("❌ Command nicht gefunden")
            .setDescription(`Der Command \`${commandName}\` wurde nicht gefunden.`)

