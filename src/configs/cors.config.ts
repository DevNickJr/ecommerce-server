export const whitelist = ['http://localhost:5173']

export const corsOptions =  {
    origin: function originFn (origin: string | undefined, callback: (a: any, b?: boolean) => void) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


