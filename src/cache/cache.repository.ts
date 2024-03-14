import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/common/cache'
import { Cache } from 'cache-manager'

@Injectable()
export class cacheRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async Cacheset(key, value, options) {
    await this.cacheManager.set(key, value, options)
  }

  async Cacheget(key) {
    return await this.cacheManager.get(key)
  }

  async Cachedel(key) {
    await this.cacheManager.del(key)
  }
}
