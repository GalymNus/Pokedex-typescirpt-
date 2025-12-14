
export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;
    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #reap() {
        const now = Date.now();
        this.#cache.forEach((cacheItem, key) => {
            if (now >= cacheItem.createdAt + this.#interval) {
                this.#cache.delete(key);
            }
        });
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    add<T>(key: string, val: T) {
        const item: CacheEntry<T> = {
            createdAt: new Date().getTime(),
            val: val
        };
        this.#cache.set(key, item);
    };

    get<T>(key: string): T | undefined {
        const item = this.#cache.get(key);
        if (item) {
            return item.val;
        }
        return undefined;
    }
}

type CacheEntry<T> = {
    createdAt: number,
    val: T,
}