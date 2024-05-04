

//TODO Esta clase es usada para configurar automaticamente las variables de entorno si no son enviadas por el programador 

export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001,
})