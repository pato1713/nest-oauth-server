import { Inject, Injectable } from '@nestjs/common';
import { Cacheable } from 'cacheable';

@Injectable()
export class CacheService {
  constructor(@Inject('CACHE_INSTANCE') private readonly cache: Cacheable) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cache.get(key);
  }

  async set<T>(key: string, value: T, ttl: number = 60000): Promise<boolean> {
    console.log(`Setting key: ${key}, value: ${value}, ttl: ${ttl}`);

    try {
      const result = await this.cache.set(key, value, ttl);
      console.log(`Successfully set key: ${key}`);
      return result;
    } catch (error) {
      console.error(`Error setting key: ${key}`, error);
      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    return await this.cache.delete(key);
  }
}
