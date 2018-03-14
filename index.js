"use strict";
exports.__esModule = true;
var bb = require("bluebird");
var _ = require("lodash");
function Command(command, args, call_on_write) {
    this.command = command;
    this.args = args;
    this.buffer_args = false;
    this.call_on_write = call_on_write;
}
var ConnRedis = /** @class */ (function () {
    function ConnRedis(client) {
        this.redisClient = client;
        this.promisifyFuncs();
    }
    ConnRedis.prototype.promisifyFuncs = function () {
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
    };
    ConnRedis.prototype.multi = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var multi = this.redisClient.multi(args);
        return new ConnRedisMulti(multi);
    };
    // support geo
    ConnRedis.prototype.geoadd = function (key, args) {
        var _this = this;
        var geoArgs = args.map(function (geo) {
            return [geo.longitude, geo.latitude, geo.member];
        });
        var _args = _.flatten([key].concat(geoArgs));
        return new Promise(function (resolve, reject) {
            _this.redisClient.send_command('geoadd', _args, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    ConnRedis.prototype.geohash = function (key, args) {
        var _this = this;
        var _args = [key].concat(args);
        return new Promise(function (resolve, reject) {
            _this.redisClient.send_command('geohash', _args, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    ConnRedis.prototype.geopos = function (key, args) {
        var _this = this;
        var _args = [key].concat(args);
        return new Promise(function (resolve, reject) {
            _this.redisClient.send_command('geopos', _args, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    var geos = [];
                    var dataPos = data.filter(function (d) { return !_.isEmpty(d); });
                    for (var i = 0; i < dataPos.length; i += 2) {
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
    };
    ConnRedis.prototype.geodist = function (key, mem1, mem2, unit) {
        var _this = this;
        var args = [key, mem1, mem2, unit].filter(function (k) { return !!k; });
        return new Promise(function (resolve, reject) {
            _this.redisClient.send_command('geohash', args, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    ConnRedis.prototype.georadius = function (key, longitude, latitude, radius, unit, withCoord, withDist, withHash, count, order) {
        var _this = this;
        var _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        var _withDist = withDist == true ? 'WITHDIST' : undefined;
        var _withHash = withHash == true ? 'WITHHASH' : undefined;
        var _count = (!!count && count > 0) ? ['COUNT', count] : [];
        var args = [key, longitude, latitude, radius, unit, _withCoord, _withDist, _withHash].concat(_count, [order]).filter(function (k) { return !!k; });
        return new Promise(function (resolve, reject) {
            _this.redisClient.send_command('georadius', args, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(_this.createGeoRadiusOutput(data, withCoord, withDist, withHash));
                }
            });
        });
    };
    ConnRedis.prototype.georadiusbymember = function (key, member, radius, unit, withCoord, withDist, withHash, count, order) {
        var _this = this;
        var _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        var _withDist = withDist == true ? 'WITHDIST' : undefined;
        var _withHash = withHash == true ? 'WITHHASH' : undefined;
        var _count = (!!count && count > 0) ? ['COUNT', count] : [];
        var args = [key, member, radius, unit, _withCoord, _withDist, _withHash].concat(_count, [order]).filter(function (k) { return !!k; });
        return new Promise(function (resolve, reject) {
            _this.redisClient.send_command('georadiusbymember', args, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(_this.createGeoRadiusOutput(data, withCoord, withDist, withHash));
                }
            });
        });
    };
    ConnRedis.prototype.createGeoRadiusOutput = function (data, withCoord, withDist, withHash) {
        if (!withCoord && !withDist && !withHash) {
            data = data.map(function (d) { return [d]; });
        }
        var i = 0;
        var idxs = {};
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
        var geos = data.map(function (d) {
            var geo = {};
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
    };
    // Inject new command
    ConnRedis.prototype.setif = function (key, newVal, oldVal) {
        var _this = this;
        var args = ['ee5a454a4e384e390d16c528a422b727fb727d2f', 1, key, newVal, oldVal].filter(function (k) { return !!k; });
        return new Promise(function (resolve, reject) {
            _this.redisClient.send_command('evalsha', args, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    return ConnRedis;
}());
;
var ConnRedisMulti = /** @class */ (function () {
    function ConnRedisMulti(client) {
        this.redisMulti = client;
    }
    ConnRedisMulti.prototype.send_command = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var queue = this['queue'];
        queue.push(new Command(command, args));
    };
    ConnRedisMulti.prototype.append = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.append(args);
        return this;
    };
    ConnRedisMulti.prototype.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.set(args);
        return this;
    };
    ConnRedisMulti.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.get(args);
        return this;
    };
    ConnRedisMulti.prototype.exists = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.exists(args);
        return this;
    };
    ConnRedisMulti.prototype.setnx = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.setnx(args);
        return this;
    };
    ConnRedisMulti.prototype.setex = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.setex(args);
        return this;
    };
    ConnRedisMulti.prototype.strlen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.strlen(args);
        return this;
    };
    ConnRedisMulti.prototype.del = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.del(args);
        return this;
    };
    ConnRedisMulti.prototype.setbit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.setbit(args);
        return this;
    };
    ConnRedisMulti.prototype.getbit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.getbit(args);
        return this;
    };
    ConnRedisMulti.prototype.setrange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.setrange(args);
        return this;
    };
    ConnRedisMulti.prototype.getrange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.getrange(args);
        return this;
    };
    ConnRedisMulti.prototype.substr = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.substr(args);
        return this;
    };
    ConnRedisMulti.prototype.incr = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.incr(args);
        return this;
    };
    ConnRedisMulti.prototype.decr = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.decr(args);
        return this;
    };
    ConnRedisMulti.prototype.mget = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.mget(args);
        return this;
    };
    ConnRedisMulti.prototype.lpush = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lpush(args);
        return this;
    };
    ConnRedisMulti.prototype.rpushx = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.rpushx(args);
        return this;
    };
    ConnRedisMulti.prototype.lpushx = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lpushx(args);
        return this;
    };
    ConnRedisMulti.prototype.linsert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.linsert(args);
        return this;
    };
    ConnRedisMulti.prototype.rpop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.rpop(args);
        return this;
    };
    ConnRedisMulti.prototype.lpop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lpop(args);
        return this;
    };
    ConnRedisMulti.prototype.brpop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.brpop(args);
        return this;
    };
    ConnRedisMulti.prototype.brpoplpush = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.brpoplpush(args);
        return this;
    };
    ConnRedisMulti.prototype.blpop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.blpop(args);
        return this;
    };
    ConnRedisMulti.prototype.llen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.llen(args);
        return this;
    };
    ConnRedisMulti.prototype.lindex = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lindex(args);
        return this;
    };
    ConnRedisMulti.prototype.lset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lset(args);
        return this;
    };
    ConnRedisMulti.prototype.lrange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lrange(args);
        return this;
    };
    ConnRedisMulti.prototype.ltrim = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.ltrim(args);
        return this;
    };
    ConnRedisMulti.prototype.lrem = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lrem(args);
        return this;
    };
    ConnRedisMulti.prototype.rpoplpush = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.rpoplpush(args);
        return this;
    };
    ConnRedisMulti.prototype.sadd = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sadd(args);
        return this;
    };
    ConnRedisMulti.prototype.srem = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.srem(args);
        return this;
    };
    ConnRedisMulti.prototype.smove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.smove(args);
        return this;
    };
    ConnRedisMulti.prototype.sismember = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sismember(args);
        return this;
    };
    ConnRedisMulti.prototype.scard = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.scard(args);
        return this;
    };
    ConnRedisMulti.prototype.spop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.spop(args);
        return this;
    };
    ConnRedisMulti.prototype.srandmember = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.srandmember(args);
        return this;
    };
    ConnRedisMulti.prototype.sinter = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sinter(args);
        return this;
    };
    ConnRedisMulti.prototype.sinterstore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sinterstore(args);
        return this;
    };
    ConnRedisMulti.prototype.sunion = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sunion(args);
        return this;
    };
    ConnRedisMulti.prototype.sunionstore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sunionstore(args);
        return this;
    };
    ConnRedisMulti.prototype.sdiff = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sdiff(args);
        return this;
    };
    ConnRedisMulti.prototype.sdiffstore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sdiffstore(args);
        return this;
    };
    ConnRedisMulti.prototype.smembers = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.smembers(args);
        return this;
    };
    ConnRedisMulti.prototype.zadd = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zadd(args);
        return this;
    };
    ConnRedisMulti.prototype.zincrby = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zincrby(args);
        return this;
    };
    ConnRedisMulti.prototype.zrem = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zrem(args);
        return this;
    };
    ConnRedisMulti.prototype.zremrangebyscore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zremrangebyscore(args);
        return this;
    };
    ConnRedisMulti.prototype.zremrangebyrank = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zremrangebyrank(args);
        return this;
    };
    ConnRedisMulti.prototype.zunionstore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zunionstore(args);
        return this;
    };
    ConnRedisMulti.prototype.zinterstore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zinterstore(args);
        return this;
    };
    ConnRedisMulti.prototype.zrange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zrange(args);
        return this;
    };
    ConnRedisMulti.prototype.zrangebyscore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zrangebyscore(args);
        return this;
    };
    ConnRedisMulti.prototype.zrevrangebyscore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zrevrangebyscore(args);
        return this;
    };
    ConnRedisMulti.prototype.zcount = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zcount(args);
        return this;
    };
    ConnRedisMulti.prototype.zrevrange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zrevrange(args);
        return this;
    };
    ConnRedisMulti.prototype.zcard = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zcard(args);
        return this;
    };
    ConnRedisMulti.prototype.zscore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zscore(args);
        return this;
    };
    ConnRedisMulti.prototype.zrank = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zrank(args);
        return this;
    };
    ConnRedisMulti.prototype.zrevrank = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zrevrank(args);
        return this;
    };
    ConnRedisMulti.prototype.hset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hset(args);
        return this;
    };
    ConnRedisMulti.prototype.hsetnx = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hsetnx(args);
        return this;
    };
    ConnRedisMulti.prototype.hget = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hget(args);
        return this;
    };
    ConnRedisMulti.prototype.hmset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hmset(args);
        return this;
    };
    ConnRedisMulti.prototype.hmget = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hmget(args);
        return this;
    };
    ConnRedisMulti.prototype.hincrby = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hincrby(args);
        return this;
    };
    ConnRedisMulti.prototype.hdel = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hdel(args);
        return this;
    };
    ConnRedisMulti.prototype.hlen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hlen(args);
        return this;
    };
    ConnRedisMulti.prototype.hkeys = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hkeys(args);
        return this;
    };
    ConnRedisMulti.prototype.hvals = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hvals(args);
        return this;
    };
    ConnRedisMulti.prototype.hgetall = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hgetall(args);
        return this;
    };
    ConnRedisMulti.prototype.hexists = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hexists(args);
        return this;
    };
    ConnRedisMulti.prototype.incrby = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.incrby(args);
        return this;
    };
    ConnRedisMulti.prototype.decrby = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.decrby(args);
        return this;
    };
    ConnRedisMulti.prototype.getset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.getset(args);
        return this;
    };
    ConnRedisMulti.prototype.mset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.mset(args);
        return this;
    };
    ConnRedisMulti.prototype.msetnx = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.msetnx(args);
        return this;
    };
    ConnRedisMulti.prototype.randomkey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.randomkey(args);
        return this;
    };
    ConnRedisMulti.prototype.select = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.select(args);
        return this;
    };
    ConnRedisMulti.prototype.move = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.move(args);
        return this;
    };
    ConnRedisMulti.prototype.rename = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.rename(args);
        return this;
    };
    ConnRedisMulti.prototype.renamenx = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.renamenx(args);
        return this;
    };
    ConnRedisMulti.prototype.expire = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.expire(args);
        return this;
    };
    ConnRedisMulti.prototype.expireat = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.expireat(args);
        return this;
    };
    ConnRedisMulti.prototype.keys = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.keys(args);
        return this;
    };
    ConnRedisMulti.prototype.dbsize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.dbsize(args);
        return this;
    };
    ConnRedisMulti.prototype.auth = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.auth(args);
        return this;
    };
    ConnRedisMulti.prototype.ping = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.ping(args);
        return this;
    };
    ConnRedisMulti.prototype.echo = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.echo(args);
        return this;
    };
    ConnRedisMulti.prototype.save = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.save(args);
        return this;
    };
    ConnRedisMulti.prototype.bgsave = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.bgsave(args);
        return this;
    };
    ConnRedisMulti.prototype.bgrewriteaof = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.bgrewriteaof(args);
        return this;
    };
    ConnRedisMulti.prototype.shutdown = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.shutdown(args);
        return this;
    };
    ConnRedisMulti.prototype.lastsave = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.lastsave(args);
        return this;
    };
    ConnRedisMulti.prototype.type = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.type(args);
        return this;
    };
    ConnRedisMulti.prototype.multi = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.multi(args);
        return this;
    };
    ConnRedisMulti.prototype.discard = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.discard(args);
        return this;
    };
    ConnRedisMulti.prototype.sync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sync(args);
        return this;
    };
    ConnRedisMulti.prototype.flushdb = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.flushdb(args);
        return this;
    };
    ConnRedisMulti.prototype.flushall = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.flushall(args);
        return this;
    };
    ConnRedisMulti.prototype.sort = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.sort(args);
        return this;
    };
    ConnRedisMulti.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.info(args);
        return this;
    };
    ConnRedisMulti.prototype.monitor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.monitor(args);
        return this;
    };
    ConnRedisMulti.prototype.ttl = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.ttl(args);
        return this;
    };
    ConnRedisMulti.prototype.persist = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.persist(args);
        return this;
    };
    ConnRedisMulti.prototype.slaveof = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.slaveof(args);
        return this;
    };
    ConnRedisMulti.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.debug(args);
        return this;
    };
    ConnRedisMulti.prototype.config = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.config(args);
        return this;
    };
    ConnRedisMulti.prototype.subscribe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.subscribe(args);
        return this;
    };
    ConnRedisMulti.prototype.unsubscribe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.unsubscribe(args);
        return this;
    };
    ConnRedisMulti.prototype.psubscribe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.psubscribe(args);
        return this;
    };
    ConnRedisMulti.prototype.punsubscribe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.punsubscribe(args);
        return this;
    };
    ConnRedisMulti.prototype.publish = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.publish(args);
        return this;
    };
    ConnRedisMulti.prototype.watch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.watch(args);
        return this;
    };
    ConnRedisMulti.prototype.unwatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.unwatch(args);
        return this;
    };
    ConnRedisMulti.prototype.cluster = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.cluster(args);
        return this;
    };
    ConnRedisMulti.prototype.restore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.restore(args);
        return this;
    };
    ConnRedisMulti.prototype.migrate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.migrate(args);
        return this;
    };
    ConnRedisMulti.prototype.dump = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.dump(args);
        return this;
    };
    ConnRedisMulti.prototype.object = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.object(args);
        return this;
    };
    ConnRedisMulti.prototype.client = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.client(args);
        return this;
    };
    ConnRedisMulti.prototype.eval = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.eval(args);
        return this;
    };
    ConnRedisMulti.prototype.evalsha = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.evalsha(args);
        return this;
    };
    ConnRedisMulti.prototype.quit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.quit(args);
        return this;
    };
    ConnRedisMulti.prototype.scan = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.scan(args);
        return this;
    };
    ConnRedisMulti.prototype.hscan = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.hscan(args);
        return this;
    };
    ConnRedisMulti.prototype.zscan = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.redisMulti.zscan(args);
        return this;
    };
    // support geo
    ConnRedisMulti.prototype.geoadd = function (key, args) {
        var geoArgs = args.map(function (geo) {
            return [geo.longitude, geo.latitude, geo.member];
        });
        var _args = _.flatten([key].concat(geoArgs));
        this.send_command('geoadd', _args);
        return this;
    };
    ConnRedisMulti.prototype.geohash = function (key, args) {
        var _args = [key].concat(args);
        this.send_command('geohash', _args);
        return this;
    };
    ConnRedisMulti.prototype.geopos = function (key, args) {
        var _args = [key].concat(args);
        this.send_command('geopos', _args);
        return this;
    };
    ConnRedisMulti.prototype.geodist = function (key, mem1, mem2, unit) {
        var _args = [key, mem1, mem2, unit].filter(function (k) { return !!k; });
        this.send_command('geopos', _args);
        return this;
    };
    ConnRedisMulti.prototype.georadius = function (key, longitude, latitude, radius, unit, withCoord, withDist, withHash, count, order) {
        var _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        var _withDist = withDist == true ? 'WITHDIST' : undefined;
        var _withHash = withHash == true ? 'WITHHASH' : undefined;
        var _count = (!!count && count > 0) ? ['COUNT', count] : [];
        var args = [key, longitude, latitude, radius, unit, _withCoord, _withDist, _withHash].concat(_count, [order]).filter(function (k) { return !!k; });
        this.send_command('georadius', args);
        return this;
    };
    ConnRedisMulti.prototype.georadiusbymember = function (key, member, radius, unit, withCoord, withDist, withHash, count, order) {
        var _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        var _withDist = withDist == true ? 'WITHDIST' : undefined;
        var _withHash = withHash == true ? 'WITHHASH' : undefined;
        var _count = (!!count && count > 0) ? ['COUNT', count] : [];
        var args = [key, member, radius, unit, _withCoord, _withDist, _withHash].concat(_count, [order]).filter(function (k) { return !!k; });
        this.send_command('georadius', args);
        return this;
    };
    ConnRedisMulti.prototype.exec = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.redisMulti.exec(function (err, ret) {
                if (!err) {
                    resolve(ret);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    return ConnRedisMulti;
}());
function createConnRedis(redisClient) {
    return new ConnRedis(redisClient);
}
exports.createConnRedis = createConnRedis;
exports["default"] = createConnRedis;
