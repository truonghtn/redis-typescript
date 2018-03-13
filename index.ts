import * as redis from 'redis';
import * as bb from 'bluebird';
import * as _ from 'lodash';

function Command(command, args, call_on_write?) {
    this.command = command;
    this.args = args;
    this.buffer_args = false;
    this.call_on_write = call_on_write;
}

export interface IRedisGeo {
    latitude: number;
    longitude: number;
    member: string;
}

export type RedisLengthUnit = 'm' | 'km' | 'mi' | 'ft';
export type RedisSortType = 'ASC' | 'DESC';
export type GeoRadiusOutp = IRedisGeo & { dist?: number, hash?: number };

export interface IConnRedis {
    auth(password: string): PromiseLike<any>;
    append(key: string, value: string): PromiseLike<any>;
    bitcount(key: string): PromiseLike<any>;
    bitcount(key: string, start: number, end: number): PromiseLike<any>;
    set(key: string, value: string): PromiseLike<any>;
    get(key: string): PromiseLike<any>;
    exists(key: string, value: string): PromiseLike<any>;
    get(...args: any[]): PromiseLike<any>;
    set(...args: any[]): PromiseLike<any>;
    setnx(...args: any[]): PromiseLike<any>;
    setex(...args: any[]): PromiseLike<any>;
    append(...args: any[]): PromiseLike<any>;
    strlen(...args: any[]): PromiseLike<any>;
    del(...args: any[]): PromiseLike<any>;
    exists(...args: any[]): PromiseLike<any>;
    setbit(...args: any[]): PromiseLike<any>;
    getbit(...args: any[]): PromiseLike<any>;
    setrange(...args: any[]): PromiseLike<any>;
    getrange(...args: any[]): PromiseLike<any>;
    substr(...args: any[]): PromiseLike<any>;
    incr(...args: any[]): PromiseLike<any>;
    decr(...args: any[]): PromiseLike<any>;
    mget(...args: any[]): PromiseLike<any>;
    lpush(...args: any[]): PromiseLike<any>;
    rpushx(...args: any[]): PromiseLike<any>;
    lpushx(...args: any[]): PromiseLike<any>;
    linsert(...args: any[]): PromiseLike<any>;
    rpop(...args: any[]): PromiseLike<any>;
    lpop(...args: any[]): PromiseLike<any>;
    brpop(...args: any[]): PromiseLike<any>;
    brpoplpush(...args: any[]): PromiseLike<any>;
    blpop(...args: any[]): PromiseLike<any>;
    llen(...args: any[]): PromiseLike<any>;
    lindex(...args: any[]): PromiseLike<any>;
    lset(...args: any[]): PromiseLike<any>;
    lrange(...args: any[]): PromiseLike<any>;
    ltrim(...args: any[]): PromiseLike<any>;
    lrem(...args: any[]): PromiseLike<any>;
    rpoplpush(...args: any[]): PromiseLike<any>;
    sadd(...args: any[]): PromiseLike<any>;
    srem(...args: any[]): PromiseLike<any>;
    smove(...args: any[]): PromiseLike<any>;
    sismember(...args: any[]): PromiseLike<any>;
    scard(...args: any[]): PromiseLike<any>;
    spop(...args: any[]): PromiseLike<any>;
    srandmember(...args: any[]): PromiseLike<any>;
    sinter(...args: any[]): PromiseLike<any>;
    sinterstore(...args: any[]): PromiseLike<any>;
    sunion(...args: any[]): PromiseLike<any>;
    sunionstore(...args: any[]): PromiseLike<any>;
    sdiff(...args: any[]): PromiseLike<any>;
    sdiffstore(...args: any[]): PromiseLike<any>;
    smembers(...args: any[]): PromiseLike<any>;
    zadd(...args: any[]): PromiseLike<any>;
    zincrby(...args: any[]): PromiseLike<any>;
    zrem(...args: any[]): PromiseLike<any>;
    zremrangebyscore(...args: any[]): PromiseLike<any>;
    zremrangebyrank(...args: any[]): PromiseLike<any>;
    zunionstore(...args: any[]): PromiseLike<any>;
    zinterstore(...args: any[]): PromiseLike<any>;
    zrange(...args: any[]): PromiseLike<any>;
    zrangebyscore(...args: any[]): PromiseLike<any>;
    zrevrangebyscore(...args: any[]): PromiseLike<any>;
    zcount(...args: any[]): PromiseLike<any>;
    zrevrange(...args: any[]): PromiseLike<any>;
    zcard(...args: any[]): PromiseLike<any>;
    zscore(...args: any[]): PromiseLike<any>;
    zrank(...args: any[]): PromiseLike<any>;
    zrevrank(...args: any[]): PromiseLike<any>;
    hset(...args: any[]): PromiseLike<any>;
    hsetnx(...args: any[]): PromiseLike<any>;
    hget(...args: any[]): PromiseLike<any>;
    hmset(...args: any[]): PromiseLike<any>;
    hmset(key: string, hash: any): PromiseLike<any>;
    hmget(...args: any[]): PromiseLike<any>;
    hincrby(...args: any[]): PromiseLike<any>;
    hdel(...args: any[]): PromiseLike<any>;
    hlen(...args: any[]): PromiseLike<any>;
    hkeys(...args: any[]): PromiseLike<any>;
    hvals(...args: any[]): PromiseLike<any>;
    hgetall(...args: any[]): PromiseLike<any>;
    hgetall(key: string): PromiseLike<any>;
    hexists(...args: any[]): PromiseLike<any>;
    incrby(...args: any[]): PromiseLike<any>;
    decrby(...args: any[]): PromiseLike<any>;
    getset(...args: any[]): PromiseLike<any>;
    mset(...args: any[]): PromiseLike<any>;
    msetnx(...args: any[]): PromiseLike<any>;
    randomkey(...args: any[]): PromiseLike<any>;
    select(...args: any[]): PromiseLike<any>;
    move(...args: any[]): PromiseLike<any>;
    rename(...args: any[]): PromiseLike<any>;
    renamenx(...args: any[]): PromiseLike<any>;
    expire(...args: any[]): PromiseLike<any>;
    expireat(...args: any[]): PromiseLike<any>;
    keys(...args: any[]): PromiseLike<any>;
    dbsize(...args: any[]): PromiseLike<any>;
    auth(...args: any[]): PromiseLike<any>;
    ping(...args: any[]): PromiseLike<any>;
    echo(...args: any[]): PromiseLike<any>;
    save(...args: any[]): PromiseLike<any>;
    bgsave(...args: any[]): PromiseLike<any>;
    bgrewriteaof(...args: any[]): PromiseLike<any>;
    shutdown(...args: any[]): PromiseLike<any>;
    lastsave(...args: any[]): PromiseLike<any>;
    type(...args: any[]): PromiseLike<any>;
    multi(...args: any[]): IConnRedisMulti;
    discard(...args: any[]): PromiseLike<any>;
    sync(...args: any[]): PromiseLike<any>;
    flushdb(...args: any[]): PromiseLike<any>;
    flushall(...args: any[]): PromiseLike<any>;
    sort(...args: any[]): PromiseLike<any>;
    info(...args: any[]): PromiseLike<any>;
    monitor(...args: any[]): PromiseLike<any>;
    ttl(...args: any[]): PromiseLike<any>;
    persist(...args: any[]): PromiseLike<any>;
    slaveof(...args: any[]): PromiseLike<any>;
    debug(...args: any[]): PromiseLike<any>;
    config(...args: any[]): PromiseLike<any>;
    subscribe(...args: any[]): PromiseLike<any>;
    unsubscribe(...args: any[]): PromiseLike<any>;
    psubscribe(...args: any[]): PromiseLike<any>;
    punsubscribe(...args: any[]): PromiseLike<any>;
    publish(...args: any[]): PromiseLike<any>;
    watch(...args: any[]): PromiseLike<any>;
    unwatch(...args: any[]): PromiseLike<any>;
    cluster(...args: any[]): PromiseLike<any>;
    restore(...args: any[]): PromiseLike<any>;
    migrate(...args: any[]): PromiseLike<any>;
    dump(...args: any[]): PromiseLike<any>;
    object(...args: any[]): PromiseLike<any>;
    client(...args: any[]): PromiseLike<any>;
    eval(...args: any[]): PromiseLike<any>;
    evalsha(...args: any[]): PromiseLike<any>;
    script(...args: any[]): PromiseLike<any>;
    script(key: string): PromiseLike<any>;
    quit(...args: any[]): PromiseLike<any>;
    sscan(...args: any[]): PromiseLike<any>;
    scan(...args: any[]): PromiseLike<any>;
    hscan(...args: any[]): PromiseLike<any>;
    zscan(...args: any[]): PromiseLike<any>;

    // support geo
    geoadd(key: string, args: IRedisGeo[]): Promise<number>;
    geohash(key: string, args: string[]): Promise<string[]>;
    geopos(key: string, args: string[]): Promise<IRedisGeo[]>;
    geodist(key: string, mem1: string, mem2: string, unit?: RedisLengthUnit): Promise<number>;
    georadius(key: string, longitude: number, latitude: number, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType): Promise<GeoRadiusOutp[]>;
    georadiusbymember(key: string, member: string, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType): Promise<GeoRadiusOutp[]>;

    // inject new command
    setif(key: string, newVal: string, oldVal: string): Promise<number>;
}

export interface IConnRedisMulti {
    exec(): Promise<any[]>;

    auth(password: string): IConnRedisMulti;
    append(key: string, value: string): IConnRedisMulti;
    set(key: string, value: string): IConnRedisMulti;
    get(key: string): IConnRedisMulti;
    exists(key: string, value: string): IConnRedisMulti;
    get(...args: any[]): IConnRedisMulti;
    set(...args: any[]): IConnRedisMulti;
    setnx(...args: any[]): IConnRedisMulti;
    setex(...args: any[]): IConnRedisMulti;
    append(...args: any[]): IConnRedisMulti;
    strlen(...args: any[]): IConnRedisMulti;
    del(...args: any[]): IConnRedisMulti;
    exists(...args: any[]): IConnRedisMulti;
    setbit(...args: any[]): IConnRedisMulti;
    getbit(...args: any[]): IConnRedisMulti;
    setrange(...args: any[]): IConnRedisMulti;
    getrange(...args: any[]): IConnRedisMulti;
    substr(...args: any[]): IConnRedisMulti;
    incr(...args: any[]): IConnRedisMulti;
    decr(...args: any[]): IConnRedisMulti;
    mget(...args: any[]): IConnRedisMulti;
    lpush(...args: any[]): IConnRedisMulti;
    rpushx(...args: any[]): IConnRedisMulti;
    lpushx(...args: any[]): IConnRedisMulti;
    linsert(...args: any[]): IConnRedisMulti;
    rpop(...args: any[]): IConnRedisMulti;
    lpop(...args: any[]): IConnRedisMulti;
    brpop(...args: any[]): IConnRedisMulti;
    brpoplpush(...args: any[]): IConnRedisMulti;
    blpop(...args: any[]): IConnRedisMulti;
    llen(...args: any[]): IConnRedisMulti;
    lindex(...args: any[]): IConnRedisMulti;
    lset(...args: any[]): IConnRedisMulti;
    lrange(...args: any[]): IConnRedisMulti;
    ltrim(...args: any[]): IConnRedisMulti;
    lrem(...args: any[]): IConnRedisMulti;
    rpoplpush(...args: any[]): IConnRedisMulti;
    sadd(...args: any[]): IConnRedisMulti;
    srem(...args: any[]): IConnRedisMulti;
    smove(...args: any[]): IConnRedisMulti;
    sismember(...args: any[]): IConnRedisMulti;
    scard(...args: any[]): IConnRedisMulti;
    spop(...args: any[]): IConnRedisMulti;
    srandmember(...args: any[]): IConnRedisMulti;
    sinter(...args: any[]): IConnRedisMulti;
    sinterstore(...args: any[]): IConnRedisMulti;
    sunion(...args: any[]): IConnRedisMulti;
    sunionstore(...args: any[]): IConnRedisMulti;
    sdiff(...args: any[]): IConnRedisMulti;
    sdiffstore(...args: any[]): IConnRedisMulti;
    smembers(...args: any[]): IConnRedisMulti;
    zadd(...args: any[]): IConnRedisMulti;
    zincrby(...args: any[]): IConnRedisMulti;
    zrem(...args: any[]): IConnRedisMulti;
    zremrangebyscore(...args: any[]): IConnRedisMulti;
    zremrangebyrank(...args: any[]): IConnRedisMulti;
    zunionstore(...args: any[]): IConnRedisMulti;
    zinterstore(...args: any[]): IConnRedisMulti;
    zrange(...args: any[]): IConnRedisMulti;
    zrangebyscore(...args: any[]): IConnRedisMulti;
    zrevrangebyscore(...args: any[]): IConnRedisMulti;
    zcount(...args: any[]): IConnRedisMulti;
    zrevrange(...args: any[]): IConnRedisMulti;
    zcard(...args: any[]): IConnRedisMulti;
    zscore(...args: any[]): IConnRedisMulti;
    zrank(...args: any[]): IConnRedisMulti;
    zrevrank(...args: any[]): IConnRedisMulti;
    hset(...args: any[]): IConnRedisMulti;
    hsetnx(...args: any[]): IConnRedisMulti;
    hget(...args: any[]): IConnRedisMulti;
    hmset(...args: any[]): IConnRedisMulti;
    hmset(key: string, hash: any): IConnRedisMulti;
    hmget(...args: any[]): IConnRedisMulti;
    hincrby(...args: any[]): IConnRedisMulti;
    hdel(...args: any[]): IConnRedisMulti;
    hlen(...args: any[]): IConnRedisMulti;
    hkeys(...args: any[]): IConnRedisMulti;
    hvals(...args: any[]): IConnRedisMulti;
    hgetall(...args: any[]): IConnRedisMulti;
    hgetall(key: string): IConnRedisMulti;
    hexists(...args: any[]): IConnRedisMulti;
    incrby(...args: any[]): IConnRedisMulti;
    decrby(...args: any[]): IConnRedisMulti;
    getset(...args: any[]): IConnRedisMulti;
    mset(...args: any[]): IConnRedisMulti;
    msetnx(...args: any[]): IConnRedisMulti;
    randomkey(...args: any[]): IConnRedisMulti;
    select(...args: any[]): IConnRedisMulti;
    move(...args: any[]): IConnRedisMulti;
    rename(...args: any[]): IConnRedisMulti;
    renamenx(...args: any[]): IConnRedisMulti;
    expire(...args: any[]): IConnRedisMulti;
    expireat(...args: any[]): IConnRedisMulti;
    keys(...args: any[]): IConnRedisMulti;
    dbsize(...args: any[]): IConnRedisMulti;
    auth(...args: any[]): IConnRedisMulti;
    ping(...args: any[]): IConnRedisMulti;
    echo(...args: any[]): IConnRedisMulti;
    save(...args: any[]): IConnRedisMulti;
    bgsave(...args: any[]): IConnRedisMulti;
    bgrewriteaof(...args: any[]): IConnRedisMulti;
    shutdown(...args: any[]): IConnRedisMulti;
    lastsave(...args: any[]): IConnRedisMulti;
    type(...args: any[]): IConnRedisMulti;
    multi(...args: any[]): IConnRedisMulti;
    discard(...args: any[]): IConnRedisMulti;
    sync(...args: any[]): IConnRedisMulti;
    flushdb(...args: any[]): IConnRedisMulti;
    flushall(...args: any[]): IConnRedisMulti;
    sort(...args: any[]): IConnRedisMulti;
    info(...args: any[]): IConnRedisMulti;
    monitor(...args: any[]): IConnRedisMulti;
    ttl(...args: any[]): IConnRedisMulti;
    persist(...args: any[]): IConnRedisMulti;
    slaveof(...args: any[]): IConnRedisMulti;
    debug(...args: any[]): IConnRedisMulti;
    config(...args: any[]): IConnRedisMulti;
    subscribe(...args: any[]): IConnRedisMulti;
    unsubscribe(...args: any[]): IConnRedisMulti;
    psubscribe(...args: any[]): IConnRedisMulti;
    punsubscribe(...args: any[]): IConnRedisMulti;
    publish(...args: any[]): IConnRedisMulti;
    watch(...args: any[]): IConnRedisMulti;
    unwatch(...args: any[]): IConnRedisMulti;
    cluster(...args: any[]): IConnRedisMulti;
    restore(...args: any[]): IConnRedisMulti;
    migrate(...args: any[]): IConnRedisMulti;
    dump(...args: any[]): IConnRedisMulti;
    object(...args: any[]): IConnRedisMulti;
    client(...args: any[]): IConnRedisMulti;
    eval(...args: any[]): IConnRedisMulti;
    evalsha(...args: any[]): IConnRedisMulti;
    quit(...args: any[]): IConnRedisMulti;
    scan(...args: any[]): IConnRedisMulti;
    hscan(...args: any[]): IConnRedisMulti;
    zscan(...args: any[]): IConnRedisMulti;

    // support geo
    geoadd(key: string, args: IRedisGeo[]): IConnRedisMulti;
    geohash(key: string, args: string[]): IConnRedisMulti;
    geopos(key: string, args: string[]): IConnRedisMulti;
    geodist(key: string, mem1: string, mem2: string, unit?: RedisLengthUnit): IConnRedisMulti;
    georadius(key: string, longitude: number, latitude: number, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType): IConnRedisMulti;
    georadiusbymember(key: string, member: string, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType): IConnRedisMulti;
}

class ConnRedis implements IConnRedis {
    redisClient: redis.RedisClient;

    constructor(client: redis.RedisClient) {
        this.redisClient = client;
        this.promisifyFuncs();
    }

    private promisifyFuncs() {
        this.auth = bb.promisify(this.redisClient.auth, { context: this.redisClient });
        this.append = bb.promisify(this.redisClient.append, { context: this.redisClient });
        this.bitcount = bb.promisify(this.redisClient.bitcount, { context: this.redisClient });
        this.set = bb.promisify(this.redisClient.set, { context: this.redisClient });
        this.get = bb.promisify(this.redisClient.get, { context: this.redisClient });
        this.exists = bb.promisify(this.redisClient.exists, { context: this.redisClient });
        this.get = bb.promisify(this.redisClient.get, { context: this.redisClient });
        this.set = bb.promisify(this.redisClient.set, { context: this.redisClient });
        this.setnx = bb.promisify(this.redisClient.setnx, { context: this.redisClient });
        this.setex = bb.promisify(this.redisClient.setex, { context: this.redisClient });
        this.append = bb.promisify(this.redisClient.append, { context: this.redisClient });
        this.strlen = bb.promisify(this.redisClient.strlen, { context: this.redisClient });
        this.del = bb.promisify(this.redisClient.del, { context: this.redisClient });
        this.exists = bb.promisify(this.redisClient.exists, { context: this.redisClient });
        this.setbit = bb.promisify(this.redisClient.setbit, { context: this.redisClient });
        this.getbit = bb.promisify(this.redisClient.getbit, { context: this.redisClient });
        this.setrange = bb.promisify(this.redisClient.setrange, { context: this.redisClient });
        this.getrange = bb.promisify(this.redisClient.getrange, { context: this.redisClient });
        this.substr = bb.promisify(this.redisClient.substr, { context: this.redisClient });
        this.incr = bb.promisify(this.redisClient.incr, { context: this.redisClient });
        this.decr = bb.promisify(this.redisClient.decr, { context: this.redisClient });
        this.mget = bb.promisify(this.redisClient.mget, { context: this.redisClient });
        this.lpush = bb.promisify(this.redisClient.lpush, { context: this.redisClient });
        this.rpushx = bb.promisify(this.redisClient.rpushx, { context: this.redisClient });
        this.lpushx = bb.promisify(this.redisClient.lpushx, { context: this.redisClient });
        this.linsert = bb.promisify(this.redisClient.linsert, { context: this.redisClient });
        this.rpop = bb.promisify(this.redisClient.rpop, { context: this.redisClient });
        this.lpop = bb.promisify(this.redisClient.lpop, { context: this.redisClient });
        this.brpop = bb.promisify(this.redisClient.brpop, { context: this.redisClient });
        this.brpoplpush = bb.promisify(this.redisClient.brpoplpush, { context: this.redisClient });
        this.blpop = bb.promisify(this.redisClient.blpop, { context: this.redisClient });
        this.llen = bb.promisify(this.redisClient.llen, { context: this.redisClient });
        this.lindex = bb.promisify(this.redisClient.lindex, { context: this.redisClient });
        this.lset = bb.promisify(this.redisClient.lset, { context: this.redisClient });
        this.lrange = bb.promisify(this.redisClient.lrange, { context: this.redisClient });
        this.ltrim = bb.promisify(this.redisClient.ltrim, { context: this.redisClient });
        this.lrem = bb.promisify(this.redisClient.lrem, { context: this.redisClient });
        this.rpoplpush = bb.promisify(this.redisClient.rpoplpush, { context: this.redisClient });
        this.sadd = bb.promisify(this.redisClient.sadd, { context: this.redisClient });
        this.srem = bb.promisify(this.redisClient.srem, { context: this.redisClient });
        this.smove = bb.promisify(this.redisClient.smove, { context: this.redisClient });
        this.sismember = bb.promisify(this.redisClient.sismember, { context: this.redisClient });
        this.scard = bb.promisify(this.redisClient.scard, { context: this.redisClient });
        this.spop = bb.promisify(this.redisClient.spop, { context: this.redisClient });
        this.srandmember = bb.promisify(this.redisClient.srandmember, { context: this.redisClient });
        this.sinter = bb.promisify(this.redisClient.sinter, { context: this.redisClient });
        this.sinterstore = bb.promisify(this.redisClient.sinterstore, { context: this.redisClient });
        this.sunion = bb.promisify(this.redisClient.sunion, { context: this.redisClient });
        this.sunionstore = bb.promisify(this.redisClient.sunionstore, { context: this.redisClient });
        this.sdiff = bb.promisify(this.redisClient.sdiff, { context: this.redisClient });
        this.sdiffstore = bb.promisify(this.redisClient.sdiffstore, { context: this.redisClient });
        this.smembers = bb.promisify(this.redisClient.smembers, { context: this.redisClient });
        this.zadd = bb.promisify(this.redisClient.zadd, { context: this.redisClient });
        this.zincrby = bb.promisify(this.redisClient.zincrby, { context: this.redisClient });
        this.zrem = bb.promisify(this.redisClient.zrem, { context: this.redisClient });
        this.zremrangebyscore = bb.promisify(this.redisClient.zremrangebyscore, { context: this.redisClient });
        this.zremrangebyrank = bb.promisify(this.redisClient.zremrangebyrank, { context: this.redisClient });
        this.zunionstore = bb.promisify(this.redisClient.zunionstore, { context: this.redisClient });
        this.zinterstore = bb.promisify(this.redisClient.zinterstore, { context: this.redisClient });
        this.zrange = bb.promisify(this.redisClient.zrange, { context: this.redisClient });
        this.zrangebyscore = bb.promisify(this.redisClient.zrangebyscore, { context: this.redisClient });
        this.zrevrangebyscore = bb.promisify(this.redisClient.zrevrangebyscore, { context: this.redisClient });
        this.zcount = bb.promisify(this.redisClient.zcount, { context: this.redisClient });
        this.zrevrange = bb.promisify(this.redisClient.zrevrange, { context: this.redisClient });
        this.zcard = bb.promisify(this.redisClient.zcard, { context: this.redisClient });
        this.zscore = bb.promisify(this.redisClient.zscore, { context: this.redisClient });
        this.zrank = bb.promisify(this.redisClient.zrank, { context: this.redisClient });
        this.zrevrank = bb.promisify(this.redisClient.zrevrank, { context: this.redisClient });
        this.hset = bb.promisify(this.redisClient.hset, { context: this.redisClient });
        this.hsetnx = bb.promisify(this.redisClient.hsetnx, { context: this.redisClient });
        this.hget = bb.promisify(this.redisClient.hget, { context: this.redisClient });
        this.hmset = bb.promisify(this.redisClient.hmset, { context: this.redisClient });
        this.hmset = bb.promisify(this.redisClient.hmset, { context: this.redisClient });
        this.hmget = bb.promisify(this.redisClient.hmget, { context: this.redisClient });
        this.hincrby = bb.promisify(this.redisClient.hincrby, { context: this.redisClient });
        this.hdel = bb.promisify(this.redisClient.hdel, { context: this.redisClient });
        this.hlen = bb.promisify(this.redisClient.hlen, { context: this.redisClient });
        this.hkeys = bb.promisify(this.redisClient.hkeys, { context: this.redisClient });
        this.hvals = bb.promisify(this.redisClient.hvals, { context: this.redisClient });
        this.hgetall = bb.promisify(this.redisClient.hgetall, { context: this.redisClient });
        this.hgetall = bb.promisify(this.redisClient.hgetall, { context: this.redisClient });
        this.hexists = bb.promisify(this.redisClient.hexists, { context: this.redisClient });
        this.incrby = bb.promisify(this.redisClient.incrby, { context: this.redisClient });
        this.decrby = bb.promisify(this.redisClient.decrby, { context: this.redisClient });
        this.getset = bb.promisify(this.redisClient.getset, { context: this.redisClient });
        this.mset = bb.promisify(this.redisClient.mset, { context: this.redisClient });
        this.msetnx = bb.promisify(this.redisClient.msetnx, { context: this.redisClient });
        this.randomkey = bb.promisify(this.redisClient.randomkey, { context: this.redisClient });
        this.select = bb.promisify(this.redisClient.select, { context: this.redisClient });
        this.move = bb.promisify(this.redisClient.move, { context: this.redisClient });
        this.rename = bb.promisify(this.redisClient.rename, { context: this.redisClient });
        this.renamenx = bb.promisify(this.redisClient.renamenx, { context: this.redisClient });
        this.expire = bb.promisify(this.redisClient.expire, { context: this.redisClient });
        this.expireat = bb.promisify(this.redisClient.expireat, { context: this.redisClient });
        this.keys = bb.promisify(this.redisClient.keys, { context: this.redisClient });
        this.dbsize = bb.promisify(this.redisClient.dbsize, { context: this.redisClient });
        this.auth = bb.promisify(this.redisClient.auth, { context: this.redisClient });
        this.ping = bb.promisify(this.redisClient.ping, { context: this.redisClient });
        this.echo = bb.promisify(this.redisClient.echo, { context: this.redisClient });
        this.save = bb.promisify(this.redisClient.save, { context: this.redisClient });
        this.bgsave = bb.promisify(this.redisClient.bgsave, { context: this.redisClient });
        this.bgrewriteaof = bb.promisify(this.redisClient.bgrewriteaof, { context: this.redisClient });
        this.shutdown = bb.promisify(this.redisClient.shutdown, { context: this.redisClient });
        this.lastsave = bb.promisify(this.redisClient.lastsave, { context: this.redisClient });
        this.type = bb.promisify(this.redisClient.type, { context: this.redisClient });
        this.exec = bb.promisify(this.redisClient.exec, { context: this.redisClient });
        this.discard = bb.promisify(this.redisClient.discard, { context: this.redisClient });
        this.sync = bb.promisify(this.redisClient.sync, { context: this.redisClient });
        this.flushdb = bb.promisify(this.redisClient.flushdb, { context: this.redisClient });
        this.flushall = bb.promisify(this.redisClient.flushall, { context: this.redisClient });
        this.sort = bb.promisify(this.redisClient.sort, { context: this.redisClient });
        this.info = bb.promisify(this.redisClient.info, { context: this.redisClient });
        this.monitor = bb.promisify(this.redisClient.monitor, { context: this.redisClient });
        this.ttl = bb.promisify(this.redisClient.ttl, { context: this.redisClient });
        this.persist = bb.promisify(this.redisClient.persist, { context: this.redisClient });
        this.slaveof = bb.promisify(this.redisClient.slaveof, { context: this.redisClient });
        this.debug = bb.promisify(this.redisClient.debug, { context: this.redisClient });
        this.config = bb.promisify(this.redisClient.config, { context: this.redisClient });
        this.subscribe = bb.promisify(this.redisClient.subscribe, { context: this.redisClient });
        this.unsubscribe = bb.promisify(this.redisClient.unsubscribe, { context: this.redisClient });
        this.psubscribe = bb.promisify(this.redisClient.psubscribe, { context: this.redisClient });
        this.punsubscribe = bb.promisify(this.redisClient.punsubscribe, { context: this.redisClient });
        this.publish = bb.promisify(this.redisClient.publish, { context: this.redisClient });
        this.watch = bb.promisify(this.redisClient.watch, { context: this.redisClient });
        this.unwatch = bb.promisify(this.redisClient.unwatch, { context: this.redisClient });
        this.cluster = bb.promisify(this.redisClient.cluster, { context: this.redisClient });
        this.restore = bb.promisify(this.redisClient.restore, { context: this.redisClient });
        this.migrate = bb.promisify(this.redisClient.migrate, { context: this.redisClient });
        this.dump = bb.promisify(this.redisClient.dump, { context: this.redisClient });
        this.object = bb.promisify(this.redisClient.object, { context: this.redisClient });
        this.client = bb.promisify(this.redisClient.client, { context: this.redisClient });
        this.eval = bb.promisify(this.redisClient.eval, { context: this.redisClient });
        this.evalsha = bb.promisify(this.redisClient.evalsha, { context: this.redisClient });
        this.script = bb.promisify(this.redisClient.script, { context: this.redisClient });
        this.script = bb.promisify(this.redisClient.script, { context: this.redisClient });
        this.quit = bb.promisify(this.redisClient.quit, { context: this.redisClient });
        this.sscan = bb.promisify(this.redisClient.sscan, { context: this.redisClient });
        this.scan = bb.promisify(this.redisClient.scan, { context: this.redisClient });
        this.hscan = bb.promisify(this.redisClient.hscan, { context: this.redisClient });
        this.zscan = bb.promisify(this.redisClient.zscan, { context: this.redisClient });
    }

    auth: (password: string) => PromiseLike<any>;
    bitcount: (key: string, start?: number, end?: number) => PromiseLike<any>;
    get: (...args: any[]) => PromiseLike<any>;
    set: (...args: any[]) => PromiseLike<any>;
    setnx: (...args: any[]) => PromiseLike<any>;
    setex: (...args: any[]) => PromiseLike<any>;
    append: (...args: any[]) => PromiseLike<any>;
    strlen: (...args: any[]) => PromiseLike<any>;
    del: (...args: any[]) => PromiseLike<any>;
    exists: (...args: any[]) => PromiseLike<any>;
    setbit: (...args: any[]) => PromiseLike<any>;
    getbit: (...args: any[]) => PromiseLike<any>;
    setrange: (...args: any[]) => PromiseLike<any>;
    getrange: (...args: any[]) => PromiseLike<any>;
    substr: (...args: any[]) => PromiseLike<any>;
    incr: (...args: any[]) => PromiseLike<any>;
    decr: (...args: any[]) => PromiseLike<any>;
    mget: (...args: any[]) => PromiseLike<any>;
    lpush: (...args: any[]) => PromiseLike<any>;
    rpushx: (...args: any[]) => PromiseLike<any>;
    lpushx: (...args: any[]) => PromiseLike<any>;
    linsert: (...args: any[]) => PromiseLike<any>;
    rpop: (...args: any[]) => PromiseLike<any>;
    lpop: (...args: any[]) => PromiseLike<any>;
    brpop: (...args: any[]) => PromiseLike<any>;
    brpoplpush: (...args: any[]) => PromiseLike<any>;
    blpop: (...args: any[]) => PromiseLike<any>;
    llen: (...args: any[]) => PromiseLike<any>;
    lindex: (...args: any[]) => PromiseLike<any>;
    lset: (...args: any[]) => PromiseLike<any>;
    lrange: (...args: any[]) => PromiseLike<any>;
    ltrim: (...args: any[]) => PromiseLike<any>;
    lrem: (...args: any[]) => PromiseLike<any>;
    rpoplpush: (...args: any[]) => PromiseLike<any>;
    sadd: (...args: any[]) => PromiseLike<any>;
    srem: (...args: any[]) => PromiseLike<any>;
    smove: (...args: any[]) => PromiseLike<any>;
    sismember: (...args: any[]) => PromiseLike<any>;
    scard: (...args: any[]) => PromiseLike<any>;
    spop: (...args: any[]) => PromiseLike<any>;
    srandmember: (...args: any[]) => PromiseLike<any>;
    sinter: (...args: any[]) => PromiseLike<any>;
    sinterstore: (...args: any[]) => PromiseLike<any>;
    sunion: (...args: any[]) => PromiseLike<any>;
    sunionstore: (...args: any[]) => PromiseLike<any>;
    sdiff: (...args: any[]) => PromiseLike<any>;
    sdiffstore: (...args: any[]) => PromiseLike<any>;
    smembers: (...args: any[]) => PromiseLike<any>;
    zadd: (...args: any[]) => PromiseLike<any>;
    zincrby: (...args: any[]) => PromiseLike<any>;
    zrem: (...args: any[]) => PromiseLike<any>;
    zremrangebyscore: (...args: any[]) => PromiseLike<any>;
    zremrangebyrank: (...args: any[]) => PromiseLike<any>;
    zunionstore: (...args: any[]) => PromiseLike<any>;
    zinterstore: (...args: any[]) => PromiseLike<any>;
    zrange: (...args: any[]) => PromiseLike<any>;
    zrangebyscore: (...args: any[]) => PromiseLike<any>;
    zrevrangebyscore: (...args: any[]) => PromiseLike<any>;
    zcount: (...args: any[]) => PromiseLike<any>;
    zrevrange: (...args: any[]) => PromiseLike<any>;
    zcard: (...args: any[]) => PromiseLike<any>;
    zscore: (...args: any[]) => PromiseLike<any>;
    zrank: (...args: any[]) => PromiseLike<any>;
    zrevrank: (...args: any[]) => PromiseLike<any>;
    hset: (...args: any[]) => PromiseLike<any>;
    hsetnx: (...args: any[]) => PromiseLike<any>;
    hget: (...args: any[]) => PromiseLike<any>;
    hmset: (...args: any[]) => PromiseLike<any>;
    hmget: (...args: any[]) => PromiseLike<any>;
    hincrby: (...args: any[]) => PromiseLike<any>;
    hdel: (...args: any[]) => PromiseLike<any>;
    hlen: (...args: any[]) => PromiseLike<any>;
    hkeys: (...args: any[]) => PromiseLike<any>;
    hvals: (...args: any[]) => PromiseLike<any>;
    hgetall: (...args: any[]) => PromiseLike<any>;
    hexists: (...args: any[]) => PromiseLike<any>;
    incrby: (...args: any[]) => PromiseLike<any>;
    decrby: (...args: any[]) => PromiseLike<any>;
    getset: (...args: any[]) => PromiseLike<any>;
    mset: (...args: any[]) => PromiseLike<any>;
    msetnx: (...args: any[]) => PromiseLike<any>;
    randomkey: (...args: any[]) => PromiseLike<any>;
    select: (...args: any[]) => PromiseLike<any>;
    move: (...args: any[]) => PromiseLike<any>;
    rename: (...args: any[]) => PromiseLike<any>;
    renamenx: (...args: any[]) => PromiseLike<any>;
    expire: (...args: any[]) => PromiseLike<any>;
    expireat: (...args: any[]) => PromiseLike<any>;
    keys: (...args: any[]) => PromiseLike<any>;
    dbsize: (...args: any[]) => PromiseLike<any>;
    ping: (...args: any[]) => PromiseLike<any>;
    echo: (...args: any[]) => PromiseLike<any>;
    save: (...args: any[]) => PromiseLike<any>;
    bgsave: (...args: any[]) => PromiseLike<any>;
    bgrewriteaof: (...args: any[]) => PromiseLike<any>;
    shutdown: (...args: any[]) => PromiseLike<any>;
    lastsave: (...args: any[]) => PromiseLike<any>;
    type: (...args: any[]) => PromiseLike<any>;
    exec: (...args: any[]) => PromiseLike<any>;
    discard: (...args: any[]) => PromiseLike<any>;
    sync: (...args: any[]) => PromiseLike<any>;
    flushdb: (...args: any[]) => PromiseLike<any>;
    flushall: (...args: any[]) => PromiseLike<any>;
    sort: (...args: any[]) => PromiseLike<any>;
    info: (...args: any[]) => PromiseLike<any>;
    monitor: (...args: any[]) => PromiseLike<any>;
    ttl: (...args: any[]) => PromiseLike<any>;
    persist: (...args: any[]) => PromiseLike<any>;
    slaveof: (...args: any[]) => PromiseLike<any>;
    debug: (...args: any[]) => PromiseLike<any>;
    config: (...args: any[]) => PromiseLike<any>;
    subscribe: (...args: any[]) => PromiseLike<any>;
    unsubscribe: (...args: any[]) => PromiseLike<any>;
    psubscribe: (...args: any[]) => PromiseLike<any>;
    punsubscribe: (...args: any[]) => PromiseLike<any>;
    publish: (...args: any[]) => PromiseLike<any>;
    watch: (...args: any[]) => PromiseLike<any>;
    unwatch: (...args: any[]) => PromiseLike<any>;
    cluster: (...args: any[]) => PromiseLike<any>;
    restore: (...args: any[]) => PromiseLike<any>;
    migrate: (...args: any[]) => PromiseLike<any>;
    dump: (...args: any[]) => PromiseLike<any>;
    object: (...args: any[]) => PromiseLike<any>;
    client: (...args: any[]) => PromiseLike<any>;
    eval: (...args: any[]) => PromiseLike<any>;
    evalsha: (...args: any[]) => PromiseLike<any>;
    script: (...args: any[]) => PromiseLike<any>;
    quit: (...args: any[]) => PromiseLike<any>;
    sscan: (...args: any[]) => PromiseLike<any>;
    scan: (...args: any[]) => PromiseLike<any>;
    hscan: (...args: any[]) => PromiseLike<any>;
    zscan: (...args: any[]) => PromiseLike<any>;

    multi(...args: any[]): IConnRedisMulti {
        const multi = this.redisClient.multi(args);
        return new ConnRedisMulti(multi);
    }

    // support geo
    geoadd(key: string, args: IRedisGeo[]): Promise<number> {
        const geoArgs = args.map(geo => {
            return [geo.longitude, geo.latitude, geo.member];
        });

        const _args = _.flatten([key, ...geoArgs]);

        return new Promise<number>((resolve, reject) => {
            this.redisClient.send_command('geoadd', _args, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    geohash(key: string, args: string[]): Promise<string[]> {
        const _args = [key, ...args];

        return new Promise<string[]>((resolve, reject) => {
            this.redisClient.send_command('geohash', _args, (err: any, data: any[]) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    geopos(key: string, args: string[]): Promise<IRedisGeo[]> {
        const _args = [key, ...args];
        return new Promise<IRedisGeo[]>((resolve, reject) => {
            this.redisClient.send_command('geopos', _args, (err: any, data: any[]) => {
                if (err) {
                    reject(err);
                }
                else {
                    const geos: IRedisGeo[] = [];
                    const dataPos = data.filter(d => !_.isEmpty(d));
                    for (let i = 0; i < dataPos.length; i += 2) {
                        geos.push({
                            longitude: dataPos[i][0],
                            latitude: dataPos[i][1],
                            member: args[i / 2]
                        });
                    }
                    resolve(geos);
                }
            });
        });
    }

    geodist(key: string, mem1: string, mem2: string, unit?: RedisLengthUnit): Promise<number> {
        const args = [key, mem1, mem2, unit].filter(k => !!k);

        return new Promise<number>((resolve, reject) => {
            this.redisClient.send_command('geohash', args, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    georadius(key: string, longitude: number, latitude: number, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType): Promise<GeoRadiusOutp[]> {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];

        const args = [key, longitude, latitude, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);

        return new Promise<GeoRadiusOutp[]>((resolve, reject) => {
            this.redisClient.send_command('georadius', args, (err: any, data: any[]) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.createGeoRadiusOutput(data, withCoord, withDist, withHash));
                }
            });
        });
    }

    georadiusbymember(key: string, member: string, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType): Promise<GeoRadiusOutp[]> {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];

        const args = [key, member, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);

        return new Promise<GeoRadiusOutp[]>((resolve, reject) => {
            this.redisClient.send_command('georadiusbymember', args, (err: any, data: any[]) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.createGeoRadiusOutput(data, withCoord, withDist, withHash));
                }
            });
        });
    }

    private createGeoRadiusOutput(data: any[], withCoord?: boolean, withDist?: boolean, withHash?: boolean): GeoRadiusOutp[] {
        if (!withCoord && !withDist && !withHash) {
            data = data.map(d => [d]);
        }

        let i = 0;
        const idxs: any = {};
        idxs.memIdx = i++;
        if (withDist) {
            idxs.distIdx = i++;
        }
        if (withHash) {
            idxs.hashIdx = i++;
        }
        if (withCoord) {
            idxs.coordIdx = i++;
        }
        const geos: GeoRadiusOutp[] = data.map(d => {
            const geo: GeoRadiusOutp = <any>{};
            geo.member = d[idxs.memIdx];
            if (withDist) {
                geo.dist = d[idxs.distIdx];
            }
            if (withHash) {
                geo.hash = d[idxs.hashIdx];
            }
            if (withCoord) {
                geo.longitude = d[idxs.coordIdx][0];
                geo.latitude = d[idxs.coordIdx][1];
            }
            return geo;
        });
        return geos;
    }

    // Inject new command
    setif(key, newVal, oldVal): Promise<number> {

        const args = ['ee5a454a4e384e390d16c528a422b727fb727d2f', 1, key, newVal, oldVal].filter(k => !!k);

        return new Promise<number>((resolve, reject) => {
            this.redisClient.send_command('evalsha', args, (err: any, data: number) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
};

class ConnRedisMulti implements IConnRedisMulti {
    redisMulti: redis.Multi;

    constructor(client: redis.Multi) {
        this.redisMulti = client;
    }

    private send_command(command: string, ...args: any[]) {
        const queue = this['queue'];
        queue.push(new Command(command, args));
    }

    append(...args: any[]) { this.redisMulti.append(args); return this; }
    set(...args: any[]) { this.redisMulti.set(args); return this; }
    get(...args: any[]) { this.redisMulti.get(args); return this; }
    exists(...args: any[]) { this.redisMulti.exists(args); return this; }
    setnx(...args: any[]) { this.redisMulti.setnx(args); return this; }
    setex(...args: any[]) { this.redisMulti.setex(args); return this; }
    strlen(...args: any[]) { this.redisMulti.strlen(args); return this; }
    del(...args: any[]) { this.redisMulti.del(args); return this; }
    setbit(...args: any[]) { this.redisMulti.setbit(args); return this; }
    getbit(...args: any[]) { this.redisMulti.getbit(args); return this; }
    setrange(...args: any[]) { this.redisMulti.setrange(args); return this; }
    getrange(...args: any[]) { this.redisMulti.getrange(args); return this; }
    substr(...args: any[]) { this.redisMulti.substr(args); return this; }
    incr(...args: any[]) { this.redisMulti.incr(args); return this; }
    decr(...args: any[]) { this.redisMulti.decr(args); return this; }
    mget(...args: any[]) { this.redisMulti.mget(args); return this; }
    lpush(...args: any[]) { this.redisMulti.lpush(args); return this; }
    rpushx(...args: any[]) { this.redisMulti.rpushx(args); return this; }
    lpushx(...args: any[]) { this.redisMulti.lpushx(args); return this; }
    linsert(...args: any[]) { this.redisMulti.linsert(args); return this; }
    rpop(...args: any[]) { this.redisMulti.rpop(args); return this; }
    lpop(...args: any[]) { this.redisMulti.lpop(args); return this; }
    brpop(...args: any[]) { this.redisMulti.brpop(args); return this; }
    brpoplpush(...args: any[]) { this.redisMulti.brpoplpush(args); return this; }
    blpop(...args: any[]) { this.redisMulti.blpop(args); return this; }
    llen(...args: any[]) { this.redisMulti.llen(args); return this; }
    lindex(...args: any[]) { this.redisMulti.lindex(args); return this; }
    lset(...args: any[]) { this.redisMulti.lset(args); return this; }
    lrange(...args: any[]) { this.redisMulti.lrange(args); return this; }
    ltrim(...args: any[]) { this.redisMulti.ltrim(args); return this; }
    lrem(...args: any[]) { this.redisMulti.lrem(args); return this; }
    rpoplpush(...args: any[]) { this.redisMulti.rpoplpush(args); return this; }
    sadd(...args: any[]) { this.redisMulti.sadd(args); return this; }
    srem(...args: any[]) { this.redisMulti.srem(args); return this; }
    smove(...args: any[]) { this.redisMulti.smove(args); return this; }
    sismember(...args: any[]) { this.redisMulti.sismember(args); return this; }
    scard(...args: any[]) { this.redisMulti.scard(args); return this; }
    spop(...args: any[]) { this.redisMulti.spop(args); return this; }
    srandmember(...args: any[]) { this.redisMulti.srandmember(args); return this; }
    sinter(...args: any[]) { this.redisMulti.sinter(args); return this; }
    sinterstore(...args: any[]) { this.redisMulti.sinterstore(args); return this; }
    sunion(...args: any[]) { this.redisMulti.sunion(args); return this; }
    sunionstore(...args: any[]) { this.redisMulti.sunionstore(args); return this; }
    sdiff(...args: any[]) { this.redisMulti.sdiff(args); return this; }
    sdiffstore(...args: any[]) { this.redisMulti.sdiffstore(args); return this; }
    smembers(...args: any[]) { this.redisMulti.smembers(args); return this; }
    zadd(...args: any[]) { this.redisMulti.zadd(args); return this; }
    zincrby(...args: any[]) { this.redisMulti.zincrby(args); return this; }
    zrem(...args: any[]) { this.redisMulti.zrem(args); return this; }
    zremrangebyscore(...args: any[]) { this.redisMulti.zremrangebyscore(args); return this; }
    zremrangebyrank(...args: any[]) { this.redisMulti.zremrangebyrank(args); return this; }
    zunionstore(...args: any[]) { this.redisMulti.zunionstore(args); return this; }
    zinterstore(...args: any[]) { this.redisMulti.zinterstore(args); return this; }
    zrange(...args: any[]) { this.redisMulti.zrange(args); return this; }
    zrangebyscore(...args: any[]) { this.redisMulti.zrangebyscore(args); return this; }
    zrevrangebyscore(...args: any[]) { this.redisMulti.zrevrangebyscore(args); return this; }
    zcount(...args: any[]) { this.redisMulti.zcount(args); return this; }
    zrevrange(...args: any[]) { this.redisMulti.zrevrange(args); return this; }
    zcard(...args: any[]) { this.redisMulti.zcard(args); return this; }
    zscore(...args: any[]) { this.redisMulti.zscore(args); return this; }
    zrank(...args: any[]) { this.redisMulti.zrank(args); return this; }
    zrevrank(...args: any[]) { this.redisMulti.zrevrank(args); return this; }
    hset(...args: any[]) { this.redisMulti.hset(args); return this; }
    hsetnx(...args: any[]) { this.redisMulti.hsetnx(args); return this; }
    hget(...args: any[]) { this.redisMulti.hget(args); return this; }
    hmset(...args: any[]) { this.redisMulti.hmset(args); return this; }
    hmget(...args: any[]) { this.redisMulti.hmget(args); return this; }
    hincrby(...args: any[]) { this.redisMulti.hincrby(args); return this; }
    hdel(...args: any[]) { this.redisMulti.hdel(args); return this; }
    hlen(...args: any[]) { this.redisMulti.hlen(args); return this; }
    hkeys(...args: any[]) { this.redisMulti.hkeys(args); return this; }
    hvals(...args: any[]) { this.redisMulti.hvals(args); return this; }
    hgetall(...args: any[]) { this.redisMulti.hgetall(args); return this; }
    hexists(...args: any[]) { this.redisMulti.hexists(args); return this; }
    incrby(...args: any[]) { this.redisMulti.incrby(args); return this; }
    decrby(...args: any[]) { this.redisMulti.decrby(args); return this; }
    getset(...args: any[]) { this.redisMulti.getset(args); return this; }
    mset(...args: any[]) { this.redisMulti.mset(args); return this; }
    msetnx(...args: any[]) { this.redisMulti.msetnx(args); return this; }
    randomkey(...args: any[]) { this.redisMulti.randomkey(args); return this; }
    select(...args: any[]) { this.redisMulti.select(args); return this; }
    move(...args: any[]) { this.redisMulti.move(args); return this; }
    rename(...args: any[]) { this.redisMulti.rename(args); return this; }
    renamenx(...args: any[]) { this.redisMulti.renamenx(args); return this; }
    expire(...args: any[]) { this.redisMulti.expire(args); return this; }
    expireat(...args: any[]) { this.redisMulti.expireat(args); return this; }
    keys(...args: any[]) { this.redisMulti.keys(args); return this; }
    dbsize(...args: any[]) { this.redisMulti.dbsize(args); return this; }
    auth(...args: any[]) { this.redisMulti.auth(args); return this; }
    ping(...args: any[]) { this.redisMulti.ping(args); return this; }
    echo(...args: any[]) { this.redisMulti.echo(args); return this; }
    save(...args: any[]) { this.redisMulti.save(args); return this; }
    bgsave(...args: any[]) { this.redisMulti.bgsave(args); return this; }
    bgrewriteaof(...args: any[]) { this.redisMulti.bgrewriteaof(args); return this; }
    shutdown(...args: any[]) { this.redisMulti.shutdown(args); return this; }
    lastsave(...args: any[]) { this.redisMulti.lastsave(args); return this; }
    type(...args: any[]) { this.redisMulti.type(args); return this; }
    multi(...args: any[]) { this.redisMulti.multi(args); return this; }
    discard(...args: any[]) { this.redisMulti.discard(args); return this; }
    sync(...args: any[]) { this.redisMulti.sync(args); return this; }
    flushdb(...args: any[]) { this.redisMulti.flushdb(args); return this; }
    flushall(...args: any[]) { this.redisMulti.flushall(args); return this; }
    sort(...args: any[]) { this.redisMulti.sort(args); return this; }
    info(...args: any[]) { this.redisMulti.info(args); return this; }
    monitor(...args: any[]) { this.redisMulti.monitor(args); return this; }
    ttl(...args: any[]) { this.redisMulti.ttl(args); return this; }
    persist(...args: any[]) { this.redisMulti.persist(args); return this; }
    slaveof(...args: any[]) { this.redisMulti.slaveof(args); return this; }
    debug(...args: any[]) { this.redisMulti.debug(args); return this; }
    config(...args: any[]) { this.redisMulti.config(args); return this; }
    subscribe(...args: any[]) { this.redisMulti.subscribe(args); return this; }
    unsubscribe(...args: any[]) { this.redisMulti.unsubscribe(args); return this; }
    psubscribe(...args: any[]) { this.redisMulti.psubscribe(args); return this; }
    punsubscribe(...args: any[]) { this.redisMulti.punsubscribe(args); return this; }
    publish(...args: any[]) { this.redisMulti.publish(args); return this; }
    watch(...args: any[]) { this.redisMulti.watch(args); return this; }
    unwatch(...args: any[]) { this.redisMulti.unwatch(args); return this; }
    cluster(...args: any[]) { this.redisMulti.cluster(args); return this; }
    restore(...args: any[]) { this.redisMulti.restore(args); return this; }
    migrate(...args: any[]) { this.redisMulti.migrate(args); return this; }
    dump(...args: any[]) { this.redisMulti.dump(args); return this; }
    object(...args: any[]) { this.redisMulti.object(args); return this; }
    client(...args: any[]) { this.redisMulti.client(args); return this; }
    eval(...args: any[]) { this.redisMulti.eval(args); return this; }
    evalsha(...args: any[]) { this.redisMulti.evalsha(args); return this; }
    quit(...args: any[]) { this.redisMulti.quit(args); return this; }
    scan(...args: any[]) { this.redisMulti.scan(args); return this; }
    hscan(...args: any[]) { this.redisMulti.hscan(args); return this; }
    zscan(...args: any[]) { this.redisMulti.zscan(args); return this; }

    // support geo
    geoadd(key: string, args: IRedisGeo[]) {
        const geoArgs = args.map(geo => {
            return [geo.longitude, geo.latitude, geo.member];
        });

        const _args = _.flatten([key, ...geoArgs]);
        this.send_command('geoadd', _args);
        return this;
    }

    geohash(key: string, args: string[]) {
        const _args = [key, ...args];
        this.send_command('geohash', _args);
        return this;
    }

    geopos(key: string, args: string[]) {
        const _args = [key, ...args];
        this.send_command('geopos', _args);
        return this;
    }

    geodist(key: string, mem1: string, mem2: string, unit?: RedisLengthUnit) {
        const _args = [key, mem1, mem2, unit].filter(k => !!k);
        this.send_command('geopos', _args);
        return this;
    }

    georadius(key: string, longitude: number, latitude: number, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType) {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];

        const args = [key, longitude, latitude, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);
        this.send_command('georadius', args);
        return this;
    }

    georadiusbymember(key: string, member: string, radius: number,
        unit?: RedisLengthUnit, withCoord?: boolean, withDist?: boolean, withHash?: boolean,
        count?: number, order?: RedisSortType) {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];

        const args = [key, member, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);
        this.send_command('georadius', args);
        return this;
    }

    exec(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.redisMulti.exec((err, ret) => {
                if (!err) {
                    resolve(ret);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}

export function createConnRedis(redisClient: redis.RedisClient): IConnRedis {
    return new ConnRedis(redisClient);
}

export default createConnRedis;