export interface Config {
    token: string,
    prefix: string,
    dbEconomy: {
        host:string,
        database:string,
        user:string,
        password:string
    },
    dbAll: {
        host: string,
        database: string,
        user: string,
        password: string
    },
    id: {
        owner : number,
        guestRole: number
    }
}
