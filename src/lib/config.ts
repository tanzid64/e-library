const config = {
  env: {
    apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    databaseUrl: process.env.DATABASE_URL!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    },
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
      qstashUrl: process.env.UPSTASH_QSTASH_URL!,
      qstashToken: process.env.UPSTASH_QSTASH_TOKEN!,
    },
  },
};

export default config;
