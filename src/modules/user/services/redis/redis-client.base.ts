import { redisConfig } from '@src/configs/config'
import { injectable } from 'inversify'
import { RedisClientType, createClient } from 'redis'

@injectable()
export abstract class AbstractRedisClient {
  protected client!: RedisClientType

  constructor() {
    const { port, host } = redisConfig
    this.client = createClient()
    this.client.on('connect', () => {
      console.info(`[Redis]: Connected to redis server at ${host}:${port}`)
    })
  }

  public async connect(): Promise<any> {
    return await this.client.connect()
  }

  public async count(key: string): Promise<number> {
    const allKeys = await this.getAllKeys(key)
    return allKeys.length
  }

  public async exists(key: string): Promise<boolean> {
    const count = await this.count(key)
    return count > 0
  }

  public async getOne<T>(key: string): Promise<T | null> {
    return (await this.client.get(key)) as T
  }

  public async getAllKeys(wildcard: string): Promise<string[]> {
    return await this.client.keys(wildcard)
  }

  public async getAllKeyValue(wildcard: string): Promise<{ key: string; value: string }[]> {
    const results = await this.client.keys(wildcard)
    return await Promise.all(
      results.map(async (key: string) => {
        const value = (await this.getOne(key)) as string
        return { key, value }
      })
    )
  }

  public async set(key: string, value: any): Promise<any> {
    return this.client.set(key, value)
  }

  public async deleteOne(key: string): Promise<number> {
    return this.client.del(key)
  }

  public async testConnection(): Promise<any> {
    await this.client.set('test', 'connected')
    return true
  }
}
