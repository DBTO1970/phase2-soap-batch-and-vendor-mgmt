
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SoapBatch
 * 
 */
export type SoapBatch = $Result.DefaultSelection<Prisma.$SoapBatchPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more SoapBatches
 * const soapBatches = await prisma.soapBatch.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more SoapBatches
   * const soapBatches = await prisma.soapBatch.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.soapBatch`: Exposes CRUD operations for the **SoapBatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SoapBatches
    * const soapBatches = await prisma.soapBatch.findMany()
    * ```
    */
  get soapBatch(): Prisma.SoapBatchDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SoapBatch: 'SoapBatch'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "soapBatch"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SoapBatch: {
        payload: Prisma.$SoapBatchPayload<ExtArgs>
        fields: Prisma.SoapBatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SoapBatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SoapBatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>
          }
          findFirst: {
            args: Prisma.SoapBatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SoapBatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>
          }
          findMany: {
            args: Prisma.SoapBatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>[]
          }
          create: {
            args: Prisma.SoapBatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>
          }
          createMany: {
            args: Prisma.SoapBatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SoapBatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>[]
          }
          delete: {
            args: Prisma.SoapBatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>
          }
          update: {
            args: Prisma.SoapBatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>
          }
          deleteMany: {
            args: Prisma.SoapBatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SoapBatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SoapBatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>[]
          }
          upsert: {
            args: Prisma.SoapBatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoapBatchPayload>
          }
          aggregate: {
            args: Prisma.SoapBatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoapBatch>
          }
          groupBy: {
            args: Prisma.SoapBatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<SoapBatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.SoapBatchCountArgs<ExtArgs>
            result: $Utils.Optional<SoapBatchCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    soapBatch?: SoapBatchOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model SoapBatch
   */

  export type AggregateSoapBatch = {
    _count: SoapBatchCountAggregateOutputType | null
    _avg: SoapBatchAvgAggregateOutputType | null
    _sum: SoapBatchSumAggregateOutputType | null
    _min: SoapBatchMinAggregateOutputType | null
    _max: SoapBatchMaxAggregateOutputType | null
  }

  export type SoapBatchAvgAggregateOutputType = {
    onHandLabeled: number | null
    onHandUnlabeled: number | null
    waterOz: number | null
    fragranceAmountOz: number | null
    oilTemp: number | null
    lyeTemp: number | null
  }

  export type SoapBatchSumAggregateOutputType = {
    onHandLabeled: number | null
    onHandUnlabeled: number | null
    waterOz: number | null
    fragranceAmountOz: number | null
    oilTemp: number | null
    lyeTemp: number | null
  }

  export type SoapBatchMinAggregateOutputType = {
    id: string | null
    sheetId: string | null
    name: string | null
    recipe: string | null
    onHandLabeled: number | null
    onHandUnlabeled: number | null
    madeDate: Date | null
    readyDate: Date | null
    waterOz: number | null
    additionalIngredients: string | null
    fragranceOil: string | null
    fragranceAmountOz: number | null
    colorDesign: string | null
    oilTemp: number | null
    lyeTemp: number | null
    notes: string | null
    updatedAt: Date | null
  }

  export type SoapBatchMaxAggregateOutputType = {
    id: string | null
    sheetId: string | null
    name: string | null
    recipe: string | null
    onHandLabeled: number | null
    onHandUnlabeled: number | null
    madeDate: Date | null
    readyDate: Date | null
    waterOz: number | null
    additionalIngredients: string | null
    fragranceOil: string | null
    fragranceAmountOz: number | null
    colorDesign: string | null
    oilTemp: number | null
    lyeTemp: number | null
    notes: string | null
    updatedAt: Date | null
  }

  export type SoapBatchCountAggregateOutputType = {
    id: number
    sheetId: number
    name: number
    recipe: number
    onHandLabeled: number
    onHandUnlabeled: number
    madeDate: number
    readyDate: number
    waterOz: number
    additionalIngredients: number
    fragranceOil: number
    fragranceAmountOz: number
    colorDesign: number
    oilTemp: number
    lyeTemp: number
    notes: number
    updatedAt: number
    _all: number
  }


  export type SoapBatchAvgAggregateInputType = {
    onHandLabeled?: true
    onHandUnlabeled?: true
    waterOz?: true
    fragranceAmountOz?: true
    oilTemp?: true
    lyeTemp?: true
  }

  export type SoapBatchSumAggregateInputType = {
    onHandLabeled?: true
    onHandUnlabeled?: true
    waterOz?: true
    fragranceAmountOz?: true
    oilTemp?: true
    lyeTemp?: true
  }

  export type SoapBatchMinAggregateInputType = {
    id?: true
    sheetId?: true
    name?: true
    recipe?: true
    onHandLabeled?: true
    onHandUnlabeled?: true
    madeDate?: true
    readyDate?: true
    waterOz?: true
    additionalIngredients?: true
    fragranceOil?: true
    fragranceAmountOz?: true
    colorDesign?: true
    oilTemp?: true
    lyeTemp?: true
    notes?: true
    updatedAt?: true
  }

  export type SoapBatchMaxAggregateInputType = {
    id?: true
    sheetId?: true
    name?: true
    recipe?: true
    onHandLabeled?: true
    onHandUnlabeled?: true
    madeDate?: true
    readyDate?: true
    waterOz?: true
    additionalIngredients?: true
    fragranceOil?: true
    fragranceAmountOz?: true
    colorDesign?: true
    oilTemp?: true
    lyeTemp?: true
    notes?: true
    updatedAt?: true
  }

  export type SoapBatchCountAggregateInputType = {
    id?: true
    sheetId?: true
    name?: true
    recipe?: true
    onHandLabeled?: true
    onHandUnlabeled?: true
    madeDate?: true
    readyDate?: true
    waterOz?: true
    additionalIngredients?: true
    fragranceOil?: true
    fragranceAmountOz?: true
    colorDesign?: true
    oilTemp?: true
    lyeTemp?: true
    notes?: true
    updatedAt?: true
    _all?: true
  }

  export type SoapBatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoapBatch to aggregate.
     */
    where?: SoapBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoapBatches to fetch.
     */
    orderBy?: SoapBatchOrderByWithRelationInput | SoapBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SoapBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoapBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoapBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SoapBatches
    **/
    _count?: true | SoapBatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SoapBatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SoapBatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SoapBatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SoapBatchMaxAggregateInputType
  }

  export type GetSoapBatchAggregateType<T extends SoapBatchAggregateArgs> = {
        [P in keyof T & keyof AggregateSoapBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoapBatch[P]>
      : GetScalarType<T[P], AggregateSoapBatch[P]>
  }




  export type SoapBatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoapBatchWhereInput
    orderBy?: SoapBatchOrderByWithAggregationInput | SoapBatchOrderByWithAggregationInput[]
    by: SoapBatchScalarFieldEnum[] | SoapBatchScalarFieldEnum
    having?: SoapBatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SoapBatchCountAggregateInputType | true
    _avg?: SoapBatchAvgAggregateInputType
    _sum?: SoapBatchSumAggregateInputType
    _min?: SoapBatchMinAggregateInputType
    _max?: SoapBatchMaxAggregateInputType
  }

  export type SoapBatchGroupByOutputType = {
    id: string
    sheetId: string
    name: string
    recipe: string | null
    onHandLabeled: number | null
    onHandUnlabeled: number | null
    madeDate: Date | null
    readyDate: Date | null
    waterOz: number | null
    additionalIngredients: string | null
    fragranceOil: string | null
    fragranceAmountOz: number | null
    colorDesign: string | null
    oilTemp: number | null
    lyeTemp: number | null
    notes: string | null
    updatedAt: Date
    _count: SoapBatchCountAggregateOutputType | null
    _avg: SoapBatchAvgAggregateOutputType | null
    _sum: SoapBatchSumAggregateOutputType | null
    _min: SoapBatchMinAggregateOutputType | null
    _max: SoapBatchMaxAggregateOutputType | null
  }

  type GetSoapBatchGroupByPayload<T extends SoapBatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoapBatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SoapBatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SoapBatchGroupByOutputType[P]>
            : GetScalarType<T[P], SoapBatchGroupByOutputType[P]>
        }
      >
    >


  export type SoapBatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sheetId?: boolean
    name?: boolean
    recipe?: boolean
    onHandLabeled?: boolean
    onHandUnlabeled?: boolean
    madeDate?: boolean
    readyDate?: boolean
    waterOz?: boolean
    additionalIngredients?: boolean
    fragranceOil?: boolean
    fragranceAmountOz?: boolean
    colorDesign?: boolean
    oilTemp?: boolean
    lyeTemp?: boolean
    notes?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soapBatch"]>

  export type SoapBatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sheetId?: boolean
    name?: boolean
    recipe?: boolean
    onHandLabeled?: boolean
    onHandUnlabeled?: boolean
    madeDate?: boolean
    readyDate?: boolean
    waterOz?: boolean
    additionalIngredients?: boolean
    fragranceOil?: boolean
    fragranceAmountOz?: boolean
    colorDesign?: boolean
    oilTemp?: boolean
    lyeTemp?: boolean
    notes?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soapBatch"]>

  export type SoapBatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sheetId?: boolean
    name?: boolean
    recipe?: boolean
    onHandLabeled?: boolean
    onHandUnlabeled?: boolean
    madeDate?: boolean
    readyDate?: boolean
    waterOz?: boolean
    additionalIngredients?: boolean
    fragranceOil?: boolean
    fragranceAmountOz?: boolean
    colorDesign?: boolean
    oilTemp?: boolean
    lyeTemp?: boolean
    notes?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soapBatch"]>

  export type SoapBatchSelectScalar = {
    id?: boolean
    sheetId?: boolean
    name?: boolean
    recipe?: boolean
    onHandLabeled?: boolean
    onHandUnlabeled?: boolean
    madeDate?: boolean
    readyDate?: boolean
    waterOz?: boolean
    additionalIngredients?: boolean
    fragranceOil?: boolean
    fragranceAmountOz?: boolean
    colorDesign?: boolean
    oilTemp?: boolean
    lyeTemp?: boolean
    notes?: boolean
    updatedAt?: boolean
  }

  export type SoapBatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sheetId" | "name" | "recipe" | "onHandLabeled" | "onHandUnlabeled" | "madeDate" | "readyDate" | "waterOz" | "additionalIngredients" | "fragranceOil" | "fragranceAmountOz" | "colorDesign" | "oilTemp" | "lyeTemp" | "notes" | "updatedAt", ExtArgs["result"]["soapBatch"]>

  export type $SoapBatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SoapBatch"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sheetId: string
      name: string
      recipe: string | null
      onHandLabeled: number | null
      onHandUnlabeled: number | null
      madeDate: Date | null
      readyDate: Date | null
      waterOz: number | null
      additionalIngredients: string | null
      fragranceOil: string | null
      fragranceAmountOz: number | null
      colorDesign: string | null
      oilTemp: number | null
      lyeTemp: number | null
      notes: string | null
      updatedAt: Date
    }, ExtArgs["result"]["soapBatch"]>
    composites: {}
  }

  type SoapBatchGetPayload<S extends boolean | null | undefined | SoapBatchDefaultArgs> = $Result.GetResult<Prisma.$SoapBatchPayload, S>

  type SoapBatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SoapBatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SoapBatchCountAggregateInputType | true
    }

  export interface SoapBatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SoapBatch'], meta: { name: 'SoapBatch' } }
    /**
     * Find zero or one SoapBatch that matches the filter.
     * @param {SoapBatchFindUniqueArgs} args - Arguments to find a SoapBatch
     * @example
     * // Get one SoapBatch
     * const soapBatch = await prisma.soapBatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SoapBatchFindUniqueArgs>(args: SelectSubset<T, SoapBatchFindUniqueArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SoapBatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SoapBatchFindUniqueOrThrowArgs} args - Arguments to find a SoapBatch
     * @example
     * // Get one SoapBatch
     * const soapBatch = await prisma.soapBatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SoapBatchFindUniqueOrThrowArgs>(args: SelectSubset<T, SoapBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoapBatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoapBatchFindFirstArgs} args - Arguments to find a SoapBatch
     * @example
     * // Get one SoapBatch
     * const soapBatch = await prisma.soapBatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SoapBatchFindFirstArgs>(args?: SelectSubset<T, SoapBatchFindFirstArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoapBatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoapBatchFindFirstOrThrowArgs} args - Arguments to find a SoapBatch
     * @example
     * // Get one SoapBatch
     * const soapBatch = await prisma.soapBatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SoapBatchFindFirstOrThrowArgs>(args?: SelectSubset<T, SoapBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SoapBatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoapBatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SoapBatches
     * const soapBatches = await prisma.soapBatch.findMany()
     * 
     * // Get first 10 SoapBatches
     * const soapBatches = await prisma.soapBatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const soapBatchWithIdOnly = await prisma.soapBatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SoapBatchFindManyArgs>(args?: SelectSubset<T, SoapBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SoapBatch.
     * @param {SoapBatchCreateArgs} args - Arguments to create a SoapBatch.
     * @example
     * // Create one SoapBatch
     * const SoapBatch = await prisma.soapBatch.create({
     *   data: {
     *     // ... data to create a SoapBatch
     *   }
     * })
     * 
     */
    create<T extends SoapBatchCreateArgs>(args: SelectSubset<T, SoapBatchCreateArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SoapBatches.
     * @param {SoapBatchCreateManyArgs} args - Arguments to create many SoapBatches.
     * @example
     * // Create many SoapBatches
     * const soapBatch = await prisma.soapBatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SoapBatchCreateManyArgs>(args?: SelectSubset<T, SoapBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SoapBatches and returns the data saved in the database.
     * @param {SoapBatchCreateManyAndReturnArgs} args - Arguments to create many SoapBatches.
     * @example
     * // Create many SoapBatches
     * const soapBatch = await prisma.soapBatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SoapBatches and only return the `id`
     * const soapBatchWithIdOnly = await prisma.soapBatch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SoapBatchCreateManyAndReturnArgs>(args?: SelectSubset<T, SoapBatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SoapBatch.
     * @param {SoapBatchDeleteArgs} args - Arguments to delete one SoapBatch.
     * @example
     * // Delete one SoapBatch
     * const SoapBatch = await prisma.soapBatch.delete({
     *   where: {
     *     // ... filter to delete one SoapBatch
     *   }
     * })
     * 
     */
    delete<T extends SoapBatchDeleteArgs>(args: SelectSubset<T, SoapBatchDeleteArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SoapBatch.
     * @param {SoapBatchUpdateArgs} args - Arguments to update one SoapBatch.
     * @example
     * // Update one SoapBatch
     * const soapBatch = await prisma.soapBatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SoapBatchUpdateArgs>(args: SelectSubset<T, SoapBatchUpdateArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SoapBatches.
     * @param {SoapBatchDeleteManyArgs} args - Arguments to filter SoapBatches to delete.
     * @example
     * // Delete a few SoapBatches
     * const { count } = await prisma.soapBatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SoapBatchDeleteManyArgs>(args?: SelectSubset<T, SoapBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoapBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoapBatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SoapBatches
     * const soapBatch = await prisma.soapBatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SoapBatchUpdateManyArgs>(args: SelectSubset<T, SoapBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoapBatches and returns the data updated in the database.
     * @param {SoapBatchUpdateManyAndReturnArgs} args - Arguments to update many SoapBatches.
     * @example
     * // Update many SoapBatches
     * const soapBatch = await prisma.soapBatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SoapBatches and only return the `id`
     * const soapBatchWithIdOnly = await prisma.soapBatch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SoapBatchUpdateManyAndReturnArgs>(args: SelectSubset<T, SoapBatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SoapBatch.
     * @param {SoapBatchUpsertArgs} args - Arguments to update or create a SoapBatch.
     * @example
     * // Update or create a SoapBatch
     * const soapBatch = await prisma.soapBatch.upsert({
     *   create: {
     *     // ... data to create a SoapBatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SoapBatch we want to update
     *   }
     * })
     */
    upsert<T extends SoapBatchUpsertArgs>(args: SelectSubset<T, SoapBatchUpsertArgs<ExtArgs>>): Prisma__SoapBatchClient<$Result.GetResult<Prisma.$SoapBatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SoapBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoapBatchCountArgs} args - Arguments to filter SoapBatches to count.
     * @example
     * // Count the number of SoapBatches
     * const count = await prisma.soapBatch.count({
     *   where: {
     *     // ... the filter for the SoapBatches we want to count
     *   }
     * })
    **/
    count<T extends SoapBatchCountArgs>(
      args?: Subset<T, SoapBatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoapBatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SoapBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoapBatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SoapBatchAggregateArgs>(args: Subset<T, SoapBatchAggregateArgs>): Prisma.PrismaPromise<GetSoapBatchAggregateType<T>>

    /**
     * Group by SoapBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoapBatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SoapBatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SoapBatchGroupByArgs['orderBy'] }
        : { orderBy?: SoapBatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SoapBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoapBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SoapBatch model
   */
  readonly fields: SoapBatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SoapBatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SoapBatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SoapBatch model
   */
  interface SoapBatchFieldRefs {
    readonly id: FieldRef<"SoapBatch", 'String'>
    readonly sheetId: FieldRef<"SoapBatch", 'String'>
    readonly name: FieldRef<"SoapBatch", 'String'>
    readonly recipe: FieldRef<"SoapBatch", 'String'>
    readonly onHandLabeled: FieldRef<"SoapBatch", 'Int'>
    readonly onHandUnlabeled: FieldRef<"SoapBatch", 'Int'>
    readonly madeDate: FieldRef<"SoapBatch", 'DateTime'>
    readonly readyDate: FieldRef<"SoapBatch", 'DateTime'>
    readonly waterOz: FieldRef<"SoapBatch", 'Float'>
    readonly additionalIngredients: FieldRef<"SoapBatch", 'String'>
    readonly fragranceOil: FieldRef<"SoapBatch", 'String'>
    readonly fragranceAmountOz: FieldRef<"SoapBatch", 'Float'>
    readonly colorDesign: FieldRef<"SoapBatch", 'String'>
    readonly oilTemp: FieldRef<"SoapBatch", 'Float'>
    readonly lyeTemp: FieldRef<"SoapBatch", 'Float'>
    readonly notes: FieldRef<"SoapBatch", 'String'>
    readonly updatedAt: FieldRef<"SoapBatch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SoapBatch findUnique
   */
  export type SoapBatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * Filter, which SoapBatch to fetch.
     */
    where: SoapBatchWhereUniqueInput
  }

  /**
   * SoapBatch findUniqueOrThrow
   */
  export type SoapBatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * Filter, which SoapBatch to fetch.
     */
    where: SoapBatchWhereUniqueInput
  }

  /**
   * SoapBatch findFirst
   */
  export type SoapBatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * Filter, which SoapBatch to fetch.
     */
    where?: SoapBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoapBatches to fetch.
     */
    orderBy?: SoapBatchOrderByWithRelationInput | SoapBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoapBatches.
     */
    cursor?: SoapBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoapBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoapBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoapBatches.
     */
    distinct?: SoapBatchScalarFieldEnum | SoapBatchScalarFieldEnum[]
  }

  /**
   * SoapBatch findFirstOrThrow
   */
  export type SoapBatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * Filter, which SoapBatch to fetch.
     */
    where?: SoapBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoapBatches to fetch.
     */
    orderBy?: SoapBatchOrderByWithRelationInput | SoapBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoapBatches.
     */
    cursor?: SoapBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoapBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoapBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoapBatches.
     */
    distinct?: SoapBatchScalarFieldEnum | SoapBatchScalarFieldEnum[]
  }

  /**
   * SoapBatch findMany
   */
  export type SoapBatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * Filter, which SoapBatches to fetch.
     */
    where?: SoapBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoapBatches to fetch.
     */
    orderBy?: SoapBatchOrderByWithRelationInput | SoapBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SoapBatches.
     */
    cursor?: SoapBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoapBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoapBatches.
     */
    skip?: number
    distinct?: SoapBatchScalarFieldEnum | SoapBatchScalarFieldEnum[]
  }

  /**
   * SoapBatch create
   */
  export type SoapBatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * The data needed to create a SoapBatch.
     */
    data: XOR<SoapBatchCreateInput, SoapBatchUncheckedCreateInput>
  }

  /**
   * SoapBatch createMany
   */
  export type SoapBatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SoapBatches.
     */
    data: SoapBatchCreateManyInput | SoapBatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SoapBatch createManyAndReturn
   */
  export type SoapBatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * The data used to create many SoapBatches.
     */
    data: SoapBatchCreateManyInput | SoapBatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SoapBatch update
   */
  export type SoapBatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * The data needed to update a SoapBatch.
     */
    data: XOR<SoapBatchUpdateInput, SoapBatchUncheckedUpdateInput>
    /**
     * Choose, which SoapBatch to update.
     */
    where: SoapBatchWhereUniqueInput
  }

  /**
   * SoapBatch updateMany
   */
  export type SoapBatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SoapBatches.
     */
    data: XOR<SoapBatchUpdateManyMutationInput, SoapBatchUncheckedUpdateManyInput>
    /**
     * Filter which SoapBatches to update
     */
    where?: SoapBatchWhereInput
    /**
     * Limit how many SoapBatches to update.
     */
    limit?: number
  }

  /**
   * SoapBatch updateManyAndReturn
   */
  export type SoapBatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * The data used to update SoapBatches.
     */
    data: XOR<SoapBatchUpdateManyMutationInput, SoapBatchUncheckedUpdateManyInput>
    /**
     * Filter which SoapBatches to update
     */
    where?: SoapBatchWhereInput
    /**
     * Limit how many SoapBatches to update.
     */
    limit?: number
  }

  /**
   * SoapBatch upsert
   */
  export type SoapBatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * The filter to search for the SoapBatch to update in case it exists.
     */
    where: SoapBatchWhereUniqueInput
    /**
     * In case the SoapBatch found by the `where` argument doesn't exist, create a new SoapBatch with this data.
     */
    create: XOR<SoapBatchCreateInput, SoapBatchUncheckedCreateInput>
    /**
     * In case the SoapBatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SoapBatchUpdateInput, SoapBatchUncheckedUpdateInput>
  }

  /**
   * SoapBatch delete
   */
  export type SoapBatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
    /**
     * Filter which SoapBatch to delete.
     */
    where: SoapBatchWhereUniqueInput
  }

  /**
   * SoapBatch deleteMany
   */
  export type SoapBatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoapBatches to delete
     */
    where?: SoapBatchWhereInput
    /**
     * Limit how many SoapBatches to delete.
     */
    limit?: number
  }

  /**
   * SoapBatch without action
   */
  export type SoapBatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoapBatch
     */
    select?: SoapBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoapBatch
     */
    omit?: SoapBatchOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SoapBatchScalarFieldEnum: {
    id: 'id',
    sheetId: 'sheetId',
    name: 'name',
    recipe: 'recipe',
    onHandLabeled: 'onHandLabeled',
    onHandUnlabeled: 'onHandUnlabeled',
    madeDate: 'madeDate',
    readyDate: 'readyDate',
    waterOz: 'waterOz',
    additionalIngredients: 'additionalIngredients',
    fragranceOil: 'fragranceOil',
    fragranceAmountOz: 'fragranceAmountOz',
    colorDesign: 'colorDesign',
    oilTemp: 'oilTemp',
    lyeTemp: 'lyeTemp',
    notes: 'notes',
    updatedAt: 'updatedAt'
  };

  export type SoapBatchScalarFieldEnum = (typeof SoapBatchScalarFieldEnum)[keyof typeof SoapBatchScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SoapBatchWhereInput = {
    AND?: SoapBatchWhereInput | SoapBatchWhereInput[]
    OR?: SoapBatchWhereInput[]
    NOT?: SoapBatchWhereInput | SoapBatchWhereInput[]
    id?: StringFilter<"SoapBatch"> | string
    sheetId?: StringFilter<"SoapBatch"> | string
    name?: StringFilter<"SoapBatch"> | string
    recipe?: StringNullableFilter<"SoapBatch"> | string | null
    onHandLabeled?: IntNullableFilter<"SoapBatch"> | number | null
    onHandUnlabeled?: IntNullableFilter<"SoapBatch"> | number | null
    madeDate?: DateTimeNullableFilter<"SoapBatch"> | Date | string | null
    readyDate?: DateTimeNullableFilter<"SoapBatch"> | Date | string | null
    waterOz?: FloatNullableFilter<"SoapBatch"> | number | null
    additionalIngredients?: StringNullableFilter<"SoapBatch"> | string | null
    fragranceOil?: StringNullableFilter<"SoapBatch"> | string | null
    fragranceAmountOz?: FloatNullableFilter<"SoapBatch"> | number | null
    colorDesign?: StringNullableFilter<"SoapBatch"> | string | null
    oilTemp?: FloatNullableFilter<"SoapBatch"> | number | null
    lyeTemp?: FloatNullableFilter<"SoapBatch"> | number | null
    notes?: StringNullableFilter<"SoapBatch"> | string | null
    updatedAt?: DateTimeFilter<"SoapBatch"> | Date | string
  }

  export type SoapBatchOrderByWithRelationInput = {
    id?: SortOrder
    sheetId?: SortOrder
    name?: SortOrder
    recipe?: SortOrderInput | SortOrder
    onHandLabeled?: SortOrderInput | SortOrder
    onHandUnlabeled?: SortOrderInput | SortOrder
    madeDate?: SortOrderInput | SortOrder
    readyDate?: SortOrderInput | SortOrder
    waterOz?: SortOrderInput | SortOrder
    additionalIngredients?: SortOrderInput | SortOrder
    fragranceOil?: SortOrderInput | SortOrder
    fragranceAmountOz?: SortOrderInput | SortOrder
    colorDesign?: SortOrderInput | SortOrder
    oilTemp?: SortOrderInput | SortOrder
    lyeTemp?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type SoapBatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sheetId?: string
    AND?: SoapBatchWhereInput | SoapBatchWhereInput[]
    OR?: SoapBatchWhereInput[]
    NOT?: SoapBatchWhereInput | SoapBatchWhereInput[]
    name?: StringFilter<"SoapBatch"> | string
    recipe?: StringNullableFilter<"SoapBatch"> | string | null
    onHandLabeled?: IntNullableFilter<"SoapBatch"> | number | null
    onHandUnlabeled?: IntNullableFilter<"SoapBatch"> | number | null
    madeDate?: DateTimeNullableFilter<"SoapBatch"> | Date | string | null
    readyDate?: DateTimeNullableFilter<"SoapBatch"> | Date | string | null
    waterOz?: FloatNullableFilter<"SoapBatch"> | number | null
    additionalIngredients?: StringNullableFilter<"SoapBatch"> | string | null
    fragranceOil?: StringNullableFilter<"SoapBatch"> | string | null
    fragranceAmountOz?: FloatNullableFilter<"SoapBatch"> | number | null
    colorDesign?: StringNullableFilter<"SoapBatch"> | string | null
    oilTemp?: FloatNullableFilter<"SoapBatch"> | number | null
    lyeTemp?: FloatNullableFilter<"SoapBatch"> | number | null
    notes?: StringNullableFilter<"SoapBatch"> | string | null
    updatedAt?: DateTimeFilter<"SoapBatch"> | Date | string
  }, "id" | "sheetId">

  export type SoapBatchOrderByWithAggregationInput = {
    id?: SortOrder
    sheetId?: SortOrder
    name?: SortOrder
    recipe?: SortOrderInput | SortOrder
    onHandLabeled?: SortOrderInput | SortOrder
    onHandUnlabeled?: SortOrderInput | SortOrder
    madeDate?: SortOrderInput | SortOrder
    readyDate?: SortOrderInput | SortOrder
    waterOz?: SortOrderInput | SortOrder
    additionalIngredients?: SortOrderInput | SortOrder
    fragranceOil?: SortOrderInput | SortOrder
    fragranceAmountOz?: SortOrderInput | SortOrder
    colorDesign?: SortOrderInput | SortOrder
    oilTemp?: SortOrderInput | SortOrder
    lyeTemp?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: SoapBatchCountOrderByAggregateInput
    _avg?: SoapBatchAvgOrderByAggregateInput
    _max?: SoapBatchMaxOrderByAggregateInput
    _min?: SoapBatchMinOrderByAggregateInput
    _sum?: SoapBatchSumOrderByAggregateInput
  }

  export type SoapBatchScalarWhereWithAggregatesInput = {
    AND?: SoapBatchScalarWhereWithAggregatesInput | SoapBatchScalarWhereWithAggregatesInput[]
    OR?: SoapBatchScalarWhereWithAggregatesInput[]
    NOT?: SoapBatchScalarWhereWithAggregatesInput | SoapBatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SoapBatch"> | string
    sheetId?: StringWithAggregatesFilter<"SoapBatch"> | string
    name?: StringWithAggregatesFilter<"SoapBatch"> | string
    recipe?: StringNullableWithAggregatesFilter<"SoapBatch"> | string | null
    onHandLabeled?: IntNullableWithAggregatesFilter<"SoapBatch"> | number | null
    onHandUnlabeled?: IntNullableWithAggregatesFilter<"SoapBatch"> | number | null
    madeDate?: DateTimeNullableWithAggregatesFilter<"SoapBatch"> | Date | string | null
    readyDate?: DateTimeNullableWithAggregatesFilter<"SoapBatch"> | Date | string | null
    waterOz?: FloatNullableWithAggregatesFilter<"SoapBatch"> | number | null
    additionalIngredients?: StringNullableWithAggregatesFilter<"SoapBatch"> | string | null
    fragranceOil?: StringNullableWithAggregatesFilter<"SoapBatch"> | string | null
    fragranceAmountOz?: FloatNullableWithAggregatesFilter<"SoapBatch"> | number | null
    colorDesign?: StringNullableWithAggregatesFilter<"SoapBatch"> | string | null
    oilTemp?: FloatNullableWithAggregatesFilter<"SoapBatch"> | number | null
    lyeTemp?: FloatNullableWithAggregatesFilter<"SoapBatch"> | number | null
    notes?: StringNullableWithAggregatesFilter<"SoapBatch"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"SoapBatch"> | Date | string
  }

  export type SoapBatchCreateInput = {
    id?: string
    sheetId: string
    name: string
    recipe?: string | null
    onHandLabeled?: number | null
    onHandUnlabeled?: number | null
    madeDate?: Date | string | null
    readyDate?: Date | string | null
    waterOz?: number | null
    additionalIngredients?: string | null
    fragranceOil?: string | null
    fragranceAmountOz?: number | null
    colorDesign?: string | null
    oilTemp?: number | null
    lyeTemp?: number | null
    notes?: string | null
    updatedAt?: Date | string
  }

  export type SoapBatchUncheckedCreateInput = {
    id?: string
    sheetId: string
    name: string
    recipe?: string | null
    onHandLabeled?: number | null
    onHandUnlabeled?: number | null
    madeDate?: Date | string | null
    readyDate?: Date | string | null
    waterOz?: number | null
    additionalIngredients?: string | null
    fragranceOil?: string | null
    fragranceAmountOz?: number | null
    colorDesign?: string | null
    oilTemp?: number | null
    lyeTemp?: number | null
    notes?: string | null
    updatedAt?: Date | string
  }

  export type SoapBatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sheetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recipe?: NullableStringFieldUpdateOperationsInput | string | null
    onHandLabeled?: NullableIntFieldUpdateOperationsInput | number | null
    onHandUnlabeled?: NullableIntFieldUpdateOperationsInput | number | null
    madeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waterOz?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceOil?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceAmountOz?: NullableFloatFieldUpdateOperationsInput | number | null
    colorDesign?: NullableStringFieldUpdateOperationsInput | string | null
    oilTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    lyeTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoapBatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sheetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recipe?: NullableStringFieldUpdateOperationsInput | string | null
    onHandLabeled?: NullableIntFieldUpdateOperationsInput | number | null
    onHandUnlabeled?: NullableIntFieldUpdateOperationsInput | number | null
    madeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waterOz?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceOil?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceAmountOz?: NullableFloatFieldUpdateOperationsInput | number | null
    colorDesign?: NullableStringFieldUpdateOperationsInput | string | null
    oilTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    lyeTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoapBatchCreateManyInput = {
    id?: string
    sheetId: string
    name: string
    recipe?: string | null
    onHandLabeled?: number | null
    onHandUnlabeled?: number | null
    madeDate?: Date | string | null
    readyDate?: Date | string | null
    waterOz?: number | null
    additionalIngredients?: string | null
    fragranceOil?: string | null
    fragranceAmountOz?: number | null
    colorDesign?: string | null
    oilTemp?: number | null
    lyeTemp?: number | null
    notes?: string | null
    updatedAt?: Date | string
  }

  export type SoapBatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sheetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recipe?: NullableStringFieldUpdateOperationsInput | string | null
    onHandLabeled?: NullableIntFieldUpdateOperationsInput | number | null
    onHandUnlabeled?: NullableIntFieldUpdateOperationsInput | number | null
    madeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waterOz?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceOil?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceAmountOz?: NullableFloatFieldUpdateOperationsInput | number | null
    colorDesign?: NullableStringFieldUpdateOperationsInput | string | null
    oilTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    lyeTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoapBatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sheetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recipe?: NullableStringFieldUpdateOperationsInput | string | null
    onHandLabeled?: NullableIntFieldUpdateOperationsInput | number | null
    onHandUnlabeled?: NullableIntFieldUpdateOperationsInput | number | null
    madeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waterOz?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceOil?: NullableStringFieldUpdateOperationsInput | string | null
    fragranceAmountOz?: NullableFloatFieldUpdateOperationsInput | number | null
    colorDesign?: NullableStringFieldUpdateOperationsInput | string | null
    oilTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    lyeTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SoapBatchCountOrderByAggregateInput = {
    id?: SortOrder
    sheetId?: SortOrder
    name?: SortOrder
    recipe?: SortOrder
    onHandLabeled?: SortOrder
    onHandUnlabeled?: SortOrder
    madeDate?: SortOrder
    readyDate?: SortOrder
    waterOz?: SortOrder
    additionalIngredients?: SortOrder
    fragranceOil?: SortOrder
    fragranceAmountOz?: SortOrder
    colorDesign?: SortOrder
    oilTemp?: SortOrder
    lyeTemp?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoapBatchAvgOrderByAggregateInput = {
    onHandLabeled?: SortOrder
    onHandUnlabeled?: SortOrder
    waterOz?: SortOrder
    fragranceAmountOz?: SortOrder
    oilTemp?: SortOrder
    lyeTemp?: SortOrder
  }

  export type SoapBatchMaxOrderByAggregateInput = {
    id?: SortOrder
    sheetId?: SortOrder
    name?: SortOrder
    recipe?: SortOrder
    onHandLabeled?: SortOrder
    onHandUnlabeled?: SortOrder
    madeDate?: SortOrder
    readyDate?: SortOrder
    waterOz?: SortOrder
    additionalIngredients?: SortOrder
    fragranceOil?: SortOrder
    fragranceAmountOz?: SortOrder
    colorDesign?: SortOrder
    oilTemp?: SortOrder
    lyeTemp?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoapBatchMinOrderByAggregateInput = {
    id?: SortOrder
    sheetId?: SortOrder
    name?: SortOrder
    recipe?: SortOrder
    onHandLabeled?: SortOrder
    onHandUnlabeled?: SortOrder
    madeDate?: SortOrder
    readyDate?: SortOrder
    waterOz?: SortOrder
    additionalIngredients?: SortOrder
    fragranceOil?: SortOrder
    fragranceAmountOz?: SortOrder
    colorDesign?: SortOrder
    oilTemp?: SortOrder
    lyeTemp?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoapBatchSumOrderByAggregateInput = {
    onHandLabeled?: SortOrder
    onHandUnlabeled?: SortOrder
    waterOz?: SortOrder
    fragranceAmountOz?: SortOrder
    oilTemp?: SortOrder
    lyeTemp?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}