export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    type: (process.env.TYPE_DB as any) || 'postgres',
    host: process.env.HOST_DB || 'host.docker.internal',
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    port: parseInt(process.env.PORT_DB, 10) || 5432,
  },
  grpc: {
    host: process.env.GRPC_HOST || 'localhost',
    port: parseInt(process.env.GRPC_PORT, 10) || 4002,
  },
});
