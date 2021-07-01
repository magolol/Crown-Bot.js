import { Client, Collection, User } from 'discord.js';
import path from 'path';
import { readdirSync, appendFile } from 'fs';
import { access, mkdir} from 'fs/promises';
import { Command, Events, Config, TempConfig } from '../Interfaces';
import { createConnection } from "mysql";
import ConfigJson from '../../data/config.json';

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Events> = new Collection();
    public cooldowns = {};
    public tempConfig: TempConfig = {
        summaryPosition: []
    }
    public config: Config = ConfigJson;
    public aliases: Collection<string, Command> = new Collection();

    public async init(): Promise<void>{
        this.login(this.config.token)
            .catch(err => console.error(err));

        const CommandPath = path.join(__dirname, "..", "Commands");
        readdirSync(CommandPath).forEach((dir) => {
            const commands = readdirSync(`${CommandPath}/${dir}`)
            .filter((file) => (file.endsWith('.ts') && !file.endsWith('.d.ts')))
            
            for (const file of commands) {
                const { command } = require(`${CommandPath}/${dir}/${file}`);
                console.log(command);
                this.commands.set(command.name, command);

                if (command.aliases.length !== 0) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });

        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            console.log(event);
            this.on(event.name, event.run.bind(null, this))
        });

    }

    private async FileExists(fileName: string): Promise<boolean> {
        try {
            await access(fileName);
            return true;
        } catch {
            return false;
        }
    }

    private CreateLogDir(): void {
        const d = new Date();
        const LogDir = path.join(__dirname, '..', '..', 'logs', `${d.getFullYear()}`, `${d.getMonth()}`)
        this.FileExists(LogDir)
            .then((result) => {
                if (!result) {
                    mkdir(LogDir, {recursive: true})
                }
            })
    }

    public async UpdateLog(Log: string): Promise<void> {
        const d = new Date();
        const logFile = path.join(__dirname, '..', '..', 'logs', `${d.getFullYear()}`, `${d.getMonth()}`);
        this.FileExists(`${logFile}/${d.getDate()}.txt`)
            .then((result) => {
                if (!result) {
                    this.CreateLogDir();
                    appendFile(`${logFile}/${d.getDate()}.txt`, '', () => console.log("created a new log for the day"));
                }
                setTimeout(() => {
                    appendFile(`${logFile}/${d.getDate()}.txt`, `${Log}\n`, () => {});
                }, 600)
            })
    }
}

export default ExtendedClient;


