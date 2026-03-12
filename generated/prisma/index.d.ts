
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
 * Model Empresa
 * 
 */
export type Empresa = $Result.DefaultSelection<Prisma.$EmpresaPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model StockMovement
 * 
 */
export type StockMovement = $Result.DefaultSelection<Prisma.$StockMovementPayload>
/**
 * Model Solicitacao
 * 
 */
export type Solicitacao = $Result.DefaultSelection<Prisma.$SolicitacaoPayload>
/**
 * Model Fornecedor
 * 
 */
export type Fornecedor = $Result.DefaultSelection<Prisma.$FornecedorPayload>
/**
 * Model NfeImport
 * 
 */
export type NfeImport = $Result.DefaultSelection<Prisma.$NfeImportPayload>
/**
 * Model NfeImportItem
 * 
 */
export type NfeImportItem = $Result.DefaultSelection<Prisma.$NfeImportItemPayload>
/**
 * Model UserInvite
 * 
 */
export type UserInvite = $Result.DefaultSelection<Prisma.$UserInvitePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Empresas
 * const empresas = await prisma.empresa.findMany()
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
   * // Fetch zero or more Empresas
   * const empresas = await prisma.empresa.findMany()
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
   * `prisma.empresa`: Exposes CRUD operations for the **Empresa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Empresas
    * const empresas = await prisma.empresa.findMany()
    * ```
    */
  get empresa(): Prisma.EmpresaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockMovement`: Exposes CRUD operations for the **StockMovement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockMovements
    * const stockMovements = await prisma.stockMovement.findMany()
    * ```
    */
  get stockMovement(): Prisma.StockMovementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.solicitacao`: Exposes CRUD operations for the **Solicitacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Solicitacaos
    * const solicitacaos = await prisma.solicitacao.findMany()
    * ```
    */
  get solicitacao(): Prisma.SolicitacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fornecedor`: Exposes CRUD operations for the **Fornecedor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fornecedors
    * const fornecedors = await prisma.fornecedor.findMany()
    * ```
    */
  get fornecedor(): Prisma.FornecedorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nfeImport`: Exposes CRUD operations for the **NfeImport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NfeImports
    * const nfeImports = await prisma.nfeImport.findMany()
    * ```
    */
  get nfeImport(): Prisma.NfeImportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nfeImportItem`: Exposes CRUD operations for the **NfeImportItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NfeImportItems
    * const nfeImportItems = await prisma.nfeImportItem.findMany()
    * ```
    */
  get nfeImportItem(): Prisma.NfeImportItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userInvite`: Exposes CRUD operations for the **UserInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInvites
    * const userInvites = await prisma.userInvite.findMany()
    * ```
    */
  get userInvite(): Prisma.UserInviteDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
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
    Empresa: 'Empresa',
    User: 'User',
    Product: 'Product',
    StockMovement: 'StockMovement',
    Solicitacao: 'Solicitacao',
    Fornecedor: 'Fornecedor',
    NfeImport: 'NfeImport',
    NfeImportItem: 'NfeImportItem',
    UserInvite: 'UserInvite'
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
      modelProps: "empresa" | "user" | "product" | "stockMovement" | "solicitacao" | "fornecedor" | "nfeImport" | "nfeImportItem" | "userInvite"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Empresa: {
        payload: Prisma.$EmpresaPayload<ExtArgs>
        fields: Prisma.EmpresaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findFirst: {
            args: Prisma.EmpresaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findMany: {
            args: Prisma.EmpresaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          create: {
            args: Prisma.EmpresaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          createMany: {
            args: Prisma.EmpresaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmpresaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          delete: {
            args: Prisma.EmpresaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          update: {
            args: Prisma.EmpresaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmpresaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          upsert: {
            args: Prisma.EmpresaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          aggregate: {
            args: Prisma.EmpresaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmpresa>
          }
          groupBy: {
            args: Prisma.EmpresaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmpresaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaCountArgs<ExtArgs>
            result: $Utils.Optional<EmpresaCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      StockMovement: {
        payload: Prisma.$StockMovementPayload<ExtArgs>
        fields: Prisma.StockMovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockMovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockMovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findFirst: {
            args: Prisma.StockMovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockMovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findMany: {
            args: Prisma.StockMovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          create: {
            args: Prisma.StockMovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          createMany: {
            args: Prisma.StockMovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockMovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          delete: {
            args: Prisma.StockMovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          update: {
            args: Prisma.StockMovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          deleteMany: {
            args: Prisma.StockMovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockMovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockMovementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          upsert: {
            args: Prisma.StockMovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          aggregate: {
            args: Prisma.StockMovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockMovement>
          }
          groupBy: {
            args: Prisma.StockMovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockMovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockMovementCountArgs<ExtArgs>
            result: $Utils.Optional<StockMovementCountAggregateOutputType> | number
          }
        }
      }
      Solicitacao: {
        payload: Prisma.$SolicitacaoPayload<ExtArgs>
        fields: Prisma.SolicitacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SolicitacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SolicitacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>
          }
          findFirst: {
            args: Prisma.SolicitacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SolicitacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>
          }
          findMany: {
            args: Prisma.SolicitacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>[]
          }
          create: {
            args: Prisma.SolicitacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>
          }
          createMany: {
            args: Prisma.SolicitacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SolicitacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>[]
          }
          delete: {
            args: Prisma.SolicitacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>
          }
          update: {
            args: Prisma.SolicitacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>
          }
          deleteMany: {
            args: Prisma.SolicitacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SolicitacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SolicitacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>[]
          }
          upsert: {
            args: Prisma.SolicitacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacaoPayload>
          }
          aggregate: {
            args: Prisma.SolicitacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSolicitacao>
          }
          groupBy: {
            args: Prisma.SolicitacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<SolicitacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.SolicitacaoCountArgs<ExtArgs>
            result: $Utils.Optional<SolicitacaoCountAggregateOutputType> | number
          }
        }
      }
      Fornecedor: {
        payload: Prisma.$FornecedorPayload<ExtArgs>
        fields: Prisma.FornecedorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FornecedorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FornecedorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>
          }
          findFirst: {
            args: Prisma.FornecedorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FornecedorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>
          }
          findMany: {
            args: Prisma.FornecedorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>[]
          }
          create: {
            args: Prisma.FornecedorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>
          }
          createMany: {
            args: Prisma.FornecedorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FornecedorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>[]
          }
          delete: {
            args: Prisma.FornecedorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>
          }
          update: {
            args: Prisma.FornecedorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>
          }
          deleteMany: {
            args: Prisma.FornecedorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FornecedorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FornecedorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>[]
          }
          upsert: {
            args: Prisma.FornecedorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornecedorPayload>
          }
          aggregate: {
            args: Prisma.FornecedorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFornecedor>
          }
          groupBy: {
            args: Prisma.FornecedorGroupByArgs<ExtArgs>
            result: $Utils.Optional<FornecedorGroupByOutputType>[]
          }
          count: {
            args: Prisma.FornecedorCountArgs<ExtArgs>
            result: $Utils.Optional<FornecedorCountAggregateOutputType> | number
          }
        }
      }
      NfeImport: {
        payload: Prisma.$NfeImportPayload<ExtArgs>
        fields: Prisma.NfeImportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NfeImportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NfeImportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>
          }
          findFirst: {
            args: Prisma.NfeImportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NfeImportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>
          }
          findMany: {
            args: Prisma.NfeImportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>[]
          }
          create: {
            args: Prisma.NfeImportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>
          }
          createMany: {
            args: Prisma.NfeImportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NfeImportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>[]
          }
          delete: {
            args: Prisma.NfeImportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>
          }
          update: {
            args: Prisma.NfeImportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>
          }
          deleteMany: {
            args: Prisma.NfeImportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NfeImportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NfeImportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>[]
          }
          upsert: {
            args: Prisma.NfeImportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportPayload>
          }
          aggregate: {
            args: Prisma.NfeImportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNfeImport>
          }
          groupBy: {
            args: Prisma.NfeImportGroupByArgs<ExtArgs>
            result: $Utils.Optional<NfeImportGroupByOutputType>[]
          }
          count: {
            args: Prisma.NfeImportCountArgs<ExtArgs>
            result: $Utils.Optional<NfeImportCountAggregateOutputType> | number
          }
        }
      }
      NfeImportItem: {
        payload: Prisma.$NfeImportItemPayload<ExtArgs>
        fields: Prisma.NfeImportItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NfeImportItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NfeImportItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>
          }
          findFirst: {
            args: Prisma.NfeImportItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NfeImportItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>
          }
          findMany: {
            args: Prisma.NfeImportItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>[]
          }
          create: {
            args: Prisma.NfeImportItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>
          }
          createMany: {
            args: Prisma.NfeImportItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NfeImportItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>[]
          }
          delete: {
            args: Prisma.NfeImportItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>
          }
          update: {
            args: Prisma.NfeImportItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>
          }
          deleteMany: {
            args: Prisma.NfeImportItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NfeImportItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NfeImportItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>[]
          }
          upsert: {
            args: Prisma.NfeImportItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NfeImportItemPayload>
          }
          aggregate: {
            args: Prisma.NfeImportItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNfeImportItem>
          }
          groupBy: {
            args: Prisma.NfeImportItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<NfeImportItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.NfeImportItemCountArgs<ExtArgs>
            result: $Utils.Optional<NfeImportItemCountAggregateOutputType> | number
          }
        }
      }
      UserInvite: {
        payload: Prisma.$UserInvitePayload<ExtArgs>
        fields: Prisma.UserInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>
          }
          findFirst: {
            args: Prisma.UserInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>
          }
          findMany: {
            args: Prisma.UserInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>[]
          }
          create: {
            args: Prisma.UserInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>
          }
          createMany: {
            args: Prisma.UserInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>[]
          }
          delete: {
            args: Prisma.UserInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>
          }
          update: {
            args: Prisma.UserInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>
          }
          deleteMany: {
            args: Prisma.UserInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>[]
          }
          upsert: {
            args: Prisma.UserInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInvitePayload>
          }
          aggregate: {
            args: Prisma.UserInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserInvite>
          }
          groupBy: {
            args: Prisma.UserInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserInviteCountArgs<ExtArgs>
            result: $Utils.Optional<UserInviteCountAggregateOutputType> | number
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
    empresa?: EmpresaOmit
    user?: UserOmit
    product?: ProductOmit
    stockMovement?: StockMovementOmit
    solicitacao?: SolicitacaoOmit
    fornecedor?: FornecedorOmit
    nfeImport?: NfeImportOmit
    nfeImportItem?: NfeImportItemOmit
    userInvite?: UserInviteOmit
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
   * Count Type EmpresaCountOutputType
   */

  export type EmpresaCountOutputType = {
    convites: number
    usuarios: number
    produtos: number
    movimentacoes: number
    solicitacoes: number
    fornecedores: number
    nfeImports: number
  }

  export type EmpresaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    convites?: boolean | EmpresaCountOutputTypeCountConvitesArgs
    usuarios?: boolean | EmpresaCountOutputTypeCountUsuariosArgs
    produtos?: boolean | EmpresaCountOutputTypeCountProdutosArgs
    movimentacoes?: boolean | EmpresaCountOutputTypeCountMovimentacoesArgs
    solicitacoes?: boolean | EmpresaCountOutputTypeCountSolicitacoesArgs
    fornecedores?: boolean | EmpresaCountOutputTypeCountFornecedoresArgs
    nfeImports?: boolean | EmpresaCountOutputTypeCountNfeImportsArgs
  }

  // Custom InputTypes
  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaCountOutputType
     */
    select?: EmpresaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountConvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInviteWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountProdutosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountMovimentacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountSolicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitacaoWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountFornecedoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FornecedorWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountNfeImportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NfeImportWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    solicitacoes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    solicitacoes?: boolean | UserCountOutputTypeCountSolicitacoesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSolicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitacaoWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    movements: number
    solicitacoes: number
    nfeItens: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movements?: boolean | ProductCountOutputTypeCountMovementsArgs
    solicitacoes?: boolean | ProductCountOutputTypeCountSolicitacoesArgs
    nfeItens?: boolean | ProductCountOutputTypeCountNfeItensArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSolicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitacaoWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountNfeItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NfeImportItemWhereInput
  }


  /**
   * Count Type FornecedorCountOutputType
   */

  export type FornecedorCountOutputType = {
    notasFiscais: number
  }

  export type FornecedorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notasFiscais?: boolean | FornecedorCountOutputTypeCountNotasFiscaisArgs
  }

  // Custom InputTypes
  /**
   * FornecedorCountOutputType without action
   */
  export type FornecedorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FornecedorCountOutputType
     */
    select?: FornecedorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FornecedorCountOutputType without action
   */
  export type FornecedorCountOutputTypeCountNotasFiscaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NfeImportWhereInput
  }


  /**
   * Count Type NfeImportCountOutputType
   */

  export type NfeImportCountOutputType = {
    itens: number
  }

  export type NfeImportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | NfeImportCountOutputTypeCountItensArgs
  }

  // Custom InputTypes
  /**
   * NfeImportCountOutputType without action
   */
  export type NfeImportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportCountOutputType
     */
    select?: NfeImportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NfeImportCountOutputType without action
   */
  export type NfeImportCountOutputTypeCountItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NfeImportItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Empresa
   */

  export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  export type EmpresaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cnpj: string | null
    createdAt: Date | null
  }

  export type EmpresaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cnpj: string | null
    createdAt: Date | null
  }

  export type EmpresaCountAggregateOutputType = {
    id: number
    nome: number
    cnpj: number
    createdAt: number
    _all: number
  }


  export type EmpresaMinAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    createdAt?: true
  }

  export type EmpresaMaxAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    createdAt?: true
  }

  export type EmpresaCountAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    createdAt?: true
    _all?: true
  }

  export type EmpresaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresa to aggregate.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Empresas
    **/
    _count?: true | EmpresaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaMaxAggregateInputType
  }

  export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresa[P]>
      : GetScalarType<T[P], AggregateEmpresa[P]>
  }




  export type EmpresaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithAggregationInput | EmpresaOrderByWithAggregationInput[]
    by: EmpresaScalarFieldEnum[] | EmpresaScalarFieldEnum
    having?: EmpresaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaCountAggregateInputType | true
    _min?: EmpresaMinAggregateInputType
    _max?: EmpresaMaxAggregateInputType
  }

  export type EmpresaGroupByOutputType = {
    id: string
    nome: string
    cnpj: string | null
    createdAt: Date
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
    convites?: boolean | Empresa$convitesArgs<ExtArgs>
    usuarios?: boolean | Empresa$usuariosArgs<ExtArgs>
    produtos?: boolean | Empresa$produtosArgs<ExtArgs>
    movimentacoes?: boolean | Empresa$movimentacoesArgs<ExtArgs>
    solicitacoes?: boolean | Empresa$solicitacoesArgs<ExtArgs>
    fornecedores?: boolean | Empresa$fornecedoresArgs<ExtArgs>
    nfeImports?: boolean | Empresa$nfeImportsArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectScalar = {
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
  }

  export type EmpresaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cnpj" | "createdAt", ExtArgs["result"]["empresa"]>
  export type EmpresaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    convites?: boolean | Empresa$convitesArgs<ExtArgs>
    usuarios?: boolean | Empresa$usuariosArgs<ExtArgs>
    produtos?: boolean | Empresa$produtosArgs<ExtArgs>
    movimentacoes?: boolean | Empresa$movimentacoesArgs<ExtArgs>
    solicitacoes?: boolean | Empresa$solicitacoesArgs<ExtArgs>
    fornecedores?: boolean | Empresa$fornecedoresArgs<ExtArgs>
    nfeImports?: boolean | Empresa$nfeImportsArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmpresaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EmpresaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EmpresaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Empresa"
    objects: {
      convites: Prisma.$UserInvitePayload<ExtArgs>[]
      usuarios: Prisma.$UserPayload<ExtArgs>[]
      produtos: Prisma.$ProductPayload<ExtArgs>[]
      movimentacoes: Prisma.$StockMovementPayload<ExtArgs>[]
      solicitacoes: Prisma.$SolicitacaoPayload<ExtArgs>[]
      fornecedores: Prisma.$FornecedorPayload<ExtArgs>[]
      nfeImports: Prisma.$NfeImportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      cnpj: string | null
      createdAt: Date
    }, ExtArgs["result"]["empresa"]>
    composites: {}
  }

  type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaDefaultArgs> = $Result.GetResult<Prisma.$EmpresaPayload, S>

  type EmpresaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmpresaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmpresaCountAggregateInputType | true
    }

  export interface EmpresaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Empresa'], meta: { name: 'Empresa' } }
    /**
     * Find zero or one Empresa that matches the filter.
     * @param {EmpresaFindUniqueArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmpresaFindUniqueArgs>(args: SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Empresa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmpresaFindUniqueOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs>(args: SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmpresaFindFirstArgs>(args?: SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs>(args?: SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Empresas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Empresas
     * const empresas = await prisma.empresa.findMany()
     * 
     * // Get first 10 Empresas
     * const empresas = await prisma.empresa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const empresaWithIdOnly = await prisma.empresa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmpresaFindManyArgs>(args?: SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Empresa.
     * @param {EmpresaCreateArgs} args - Arguments to create a Empresa.
     * @example
     * // Create one Empresa
     * const Empresa = await prisma.empresa.create({
     *   data: {
     *     // ... data to create a Empresa
     *   }
     * })
     * 
     */
    create<T extends EmpresaCreateArgs>(args: SelectSubset<T, EmpresaCreateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Empresas.
     * @param {EmpresaCreateManyArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmpresaCreateManyArgs>(args?: SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Empresas and returns the data saved in the database.
     * @param {EmpresaCreateManyAndReturnArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmpresaCreateManyAndReturnArgs>(args?: SelectSubset<T, EmpresaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Empresa.
     * @param {EmpresaDeleteArgs} args - Arguments to delete one Empresa.
     * @example
     * // Delete one Empresa
     * const Empresa = await prisma.empresa.delete({
     *   where: {
     *     // ... filter to delete one Empresa
     *   }
     * })
     * 
     */
    delete<T extends EmpresaDeleteArgs>(args: SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Empresa.
     * @param {EmpresaUpdateArgs} args - Arguments to update one Empresa.
     * @example
     * // Update one Empresa
     * const empresa = await prisma.empresa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmpresaUpdateArgs>(args: SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Empresas.
     * @param {EmpresaDeleteManyArgs} args - Arguments to filter Empresas to delete.
     * @example
     * // Delete a few Empresas
     * const { count } = await prisma.empresa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmpresaDeleteManyArgs>(args?: SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmpresaUpdateManyArgs>(args: SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas and returns the data updated in the database.
     * @param {EmpresaUpdateManyAndReturnArgs} args - Arguments to update many Empresas.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmpresaUpdateManyAndReturnArgs>(args: SelectSubset<T, EmpresaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Empresa.
     * @param {EmpresaUpsertArgs} args - Arguments to update or create a Empresa.
     * @example
     * // Update or create a Empresa
     * const empresa = await prisma.empresa.upsert({
     *   create: {
     *     // ... data to create a Empresa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Empresa we want to update
     *   }
     * })
     */
    upsert<T extends EmpresaUpsertArgs>(args: SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaCountArgs} args - Arguments to filter Empresas to count.
     * @example
     * // Count the number of Empresas
     * const count = await prisma.empresa.count({
     *   where: {
     *     // ... the filter for the Empresas we want to count
     *   }
     * })
    **/
    count<T extends EmpresaCountArgs>(
      args?: Subset<T, EmpresaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmpresaAggregateArgs>(args: Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>

    /**
     * Group by Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaGroupByArgs} args - Group by arguments.
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
      T extends EmpresaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Empresa model
   */
  readonly fields: EmpresaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Empresa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmpresaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    convites<T extends Empresa$convitesArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$convitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usuarios<T extends Empresa$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    produtos<T extends Empresa$produtosArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$produtosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    movimentacoes<T extends Empresa$movimentacoesArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$movimentacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitacoes<T extends Empresa$solicitacoesArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$solicitacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fornecedores<T extends Empresa$fornecedoresArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$fornecedoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nfeImports<T extends Empresa$nfeImportsArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$nfeImportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Empresa model
   */
  interface EmpresaFieldRefs {
    readonly id: FieldRef<"Empresa", 'String'>
    readonly nome: FieldRef<"Empresa", 'String'>
    readonly cnpj: FieldRef<"Empresa", 'String'>
    readonly createdAt: FieldRef<"Empresa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Empresa findUnique
   */
  export type EmpresaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findUniqueOrThrow
   */
  export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findFirst
   */
  export type EmpresaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findFirstOrThrow
   */
  export type EmpresaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findMany
   */
  export type EmpresaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresas to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa create
   */
  export type EmpresaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to create a Empresa.
     */
    data: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
  }

  /**
   * Empresa createMany
   */
  export type EmpresaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Empresa createManyAndReturn
   */
  export type EmpresaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Empresa update
   */
  export type EmpresaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to update a Empresa.
     */
    data: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
    /**
     * Choose, which Empresa to update.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa updateMany
   */
  export type EmpresaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa updateManyAndReturn
   */
  export type EmpresaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa upsert
   */
  export type EmpresaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The filter to search for the Empresa to update in case it exists.
     */
    where: EmpresaWhereUniqueInput
    /**
     * In case the Empresa found by the `where` argument doesn't exist, create a new Empresa with this data.
     */
    create: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
    /**
     * In case the Empresa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
  }

  /**
   * Empresa delete
   */
  export type EmpresaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter which Empresa to delete.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa deleteMany
   */
  export type EmpresaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresas to delete
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to delete.
     */
    limit?: number
  }

  /**
   * Empresa.convites
   */
  export type Empresa$convitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    where?: UserInviteWhereInput
    orderBy?: UserInviteOrderByWithRelationInput | UserInviteOrderByWithRelationInput[]
    cursor?: UserInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInviteScalarFieldEnum | UserInviteScalarFieldEnum[]
  }

  /**
   * Empresa.usuarios
   */
  export type Empresa$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Empresa.produtos
   */
  export type Empresa$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Empresa.movimentacoes
   */
  export type Empresa$movimentacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    cursor?: StockMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * Empresa.solicitacoes
   */
  export type Empresa$solicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    where?: SolicitacaoWhereInput
    orderBy?: SolicitacaoOrderByWithRelationInput | SolicitacaoOrderByWithRelationInput[]
    cursor?: SolicitacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitacaoScalarFieldEnum | SolicitacaoScalarFieldEnum[]
  }

  /**
   * Empresa.fornecedores
   */
  export type Empresa$fornecedoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    where?: FornecedorWhereInput
    orderBy?: FornecedorOrderByWithRelationInput | FornecedorOrderByWithRelationInput[]
    cursor?: FornecedorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FornecedorScalarFieldEnum | FornecedorScalarFieldEnum[]
  }

  /**
   * Empresa.nfeImports
   */
  export type Empresa$nfeImportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    where?: NfeImportWhereInput
    orderBy?: NfeImportOrderByWithRelationInput | NfeImportOrderByWithRelationInput[]
    cursor?: NfeImportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NfeImportScalarFieldEnum | NfeImportScalarFieldEnum[]
  }

  /**
   * Empresa without action
   */
  export type EmpresaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    email: string | null
    senha: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    email: string | null
    senha: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    empresaId: number
    nome: number
    email: number
    senha: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    empresaId: string
    nome: string
    email: string
    senha: string
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    solicitacoes?: boolean | User$solicitacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "nome" | "email" | "senha" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    solicitacoes?: boolean | User$solicitacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      solicitacoes: Prisma.$SolicitacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      nome: string
      email: string
      senha: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    solicitacoes<T extends User$solicitacoesArgs<ExtArgs> = {}>(args?: Subset<T, User$solicitacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly empresaId: FieldRef<"User", 'String'>
    readonly nome: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly senha: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.solicitacoes
   */
  export type User$solicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    where?: SolicitacaoWhereInput
    orderBy?: SolicitacaoOrderByWithRelationInput | SolicitacaoOrderByWithRelationInput[]
    cursor?: SolicitacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitacaoScalarFieldEnum | SolicitacaoScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    custo: number | null
    preco: number | null
    estoqueAtual: number | null
    estoqueMinimo: number | null
  }

  export type ProductSumAggregateOutputType = {
    custo: number | null
    preco: number | null
    estoqueAtual: number | null
    estoqueMinimo: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    sku: string | null
    codigoBarras: string | null
    categoria: string | null
    custo: number | null
    preco: number | null
    estoqueAtual: number | null
    estoqueMinimo: number | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    sku: string | null
    codigoBarras: string | null
    categoria: string | null
    custo: number | null
    preco: number | null
    estoqueAtual: number | null
    estoqueMinimo: number | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    empresaId: number
    nome: number
    sku: number
    codigoBarras: number
    categoria: number
    custo: number
    preco: number
    estoqueAtual: number
    estoqueMinimo: number
    createdAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    custo?: true
    preco?: true
    estoqueAtual?: true
    estoqueMinimo?: true
  }

  export type ProductSumAggregateInputType = {
    custo?: true
    preco?: true
    estoqueAtual?: true
    estoqueMinimo?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    sku?: true
    codigoBarras?: true
    categoria?: true
    custo?: true
    preco?: true
    estoqueAtual?: true
    estoqueMinimo?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    sku?: true
    codigoBarras?: true
    categoria?: true
    custo?: true
    preco?: true
    estoqueAtual?: true
    estoqueMinimo?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    sku?: true
    codigoBarras?: true
    categoria?: true
    custo?: true
    preco?: true
    estoqueAtual?: true
    estoqueMinimo?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    empresaId: string
    nome: string
    sku: string | null
    codigoBarras: string | null
    categoria: string | null
    custo: number | null
    preco: number | null
    estoqueAtual: number
    estoqueMinimo: number
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    sku?: boolean
    codigoBarras?: boolean
    categoria?: boolean
    custo?: boolean
    preco?: boolean
    estoqueAtual?: boolean
    estoqueMinimo?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    movements?: boolean | Product$movementsArgs<ExtArgs>
    solicitacoes?: boolean | Product$solicitacoesArgs<ExtArgs>
    nfeItens?: boolean | Product$nfeItensArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    sku?: boolean
    codigoBarras?: boolean
    categoria?: boolean
    custo?: boolean
    preco?: boolean
    estoqueAtual?: boolean
    estoqueMinimo?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    sku?: boolean
    codigoBarras?: boolean
    categoria?: boolean
    custo?: boolean
    preco?: boolean
    estoqueAtual?: boolean
    estoqueMinimo?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    sku?: boolean
    codigoBarras?: boolean
    categoria?: boolean
    custo?: boolean
    preco?: boolean
    estoqueAtual?: boolean
    estoqueMinimo?: boolean
    createdAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "nome" | "sku" | "codigoBarras" | "categoria" | "custo" | "preco" | "estoqueAtual" | "estoqueMinimo" | "createdAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    movements?: boolean | Product$movementsArgs<ExtArgs>
    solicitacoes?: boolean | Product$solicitacoesArgs<ExtArgs>
    nfeItens?: boolean | Product$nfeItensArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      movements: Prisma.$StockMovementPayload<ExtArgs>[]
      solicitacoes: Prisma.$SolicitacaoPayload<ExtArgs>[]
      nfeItens: Prisma.$NfeImportItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      nome: string
      sku: string | null
      codigoBarras: string | null
      categoria: string | null
      custo: number | null
      preco: number | null
      estoqueAtual: number
      estoqueMinimo: number
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    movements<T extends Product$movementsArgs<ExtArgs> = {}>(args?: Subset<T, Product$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitacoes<T extends Product$solicitacoesArgs<ExtArgs> = {}>(args?: Subset<T, Product$solicitacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nfeItens<T extends Product$nfeItensArgs<ExtArgs> = {}>(args?: Subset<T, Product$nfeItensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly empresaId: FieldRef<"Product", 'String'>
    readonly nome: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly codigoBarras: FieldRef<"Product", 'String'>
    readonly categoria: FieldRef<"Product", 'String'>
    readonly custo: FieldRef<"Product", 'Float'>
    readonly preco: FieldRef<"Product", 'Float'>
    readonly estoqueAtual: FieldRef<"Product", 'Float'>
    readonly estoqueMinimo: FieldRef<"Product", 'Float'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.movements
   */
  export type Product$movementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    cursor?: StockMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * Product.solicitacoes
   */
  export type Product$solicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    where?: SolicitacaoWhereInput
    orderBy?: SolicitacaoOrderByWithRelationInput | SolicitacaoOrderByWithRelationInput[]
    cursor?: SolicitacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitacaoScalarFieldEnum | SolicitacaoScalarFieldEnum[]
  }

  /**
   * Product.nfeItens
   */
  export type Product$nfeItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    where?: NfeImportItemWhereInput
    orderBy?: NfeImportItemOrderByWithRelationInput | NfeImportItemOrderByWithRelationInput[]
    cursor?: NfeImportItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NfeImportItemScalarFieldEnum | NfeImportItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model StockMovement
   */

  export type AggregateStockMovement = {
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  export type StockMovementAvgAggregateOutputType = {
    quantidade: number | null
  }

  export type StockMovementSumAggregateOutputType = {
    quantidade: number | null
  }

  export type StockMovementMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    productId: string | null
    tipo: string | null
    quantidade: number | null
    observacao: string | null
    createdAt: Date | null
  }

  export type StockMovementMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    productId: string | null
    tipo: string | null
    quantidade: number | null
    observacao: string | null
    createdAt: Date | null
  }

  export type StockMovementCountAggregateOutputType = {
    id: number
    empresaId: number
    productId: number
    tipo: number
    quantidade: number
    observacao: number
    createdAt: number
    _all: number
  }


  export type StockMovementAvgAggregateInputType = {
    quantidade?: true
  }

  export type StockMovementSumAggregateInputType = {
    quantidade?: true
  }

  export type StockMovementMinAggregateInputType = {
    id?: true
    empresaId?: true
    productId?: true
    tipo?: true
    quantidade?: true
    observacao?: true
    createdAt?: true
  }

  export type StockMovementMaxAggregateInputType = {
    id?: true
    empresaId?: true
    productId?: true
    tipo?: true
    quantidade?: true
    observacao?: true
    createdAt?: true
  }

  export type StockMovementCountAggregateInputType = {
    id?: true
    empresaId?: true
    productId?: true
    tipo?: true
    quantidade?: true
    observacao?: true
    createdAt?: true
    _all?: true
  }

  export type StockMovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovement to aggregate.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockMovements
    **/
    _count?: true | StockMovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockMovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockMovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMovementMaxAggregateInputType
  }

  export type GetStockMovementAggregateType<T extends StockMovementAggregateArgs> = {
        [P in keyof T & keyof AggregateStockMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockMovement[P]>
      : GetScalarType<T[P], AggregateStockMovement[P]>
  }




  export type StockMovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithAggregationInput | StockMovementOrderByWithAggregationInput[]
    by: StockMovementScalarFieldEnum[] | StockMovementScalarFieldEnum
    having?: StockMovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockMovementCountAggregateInputType | true
    _avg?: StockMovementAvgAggregateInputType
    _sum?: StockMovementSumAggregateInputType
    _min?: StockMovementMinAggregateInputType
    _max?: StockMovementMaxAggregateInputType
  }

  export type StockMovementGroupByOutputType = {
    id: string
    empresaId: string
    productId: string
    tipo: string
    quantidade: number
    observacao: string | null
    createdAt: Date
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  type GetStockMovementGroupByPayload<T extends StockMovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockMovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockMovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
            : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
        }
      >
    >


  export type StockMovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    productId?: boolean
    tipo?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    productId?: boolean
    tipo?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    productId?: boolean
    tipo?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectScalar = {
    id?: boolean
    empresaId?: boolean
    productId?: boolean
    tipo?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
  }

  export type StockMovementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "productId" | "tipo" | "quantidade" | "observacao" | "createdAt", ExtArgs["result"]["stockMovement"]>
  export type StockMovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type StockMovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type StockMovementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $StockMovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockMovement"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      productId: string
      tipo: string
      quantidade: number
      observacao: string | null
      createdAt: Date
    }, ExtArgs["result"]["stockMovement"]>
    composites: {}
  }

  type StockMovementGetPayload<S extends boolean | null | undefined | StockMovementDefaultArgs> = $Result.GetResult<Prisma.$StockMovementPayload, S>

  type StockMovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockMovementCountAggregateInputType | true
    }

  export interface StockMovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockMovement'], meta: { name: 'StockMovement' } }
    /**
     * Find zero or one StockMovement that matches the filter.
     * @param {StockMovementFindUniqueArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockMovementFindUniqueArgs>(args: SelectSubset<T, StockMovementFindUniqueArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockMovement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockMovementFindUniqueOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockMovementFindUniqueOrThrowArgs>(args: SelectSubset<T, StockMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockMovementFindFirstArgs>(args?: SelectSubset<T, StockMovementFindFirstArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockMovementFindFirstOrThrowArgs>(args?: SelectSubset<T, StockMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockMovements
     * const stockMovements = await prisma.stockMovement.findMany()
     * 
     * // Get first 10 StockMovements
     * const stockMovements = await prisma.stockMovement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockMovementFindManyArgs>(args?: SelectSubset<T, StockMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockMovement.
     * @param {StockMovementCreateArgs} args - Arguments to create a StockMovement.
     * @example
     * // Create one StockMovement
     * const StockMovement = await prisma.stockMovement.create({
     *   data: {
     *     // ... data to create a StockMovement
     *   }
     * })
     * 
     */
    create<T extends StockMovementCreateArgs>(args: SelectSubset<T, StockMovementCreateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockMovements.
     * @param {StockMovementCreateManyArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockMovementCreateManyArgs>(args?: SelectSubset<T, StockMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockMovements and returns the data saved in the database.
     * @param {StockMovementCreateManyAndReturnArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockMovementCreateManyAndReturnArgs>(args?: SelectSubset<T, StockMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockMovement.
     * @param {StockMovementDeleteArgs} args - Arguments to delete one StockMovement.
     * @example
     * // Delete one StockMovement
     * const StockMovement = await prisma.stockMovement.delete({
     *   where: {
     *     // ... filter to delete one StockMovement
     *   }
     * })
     * 
     */
    delete<T extends StockMovementDeleteArgs>(args: SelectSubset<T, StockMovementDeleteArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockMovement.
     * @param {StockMovementUpdateArgs} args - Arguments to update one StockMovement.
     * @example
     * // Update one StockMovement
     * const stockMovement = await prisma.stockMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockMovementUpdateArgs>(args: SelectSubset<T, StockMovementUpdateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockMovements.
     * @param {StockMovementDeleteManyArgs} args - Arguments to filter StockMovements to delete.
     * @example
     * // Delete a few StockMovements
     * const { count } = await prisma.stockMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockMovementDeleteManyArgs>(args?: SelectSubset<T, StockMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockMovementUpdateManyArgs>(args: SelectSubset<T, StockMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements and returns the data updated in the database.
     * @param {StockMovementUpdateManyAndReturnArgs} args - Arguments to update many StockMovements.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.updateManyAndReturn({
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
    updateManyAndReturn<T extends StockMovementUpdateManyAndReturnArgs>(args: SelectSubset<T, StockMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockMovement.
     * @param {StockMovementUpsertArgs} args - Arguments to update or create a StockMovement.
     * @example
     * // Update or create a StockMovement
     * const stockMovement = await prisma.stockMovement.upsert({
     *   create: {
     *     // ... data to create a StockMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockMovement we want to update
     *   }
     * })
     */
    upsert<T extends StockMovementUpsertArgs>(args: SelectSubset<T, StockMovementUpsertArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementCountArgs} args - Arguments to filter StockMovements to count.
     * @example
     * // Count the number of StockMovements
     * const count = await prisma.stockMovement.count({
     *   where: {
     *     // ... the filter for the StockMovements we want to count
     *   }
     * })
    **/
    count<T extends StockMovementCountArgs>(
      args?: Subset<T, StockMovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockMovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockMovementAggregateArgs>(args: Subset<T, StockMovementAggregateArgs>): Prisma.PrismaPromise<GetStockMovementAggregateType<T>>

    /**
     * Group by StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementGroupByArgs} args - Group by arguments.
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
      T extends StockMovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockMovementGroupByArgs['orderBy'] }
        : { orderBy?: StockMovementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StockMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockMovement model
   */
  readonly fields: StockMovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockMovement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockMovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the StockMovement model
   */
  interface StockMovementFieldRefs {
    readonly id: FieldRef<"StockMovement", 'String'>
    readonly empresaId: FieldRef<"StockMovement", 'String'>
    readonly productId: FieldRef<"StockMovement", 'String'>
    readonly tipo: FieldRef<"StockMovement", 'String'>
    readonly quantidade: FieldRef<"StockMovement", 'Float'>
    readonly observacao: FieldRef<"StockMovement", 'String'>
    readonly createdAt: FieldRef<"StockMovement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockMovement findUnique
   */
  export type StockMovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findUniqueOrThrow
   */
  export type StockMovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findFirst
   */
  export type StockMovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findFirstOrThrow
   */
  export type StockMovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findMany
   */
  export type StockMovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement create
   */
  export type StockMovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The data needed to create a StockMovement.
     */
    data: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
  }

  /**
   * StockMovement createMany
   */
  export type StockMovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementCreateManyInput | StockMovementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockMovement createManyAndReturn
   */
  export type StockMovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementCreateManyInput | StockMovementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovement update
   */
  export type StockMovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The data needed to update a StockMovement.
     */
    data: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
    /**
     * Choose, which StockMovement to update.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement updateMany
   */
  export type StockMovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
  }

  /**
   * StockMovement updateManyAndReturn
   */
  export type StockMovementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovement upsert
   */
  export type StockMovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The filter to search for the StockMovement to update in case it exists.
     */
    where: StockMovementWhereUniqueInput
    /**
     * In case the StockMovement found by the `where` argument doesn't exist, create a new StockMovement with this data.
     */
    create: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
    /**
     * In case the StockMovement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
  }

  /**
   * StockMovement delete
   */
  export type StockMovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter which StockMovement to delete.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement deleteMany
   */
  export type StockMovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to delete
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to delete.
     */
    limit?: number
  }

  /**
   * StockMovement without action
   */
  export type StockMovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
  }


  /**
   * Model Solicitacao
   */

  export type AggregateSolicitacao = {
    _count: SolicitacaoCountAggregateOutputType | null
    _avg: SolicitacaoAvgAggregateOutputType | null
    _sum: SolicitacaoSumAggregateOutputType | null
    _min: SolicitacaoMinAggregateOutputType | null
    _max: SolicitacaoMaxAggregateOutputType | null
  }

  export type SolicitacaoAvgAggregateOutputType = {
    quantidade: number | null
  }

  export type SolicitacaoSumAggregateOutputType = {
    quantidade: number | null
  }

  export type SolicitacaoMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    userId: string | null
    productId: string | null
    quantidade: number | null
    status: string | null
    createdAt: Date | null
  }

  export type SolicitacaoMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    userId: string | null
    productId: string | null
    quantidade: number | null
    status: string | null
    createdAt: Date | null
  }

  export type SolicitacaoCountAggregateOutputType = {
    id: number
    empresaId: number
    userId: number
    productId: number
    quantidade: number
    status: number
    createdAt: number
    _all: number
  }


  export type SolicitacaoAvgAggregateInputType = {
    quantidade?: true
  }

  export type SolicitacaoSumAggregateInputType = {
    quantidade?: true
  }

  export type SolicitacaoMinAggregateInputType = {
    id?: true
    empresaId?: true
    userId?: true
    productId?: true
    quantidade?: true
    status?: true
    createdAt?: true
  }

  export type SolicitacaoMaxAggregateInputType = {
    id?: true
    empresaId?: true
    userId?: true
    productId?: true
    quantidade?: true
    status?: true
    createdAt?: true
  }

  export type SolicitacaoCountAggregateInputType = {
    id?: true
    empresaId?: true
    userId?: true
    productId?: true
    quantidade?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type SolicitacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Solicitacao to aggregate.
     */
    where?: SolicitacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacaos to fetch.
     */
    orderBy?: SolicitacaoOrderByWithRelationInput | SolicitacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SolicitacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Solicitacaos
    **/
    _count?: true | SolicitacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SolicitacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SolicitacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SolicitacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SolicitacaoMaxAggregateInputType
  }

  export type GetSolicitacaoAggregateType<T extends SolicitacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateSolicitacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSolicitacao[P]>
      : GetScalarType<T[P], AggregateSolicitacao[P]>
  }




  export type SolicitacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitacaoWhereInput
    orderBy?: SolicitacaoOrderByWithAggregationInput | SolicitacaoOrderByWithAggregationInput[]
    by: SolicitacaoScalarFieldEnum[] | SolicitacaoScalarFieldEnum
    having?: SolicitacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SolicitacaoCountAggregateInputType | true
    _avg?: SolicitacaoAvgAggregateInputType
    _sum?: SolicitacaoSumAggregateInputType
    _min?: SolicitacaoMinAggregateInputType
    _max?: SolicitacaoMaxAggregateInputType
  }

  export type SolicitacaoGroupByOutputType = {
    id: string
    empresaId: string
    userId: string
    productId: string
    quantidade: number
    status: string
    createdAt: Date
    _count: SolicitacaoCountAggregateOutputType | null
    _avg: SolicitacaoAvgAggregateOutputType | null
    _sum: SolicitacaoSumAggregateOutputType | null
    _min: SolicitacaoMinAggregateOutputType | null
    _max: SolicitacaoMaxAggregateOutputType | null
  }

  type GetSolicitacaoGroupByPayload<T extends SolicitacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SolicitacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SolicitacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SolicitacaoGroupByOutputType[P]>
            : GetScalarType<T[P], SolicitacaoGroupByOutputType[P]>
        }
      >
    >


  export type SolicitacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    userId?: boolean
    productId?: boolean
    quantidade?: boolean
    status?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitacao"]>

  export type SolicitacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    userId?: boolean
    productId?: boolean
    quantidade?: boolean
    status?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitacao"]>

  export type SolicitacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    userId?: boolean
    productId?: boolean
    quantidade?: boolean
    status?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitacao"]>

  export type SolicitacaoSelectScalar = {
    id?: boolean
    empresaId?: boolean
    userId?: boolean
    productId?: boolean
    quantidade?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type SolicitacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "userId" | "productId" | "quantidade" | "status" | "createdAt", ExtArgs["result"]["solicitacao"]>
  export type SolicitacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SolicitacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SolicitacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $SolicitacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Solicitacao"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      userId: string
      productId: string
      quantidade: number
      status: string
      createdAt: Date
    }, ExtArgs["result"]["solicitacao"]>
    composites: {}
  }

  type SolicitacaoGetPayload<S extends boolean | null | undefined | SolicitacaoDefaultArgs> = $Result.GetResult<Prisma.$SolicitacaoPayload, S>

  type SolicitacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SolicitacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SolicitacaoCountAggregateInputType | true
    }

  export interface SolicitacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Solicitacao'], meta: { name: 'Solicitacao' } }
    /**
     * Find zero or one Solicitacao that matches the filter.
     * @param {SolicitacaoFindUniqueArgs} args - Arguments to find a Solicitacao
     * @example
     * // Get one Solicitacao
     * const solicitacao = await prisma.solicitacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SolicitacaoFindUniqueArgs>(args: SelectSubset<T, SolicitacaoFindUniqueArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Solicitacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SolicitacaoFindUniqueOrThrowArgs} args - Arguments to find a Solicitacao
     * @example
     * // Get one Solicitacao
     * const solicitacao = await prisma.solicitacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SolicitacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, SolicitacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Solicitacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacaoFindFirstArgs} args - Arguments to find a Solicitacao
     * @example
     * // Get one Solicitacao
     * const solicitacao = await prisma.solicitacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SolicitacaoFindFirstArgs>(args?: SelectSubset<T, SolicitacaoFindFirstArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Solicitacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacaoFindFirstOrThrowArgs} args - Arguments to find a Solicitacao
     * @example
     * // Get one Solicitacao
     * const solicitacao = await prisma.solicitacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SolicitacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, SolicitacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Solicitacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Solicitacaos
     * const solicitacaos = await prisma.solicitacao.findMany()
     * 
     * // Get first 10 Solicitacaos
     * const solicitacaos = await prisma.solicitacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const solicitacaoWithIdOnly = await prisma.solicitacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SolicitacaoFindManyArgs>(args?: SelectSubset<T, SolicitacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Solicitacao.
     * @param {SolicitacaoCreateArgs} args - Arguments to create a Solicitacao.
     * @example
     * // Create one Solicitacao
     * const Solicitacao = await prisma.solicitacao.create({
     *   data: {
     *     // ... data to create a Solicitacao
     *   }
     * })
     * 
     */
    create<T extends SolicitacaoCreateArgs>(args: SelectSubset<T, SolicitacaoCreateArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Solicitacaos.
     * @param {SolicitacaoCreateManyArgs} args - Arguments to create many Solicitacaos.
     * @example
     * // Create many Solicitacaos
     * const solicitacao = await prisma.solicitacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SolicitacaoCreateManyArgs>(args?: SelectSubset<T, SolicitacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Solicitacaos and returns the data saved in the database.
     * @param {SolicitacaoCreateManyAndReturnArgs} args - Arguments to create many Solicitacaos.
     * @example
     * // Create many Solicitacaos
     * const solicitacao = await prisma.solicitacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Solicitacaos and only return the `id`
     * const solicitacaoWithIdOnly = await prisma.solicitacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SolicitacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, SolicitacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Solicitacao.
     * @param {SolicitacaoDeleteArgs} args - Arguments to delete one Solicitacao.
     * @example
     * // Delete one Solicitacao
     * const Solicitacao = await prisma.solicitacao.delete({
     *   where: {
     *     // ... filter to delete one Solicitacao
     *   }
     * })
     * 
     */
    delete<T extends SolicitacaoDeleteArgs>(args: SelectSubset<T, SolicitacaoDeleteArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Solicitacao.
     * @param {SolicitacaoUpdateArgs} args - Arguments to update one Solicitacao.
     * @example
     * // Update one Solicitacao
     * const solicitacao = await prisma.solicitacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SolicitacaoUpdateArgs>(args: SelectSubset<T, SolicitacaoUpdateArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Solicitacaos.
     * @param {SolicitacaoDeleteManyArgs} args - Arguments to filter Solicitacaos to delete.
     * @example
     * // Delete a few Solicitacaos
     * const { count } = await prisma.solicitacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SolicitacaoDeleteManyArgs>(args?: SelectSubset<T, SolicitacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Solicitacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Solicitacaos
     * const solicitacao = await prisma.solicitacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SolicitacaoUpdateManyArgs>(args: SelectSubset<T, SolicitacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Solicitacaos and returns the data updated in the database.
     * @param {SolicitacaoUpdateManyAndReturnArgs} args - Arguments to update many Solicitacaos.
     * @example
     * // Update many Solicitacaos
     * const solicitacao = await prisma.solicitacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Solicitacaos and only return the `id`
     * const solicitacaoWithIdOnly = await prisma.solicitacao.updateManyAndReturn({
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
    updateManyAndReturn<T extends SolicitacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, SolicitacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Solicitacao.
     * @param {SolicitacaoUpsertArgs} args - Arguments to update or create a Solicitacao.
     * @example
     * // Update or create a Solicitacao
     * const solicitacao = await prisma.solicitacao.upsert({
     *   create: {
     *     // ... data to create a Solicitacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Solicitacao we want to update
     *   }
     * })
     */
    upsert<T extends SolicitacaoUpsertArgs>(args: SelectSubset<T, SolicitacaoUpsertArgs<ExtArgs>>): Prisma__SolicitacaoClient<$Result.GetResult<Prisma.$SolicitacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Solicitacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacaoCountArgs} args - Arguments to filter Solicitacaos to count.
     * @example
     * // Count the number of Solicitacaos
     * const count = await prisma.solicitacao.count({
     *   where: {
     *     // ... the filter for the Solicitacaos we want to count
     *   }
     * })
    **/
    count<T extends SolicitacaoCountArgs>(
      args?: Subset<T, SolicitacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SolicitacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Solicitacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SolicitacaoAggregateArgs>(args: Subset<T, SolicitacaoAggregateArgs>): Prisma.PrismaPromise<GetSolicitacaoAggregateType<T>>

    /**
     * Group by Solicitacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacaoGroupByArgs} args - Group by arguments.
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
      T extends SolicitacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SolicitacaoGroupByArgs['orderBy'] }
        : { orderBy?: SolicitacaoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SolicitacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Solicitacao model
   */
  readonly fields: SolicitacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Solicitacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SolicitacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Solicitacao model
   */
  interface SolicitacaoFieldRefs {
    readonly id: FieldRef<"Solicitacao", 'String'>
    readonly empresaId: FieldRef<"Solicitacao", 'String'>
    readonly userId: FieldRef<"Solicitacao", 'String'>
    readonly productId: FieldRef<"Solicitacao", 'String'>
    readonly quantidade: FieldRef<"Solicitacao", 'Float'>
    readonly status: FieldRef<"Solicitacao", 'String'>
    readonly createdAt: FieldRef<"Solicitacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Solicitacao findUnique
   */
  export type SolicitacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacao to fetch.
     */
    where: SolicitacaoWhereUniqueInput
  }

  /**
   * Solicitacao findUniqueOrThrow
   */
  export type SolicitacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacao to fetch.
     */
    where: SolicitacaoWhereUniqueInput
  }

  /**
   * Solicitacao findFirst
   */
  export type SolicitacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacao to fetch.
     */
    where?: SolicitacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacaos to fetch.
     */
    orderBy?: SolicitacaoOrderByWithRelationInput | SolicitacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Solicitacaos.
     */
    cursor?: SolicitacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Solicitacaos.
     */
    distinct?: SolicitacaoScalarFieldEnum | SolicitacaoScalarFieldEnum[]
  }

  /**
   * Solicitacao findFirstOrThrow
   */
  export type SolicitacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacao to fetch.
     */
    where?: SolicitacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacaos to fetch.
     */
    orderBy?: SolicitacaoOrderByWithRelationInput | SolicitacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Solicitacaos.
     */
    cursor?: SolicitacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Solicitacaos.
     */
    distinct?: SolicitacaoScalarFieldEnum | SolicitacaoScalarFieldEnum[]
  }

  /**
   * Solicitacao findMany
   */
  export type SolicitacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacaos to fetch.
     */
    where?: SolicitacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacaos to fetch.
     */
    orderBy?: SolicitacaoOrderByWithRelationInput | SolicitacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Solicitacaos.
     */
    cursor?: SolicitacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Solicitacaos.
     */
    distinct?: SolicitacaoScalarFieldEnum | SolicitacaoScalarFieldEnum[]
  }

  /**
   * Solicitacao create
   */
  export type SolicitacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Solicitacao.
     */
    data: XOR<SolicitacaoCreateInput, SolicitacaoUncheckedCreateInput>
  }

  /**
   * Solicitacao createMany
   */
  export type SolicitacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Solicitacaos.
     */
    data: SolicitacaoCreateManyInput | SolicitacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Solicitacao createManyAndReturn
   */
  export type SolicitacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Solicitacaos.
     */
    data: SolicitacaoCreateManyInput | SolicitacaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Solicitacao update
   */
  export type SolicitacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Solicitacao.
     */
    data: XOR<SolicitacaoUpdateInput, SolicitacaoUncheckedUpdateInput>
    /**
     * Choose, which Solicitacao to update.
     */
    where: SolicitacaoWhereUniqueInput
  }

  /**
   * Solicitacao updateMany
   */
  export type SolicitacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Solicitacaos.
     */
    data: XOR<SolicitacaoUpdateManyMutationInput, SolicitacaoUncheckedUpdateManyInput>
    /**
     * Filter which Solicitacaos to update
     */
    where?: SolicitacaoWhereInput
    /**
     * Limit how many Solicitacaos to update.
     */
    limit?: number
  }

  /**
   * Solicitacao updateManyAndReturn
   */
  export type SolicitacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * The data used to update Solicitacaos.
     */
    data: XOR<SolicitacaoUpdateManyMutationInput, SolicitacaoUncheckedUpdateManyInput>
    /**
     * Filter which Solicitacaos to update
     */
    where?: SolicitacaoWhereInput
    /**
     * Limit how many Solicitacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Solicitacao upsert
   */
  export type SolicitacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Solicitacao to update in case it exists.
     */
    where: SolicitacaoWhereUniqueInput
    /**
     * In case the Solicitacao found by the `where` argument doesn't exist, create a new Solicitacao with this data.
     */
    create: XOR<SolicitacaoCreateInput, SolicitacaoUncheckedCreateInput>
    /**
     * In case the Solicitacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SolicitacaoUpdateInput, SolicitacaoUncheckedUpdateInput>
  }

  /**
   * Solicitacao delete
   */
  export type SolicitacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
    /**
     * Filter which Solicitacao to delete.
     */
    where: SolicitacaoWhereUniqueInput
  }

  /**
   * Solicitacao deleteMany
   */
  export type SolicitacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Solicitacaos to delete
     */
    where?: SolicitacaoWhereInput
    /**
     * Limit how many Solicitacaos to delete.
     */
    limit?: number
  }

  /**
   * Solicitacao without action
   */
  export type SolicitacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacao
     */
    select?: SolicitacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacao
     */
    omit?: SolicitacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacaoInclude<ExtArgs> | null
  }


  /**
   * Model Fornecedor
   */

  export type AggregateFornecedor = {
    _count: FornecedorCountAggregateOutputType | null
    _min: FornecedorMinAggregateOutputType | null
    _max: FornecedorMaxAggregateOutputType | null
  }

  export type FornecedorMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    cnpj: string | null
    createdAt: Date | null
  }

  export type FornecedorMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    cnpj: string | null
    createdAt: Date | null
  }

  export type FornecedorCountAggregateOutputType = {
    id: number
    empresaId: number
    nome: number
    cnpj: number
    createdAt: number
    _all: number
  }


  export type FornecedorMinAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    cnpj?: true
    createdAt?: true
  }

  export type FornecedorMaxAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    cnpj?: true
    createdAt?: true
  }

  export type FornecedorCountAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    cnpj?: true
    createdAt?: true
    _all?: true
  }

  export type FornecedorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fornecedor to aggregate.
     */
    where?: FornecedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornecedors to fetch.
     */
    orderBy?: FornecedorOrderByWithRelationInput | FornecedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FornecedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornecedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornecedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fornecedors
    **/
    _count?: true | FornecedorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FornecedorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FornecedorMaxAggregateInputType
  }

  export type GetFornecedorAggregateType<T extends FornecedorAggregateArgs> = {
        [P in keyof T & keyof AggregateFornecedor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFornecedor[P]>
      : GetScalarType<T[P], AggregateFornecedor[P]>
  }




  export type FornecedorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FornecedorWhereInput
    orderBy?: FornecedorOrderByWithAggregationInput | FornecedorOrderByWithAggregationInput[]
    by: FornecedorScalarFieldEnum[] | FornecedorScalarFieldEnum
    having?: FornecedorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FornecedorCountAggregateInputType | true
    _min?: FornecedorMinAggregateInputType
    _max?: FornecedorMaxAggregateInputType
  }

  export type FornecedorGroupByOutputType = {
    id: string
    empresaId: string
    nome: string
    cnpj: string
    createdAt: Date
    _count: FornecedorCountAggregateOutputType | null
    _min: FornecedorMinAggregateOutputType | null
    _max: FornecedorMaxAggregateOutputType | null
  }

  type GetFornecedorGroupByPayload<T extends FornecedorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FornecedorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FornecedorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FornecedorGroupByOutputType[P]>
            : GetScalarType<T[P], FornecedorGroupByOutputType[P]>
        }
      >
    >


  export type FornecedorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    notasFiscais?: boolean | Fornecedor$notasFiscaisArgs<ExtArgs>
    _count?: boolean | FornecedorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fornecedor"]>

  export type FornecedorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fornecedor"]>

  export type FornecedorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fornecedor"]>

  export type FornecedorSelectScalar = {
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    cnpj?: boolean
    createdAt?: boolean
  }

  export type FornecedorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "nome" | "cnpj" | "createdAt", ExtArgs["result"]["fornecedor"]>
  export type FornecedorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    notasFiscais?: boolean | Fornecedor$notasFiscaisArgs<ExtArgs>
    _count?: boolean | FornecedorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FornecedorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type FornecedorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $FornecedorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fornecedor"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      notasFiscais: Prisma.$NfeImportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      nome: string
      cnpj: string
      createdAt: Date
    }, ExtArgs["result"]["fornecedor"]>
    composites: {}
  }

  type FornecedorGetPayload<S extends boolean | null | undefined | FornecedorDefaultArgs> = $Result.GetResult<Prisma.$FornecedorPayload, S>

  type FornecedorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FornecedorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FornecedorCountAggregateInputType | true
    }

  export interface FornecedorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fornecedor'], meta: { name: 'Fornecedor' } }
    /**
     * Find zero or one Fornecedor that matches the filter.
     * @param {FornecedorFindUniqueArgs} args - Arguments to find a Fornecedor
     * @example
     * // Get one Fornecedor
     * const fornecedor = await prisma.fornecedor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FornecedorFindUniqueArgs>(args: SelectSubset<T, FornecedorFindUniqueArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fornecedor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FornecedorFindUniqueOrThrowArgs} args - Arguments to find a Fornecedor
     * @example
     * // Get one Fornecedor
     * const fornecedor = await prisma.fornecedor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FornecedorFindUniqueOrThrowArgs>(args: SelectSubset<T, FornecedorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fornecedor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornecedorFindFirstArgs} args - Arguments to find a Fornecedor
     * @example
     * // Get one Fornecedor
     * const fornecedor = await prisma.fornecedor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FornecedorFindFirstArgs>(args?: SelectSubset<T, FornecedorFindFirstArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fornecedor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornecedorFindFirstOrThrowArgs} args - Arguments to find a Fornecedor
     * @example
     * // Get one Fornecedor
     * const fornecedor = await prisma.fornecedor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FornecedorFindFirstOrThrowArgs>(args?: SelectSubset<T, FornecedorFindFirstOrThrowArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fornecedors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornecedorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fornecedors
     * const fornecedors = await prisma.fornecedor.findMany()
     * 
     * // Get first 10 Fornecedors
     * const fornecedors = await prisma.fornecedor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fornecedorWithIdOnly = await prisma.fornecedor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FornecedorFindManyArgs>(args?: SelectSubset<T, FornecedorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fornecedor.
     * @param {FornecedorCreateArgs} args - Arguments to create a Fornecedor.
     * @example
     * // Create one Fornecedor
     * const Fornecedor = await prisma.fornecedor.create({
     *   data: {
     *     // ... data to create a Fornecedor
     *   }
     * })
     * 
     */
    create<T extends FornecedorCreateArgs>(args: SelectSubset<T, FornecedorCreateArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fornecedors.
     * @param {FornecedorCreateManyArgs} args - Arguments to create many Fornecedors.
     * @example
     * // Create many Fornecedors
     * const fornecedor = await prisma.fornecedor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FornecedorCreateManyArgs>(args?: SelectSubset<T, FornecedorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fornecedors and returns the data saved in the database.
     * @param {FornecedorCreateManyAndReturnArgs} args - Arguments to create many Fornecedors.
     * @example
     * // Create many Fornecedors
     * const fornecedor = await prisma.fornecedor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fornecedors and only return the `id`
     * const fornecedorWithIdOnly = await prisma.fornecedor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FornecedorCreateManyAndReturnArgs>(args?: SelectSubset<T, FornecedorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fornecedor.
     * @param {FornecedorDeleteArgs} args - Arguments to delete one Fornecedor.
     * @example
     * // Delete one Fornecedor
     * const Fornecedor = await prisma.fornecedor.delete({
     *   where: {
     *     // ... filter to delete one Fornecedor
     *   }
     * })
     * 
     */
    delete<T extends FornecedorDeleteArgs>(args: SelectSubset<T, FornecedorDeleteArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fornecedor.
     * @param {FornecedorUpdateArgs} args - Arguments to update one Fornecedor.
     * @example
     * // Update one Fornecedor
     * const fornecedor = await prisma.fornecedor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FornecedorUpdateArgs>(args: SelectSubset<T, FornecedorUpdateArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fornecedors.
     * @param {FornecedorDeleteManyArgs} args - Arguments to filter Fornecedors to delete.
     * @example
     * // Delete a few Fornecedors
     * const { count } = await prisma.fornecedor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FornecedorDeleteManyArgs>(args?: SelectSubset<T, FornecedorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fornecedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornecedorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fornecedors
     * const fornecedor = await prisma.fornecedor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FornecedorUpdateManyArgs>(args: SelectSubset<T, FornecedorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fornecedors and returns the data updated in the database.
     * @param {FornecedorUpdateManyAndReturnArgs} args - Arguments to update many Fornecedors.
     * @example
     * // Update many Fornecedors
     * const fornecedor = await prisma.fornecedor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fornecedors and only return the `id`
     * const fornecedorWithIdOnly = await prisma.fornecedor.updateManyAndReturn({
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
    updateManyAndReturn<T extends FornecedorUpdateManyAndReturnArgs>(args: SelectSubset<T, FornecedorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fornecedor.
     * @param {FornecedorUpsertArgs} args - Arguments to update or create a Fornecedor.
     * @example
     * // Update or create a Fornecedor
     * const fornecedor = await prisma.fornecedor.upsert({
     *   create: {
     *     // ... data to create a Fornecedor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fornecedor we want to update
     *   }
     * })
     */
    upsert<T extends FornecedorUpsertArgs>(args: SelectSubset<T, FornecedorUpsertArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fornecedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornecedorCountArgs} args - Arguments to filter Fornecedors to count.
     * @example
     * // Count the number of Fornecedors
     * const count = await prisma.fornecedor.count({
     *   where: {
     *     // ... the filter for the Fornecedors we want to count
     *   }
     * })
    **/
    count<T extends FornecedorCountArgs>(
      args?: Subset<T, FornecedorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FornecedorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fornecedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornecedorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FornecedorAggregateArgs>(args: Subset<T, FornecedorAggregateArgs>): Prisma.PrismaPromise<GetFornecedorAggregateType<T>>

    /**
     * Group by Fornecedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornecedorGroupByArgs} args - Group by arguments.
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
      T extends FornecedorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FornecedorGroupByArgs['orderBy'] }
        : { orderBy?: FornecedorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FornecedorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFornecedorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fornecedor model
   */
  readonly fields: FornecedorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fornecedor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FornecedorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notasFiscais<T extends Fornecedor$notasFiscaisArgs<ExtArgs> = {}>(args?: Subset<T, Fornecedor$notasFiscaisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Fornecedor model
   */
  interface FornecedorFieldRefs {
    readonly id: FieldRef<"Fornecedor", 'String'>
    readonly empresaId: FieldRef<"Fornecedor", 'String'>
    readonly nome: FieldRef<"Fornecedor", 'String'>
    readonly cnpj: FieldRef<"Fornecedor", 'String'>
    readonly createdAt: FieldRef<"Fornecedor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fornecedor findUnique
   */
  export type FornecedorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * Filter, which Fornecedor to fetch.
     */
    where: FornecedorWhereUniqueInput
  }

  /**
   * Fornecedor findUniqueOrThrow
   */
  export type FornecedorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * Filter, which Fornecedor to fetch.
     */
    where: FornecedorWhereUniqueInput
  }

  /**
   * Fornecedor findFirst
   */
  export type FornecedorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * Filter, which Fornecedor to fetch.
     */
    where?: FornecedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornecedors to fetch.
     */
    orderBy?: FornecedorOrderByWithRelationInput | FornecedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fornecedors.
     */
    cursor?: FornecedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornecedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornecedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fornecedors.
     */
    distinct?: FornecedorScalarFieldEnum | FornecedorScalarFieldEnum[]
  }

  /**
   * Fornecedor findFirstOrThrow
   */
  export type FornecedorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * Filter, which Fornecedor to fetch.
     */
    where?: FornecedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornecedors to fetch.
     */
    orderBy?: FornecedorOrderByWithRelationInput | FornecedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fornecedors.
     */
    cursor?: FornecedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornecedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornecedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fornecedors.
     */
    distinct?: FornecedorScalarFieldEnum | FornecedorScalarFieldEnum[]
  }

  /**
   * Fornecedor findMany
   */
  export type FornecedorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * Filter, which Fornecedors to fetch.
     */
    where?: FornecedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornecedors to fetch.
     */
    orderBy?: FornecedorOrderByWithRelationInput | FornecedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fornecedors.
     */
    cursor?: FornecedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornecedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornecedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fornecedors.
     */
    distinct?: FornecedorScalarFieldEnum | FornecedorScalarFieldEnum[]
  }

  /**
   * Fornecedor create
   */
  export type FornecedorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * The data needed to create a Fornecedor.
     */
    data: XOR<FornecedorCreateInput, FornecedorUncheckedCreateInput>
  }

  /**
   * Fornecedor createMany
   */
  export type FornecedorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fornecedors.
     */
    data: FornecedorCreateManyInput | FornecedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fornecedor createManyAndReturn
   */
  export type FornecedorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * The data used to create many Fornecedors.
     */
    data: FornecedorCreateManyInput | FornecedorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fornecedor update
   */
  export type FornecedorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * The data needed to update a Fornecedor.
     */
    data: XOR<FornecedorUpdateInput, FornecedorUncheckedUpdateInput>
    /**
     * Choose, which Fornecedor to update.
     */
    where: FornecedorWhereUniqueInput
  }

  /**
   * Fornecedor updateMany
   */
  export type FornecedorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fornecedors.
     */
    data: XOR<FornecedorUpdateManyMutationInput, FornecedorUncheckedUpdateManyInput>
    /**
     * Filter which Fornecedors to update
     */
    where?: FornecedorWhereInput
    /**
     * Limit how many Fornecedors to update.
     */
    limit?: number
  }

  /**
   * Fornecedor updateManyAndReturn
   */
  export type FornecedorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * The data used to update Fornecedors.
     */
    data: XOR<FornecedorUpdateManyMutationInput, FornecedorUncheckedUpdateManyInput>
    /**
     * Filter which Fornecedors to update
     */
    where?: FornecedorWhereInput
    /**
     * Limit how many Fornecedors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fornecedor upsert
   */
  export type FornecedorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * The filter to search for the Fornecedor to update in case it exists.
     */
    where: FornecedorWhereUniqueInput
    /**
     * In case the Fornecedor found by the `where` argument doesn't exist, create a new Fornecedor with this data.
     */
    create: XOR<FornecedorCreateInput, FornecedorUncheckedCreateInput>
    /**
     * In case the Fornecedor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FornecedorUpdateInput, FornecedorUncheckedUpdateInput>
  }

  /**
   * Fornecedor delete
   */
  export type FornecedorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    /**
     * Filter which Fornecedor to delete.
     */
    where: FornecedorWhereUniqueInput
  }

  /**
   * Fornecedor deleteMany
   */
  export type FornecedorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fornecedors to delete
     */
    where?: FornecedorWhereInput
    /**
     * Limit how many Fornecedors to delete.
     */
    limit?: number
  }

  /**
   * Fornecedor.notasFiscais
   */
  export type Fornecedor$notasFiscaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    where?: NfeImportWhereInput
    orderBy?: NfeImportOrderByWithRelationInput | NfeImportOrderByWithRelationInput[]
    cursor?: NfeImportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NfeImportScalarFieldEnum | NfeImportScalarFieldEnum[]
  }

  /**
   * Fornecedor without action
   */
  export type FornecedorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
  }


  /**
   * Model NfeImport
   */

  export type AggregateNfeImport = {
    _count: NfeImportCountAggregateOutputType | null
    _avg: NfeImportAvgAggregateOutputType | null
    _sum: NfeImportSumAggregateOutputType | null
    _min: NfeImportMinAggregateOutputType | null
    _max: NfeImportMaxAggregateOutputType | null
  }

  export type NfeImportAvgAggregateOutputType = {
    valorTotal: number | null
  }

  export type NfeImportSumAggregateOutputType = {
    valorTotal: number | null
  }

  export type NfeImportMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    chaveAcesso: string | null
    numeroNota: string | null
    serie: string | null
    fornecedor: string | null
    cnpjFornecedor: string | null
    fornecedorId: string | null
    dataEmissao: Date | null
    valorTotal: number | null
    xmlOriginal: string | null
    createdAt: Date | null
  }

  export type NfeImportMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    chaveAcesso: string | null
    numeroNota: string | null
    serie: string | null
    fornecedor: string | null
    cnpjFornecedor: string | null
    fornecedorId: string | null
    dataEmissao: Date | null
    valorTotal: number | null
    xmlOriginal: string | null
    createdAt: Date | null
  }

  export type NfeImportCountAggregateOutputType = {
    id: number
    empresaId: number
    chaveAcesso: number
    numeroNota: number
    serie: number
    fornecedor: number
    cnpjFornecedor: number
    fornecedorId: number
    dataEmissao: number
    valorTotal: number
    xmlOriginal: number
    createdAt: number
    _all: number
  }


  export type NfeImportAvgAggregateInputType = {
    valorTotal?: true
  }

  export type NfeImportSumAggregateInputType = {
    valorTotal?: true
  }

  export type NfeImportMinAggregateInputType = {
    id?: true
    empresaId?: true
    chaveAcesso?: true
    numeroNota?: true
    serie?: true
    fornecedor?: true
    cnpjFornecedor?: true
    fornecedorId?: true
    dataEmissao?: true
    valorTotal?: true
    xmlOriginal?: true
    createdAt?: true
  }

  export type NfeImportMaxAggregateInputType = {
    id?: true
    empresaId?: true
    chaveAcesso?: true
    numeroNota?: true
    serie?: true
    fornecedor?: true
    cnpjFornecedor?: true
    fornecedorId?: true
    dataEmissao?: true
    valorTotal?: true
    xmlOriginal?: true
    createdAt?: true
  }

  export type NfeImportCountAggregateInputType = {
    id?: true
    empresaId?: true
    chaveAcesso?: true
    numeroNota?: true
    serie?: true
    fornecedor?: true
    cnpjFornecedor?: true
    fornecedorId?: true
    dataEmissao?: true
    valorTotal?: true
    xmlOriginal?: true
    createdAt?: true
    _all?: true
  }

  export type NfeImportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NfeImport to aggregate.
     */
    where?: NfeImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImports to fetch.
     */
    orderBy?: NfeImportOrderByWithRelationInput | NfeImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NfeImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NfeImports
    **/
    _count?: true | NfeImportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NfeImportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NfeImportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NfeImportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NfeImportMaxAggregateInputType
  }

  export type GetNfeImportAggregateType<T extends NfeImportAggregateArgs> = {
        [P in keyof T & keyof AggregateNfeImport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNfeImport[P]>
      : GetScalarType<T[P], AggregateNfeImport[P]>
  }




  export type NfeImportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NfeImportWhereInput
    orderBy?: NfeImportOrderByWithAggregationInput | NfeImportOrderByWithAggregationInput[]
    by: NfeImportScalarFieldEnum[] | NfeImportScalarFieldEnum
    having?: NfeImportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NfeImportCountAggregateInputType | true
    _avg?: NfeImportAvgAggregateInputType
    _sum?: NfeImportSumAggregateInputType
    _min?: NfeImportMinAggregateInputType
    _max?: NfeImportMaxAggregateInputType
  }

  export type NfeImportGroupByOutputType = {
    id: string
    empresaId: string
    chaveAcesso: string
    numeroNota: string | null
    serie: string | null
    fornecedor: string | null
    cnpjFornecedor: string | null
    fornecedorId: string | null
    dataEmissao: Date | null
    valorTotal: number | null
    xmlOriginal: string | null
    createdAt: Date
    _count: NfeImportCountAggregateOutputType | null
    _avg: NfeImportAvgAggregateOutputType | null
    _sum: NfeImportSumAggregateOutputType | null
    _min: NfeImportMinAggregateOutputType | null
    _max: NfeImportMaxAggregateOutputType | null
  }

  type GetNfeImportGroupByPayload<T extends NfeImportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NfeImportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NfeImportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NfeImportGroupByOutputType[P]>
            : GetScalarType<T[P], NfeImportGroupByOutputType[P]>
        }
      >
    >


  export type NfeImportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    numeroNota?: boolean
    serie?: boolean
    fornecedor?: boolean
    cnpjFornecedor?: boolean
    fornecedorId?: boolean
    dataEmissao?: boolean
    valorTotal?: boolean
    xmlOriginal?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    fornecedorRef?: boolean | NfeImport$fornecedorRefArgs<ExtArgs>
    itens?: boolean | NfeImport$itensArgs<ExtArgs>
    _count?: boolean | NfeImportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nfeImport"]>

  export type NfeImportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    numeroNota?: boolean
    serie?: boolean
    fornecedor?: boolean
    cnpjFornecedor?: boolean
    fornecedorId?: boolean
    dataEmissao?: boolean
    valorTotal?: boolean
    xmlOriginal?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    fornecedorRef?: boolean | NfeImport$fornecedorRefArgs<ExtArgs>
  }, ExtArgs["result"]["nfeImport"]>

  export type NfeImportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    numeroNota?: boolean
    serie?: boolean
    fornecedor?: boolean
    cnpjFornecedor?: boolean
    fornecedorId?: boolean
    dataEmissao?: boolean
    valorTotal?: boolean
    xmlOriginal?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    fornecedorRef?: boolean | NfeImport$fornecedorRefArgs<ExtArgs>
  }, ExtArgs["result"]["nfeImport"]>

  export type NfeImportSelectScalar = {
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    numeroNota?: boolean
    serie?: boolean
    fornecedor?: boolean
    cnpjFornecedor?: boolean
    fornecedorId?: boolean
    dataEmissao?: boolean
    valorTotal?: boolean
    xmlOriginal?: boolean
    createdAt?: boolean
  }

  export type NfeImportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "chaveAcesso" | "numeroNota" | "serie" | "fornecedor" | "cnpjFornecedor" | "fornecedorId" | "dataEmissao" | "valorTotal" | "xmlOriginal" | "createdAt", ExtArgs["result"]["nfeImport"]>
  export type NfeImportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    fornecedorRef?: boolean | NfeImport$fornecedorRefArgs<ExtArgs>
    itens?: boolean | NfeImport$itensArgs<ExtArgs>
    _count?: boolean | NfeImportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NfeImportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    fornecedorRef?: boolean | NfeImport$fornecedorRefArgs<ExtArgs>
  }
  export type NfeImportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    fornecedorRef?: boolean | NfeImport$fornecedorRefArgs<ExtArgs>
  }

  export type $NfeImportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NfeImport"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      fornecedorRef: Prisma.$FornecedorPayload<ExtArgs> | null
      itens: Prisma.$NfeImportItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      chaveAcesso: string
      numeroNota: string | null
      serie: string | null
      fornecedor: string | null
      cnpjFornecedor: string | null
      fornecedorId: string | null
      dataEmissao: Date | null
      valorTotal: number | null
      xmlOriginal: string | null
      createdAt: Date
    }, ExtArgs["result"]["nfeImport"]>
    composites: {}
  }

  type NfeImportGetPayload<S extends boolean | null | undefined | NfeImportDefaultArgs> = $Result.GetResult<Prisma.$NfeImportPayload, S>

  type NfeImportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NfeImportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NfeImportCountAggregateInputType | true
    }

  export interface NfeImportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NfeImport'], meta: { name: 'NfeImport' } }
    /**
     * Find zero or one NfeImport that matches the filter.
     * @param {NfeImportFindUniqueArgs} args - Arguments to find a NfeImport
     * @example
     * // Get one NfeImport
     * const nfeImport = await prisma.nfeImport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NfeImportFindUniqueArgs>(args: SelectSubset<T, NfeImportFindUniqueArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NfeImport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NfeImportFindUniqueOrThrowArgs} args - Arguments to find a NfeImport
     * @example
     * // Get one NfeImport
     * const nfeImport = await prisma.nfeImport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NfeImportFindUniqueOrThrowArgs>(args: SelectSubset<T, NfeImportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NfeImport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportFindFirstArgs} args - Arguments to find a NfeImport
     * @example
     * // Get one NfeImport
     * const nfeImport = await prisma.nfeImport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NfeImportFindFirstArgs>(args?: SelectSubset<T, NfeImportFindFirstArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NfeImport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportFindFirstOrThrowArgs} args - Arguments to find a NfeImport
     * @example
     * // Get one NfeImport
     * const nfeImport = await prisma.nfeImport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NfeImportFindFirstOrThrowArgs>(args?: SelectSubset<T, NfeImportFindFirstOrThrowArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NfeImports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NfeImports
     * const nfeImports = await prisma.nfeImport.findMany()
     * 
     * // Get first 10 NfeImports
     * const nfeImports = await prisma.nfeImport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nfeImportWithIdOnly = await prisma.nfeImport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NfeImportFindManyArgs>(args?: SelectSubset<T, NfeImportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NfeImport.
     * @param {NfeImportCreateArgs} args - Arguments to create a NfeImport.
     * @example
     * // Create one NfeImport
     * const NfeImport = await prisma.nfeImport.create({
     *   data: {
     *     // ... data to create a NfeImport
     *   }
     * })
     * 
     */
    create<T extends NfeImportCreateArgs>(args: SelectSubset<T, NfeImportCreateArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NfeImports.
     * @param {NfeImportCreateManyArgs} args - Arguments to create many NfeImports.
     * @example
     * // Create many NfeImports
     * const nfeImport = await prisma.nfeImport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NfeImportCreateManyArgs>(args?: SelectSubset<T, NfeImportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NfeImports and returns the data saved in the database.
     * @param {NfeImportCreateManyAndReturnArgs} args - Arguments to create many NfeImports.
     * @example
     * // Create many NfeImports
     * const nfeImport = await prisma.nfeImport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NfeImports and only return the `id`
     * const nfeImportWithIdOnly = await prisma.nfeImport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NfeImportCreateManyAndReturnArgs>(args?: SelectSubset<T, NfeImportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NfeImport.
     * @param {NfeImportDeleteArgs} args - Arguments to delete one NfeImport.
     * @example
     * // Delete one NfeImport
     * const NfeImport = await prisma.nfeImport.delete({
     *   where: {
     *     // ... filter to delete one NfeImport
     *   }
     * })
     * 
     */
    delete<T extends NfeImportDeleteArgs>(args: SelectSubset<T, NfeImportDeleteArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NfeImport.
     * @param {NfeImportUpdateArgs} args - Arguments to update one NfeImport.
     * @example
     * // Update one NfeImport
     * const nfeImport = await prisma.nfeImport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NfeImportUpdateArgs>(args: SelectSubset<T, NfeImportUpdateArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NfeImports.
     * @param {NfeImportDeleteManyArgs} args - Arguments to filter NfeImports to delete.
     * @example
     * // Delete a few NfeImports
     * const { count } = await prisma.nfeImport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NfeImportDeleteManyArgs>(args?: SelectSubset<T, NfeImportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NfeImports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NfeImports
     * const nfeImport = await prisma.nfeImport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NfeImportUpdateManyArgs>(args: SelectSubset<T, NfeImportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NfeImports and returns the data updated in the database.
     * @param {NfeImportUpdateManyAndReturnArgs} args - Arguments to update many NfeImports.
     * @example
     * // Update many NfeImports
     * const nfeImport = await prisma.nfeImport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NfeImports and only return the `id`
     * const nfeImportWithIdOnly = await prisma.nfeImport.updateManyAndReturn({
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
    updateManyAndReturn<T extends NfeImportUpdateManyAndReturnArgs>(args: SelectSubset<T, NfeImportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NfeImport.
     * @param {NfeImportUpsertArgs} args - Arguments to update or create a NfeImport.
     * @example
     * // Update or create a NfeImport
     * const nfeImport = await prisma.nfeImport.upsert({
     *   create: {
     *     // ... data to create a NfeImport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NfeImport we want to update
     *   }
     * })
     */
    upsert<T extends NfeImportUpsertArgs>(args: SelectSubset<T, NfeImportUpsertArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NfeImports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportCountArgs} args - Arguments to filter NfeImports to count.
     * @example
     * // Count the number of NfeImports
     * const count = await prisma.nfeImport.count({
     *   where: {
     *     // ... the filter for the NfeImports we want to count
     *   }
     * })
    **/
    count<T extends NfeImportCountArgs>(
      args?: Subset<T, NfeImportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NfeImportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NfeImport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NfeImportAggregateArgs>(args: Subset<T, NfeImportAggregateArgs>): Prisma.PrismaPromise<GetNfeImportAggregateType<T>>

    /**
     * Group by NfeImport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportGroupByArgs} args - Group by arguments.
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
      T extends NfeImportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NfeImportGroupByArgs['orderBy'] }
        : { orderBy?: NfeImportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NfeImportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNfeImportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NfeImport model
   */
  readonly fields: NfeImportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NfeImport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NfeImportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fornecedorRef<T extends NfeImport$fornecedorRefArgs<ExtArgs> = {}>(args?: Subset<T, NfeImport$fornecedorRefArgs<ExtArgs>>): Prisma__FornecedorClient<$Result.GetResult<Prisma.$FornecedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    itens<T extends NfeImport$itensArgs<ExtArgs> = {}>(args?: Subset<T, NfeImport$itensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the NfeImport model
   */
  interface NfeImportFieldRefs {
    readonly id: FieldRef<"NfeImport", 'String'>
    readonly empresaId: FieldRef<"NfeImport", 'String'>
    readonly chaveAcesso: FieldRef<"NfeImport", 'String'>
    readonly numeroNota: FieldRef<"NfeImport", 'String'>
    readonly serie: FieldRef<"NfeImport", 'String'>
    readonly fornecedor: FieldRef<"NfeImport", 'String'>
    readonly cnpjFornecedor: FieldRef<"NfeImport", 'String'>
    readonly fornecedorId: FieldRef<"NfeImport", 'String'>
    readonly dataEmissao: FieldRef<"NfeImport", 'DateTime'>
    readonly valorTotal: FieldRef<"NfeImport", 'Float'>
    readonly xmlOriginal: FieldRef<"NfeImport", 'String'>
    readonly createdAt: FieldRef<"NfeImport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NfeImport findUnique
   */
  export type NfeImportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * Filter, which NfeImport to fetch.
     */
    where: NfeImportWhereUniqueInput
  }

  /**
   * NfeImport findUniqueOrThrow
   */
  export type NfeImportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * Filter, which NfeImport to fetch.
     */
    where: NfeImportWhereUniqueInput
  }

  /**
   * NfeImport findFirst
   */
  export type NfeImportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * Filter, which NfeImport to fetch.
     */
    where?: NfeImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImports to fetch.
     */
    orderBy?: NfeImportOrderByWithRelationInput | NfeImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NfeImports.
     */
    cursor?: NfeImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NfeImports.
     */
    distinct?: NfeImportScalarFieldEnum | NfeImportScalarFieldEnum[]
  }

  /**
   * NfeImport findFirstOrThrow
   */
  export type NfeImportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * Filter, which NfeImport to fetch.
     */
    where?: NfeImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImports to fetch.
     */
    orderBy?: NfeImportOrderByWithRelationInput | NfeImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NfeImports.
     */
    cursor?: NfeImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NfeImports.
     */
    distinct?: NfeImportScalarFieldEnum | NfeImportScalarFieldEnum[]
  }

  /**
   * NfeImport findMany
   */
  export type NfeImportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * Filter, which NfeImports to fetch.
     */
    where?: NfeImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImports to fetch.
     */
    orderBy?: NfeImportOrderByWithRelationInput | NfeImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NfeImports.
     */
    cursor?: NfeImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NfeImports.
     */
    distinct?: NfeImportScalarFieldEnum | NfeImportScalarFieldEnum[]
  }

  /**
   * NfeImport create
   */
  export type NfeImportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * The data needed to create a NfeImport.
     */
    data: XOR<NfeImportCreateInput, NfeImportUncheckedCreateInput>
  }

  /**
   * NfeImport createMany
   */
  export type NfeImportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NfeImports.
     */
    data: NfeImportCreateManyInput | NfeImportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NfeImport createManyAndReturn
   */
  export type NfeImportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * The data used to create many NfeImports.
     */
    data: NfeImportCreateManyInput | NfeImportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NfeImport update
   */
  export type NfeImportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * The data needed to update a NfeImport.
     */
    data: XOR<NfeImportUpdateInput, NfeImportUncheckedUpdateInput>
    /**
     * Choose, which NfeImport to update.
     */
    where: NfeImportWhereUniqueInput
  }

  /**
   * NfeImport updateMany
   */
  export type NfeImportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NfeImports.
     */
    data: XOR<NfeImportUpdateManyMutationInput, NfeImportUncheckedUpdateManyInput>
    /**
     * Filter which NfeImports to update
     */
    where?: NfeImportWhereInput
    /**
     * Limit how many NfeImports to update.
     */
    limit?: number
  }

  /**
   * NfeImport updateManyAndReturn
   */
  export type NfeImportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * The data used to update NfeImports.
     */
    data: XOR<NfeImportUpdateManyMutationInput, NfeImportUncheckedUpdateManyInput>
    /**
     * Filter which NfeImports to update
     */
    where?: NfeImportWhereInput
    /**
     * Limit how many NfeImports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NfeImport upsert
   */
  export type NfeImportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * The filter to search for the NfeImport to update in case it exists.
     */
    where: NfeImportWhereUniqueInput
    /**
     * In case the NfeImport found by the `where` argument doesn't exist, create a new NfeImport with this data.
     */
    create: XOR<NfeImportCreateInput, NfeImportUncheckedCreateInput>
    /**
     * In case the NfeImport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NfeImportUpdateInput, NfeImportUncheckedUpdateInput>
  }

  /**
   * NfeImport delete
   */
  export type NfeImportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
    /**
     * Filter which NfeImport to delete.
     */
    where: NfeImportWhereUniqueInput
  }

  /**
   * NfeImport deleteMany
   */
  export type NfeImportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NfeImports to delete
     */
    where?: NfeImportWhereInput
    /**
     * Limit how many NfeImports to delete.
     */
    limit?: number
  }

  /**
   * NfeImport.fornecedorRef
   */
  export type NfeImport$fornecedorRefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornecedor
     */
    select?: FornecedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornecedor
     */
    omit?: FornecedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornecedorInclude<ExtArgs> | null
    where?: FornecedorWhereInput
  }

  /**
   * NfeImport.itens
   */
  export type NfeImport$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    where?: NfeImportItemWhereInput
    orderBy?: NfeImportItemOrderByWithRelationInput | NfeImportItemOrderByWithRelationInput[]
    cursor?: NfeImportItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NfeImportItemScalarFieldEnum | NfeImportItemScalarFieldEnum[]
  }

  /**
   * NfeImport without action
   */
  export type NfeImportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImport
     */
    select?: NfeImportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImport
     */
    omit?: NfeImportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportInclude<ExtArgs> | null
  }


  /**
   * Model NfeImportItem
   */

  export type AggregateNfeImportItem = {
    _count: NfeImportItemCountAggregateOutputType | null
    _avg: NfeImportItemAvgAggregateOutputType | null
    _sum: NfeImportItemSumAggregateOutputType | null
    _min: NfeImportItemMinAggregateOutputType | null
    _max: NfeImportItemMaxAggregateOutputType | null
  }

  export type NfeImportItemAvgAggregateOutputType = {
    quantidade: number | null
    valorUnitario: number | null
  }

  export type NfeImportItemSumAggregateOutputType = {
    quantidade: number | null
    valorUnitario: number | null
  }

  export type NfeImportItemMinAggregateOutputType = {
    id: string | null
    nfeImportId: string | null
    productId: string | null
    codigo: string | null
    codigoBarras: string | null
    descricao: string | null
    quantidade: number | null
    valorUnitario: number | null
    ncm: string | null
    cfop: string | null
    unidade: string | null
  }

  export type NfeImportItemMaxAggregateOutputType = {
    id: string | null
    nfeImportId: string | null
    productId: string | null
    codigo: string | null
    codigoBarras: string | null
    descricao: string | null
    quantidade: number | null
    valorUnitario: number | null
    ncm: string | null
    cfop: string | null
    unidade: string | null
  }

  export type NfeImportItemCountAggregateOutputType = {
    id: number
    nfeImportId: number
    productId: number
    codigo: number
    codigoBarras: number
    descricao: number
    quantidade: number
    valorUnitario: number
    ncm: number
    cfop: number
    unidade: number
    _all: number
  }


  export type NfeImportItemAvgAggregateInputType = {
    quantidade?: true
    valorUnitario?: true
  }

  export type NfeImportItemSumAggregateInputType = {
    quantidade?: true
    valorUnitario?: true
  }

  export type NfeImportItemMinAggregateInputType = {
    id?: true
    nfeImportId?: true
    productId?: true
    codigo?: true
    codigoBarras?: true
    descricao?: true
    quantidade?: true
    valorUnitario?: true
    ncm?: true
    cfop?: true
    unidade?: true
  }

  export type NfeImportItemMaxAggregateInputType = {
    id?: true
    nfeImportId?: true
    productId?: true
    codigo?: true
    codigoBarras?: true
    descricao?: true
    quantidade?: true
    valorUnitario?: true
    ncm?: true
    cfop?: true
    unidade?: true
  }

  export type NfeImportItemCountAggregateInputType = {
    id?: true
    nfeImportId?: true
    productId?: true
    codigo?: true
    codigoBarras?: true
    descricao?: true
    quantidade?: true
    valorUnitario?: true
    ncm?: true
    cfop?: true
    unidade?: true
    _all?: true
  }

  export type NfeImportItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NfeImportItem to aggregate.
     */
    where?: NfeImportItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImportItems to fetch.
     */
    orderBy?: NfeImportItemOrderByWithRelationInput | NfeImportItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NfeImportItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImportItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImportItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NfeImportItems
    **/
    _count?: true | NfeImportItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NfeImportItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NfeImportItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NfeImportItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NfeImportItemMaxAggregateInputType
  }

  export type GetNfeImportItemAggregateType<T extends NfeImportItemAggregateArgs> = {
        [P in keyof T & keyof AggregateNfeImportItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNfeImportItem[P]>
      : GetScalarType<T[P], AggregateNfeImportItem[P]>
  }




  export type NfeImportItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NfeImportItemWhereInput
    orderBy?: NfeImportItemOrderByWithAggregationInput | NfeImportItemOrderByWithAggregationInput[]
    by: NfeImportItemScalarFieldEnum[] | NfeImportItemScalarFieldEnum
    having?: NfeImportItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NfeImportItemCountAggregateInputType | true
    _avg?: NfeImportItemAvgAggregateInputType
    _sum?: NfeImportItemSumAggregateInputType
    _min?: NfeImportItemMinAggregateInputType
    _max?: NfeImportItemMaxAggregateInputType
  }

  export type NfeImportItemGroupByOutputType = {
    id: string
    nfeImportId: string
    productId: string | null
    codigo: string | null
    codigoBarras: string | null
    descricao: string
    quantidade: number
    valorUnitario: number | null
    ncm: string | null
    cfop: string | null
    unidade: string | null
    _count: NfeImportItemCountAggregateOutputType | null
    _avg: NfeImportItemAvgAggregateOutputType | null
    _sum: NfeImportItemSumAggregateOutputType | null
    _min: NfeImportItemMinAggregateOutputType | null
    _max: NfeImportItemMaxAggregateOutputType | null
  }

  type GetNfeImportItemGroupByPayload<T extends NfeImportItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NfeImportItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NfeImportItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NfeImportItemGroupByOutputType[P]>
            : GetScalarType<T[P], NfeImportItemGroupByOutputType[P]>
        }
      >
    >


  export type NfeImportItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nfeImportId?: boolean
    productId?: boolean
    codigo?: boolean
    codigoBarras?: boolean
    descricao?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    ncm?: boolean
    cfop?: boolean
    unidade?: boolean
    nfeImport?: boolean | NfeImportDefaultArgs<ExtArgs>
    product?: boolean | NfeImportItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["nfeImportItem"]>

  export type NfeImportItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nfeImportId?: boolean
    productId?: boolean
    codigo?: boolean
    codigoBarras?: boolean
    descricao?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    ncm?: boolean
    cfop?: boolean
    unidade?: boolean
    nfeImport?: boolean | NfeImportDefaultArgs<ExtArgs>
    product?: boolean | NfeImportItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["nfeImportItem"]>

  export type NfeImportItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nfeImportId?: boolean
    productId?: boolean
    codigo?: boolean
    codigoBarras?: boolean
    descricao?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    ncm?: boolean
    cfop?: boolean
    unidade?: boolean
    nfeImport?: boolean | NfeImportDefaultArgs<ExtArgs>
    product?: boolean | NfeImportItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["nfeImportItem"]>

  export type NfeImportItemSelectScalar = {
    id?: boolean
    nfeImportId?: boolean
    productId?: boolean
    codigo?: boolean
    codigoBarras?: boolean
    descricao?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    ncm?: boolean
    cfop?: boolean
    unidade?: boolean
  }

  export type NfeImportItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nfeImportId" | "productId" | "codigo" | "codigoBarras" | "descricao" | "quantidade" | "valorUnitario" | "ncm" | "cfop" | "unidade", ExtArgs["result"]["nfeImportItem"]>
  export type NfeImportItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nfeImport?: boolean | NfeImportDefaultArgs<ExtArgs>
    product?: boolean | NfeImportItem$productArgs<ExtArgs>
  }
  export type NfeImportItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nfeImport?: boolean | NfeImportDefaultArgs<ExtArgs>
    product?: boolean | NfeImportItem$productArgs<ExtArgs>
  }
  export type NfeImportItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nfeImport?: boolean | NfeImportDefaultArgs<ExtArgs>
    product?: boolean | NfeImportItem$productArgs<ExtArgs>
  }

  export type $NfeImportItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NfeImportItem"
    objects: {
      nfeImport: Prisma.$NfeImportPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nfeImportId: string
      productId: string | null
      codigo: string | null
      codigoBarras: string | null
      descricao: string
      quantidade: number
      valorUnitario: number | null
      ncm: string | null
      cfop: string | null
      unidade: string | null
    }, ExtArgs["result"]["nfeImportItem"]>
    composites: {}
  }

  type NfeImportItemGetPayload<S extends boolean | null | undefined | NfeImportItemDefaultArgs> = $Result.GetResult<Prisma.$NfeImportItemPayload, S>

  type NfeImportItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NfeImportItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NfeImportItemCountAggregateInputType | true
    }

  export interface NfeImportItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NfeImportItem'], meta: { name: 'NfeImportItem' } }
    /**
     * Find zero or one NfeImportItem that matches the filter.
     * @param {NfeImportItemFindUniqueArgs} args - Arguments to find a NfeImportItem
     * @example
     * // Get one NfeImportItem
     * const nfeImportItem = await prisma.nfeImportItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NfeImportItemFindUniqueArgs>(args: SelectSubset<T, NfeImportItemFindUniqueArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NfeImportItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NfeImportItemFindUniqueOrThrowArgs} args - Arguments to find a NfeImportItem
     * @example
     * // Get one NfeImportItem
     * const nfeImportItem = await prisma.nfeImportItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NfeImportItemFindUniqueOrThrowArgs>(args: SelectSubset<T, NfeImportItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NfeImportItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportItemFindFirstArgs} args - Arguments to find a NfeImportItem
     * @example
     * // Get one NfeImportItem
     * const nfeImportItem = await prisma.nfeImportItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NfeImportItemFindFirstArgs>(args?: SelectSubset<T, NfeImportItemFindFirstArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NfeImportItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportItemFindFirstOrThrowArgs} args - Arguments to find a NfeImportItem
     * @example
     * // Get one NfeImportItem
     * const nfeImportItem = await prisma.nfeImportItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NfeImportItemFindFirstOrThrowArgs>(args?: SelectSubset<T, NfeImportItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NfeImportItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NfeImportItems
     * const nfeImportItems = await prisma.nfeImportItem.findMany()
     * 
     * // Get first 10 NfeImportItems
     * const nfeImportItems = await prisma.nfeImportItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nfeImportItemWithIdOnly = await prisma.nfeImportItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NfeImportItemFindManyArgs>(args?: SelectSubset<T, NfeImportItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NfeImportItem.
     * @param {NfeImportItemCreateArgs} args - Arguments to create a NfeImportItem.
     * @example
     * // Create one NfeImportItem
     * const NfeImportItem = await prisma.nfeImportItem.create({
     *   data: {
     *     // ... data to create a NfeImportItem
     *   }
     * })
     * 
     */
    create<T extends NfeImportItemCreateArgs>(args: SelectSubset<T, NfeImportItemCreateArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NfeImportItems.
     * @param {NfeImportItemCreateManyArgs} args - Arguments to create many NfeImportItems.
     * @example
     * // Create many NfeImportItems
     * const nfeImportItem = await prisma.nfeImportItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NfeImportItemCreateManyArgs>(args?: SelectSubset<T, NfeImportItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NfeImportItems and returns the data saved in the database.
     * @param {NfeImportItemCreateManyAndReturnArgs} args - Arguments to create many NfeImportItems.
     * @example
     * // Create many NfeImportItems
     * const nfeImportItem = await prisma.nfeImportItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NfeImportItems and only return the `id`
     * const nfeImportItemWithIdOnly = await prisma.nfeImportItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NfeImportItemCreateManyAndReturnArgs>(args?: SelectSubset<T, NfeImportItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NfeImportItem.
     * @param {NfeImportItemDeleteArgs} args - Arguments to delete one NfeImportItem.
     * @example
     * // Delete one NfeImportItem
     * const NfeImportItem = await prisma.nfeImportItem.delete({
     *   where: {
     *     // ... filter to delete one NfeImportItem
     *   }
     * })
     * 
     */
    delete<T extends NfeImportItemDeleteArgs>(args: SelectSubset<T, NfeImportItemDeleteArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NfeImportItem.
     * @param {NfeImportItemUpdateArgs} args - Arguments to update one NfeImportItem.
     * @example
     * // Update one NfeImportItem
     * const nfeImportItem = await prisma.nfeImportItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NfeImportItemUpdateArgs>(args: SelectSubset<T, NfeImportItemUpdateArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NfeImportItems.
     * @param {NfeImportItemDeleteManyArgs} args - Arguments to filter NfeImportItems to delete.
     * @example
     * // Delete a few NfeImportItems
     * const { count } = await prisma.nfeImportItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NfeImportItemDeleteManyArgs>(args?: SelectSubset<T, NfeImportItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NfeImportItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NfeImportItems
     * const nfeImportItem = await prisma.nfeImportItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NfeImportItemUpdateManyArgs>(args: SelectSubset<T, NfeImportItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NfeImportItems and returns the data updated in the database.
     * @param {NfeImportItemUpdateManyAndReturnArgs} args - Arguments to update many NfeImportItems.
     * @example
     * // Update many NfeImportItems
     * const nfeImportItem = await prisma.nfeImportItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NfeImportItems and only return the `id`
     * const nfeImportItemWithIdOnly = await prisma.nfeImportItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends NfeImportItemUpdateManyAndReturnArgs>(args: SelectSubset<T, NfeImportItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NfeImportItem.
     * @param {NfeImportItemUpsertArgs} args - Arguments to update or create a NfeImportItem.
     * @example
     * // Update or create a NfeImportItem
     * const nfeImportItem = await prisma.nfeImportItem.upsert({
     *   create: {
     *     // ... data to create a NfeImportItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NfeImportItem we want to update
     *   }
     * })
     */
    upsert<T extends NfeImportItemUpsertArgs>(args: SelectSubset<T, NfeImportItemUpsertArgs<ExtArgs>>): Prisma__NfeImportItemClient<$Result.GetResult<Prisma.$NfeImportItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NfeImportItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportItemCountArgs} args - Arguments to filter NfeImportItems to count.
     * @example
     * // Count the number of NfeImportItems
     * const count = await prisma.nfeImportItem.count({
     *   where: {
     *     // ... the filter for the NfeImportItems we want to count
     *   }
     * })
    **/
    count<T extends NfeImportItemCountArgs>(
      args?: Subset<T, NfeImportItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NfeImportItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NfeImportItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NfeImportItemAggregateArgs>(args: Subset<T, NfeImportItemAggregateArgs>): Prisma.PrismaPromise<GetNfeImportItemAggregateType<T>>

    /**
     * Group by NfeImportItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NfeImportItemGroupByArgs} args - Group by arguments.
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
      T extends NfeImportItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NfeImportItemGroupByArgs['orderBy'] }
        : { orderBy?: NfeImportItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NfeImportItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNfeImportItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NfeImportItem model
   */
  readonly fields: NfeImportItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NfeImportItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NfeImportItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nfeImport<T extends NfeImportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NfeImportDefaultArgs<ExtArgs>>): Prisma__NfeImportClient<$Result.GetResult<Prisma.$NfeImportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends NfeImportItem$productArgs<ExtArgs> = {}>(args?: Subset<T, NfeImportItem$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the NfeImportItem model
   */
  interface NfeImportItemFieldRefs {
    readonly id: FieldRef<"NfeImportItem", 'String'>
    readonly nfeImportId: FieldRef<"NfeImportItem", 'String'>
    readonly productId: FieldRef<"NfeImportItem", 'String'>
    readonly codigo: FieldRef<"NfeImportItem", 'String'>
    readonly codigoBarras: FieldRef<"NfeImportItem", 'String'>
    readonly descricao: FieldRef<"NfeImportItem", 'String'>
    readonly quantidade: FieldRef<"NfeImportItem", 'Float'>
    readonly valorUnitario: FieldRef<"NfeImportItem", 'Float'>
    readonly ncm: FieldRef<"NfeImportItem", 'String'>
    readonly cfop: FieldRef<"NfeImportItem", 'String'>
    readonly unidade: FieldRef<"NfeImportItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * NfeImportItem findUnique
   */
  export type NfeImportItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * Filter, which NfeImportItem to fetch.
     */
    where: NfeImportItemWhereUniqueInput
  }

  /**
   * NfeImportItem findUniqueOrThrow
   */
  export type NfeImportItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * Filter, which NfeImportItem to fetch.
     */
    where: NfeImportItemWhereUniqueInput
  }

  /**
   * NfeImportItem findFirst
   */
  export type NfeImportItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * Filter, which NfeImportItem to fetch.
     */
    where?: NfeImportItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImportItems to fetch.
     */
    orderBy?: NfeImportItemOrderByWithRelationInput | NfeImportItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NfeImportItems.
     */
    cursor?: NfeImportItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImportItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImportItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NfeImportItems.
     */
    distinct?: NfeImportItemScalarFieldEnum | NfeImportItemScalarFieldEnum[]
  }

  /**
   * NfeImportItem findFirstOrThrow
   */
  export type NfeImportItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * Filter, which NfeImportItem to fetch.
     */
    where?: NfeImportItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImportItems to fetch.
     */
    orderBy?: NfeImportItemOrderByWithRelationInput | NfeImportItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NfeImportItems.
     */
    cursor?: NfeImportItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImportItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImportItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NfeImportItems.
     */
    distinct?: NfeImportItemScalarFieldEnum | NfeImportItemScalarFieldEnum[]
  }

  /**
   * NfeImportItem findMany
   */
  export type NfeImportItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * Filter, which NfeImportItems to fetch.
     */
    where?: NfeImportItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NfeImportItems to fetch.
     */
    orderBy?: NfeImportItemOrderByWithRelationInput | NfeImportItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NfeImportItems.
     */
    cursor?: NfeImportItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NfeImportItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NfeImportItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NfeImportItems.
     */
    distinct?: NfeImportItemScalarFieldEnum | NfeImportItemScalarFieldEnum[]
  }

  /**
   * NfeImportItem create
   */
  export type NfeImportItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * The data needed to create a NfeImportItem.
     */
    data: XOR<NfeImportItemCreateInput, NfeImportItemUncheckedCreateInput>
  }

  /**
   * NfeImportItem createMany
   */
  export type NfeImportItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NfeImportItems.
     */
    data: NfeImportItemCreateManyInput | NfeImportItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NfeImportItem createManyAndReturn
   */
  export type NfeImportItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * The data used to create many NfeImportItems.
     */
    data: NfeImportItemCreateManyInput | NfeImportItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NfeImportItem update
   */
  export type NfeImportItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * The data needed to update a NfeImportItem.
     */
    data: XOR<NfeImportItemUpdateInput, NfeImportItemUncheckedUpdateInput>
    /**
     * Choose, which NfeImportItem to update.
     */
    where: NfeImportItemWhereUniqueInput
  }

  /**
   * NfeImportItem updateMany
   */
  export type NfeImportItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NfeImportItems.
     */
    data: XOR<NfeImportItemUpdateManyMutationInput, NfeImportItemUncheckedUpdateManyInput>
    /**
     * Filter which NfeImportItems to update
     */
    where?: NfeImportItemWhereInput
    /**
     * Limit how many NfeImportItems to update.
     */
    limit?: number
  }

  /**
   * NfeImportItem updateManyAndReturn
   */
  export type NfeImportItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * The data used to update NfeImportItems.
     */
    data: XOR<NfeImportItemUpdateManyMutationInput, NfeImportItemUncheckedUpdateManyInput>
    /**
     * Filter which NfeImportItems to update
     */
    where?: NfeImportItemWhereInput
    /**
     * Limit how many NfeImportItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NfeImportItem upsert
   */
  export type NfeImportItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * The filter to search for the NfeImportItem to update in case it exists.
     */
    where: NfeImportItemWhereUniqueInput
    /**
     * In case the NfeImportItem found by the `where` argument doesn't exist, create a new NfeImportItem with this data.
     */
    create: XOR<NfeImportItemCreateInput, NfeImportItemUncheckedCreateInput>
    /**
     * In case the NfeImportItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NfeImportItemUpdateInput, NfeImportItemUncheckedUpdateInput>
  }

  /**
   * NfeImportItem delete
   */
  export type NfeImportItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
    /**
     * Filter which NfeImportItem to delete.
     */
    where: NfeImportItemWhereUniqueInput
  }

  /**
   * NfeImportItem deleteMany
   */
  export type NfeImportItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NfeImportItems to delete
     */
    where?: NfeImportItemWhereInput
    /**
     * Limit how many NfeImportItems to delete.
     */
    limit?: number
  }

  /**
   * NfeImportItem.product
   */
  export type NfeImportItem$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * NfeImportItem without action
   */
  export type NfeImportItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NfeImportItem
     */
    select?: NfeImportItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NfeImportItem
     */
    omit?: NfeImportItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NfeImportItemInclude<ExtArgs> | null
  }


  /**
   * Model UserInvite
   */

  export type AggregateUserInvite = {
    _count: UserInviteCountAggregateOutputType | null
    _min: UserInviteMinAggregateOutputType | null
    _max: UserInviteMaxAggregateOutputType | null
  }

  export type UserInviteMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    email: string | null
    role: string | null
    token: string | null
    status: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type UserInviteMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nome: string | null
    email: string | null
    role: string | null
    token: string | null
    status: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type UserInviteCountAggregateOutputType = {
    id: number
    empresaId: number
    nome: number
    email: number
    role: number
    token: number
    status: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type UserInviteMinAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    role?: true
    token?: true
    status?: true
    expiresAt?: true
    createdAt?: true
  }

  export type UserInviteMaxAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    role?: true
    token?: true
    status?: true
    expiresAt?: true
    createdAt?: true
  }

  export type UserInviteCountAggregateInputType = {
    id?: true
    empresaId?: true
    nome?: true
    email?: true
    role?: true
    token?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type UserInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInvite to aggregate.
     */
    where?: UserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvites to fetch.
     */
    orderBy?: UserInviteOrderByWithRelationInput | UserInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInvites
    **/
    _count?: true | UserInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInviteMaxAggregateInputType
  }

  export type GetUserInviteAggregateType<T extends UserInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInvite[P]>
      : GetScalarType<T[P], AggregateUserInvite[P]>
  }




  export type UserInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInviteWhereInput
    orderBy?: UserInviteOrderByWithAggregationInput | UserInviteOrderByWithAggregationInput[]
    by: UserInviteScalarFieldEnum[] | UserInviteScalarFieldEnum
    having?: UserInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInviteCountAggregateInputType | true
    _min?: UserInviteMinAggregateInputType
    _max?: UserInviteMaxAggregateInputType
  }

  export type UserInviteGroupByOutputType = {
    id: string
    empresaId: string
    nome: string
    email: string
    role: string
    token: string
    status: string
    expiresAt: Date
    createdAt: Date
    _count: UserInviteCountAggregateOutputType | null
    _min: UserInviteMinAggregateOutputType | null
    _max: UserInviteMaxAggregateOutputType | null
  }

  type GetUserInviteGroupByPayload<T extends UserInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInviteGroupByOutputType[P]>
            : GetScalarType<T[P], UserInviteGroupByOutputType[P]>
        }
      >
    >


  export type UserInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    role?: boolean
    token?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInvite"]>

  export type UserInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    role?: boolean
    token?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInvite"]>

  export type UserInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    role?: boolean
    token?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInvite"]>

  export type UserInviteSelectScalar = {
    id?: boolean
    empresaId?: boolean
    nome?: boolean
    email?: boolean
    role?: boolean
    token?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type UserInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "nome" | "email" | "role" | "token" | "status" | "expiresAt" | "createdAt", ExtArgs["result"]["userInvite"]>
  export type UserInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type UserInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type UserInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $UserInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserInvite"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      nome: string
      email: string
      role: string
      token: string
      status: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["userInvite"]>
    composites: {}
  }

  type UserInviteGetPayload<S extends boolean | null | undefined | UserInviteDefaultArgs> = $Result.GetResult<Prisma.$UserInvitePayload, S>

  type UserInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserInviteCountAggregateInputType | true
    }

  export interface UserInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserInvite'], meta: { name: 'UserInvite' } }
    /**
     * Find zero or one UserInvite that matches the filter.
     * @param {UserInviteFindUniqueArgs} args - Arguments to find a UserInvite
     * @example
     * // Get one UserInvite
     * const userInvite = await prisma.userInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInviteFindUniqueArgs>(args: SelectSubset<T, UserInviteFindUniqueArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInviteFindUniqueOrThrowArgs} args - Arguments to find a UserInvite
     * @example
     * // Get one UserInvite
     * const userInvite = await prisma.userInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, UserInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInviteFindFirstArgs} args - Arguments to find a UserInvite
     * @example
     * // Get one UserInvite
     * const userInvite = await prisma.userInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInviteFindFirstArgs>(args?: SelectSubset<T, UserInviteFindFirstArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInviteFindFirstOrThrowArgs} args - Arguments to find a UserInvite
     * @example
     * // Get one UserInvite
     * const userInvite = await prisma.userInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, UserInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInvites
     * const userInvites = await prisma.userInvite.findMany()
     * 
     * // Get first 10 UserInvites
     * const userInvites = await prisma.userInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userInviteWithIdOnly = await prisma.userInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserInviteFindManyArgs>(args?: SelectSubset<T, UserInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserInvite.
     * @param {UserInviteCreateArgs} args - Arguments to create a UserInvite.
     * @example
     * // Create one UserInvite
     * const UserInvite = await prisma.userInvite.create({
     *   data: {
     *     // ... data to create a UserInvite
     *   }
     * })
     * 
     */
    create<T extends UserInviteCreateArgs>(args: SelectSubset<T, UserInviteCreateArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserInvites.
     * @param {UserInviteCreateManyArgs} args - Arguments to create many UserInvites.
     * @example
     * // Create many UserInvites
     * const userInvite = await prisma.userInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserInviteCreateManyArgs>(args?: SelectSubset<T, UserInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserInvites and returns the data saved in the database.
     * @param {UserInviteCreateManyAndReturnArgs} args - Arguments to create many UserInvites.
     * @example
     * // Create many UserInvites
     * const userInvite = await prisma.userInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserInvites and only return the `id`
     * const userInviteWithIdOnly = await prisma.userInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, UserInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserInvite.
     * @param {UserInviteDeleteArgs} args - Arguments to delete one UserInvite.
     * @example
     * // Delete one UserInvite
     * const UserInvite = await prisma.userInvite.delete({
     *   where: {
     *     // ... filter to delete one UserInvite
     *   }
     * })
     * 
     */
    delete<T extends UserInviteDeleteArgs>(args: SelectSubset<T, UserInviteDeleteArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserInvite.
     * @param {UserInviteUpdateArgs} args - Arguments to update one UserInvite.
     * @example
     * // Update one UserInvite
     * const userInvite = await prisma.userInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserInviteUpdateArgs>(args: SelectSubset<T, UserInviteUpdateArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserInvites.
     * @param {UserInviteDeleteManyArgs} args - Arguments to filter UserInvites to delete.
     * @example
     * // Delete a few UserInvites
     * const { count } = await prisma.userInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserInviteDeleteManyArgs>(args?: SelectSubset<T, UserInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInvites
     * const userInvite = await prisma.userInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserInviteUpdateManyArgs>(args: SelectSubset<T, UserInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInvites and returns the data updated in the database.
     * @param {UserInviteUpdateManyAndReturnArgs} args - Arguments to update many UserInvites.
     * @example
     * // Update many UserInvites
     * const userInvite = await prisma.userInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserInvites and only return the `id`
     * const userInviteWithIdOnly = await prisma.userInvite.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, UserInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserInvite.
     * @param {UserInviteUpsertArgs} args - Arguments to update or create a UserInvite.
     * @example
     * // Update or create a UserInvite
     * const userInvite = await prisma.userInvite.upsert({
     *   create: {
     *     // ... data to create a UserInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInvite we want to update
     *   }
     * })
     */
    upsert<T extends UserInviteUpsertArgs>(args: SelectSubset<T, UserInviteUpsertArgs<ExtArgs>>): Prisma__UserInviteClient<$Result.GetResult<Prisma.$UserInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInviteCountArgs} args - Arguments to filter UserInvites to count.
     * @example
     * // Count the number of UserInvites
     * const count = await prisma.userInvite.count({
     *   where: {
     *     // ... the filter for the UserInvites we want to count
     *   }
     * })
    **/
    count<T extends UserInviteCountArgs>(
      args?: Subset<T, UserInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserInviteAggregateArgs>(args: Subset<T, UserInviteAggregateArgs>): Prisma.PrismaPromise<GetUserInviteAggregateType<T>>

    /**
     * Group by UserInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInviteGroupByArgs} args - Group by arguments.
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
      T extends UserInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInviteGroupByArgs['orderBy'] }
        : { orderBy?: UserInviteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserInvite model
   */
  readonly fields: UserInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserInvite model
   */
  interface UserInviteFieldRefs {
    readonly id: FieldRef<"UserInvite", 'String'>
    readonly empresaId: FieldRef<"UserInvite", 'String'>
    readonly nome: FieldRef<"UserInvite", 'String'>
    readonly email: FieldRef<"UserInvite", 'String'>
    readonly role: FieldRef<"UserInvite", 'String'>
    readonly token: FieldRef<"UserInvite", 'String'>
    readonly status: FieldRef<"UserInvite", 'String'>
    readonly expiresAt: FieldRef<"UserInvite", 'DateTime'>
    readonly createdAt: FieldRef<"UserInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserInvite findUnique
   */
  export type UserInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * Filter, which UserInvite to fetch.
     */
    where: UserInviteWhereUniqueInput
  }

  /**
   * UserInvite findUniqueOrThrow
   */
  export type UserInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * Filter, which UserInvite to fetch.
     */
    where: UserInviteWhereUniqueInput
  }

  /**
   * UserInvite findFirst
   */
  export type UserInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * Filter, which UserInvite to fetch.
     */
    where?: UserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvites to fetch.
     */
    orderBy?: UserInviteOrderByWithRelationInput | UserInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInvites.
     */
    cursor?: UserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInvites.
     */
    distinct?: UserInviteScalarFieldEnum | UserInviteScalarFieldEnum[]
  }

  /**
   * UserInvite findFirstOrThrow
   */
  export type UserInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * Filter, which UserInvite to fetch.
     */
    where?: UserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvites to fetch.
     */
    orderBy?: UserInviteOrderByWithRelationInput | UserInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInvites.
     */
    cursor?: UserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInvites.
     */
    distinct?: UserInviteScalarFieldEnum | UserInviteScalarFieldEnum[]
  }

  /**
   * UserInvite findMany
   */
  export type UserInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * Filter, which UserInvites to fetch.
     */
    where?: UserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInvites to fetch.
     */
    orderBy?: UserInviteOrderByWithRelationInput | UserInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInvites.
     */
    cursor?: UserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInvites.
     */
    distinct?: UserInviteScalarFieldEnum | UserInviteScalarFieldEnum[]
  }

  /**
   * UserInvite create
   */
  export type UserInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a UserInvite.
     */
    data: XOR<UserInviteCreateInput, UserInviteUncheckedCreateInput>
  }

  /**
   * UserInvite createMany
   */
  export type UserInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInvites.
     */
    data: UserInviteCreateManyInput | UserInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserInvite createManyAndReturn
   */
  export type UserInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * The data used to create many UserInvites.
     */
    data: UserInviteCreateManyInput | UserInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInvite update
   */
  export type UserInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a UserInvite.
     */
    data: XOR<UserInviteUpdateInput, UserInviteUncheckedUpdateInput>
    /**
     * Choose, which UserInvite to update.
     */
    where: UserInviteWhereUniqueInput
  }

  /**
   * UserInvite updateMany
   */
  export type UserInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInvites.
     */
    data: XOR<UserInviteUpdateManyMutationInput, UserInviteUncheckedUpdateManyInput>
    /**
     * Filter which UserInvites to update
     */
    where?: UserInviteWhereInput
    /**
     * Limit how many UserInvites to update.
     */
    limit?: number
  }

  /**
   * UserInvite updateManyAndReturn
   */
  export type UserInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * The data used to update UserInvites.
     */
    data: XOR<UserInviteUpdateManyMutationInput, UserInviteUncheckedUpdateManyInput>
    /**
     * Filter which UserInvites to update
     */
    where?: UserInviteWhereInput
    /**
     * Limit how many UserInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInvite upsert
   */
  export type UserInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the UserInvite to update in case it exists.
     */
    where: UserInviteWhereUniqueInput
    /**
     * In case the UserInvite found by the `where` argument doesn't exist, create a new UserInvite with this data.
     */
    create: XOR<UserInviteCreateInput, UserInviteUncheckedCreateInput>
    /**
     * In case the UserInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserInviteUpdateInput, UserInviteUncheckedUpdateInput>
  }

  /**
   * UserInvite delete
   */
  export type UserInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
    /**
     * Filter which UserInvite to delete.
     */
    where: UserInviteWhereUniqueInput
  }

  /**
   * UserInvite deleteMany
   */
  export type UserInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInvites to delete
     */
    where?: UserInviteWhereInput
    /**
     * Limit how many UserInvites to delete.
     */
    limit?: number
  }

  /**
   * UserInvite without action
   */
  export type UserInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInvite
     */
    select?: UserInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInvite
     */
    omit?: UserInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInviteInclude<ExtArgs> | null
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


  export const EmpresaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cnpj: 'cnpj',
    createdAt: 'createdAt'
  };

  export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    sku: 'sku',
    codigoBarras: 'codigoBarras',
    categoria: 'categoria',
    custo: 'custo',
    preco: 'preco',
    estoqueAtual: 'estoqueAtual',
    estoqueMinimo: 'estoqueMinimo',
    createdAt: 'createdAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const StockMovementScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    productId: 'productId',
    tipo: 'tipo',
    quantidade: 'quantidade',
    observacao: 'observacao',
    createdAt: 'createdAt'
  };

  export type StockMovementScalarFieldEnum = (typeof StockMovementScalarFieldEnum)[keyof typeof StockMovementScalarFieldEnum]


  export const SolicitacaoScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    userId: 'userId',
    productId: 'productId',
    quantidade: 'quantidade',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type SolicitacaoScalarFieldEnum = (typeof SolicitacaoScalarFieldEnum)[keyof typeof SolicitacaoScalarFieldEnum]


  export const FornecedorScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    cnpj: 'cnpj',
    createdAt: 'createdAt'
  };

  export type FornecedorScalarFieldEnum = (typeof FornecedorScalarFieldEnum)[keyof typeof FornecedorScalarFieldEnum]


  export const NfeImportScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    chaveAcesso: 'chaveAcesso',
    numeroNota: 'numeroNota',
    serie: 'serie',
    fornecedor: 'fornecedor',
    cnpjFornecedor: 'cnpjFornecedor',
    fornecedorId: 'fornecedorId',
    dataEmissao: 'dataEmissao',
    valorTotal: 'valorTotal',
    xmlOriginal: 'xmlOriginal',
    createdAt: 'createdAt'
  };

  export type NfeImportScalarFieldEnum = (typeof NfeImportScalarFieldEnum)[keyof typeof NfeImportScalarFieldEnum]


  export const NfeImportItemScalarFieldEnum: {
    id: 'id',
    nfeImportId: 'nfeImportId',
    productId: 'productId',
    codigo: 'codigo',
    codigoBarras: 'codigoBarras',
    descricao: 'descricao',
    quantidade: 'quantidade',
    valorUnitario: 'valorUnitario',
    ncm: 'ncm',
    cfop: 'cfop',
    unidade: 'unidade'
  };

  export type NfeImportItemScalarFieldEnum = (typeof NfeImportItemScalarFieldEnum)[keyof typeof NfeImportItemScalarFieldEnum]


  export const UserInviteScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nome: 'nome',
    email: 'email',
    role: 'role',
    token: 'token',
    status: 'status',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type UserInviteScalarFieldEnum = (typeof UserInviteScalarFieldEnum)[keyof typeof UserInviteScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type EmpresaWhereInput = {
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    id?: StringFilter<"Empresa"> | string
    nome?: StringFilter<"Empresa"> | string
    cnpj?: StringNullableFilter<"Empresa"> | string | null
    createdAt?: DateTimeFilter<"Empresa"> | Date | string
    convites?: UserInviteListRelationFilter
    usuarios?: UserListRelationFilter
    produtos?: ProductListRelationFilter
    movimentacoes?: StockMovementListRelationFilter
    solicitacoes?: SolicitacaoListRelationFilter
    fornecedores?: FornecedorListRelationFilter
    nfeImports?: NfeImportListRelationFilter
  }

  export type EmpresaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    convites?: UserInviteOrderByRelationAggregateInput
    usuarios?: UserOrderByRelationAggregateInput
    produtos?: ProductOrderByRelationAggregateInput
    movimentacoes?: StockMovementOrderByRelationAggregateInput
    solicitacoes?: SolicitacaoOrderByRelationAggregateInput
    fornecedores?: FornecedorOrderByRelationAggregateInput
    nfeImports?: NfeImportOrderByRelationAggregateInput
  }

  export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnpj?: string
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    nome?: StringFilter<"Empresa"> | string
    createdAt?: DateTimeFilter<"Empresa"> | Date | string
    convites?: UserInviteListRelationFilter
    usuarios?: UserListRelationFilter
    produtos?: ProductListRelationFilter
    movimentacoes?: StockMovementListRelationFilter
    solicitacoes?: SolicitacaoListRelationFilter
    fornecedores?: FornecedorListRelationFilter
    nfeImports?: NfeImportListRelationFilter
  }, "id" | "cnpj">

  export type EmpresaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmpresaCountOrderByAggregateInput
    _max?: EmpresaMaxOrderByAggregateInput
    _min?: EmpresaMinOrderByAggregateInput
  }

  export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    OR?: EmpresaScalarWhereWithAggregatesInput[]
    NOT?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Empresa"> | string
    nome?: StringWithAggregatesFilter<"Empresa"> | string
    cnpj?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    empresaId?: StringFilter<"User"> | string
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    solicitacoes?: SolicitacaoListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    solicitacoes?: SolicitacaoOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId_email?: UserEmpresaIdEmailCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    empresaId?: StringFilter<"User"> | string
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    solicitacoes?: SolicitacaoListRelationFilter
  }, "id" | "empresaId_email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    empresaId?: StringWithAggregatesFilter<"User"> | string
    nome?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    senha?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    empresaId?: StringFilter<"Product"> | string
    nome?: StringFilter<"Product"> | string
    sku?: StringNullableFilter<"Product"> | string | null
    codigoBarras?: StringNullableFilter<"Product"> | string | null
    categoria?: StringNullableFilter<"Product"> | string | null
    custo?: FloatNullableFilter<"Product"> | number | null
    preco?: FloatNullableFilter<"Product"> | number | null
    estoqueAtual?: FloatFilter<"Product"> | number
    estoqueMinimo?: FloatFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    movements?: StockMovementListRelationFilter
    solicitacoes?: SolicitacaoListRelationFilter
    nfeItens?: NfeImportItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    sku?: SortOrderInput | SortOrder
    codigoBarras?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    custo?: SortOrderInput | SortOrder
    preco?: SortOrderInput | SortOrder
    estoqueAtual?: SortOrder
    estoqueMinimo?: SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    movements?: StockMovementOrderByRelationAggregateInput
    solicitacoes?: SolicitacaoOrderByRelationAggregateInput
    nfeItens?: NfeImportItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId_sku?: ProductEmpresaIdSkuCompoundUniqueInput
    empresaId_codigoBarras?: ProductEmpresaIdCodigoBarrasCompoundUniqueInput
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    empresaId?: StringFilter<"Product"> | string
    nome?: StringFilter<"Product"> | string
    sku?: StringNullableFilter<"Product"> | string | null
    codigoBarras?: StringNullableFilter<"Product"> | string | null
    categoria?: StringNullableFilter<"Product"> | string | null
    custo?: FloatNullableFilter<"Product"> | number | null
    preco?: FloatNullableFilter<"Product"> | number | null
    estoqueAtual?: FloatFilter<"Product"> | number
    estoqueMinimo?: FloatFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    movements?: StockMovementListRelationFilter
    solicitacoes?: SolicitacaoListRelationFilter
    nfeItens?: NfeImportItemListRelationFilter
  }, "id" | "empresaId_sku" | "empresaId_codigoBarras">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    sku?: SortOrderInput | SortOrder
    codigoBarras?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    custo?: SortOrderInput | SortOrder
    preco?: SortOrderInput | SortOrder
    estoqueAtual?: SortOrder
    estoqueMinimo?: SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    empresaId?: StringWithAggregatesFilter<"Product"> | string
    nome?: StringWithAggregatesFilter<"Product"> | string
    sku?: StringNullableWithAggregatesFilter<"Product"> | string | null
    codigoBarras?: StringNullableWithAggregatesFilter<"Product"> | string | null
    categoria?: StringNullableWithAggregatesFilter<"Product"> | string | null
    custo?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    preco?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    estoqueAtual?: FloatWithAggregatesFilter<"Product"> | number
    estoqueMinimo?: FloatWithAggregatesFilter<"Product"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type StockMovementWhereInput = {
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    id?: StringFilter<"StockMovement"> | string
    empresaId?: StringFilter<"StockMovement"> | string
    productId?: StringFilter<"StockMovement"> | string
    tipo?: StringFilter<"StockMovement"> | string
    quantidade?: FloatFilter<"StockMovement"> | number
    observacao?: StringNullableFilter<"StockMovement"> | string | null
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type StockMovementOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    productId?: SortOrder
    tipo?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type StockMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    empresaId?: StringFilter<"StockMovement"> | string
    productId?: StringFilter<"StockMovement"> | string
    tipo?: StringFilter<"StockMovement"> | string
    quantidade?: FloatFilter<"StockMovement"> | number
    observacao?: StringNullableFilter<"StockMovement"> | string | null
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type StockMovementOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    productId?: SortOrder
    tipo?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StockMovementCountOrderByAggregateInput
    _avg?: StockMovementAvgOrderByAggregateInput
    _max?: StockMovementMaxOrderByAggregateInput
    _min?: StockMovementMinOrderByAggregateInput
    _sum?: StockMovementSumOrderByAggregateInput
  }

  export type StockMovementScalarWhereWithAggregatesInput = {
    AND?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    OR?: StockMovementScalarWhereWithAggregatesInput[]
    NOT?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockMovement"> | string
    empresaId?: StringWithAggregatesFilter<"StockMovement"> | string
    productId?: StringWithAggregatesFilter<"StockMovement"> | string
    tipo?: StringWithAggregatesFilter<"StockMovement"> | string
    quantidade?: FloatWithAggregatesFilter<"StockMovement"> | number
    observacao?: StringNullableWithAggregatesFilter<"StockMovement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StockMovement"> | Date | string
  }

  export type SolicitacaoWhereInput = {
    AND?: SolicitacaoWhereInput | SolicitacaoWhereInput[]
    OR?: SolicitacaoWhereInput[]
    NOT?: SolicitacaoWhereInput | SolicitacaoWhereInput[]
    id?: StringFilter<"Solicitacao"> | string
    empresaId?: StringFilter<"Solicitacao"> | string
    userId?: StringFilter<"Solicitacao"> | string
    productId?: StringFilter<"Solicitacao"> | string
    quantidade?: FloatFilter<"Solicitacao"> | number
    status?: StringFilter<"Solicitacao"> | string
    createdAt?: DateTimeFilter<"Solicitacao"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type SolicitacaoOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantidade?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type SolicitacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SolicitacaoWhereInput | SolicitacaoWhereInput[]
    OR?: SolicitacaoWhereInput[]
    NOT?: SolicitacaoWhereInput | SolicitacaoWhereInput[]
    empresaId?: StringFilter<"Solicitacao"> | string
    userId?: StringFilter<"Solicitacao"> | string
    productId?: StringFilter<"Solicitacao"> | string
    quantidade?: FloatFilter<"Solicitacao"> | number
    status?: StringFilter<"Solicitacao"> | string
    createdAt?: DateTimeFilter<"Solicitacao"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type SolicitacaoOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantidade?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: SolicitacaoCountOrderByAggregateInput
    _avg?: SolicitacaoAvgOrderByAggregateInput
    _max?: SolicitacaoMaxOrderByAggregateInput
    _min?: SolicitacaoMinOrderByAggregateInput
    _sum?: SolicitacaoSumOrderByAggregateInput
  }

  export type SolicitacaoScalarWhereWithAggregatesInput = {
    AND?: SolicitacaoScalarWhereWithAggregatesInput | SolicitacaoScalarWhereWithAggregatesInput[]
    OR?: SolicitacaoScalarWhereWithAggregatesInput[]
    NOT?: SolicitacaoScalarWhereWithAggregatesInput | SolicitacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Solicitacao"> | string
    empresaId?: StringWithAggregatesFilter<"Solicitacao"> | string
    userId?: StringWithAggregatesFilter<"Solicitacao"> | string
    productId?: StringWithAggregatesFilter<"Solicitacao"> | string
    quantidade?: FloatWithAggregatesFilter<"Solicitacao"> | number
    status?: StringWithAggregatesFilter<"Solicitacao"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Solicitacao"> | Date | string
  }

  export type FornecedorWhereInput = {
    AND?: FornecedorWhereInput | FornecedorWhereInput[]
    OR?: FornecedorWhereInput[]
    NOT?: FornecedorWhereInput | FornecedorWhereInput[]
    id?: StringFilter<"Fornecedor"> | string
    empresaId?: StringFilter<"Fornecedor"> | string
    nome?: StringFilter<"Fornecedor"> | string
    cnpj?: StringFilter<"Fornecedor"> | string
    createdAt?: DateTimeFilter<"Fornecedor"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    notasFiscais?: NfeImportListRelationFilter
  }

  export type FornecedorOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    notasFiscais?: NfeImportOrderByRelationAggregateInput
  }

  export type FornecedorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId_cnpj?: FornecedorEmpresaIdCnpjCompoundUniqueInput
    AND?: FornecedorWhereInput | FornecedorWhereInput[]
    OR?: FornecedorWhereInput[]
    NOT?: FornecedorWhereInput | FornecedorWhereInput[]
    empresaId?: StringFilter<"Fornecedor"> | string
    nome?: StringFilter<"Fornecedor"> | string
    cnpj?: StringFilter<"Fornecedor"> | string
    createdAt?: DateTimeFilter<"Fornecedor"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    notasFiscais?: NfeImportListRelationFilter
  }, "id" | "empresaId_cnpj">

  export type FornecedorOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
    _count?: FornecedorCountOrderByAggregateInput
    _max?: FornecedorMaxOrderByAggregateInput
    _min?: FornecedorMinOrderByAggregateInput
  }

  export type FornecedorScalarWhereWithAggregatesInput = {
    AND?: FornecedorScalarWhereWithAggregatesInput | FornecedorScalarWhereWithAggregatesInput[]
    OR?: FornecedorScalarWhereWithAggregatesInput[]
    NOT?: FornecedorScalarWhereWithAggregatesInput | FornecedorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Fornecedor"> | string
    empresaId?: StringWithAggregatesFilter<"Fornecedor"> | string
    nome?: StringWithAggregatesFilter<"Fornecedor"> | string
    cnpj?: StringWithAggregatesFilter<"Fornecedor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Fornecedor"> | Date | string
  }

  export type NfeImportWhereInput = {
    AND?: NfeImportWhereInput | NfeImportWhereInput[]
    OR?: NfeImportWhereInput[]
    NOT?: NfeImportWhereInput | NfeImportWhereInput[]
    id?: StringFilter<"NfeImport"> | string
    empresaId?: StringFilter<"NfeImport"> | string
    chaveAcesso?: StringFilter<"NfeImport"> | string
    numeroNota?: StringNullableFilter<"NfeImport"> | string | null
    serie?: StringNullableFilter<"NfeImport"> | string | null
    fornecedor?: StringNullableFilter<"NfeImport"> | string | null
    cnpjFornecedor?: StringNullableFilter<"NfeImport"> | string | null
    fornecedorId?: StringNullableFilter<"NfeImport"> | string | null
    dataEmissao?: DateTimeNullableFilter<"NfeImport"> | Date | string | null
    valorTotal?: FloatNullableFilter<"NfeImport"> | number | null
    xmlOriginal?: StringNullableFilter<"NfeImport"> | string | null
    createdAt?: DateTimeFilter<"NfeImport"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    fornecedorRef?: XOR<FornecedorNullableScalarRelationFilter, FornecedorWhereInput> | null
    itens?: NfeImportItemListRelationFilter
  }

  export type NfeImportOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    numeroNota?: SortOrderInput | SortOrder
    serie?: SortOrderInput | SortOrder
    fornecedor?: SortOrderInput | SortOrder
    cnpjFornecedor?: SortOrderInput | SortOrder
    fornecedorId?: SortOrderInput | SortOrder
    dataEmissao?: SortOrderInput | SortOrder
    valorTotal?: SortOrderInput | SortOrder
    xmlOriginal?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    fornecedorRef?: FornecedorOrderByWithRelationInput
    itens?: NfeImportItemOrderByRelationAggregateInput
  }

  export type NfeImportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId_chaveAcesso?: NfeImportEmpresaIdChaveAcessoCompoundUniqueInput
    AND?: NfeImportWhereInput | NfeImportWhereInput[]
    OR?: NfeImportWhereInput[]
    NOT?: NfeImportWhereInput | NfeImportWhereInput[]
    empresaId?: StringFilter<"NfeImport"> | string
    chaveAcesso?: StringFilter<"NfeImport"> | string
    numeroNota?: StringNullableFilter<"NfeImport"> | string | null
    serie?: StringNullableFilter<"NfeImport"> | string | null
    fornecedor?: StringNullableFilter<"NfeImport"> | string | null
    cnpjFornecedor?: StringNullableFilter<"NfeImport"> | string | null
    fornecedorId?: StringNullableFilter<"NfeImport"> | string | null
    dataEmissao?: DateTimeNullableFilter<"NfeImport"> | Date | string | null
    valorTotal?: FloatNullableFilter<"NfeImport"> | number | null
    xmlOriginal?: StringNullableFilter<"NfeImport"> | string | null
    createdAt?: DateTimeFilter<"NfeImport"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    fornecedorRef?: XOR<FornecedorNullableScalarRelationFilter, FornecedorWhereInput> | null
    itens?: NfeImportItemListRelationFilter
  }, "id" | "empresaId_chaveAcesso">

  export type NfeImportOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    numeroNota?: SortOrderInput | SortOrder
    serie?: SortOrderInput | SortOrder
    fornecedor?: SortOrderInput | SortOrder
    cnpjFornecedor?: SortOrderInput | SortOrder
    fornecedorId?: SortOrderInput | SortOrder
    dataEmissao?: SortOrderInput | SortOrder
    valorTotal?: SortOrderInput | SortOrder
    xmlOriginal?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NfeImportCountOrderByAggregateInput
    _avg?: NfeImportAvgOrderByAggregateInput
    _max?: NfeImportMaxOrderByAggregateInput
    _min?: NfeImportMinOrderByAggregateInput
    _sum?: NfeImportSumOrderByAggregateInput
  }

  export type NfeImportScalarWhereWithAggregatesInput = {
    AND?: NfeImportScalarWhereWithAggregatesInput | NfeImportScalarWhereWithAggregatesInput[]
    OR?: NfeImportScalarWhereWithAggregatesInput[]
    NOT?: NfeImportScalarWhereWithAggregatesInput | NfeImportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NfeImport"> | string
    empresaId?: StringWithAggregatesFilter<"NfeImport"> | string
    chaveAcesso?: StringWithAggregatesFilter<"NfeImport"> | string
    numeroNota?: StringNullableWithAggregatesFilter<"NfeImport"> | string | null
    serie?: StringNullableWithAggregatesFilter<"NfeImport"> | string | null
    fornecedor?: StringNullableWithAggregatesFilter<"NfeImport"> | string | null
    cnpjFornecedor?: StringNullableWithAggregatesFilter<"NfeImport"> | string | null
    fornecedorId?: StringNullableWithAggregatesFilter<"NfeImport"> | string | null
    dataEmissao?: DateTimeNullableWithAggregatesFilter<"NfeImport"> | Date | string | null
    valorTotal?: FloatNullableWithAggregatesFilter<"NfeImport"> | number | null
    xmlOriginal?: StringNullableWithAggregatesFilter<"NfeImport"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NfeImport"> | Date | string
  }

  export type NfeImportItemWhereInput = {
    AND?: NfeImportItemWhereInput | NfeImportItemWhereInput[]
    OR?: NfeImportItemWhereInput[]
    NOT?: NfeImportItemWhereInput | NfeImportItemWhereInput[]
    id?: StringFilter<"NfeImportItem"> | string
    nfeImportId?: StringFilter<"NfeImportItem"> | string
    productId?: StringNullableFilter<"NfeImportItem"> | string | null
    codigo?: StringNullableFilter<"NfeImportItem"> | string | null
    codigoBarras?: StringNullableFilter<"NfeImportItem"> | string | null
    descricao?: StringFilter<"NfeImportItem"> | string
    quantidade?: FloatFilter<"NfeImportItem"> | number
    valorUnitario?: FloatNullableFilter<"NfeImportItem"> | number | null
    ncm?: StringNullableFilter<"NfeImportItem"> | string | null
    cfop?: StringNullableFilter<"NfeImportItem"> | string | null
    unidade?: StringNullableFilter<"NfeImportItem"> | string | null
    nfeImport?: XOR<NfeImportScalarRelationFilter, NfeImportWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type NfeImportItemOrderByWithRelationInput = {
    id?: SortOrder
    nfeImportId?: SortOrder
    productId?: SortOrderInput | SortOrder
    codigo?: SortOrderInput | SortOrder
    codigoBarras?: SortOrderInput | SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrderInput | SortOrder
    ncm?: SortOrderInput | SortOrder
    cfop?: SortOrderInput | SortOrder
    unidade?: SortOrderInput | SortOrder
    nfeImport?: NfeImportOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type NfeImportItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NfeImportItemWhereInput | NfeImportItemWhereInput[]
    OR?: NfeImportItemWhereInput[]
    NOT?: NfeImportItemWhereInput | NfeImportItemWhereInput[]
    nfeImportId?: StringFilter<"NfeImportItem"> | string
    productId?: StringNullableFilter<"NfeImportItem"> | string | null
    codigo?: StringNullableFilter<"NfeImportItem"> | string | null
    codigoBarras?: StringNullableFilter<"NfeImportItem"> | string | null
    descricao?: StringFilter<"NfeImportItem"> | string
    quantidade?: FloatFilter<"NfeImportItem"> | number
    valorUnitario?: FloatNullableFilter<"NfeImportItem"> | number | null
    ncm?: StringNullableFilter<"NfeImportItem"> | string | null
    cfop?: StringNullableFilter<"NfeImportItem"> | string | null
    unidade?: StringNullableFilter<"NfeImportItem"> | string | null
    nfeImport?: XOR<NfeImportScalarRelationFilter, NfeImportWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id">

  export type NfeImportItemOrderByWithAggregationInput = {
    id?: SortOrder
    nfeImportId?: SortOrder
    productId?: SortOrderInput | SortOrder
    codigo?: SortOrderInput | SortOrder
    codigoBarras?: SortOrderInput | SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrderInput | SortOrder
    ncm?: SortOrderInput | SortOrder
    cfop?: SortOrderInput | SortOrder
    unidade?: SortOrderInput | SortOrder
    _count?: NfeImportItemCountOrderByAggregateInput
    _avg?: NfeImportItemAvgOrderByAggregateInput
    _max?: NfeImportItemMaxOrderByAggregateInput
    _min?: NfeImportItemMinOrderByAggregateInput
    _sum?: NfeImportItemSumOrderByAggregateInput
  }

  export type NfeImportItemScalarWhereWithAggregatesInput = {
    AND?: NfeImportItemScalarWhereWithAggregatesInput | NfeImportItemScalarWhereWithAggregatesInput[]
    OR?: NfeImportItemScalarWhereWithAggregatesInput[]
    NOT?: NfeImportItemScalarWhereWithAggregatesInput | NfeImportItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NfeImportItem"> | string
    nfeImportId?: StringWithAggregatesFilter<"NfeImportItem"> | string
    productId?: StringNullableWithAggregatesFilter<"NfeImportItem"> | string | null
    codigo?: StringNullableWithAggregatesFilter<"NfeImportItem"> | string | null
    codigoBarras?: StringNullableWithAggregatesFilter<"NfeImportItem"> | string | null
    descricao?: StringWithAggregatesFilter<"NfeImportItem"> | string
    quantidade?: FloatWithAggregatesFilter<"NfeImportItem"> | number
    valorUnitario?: FloatNullableWithAggregatesFilter<"NfeImportItem"> | number | null
    ncm?: StringNullableWithAggregatesFilter<"NfeImportItem"> | string | null
    cfop?: StringNullableWithAggregatesFilter<"NfeImportItem"> | string | null
    unidade?: StringNullableWithAggregatesFilter<"NfeImportItem"> | string | null
  }

  export type UserInviteWhereInput = {
    AND?: UserInviteWhereInput | UserInviteWhereInput[]
    OR?: UserInviteWhereInput[]
    NOT?: UserInviteWhereInput | UserInviteWhereInput[]
    id?: StringFilter<"UserInvite"> | string
    empresaId?: StringFilter<"UserInvite"> | string
    nome?: StringFilter<"UserInvite"> | string
    email?: StringFilter<"UserInvite"> | string
    role?: StringFilter<"UserInvite"> | string
    token?: StringFilter<"UserInvite"> | string
    status?: StringFilter<"UserInvite"> | string
    expiresAt?: DateTimeFilter<"UserInvite"> | Date | string
    createdAt?: DateTimeFilter<"UserInvite"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }

  export type UserInviteOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    role?: SortOrder
    token?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
  }

  export type UserInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: UserInviteWhereInput | UserInviteWhereInput[]
    OR?: UserInviteWhereInput[]
    NOT?: UserInviteWhereInput | UserInviteWhereInput[]
    empresaId?: StringFilter<"UserInvite"> | string
    nome?: StringFilter<"UserInvite"> | string
    email?: StringFilter<"UserInvite"> | string
    role?: StringFilter<"UserInvite"> | string
    status?: StringFilter<"UserInvite"> | string
    expiresAt?: DateTimeFilter<"UserInvite"> | Date | string
    createdAt?: DateTimeFilter<"UserInvite"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }, "id" | "token">

  export type UserInviteOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    role?: SortOrder
    token?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: UserInviteCountOrderByAggregateInput
    _max?: UserInviteMaxOrderByAggregateInput
    _min?: UserInviteMinOrderByAggregateInput
  }

  export type UserInviteScalarWhereWithAggregatesInput = {
    AND?: UserInviteScalarWhereWithAggregatesInput | UserInviteScalarWhereWithAggregatesInput[]
    OR?: UserInviteScalarWhereWithAggregatesInput[]
    NOT?: UserInviteScalarWhereWithAggregatesInput | UserInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserInvite"> | string
    empresaId?: StringWithAggregatesFilter<"UserInvite"> | string
    nome?: StringWithAggregatesFilter<"UserInvite"> | string
    email?: StringWithAggregatesFilter<"UserInvite"> | string
    role?: StringWithAggregatesFilter<"UserInvite"> | string
    token?: StringWithAggregatesFilter<"UserInvite"> | string
    status?: StringWithAggregatesFilter<"UserInvite"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"UserInvite"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UserInvite"> | Date | string
  }

  export type EmpresaCreateInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteCreateNestedManyWithoutEmpresaInput
    usuarios?: UserCreateNestedManyWithoutEmpresaInput
    produtos?: ProductCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteUncheckedCreateNestedManyWithoutEmpresaInput
    usuarios?: UserUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProductUncheckedCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementUncheckedCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorUncheckedCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUncheckedUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaCreateManyInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
  }

  export type EmpresaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutUsuariosInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    empresaId: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutUsuariosNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    empresaId: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutProdutosInput
    movements?: StockMovementCreateNestedManyWithoutProductInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    empresaId: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    movements?: StockMovementUncheckedCreateNestedManyWithoutProductInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutProdutosNestedInput
    movements?: StockMovementUpdateManyWithoutProductNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUncheckedUpdateManyWithoutProductNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    empresaId: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateInput = {
    id?: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutMovimentacoesInput
    product: ProductCreateNestedOneWithoutMovementsInput
  }

  export type StockMovementUncheckedCreateInput = {
    id?: string
    empresaId: string
    productId: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
  }

  export type StockMovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutMovimentacoesNestedInput
    product?: ProductUpdateOneRequiredWithoutMovementsNestedInput
  }

  export type StockMovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateManyInput = {
    id?: string
    empresaId: string
    productId: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
  }

  export type StockMovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoCreateInput = {
    id?: string
    quantidade: number
    status?: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutSolicitacoesInput
    user: UserCreateNestedOneWithoutSolicitacoesInput
    product: ProductCreateNestedOneWithoutSolicitacoesInput
  }

  export type SolicitacaoUncheckedCreateInput = {
    id?: string
    empresaId: string
    userId: string
    productId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type SolicitacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutSolicitacoesNestedInput
    user?: UserUpdateOneRequiredWithoutSolicitacoesNestedInput
    product?: ProductUpdateOneRequiredWithoutSolicitacoesNestedInput
  }

  export type SolicitacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoCreateManyInput = {
    id?: string
    empresaId: string
    userId: string
    productId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type SolicitacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FornecedorCreateInput = {
    id?: string
    nome: string
    cnpj: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutFornecedoresInput
    notasFiscais?: NfeImportCreateNestedManyWithoutFornecedorRefInput
  }

  export type FornecedorUncheckedCreateInput = {
    id?: string
    empresaId: string
    nome: string
    cnpj: string
    createdAt?: Date | string
    notasFiscais?: NfeImportUncheckedCreateNestedManyWithoutFornecedorRefInput
  }

  export type FornecedorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutFornecedoresNestedInput
    notasFiscais?: NfeImportUpdateManyWithoutFornecedorRefNestedInput
  }

  export type FornecedorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notasFiscais?: NfeImportUncheckedUpdateManyWithoutFornecedorRefNestedInput
  }

  export type FornecedorCreateManyInput = {
    id?: string
    empresaId: string
    nome: string
    cnpj: string
    createdAt?: Date | string
  }

  export type FornecedorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FornecedorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NfeImportCreateInput = {
    id?: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutNfeImportsInput
    fornecedorRef?: FornecedorCreateNestedOneWithoutNotasFiscaisInput
    itens?: NfeImportItemCreateNestedManyWithoutNfeImportInput
  }

  export type NfeImportUncheckedCreateInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    fornecedorId?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
    itens?: NfeImportItemUncheckedCreateNestedManyWithoutNfeImportInput
  }

  export type NfeImportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutNfeImportsNestedInput
    fornecedorRef?: FornecedorUpdateOneWithoutNotasFiscaisNestedInput
    itens?: NfeImportItemUpdateManyWithoutNfeImportNestedInput
  }

  export type NfeImportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedorId?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itens?: NfeImportItemUncheckedUpdateManyWithoutNfeImportNestedInput
  }

  export type NfeImportCreateManyInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    fornecedorId?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
  }

  export type NfeImportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NfeImportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedorId?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NfeImportItemCreateInput = {
    id?: string
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
    nfeImport: NfeImportCreateNestedOneWithoutItensInput
    product?: ProductCreateNestedOneWithoutNfeItensInput
  }

  export type NfeImportItemUncheckedCreateInput = {
    id?: string
    nfeImportId: string
    productId?: string | null
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
  }

  export type NfeImportItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    nfeImport?: NfeImportUpdateOneRequiredWithoutItensNestedInput
    product?: ProductUpdateOneWithoutNfeItensNestedInput
  }

  export type NfeImportItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nfeImportId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NfeImportItemCreateManyInput = {
    id?: string
    nfeImportId: string
    productId?: string | null
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
  }

  export type NfeImportItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NfeImportItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nfeImportId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInviteCreateInput = {
    id?: string
    nome: string
    email: string
    role?: string
    token: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutConvitesInput
  }

  export type UserInviteUncheckedCreateInput = {
    id?: string
    empresaId: string
    nome: string
    email: string
    role?: string
    token: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type UserInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutConvitesNestedInput
  }

  export type UserInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInviteCreateManyInput = {
    id?: string
    empresaId: string
    nome: string
    email: string
    role?: string
    token: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type UserInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type UserInviteListRelationFilter = {
    every?: UserInviteWhereInput
    some?: UserInviteWhereInput
    none?: UserInviteWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type StockMovementListRelationFilter = {
    every?: StockMovementWhereInput
    some?: StockMovementWhereInput
    none?: StockMovementWhereInput
  }

  export type SolicitacaoListRelationFilter = {
    every?: SolicitacaoWhereInput
    some?: SolicitacaoWhereInput
    none?: SolicitacaoWhereInput
  }

  export type FornecedorListRelationFilter = {
    every?: FornecedorWhereInput
    some?: FornecedorWhereInput
    none?: FornecedorWhereInput
  }

  export type NfeImportListRelationFilter = {
    every?: NfeImportWhereInput
    some?: NfeImportWhereInput
    none?: NfeImportWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockMovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SolicitacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FornecedorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NfeImportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmpresaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
  }

  export type EmpresaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
  }

  export type EmpresaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
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

  export type EmpresaScalarRelationFilter = {
    is?: EmpresaWhereInput
    isNot?: EmpresaWhereInput
  }

  export type UserEmpresaIdEmailCompoundUniqueInput = {
    empresaId: string
    email: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NfeImportItemListRelationFilter = {
    every?: NfeImportItemWhereInput
    some?: NfeImportItemWhereInput
    none?: NfeImportItemWhereInput
  }

  export type NfeImportItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductEmpresaIdSkuCompoundUniqueInput = {
    empresaId: string
    sku: string
  }

  export type ProductEmpresaIdCodigoBarrasCompoundUniqueInput = {
    empresaId: string
    codigoBarras: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    sku?: SortOrder
    codigoBarras?: SortOrder
    categoria?: SortOrder
    custo?: SortOrder
    preco?: SortOrder
    estoqueAtual?: SortOrder
    estoqueMinimo?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    custo?: SortOrder
    preco?: SortOrder
    estoqueAtual?: SortOrder
    estoqueMinimo?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    sku?: SortOrder
    codigoBarras?: SortOrder
    categoria?: SortOrder
    custo?: SortOrder
    preco?: SortOrder
    estoqueAtual?: SortOrder
    estoqueMinimo?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    sku?: SortOrder
    codigoBarras?: SortOrder
    categoria?: SortOrder
    custo?: SortOrder
    preco?: SortOrder
    estoqueAtual?: SortOrder
    estoqueMinimo?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    custo?: SortOrder
    preco?: SortOrder
    estoqueAtual?: SortOrder
    estoqueMinimo?: SortOrder
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type StockMovementCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    productId?: SortOrder
    tipo?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementAvgOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type StockMovementMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    productId?: SortOrder
    tipo?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    productId?: SortOrder
    tipo?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementSumOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SolicitacaoCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantidade?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type SolicitacaoAvgOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type SolicitacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantidade?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type SolicitacaoMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantidade?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type SolicitacaoSumOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type FornecedorEmpresaIdCnpjCompoundUniqueInput = {
    empresaId: string
    cnpj: string
  }

  export type FornecedorCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
  }

  export type FornecedorMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
  }

  export type FornecedorMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    createdAt?: SortOrder
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

  export type FornecedorNullableScalarRelationFilter = {
    is?: FornecedorWhereInput | null
    isNot?: FornecedorWhereInput | null
  }

  export type NfeImportEmpresaIdChaveAcessoCompoundUniqueInput = {
    empresaId: string
    chaveAcesso: string
  }

  export type NfeImportCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    numeroNota?: SortOrder
    serie?: SortOrder
    fornecedor?: SortOrder
    cnpjFornecedor?: SortOrder
    fornecedorId?: SortOrder
    dataEmissao?: SortOrder
    valorTotal?: SortOrder
    xmlOriginal?: SortOrder
    createdAt?: SortOrder
  }

  export type NfeImportAvgOrderByAggregateInput = {
    valorTotal?: SortOrder
  }

  export type NfeImportMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    numeroNota?: SortOrder
    serie?: SortOrder
    fornecedor?: SortOrder
    cnpjFornecedor?: SortOrder
    fornecedorId?: SortOrder
    dataEmissao?: SortOrder
    valorTotal?: SortOrder
    xmlOriginal?: SortOrder
    createdAt?: SortOrder
  }

  export type NfeImportMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    numeroNota?: SortOrder
    serie?: SortOrder
    fornecedor?: SortOrder
    cnpjFornecedor?: SortOrder
    fornecedorId?: SortOrder
    dataEmissao?: SortOrder
    valorTotal?: SortOrder
    xmlOriginal?: SortOrder
    createdAt?: SortOrder
  }

  export type NfeImportSumOrderByAggregateInput = {
    valorTotal?: SortOrder
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

  export type NfeImportScalarRelationFilter = {
    is?: NfeImportWhereInput
    isNot?: NfeImportWhereInput
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type NfeImportItemCountOrderByAggregateInput = {
    id?: SortOrder
    nfeImportId?: SortOrder
    productId?: SortOrder
    codigo?: SortOrder
    codigoBarras?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    ncm?: SortOrder
    cfop?: SortOrder
    unidade?: SortOrder
  }

  export type NfeImportItemAvgOrderByAggregateInput = {
    quantidade?: SortOrder
    valorUnitario?: SortOrder
  }

  export type NfeImportItemMaxOrderByAggregateInput = {
    id?: SortOrder
    nfeImportId?: SortOrder
    productId?: SortOrder
    codigo?: SortOrder
    codigoBarras?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    ncm?: SortOrder
    cfop?: SortOrder
    unidade?: SortOrder
  }

  export type NfeImportItemMinOrderByAggregateInput = {
    id?: SortOrder
    nfeImportId?: SortOrder
    productId?: SortOrder
    codigo?: SortOrder
    codigoBarras?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    ncm?: SortOrder
    cfop?: SortOrder
    unidade?: SortOrder
  }

  export type NfeImportItemSumOrderByAggregateInput = {
    quantidade?: SortOrder
    valorUnitario?: SortOrder
  }

  export type UserInviteCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    role?: SortOrder
    token?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    role?: SortOrder
    token?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserInviteMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    role?: SortOrder
    token?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserInviteCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UserInviteCreateWithoutEmpresaInput, UserInviteUncheckedCreateWithoutEmpresaInput> | UserInviteCreateWithoutEmpresaInput[] | UserInviteUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserInviteCreateOrConnectWithoutEmpresaInput | UserInviteCreateOrConnectWithoutEmpresaInput[]
    createMany?: UserInviteCreateManyEmpresaInputEnvelope
    connect?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UserCreateWithoutEmpresaInput, UserUncheckedCreateWithoutEmpresaInput> | UserCreateWithoutEmpresaInput[] | UserUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEmpresaInput | UserCreateOrConnectWithoutEmpresaInput[]
    createMany?: UserCreateManyEmpresaInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ProductCreateWithoutEmpresaInput, ProductUncheckedCreateWithoutEmpresaInput> | ProductCreateWithoutEmpresaInput[] | ProductUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutEmpresaInput | ProductCreateOrConnectWithoutEmpresaInput[]
    createMany?: ProductCreateManyEmpresaInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type StockMovementCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<StockMovementCreateWithoutEmpresaInput, StockMovementUncheckedCreateWithoutEmpresaInput> | StockMovementCreateWithoutEmpresaInput[] | StockMovementUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutEmpresaInput | StockMovementCreateOrConnectWithoutEmpresaInput[]
    createMany?: StockMovementCreateManyEmpresaInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type SolicitacaoCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<SolicitacaoCreateWithoutEmpresaInput, SolicitacaoUncheckedCreateWithoutEmpresaInput> | SolicitacaoCreateWithoutEmpresaInput[] | SolicitacaoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutEmpresaInput | SolicitacaoCreateOrConnectWithoutEmpresaInput[]
    createMany?: SolicitacaoCreateManyEmpresaInputEnvelope
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
  }

  export type FornecedorCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<FornecedorCreateWithoutEmpresaInput, FornecedorUncheckedCreateWithoutEmpresaInput> | FornecedorCreateWithoutEmpresaInput[] | FornecedorUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: FornecedorCreateOrConnectWithoutEmpresaInput | FornecedorCreateOrConnectWithoutEmpresaInput[]
    createMany?: FornecedorCreateManyEmpresaInputEnvelope
    connect?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
  }

  export type NfeImportCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<NfeImportCreateWithoutEmpresaInput, NfeImportUncheckedCreateWithoutEmpresaInput> | NfeImportCreateWithoutEmpresaInput[] | NfeImportUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutEmpresaInput | NfeImportCreateOrConnectWithoutEmpresaInput[]
    createMany?: NfeImportCreateManyEmpresaInputEnvelope
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
  }

  export type UserInviteUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UserInviteCreateWithoutEmpresaInput, UserInviteUncheckedCreateWithoutEmpresaInput> | UserInviteCreateWithoutEmpresaInput[] | UserInviteUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserInviteCreateOrConnectWithoutEmpresaInput | UserInviteCreateOrConnectWithoutEmpresaInput[]
    createMany?: UserInviteCreateManyEmpresaInputEnvelope
    connect?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UserCreateWithoutEmpresaInput, UserUncheckedCreateWithoutEmpresaInput> | UserCreateWithoutEmpresaInput[] | UserUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEmpresaInput | UserCreateOrConnectWithoutEmpresaInput[]
    createMany?: UserCreateManyEmpresaInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ProductCreateWithoutEmpresaInput, ProductUncheckedCreateWithoutEmpresaInput> | ProductCreateWithoutEmpresaInput[] | ProductUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutEmpresaInput | ProductCreateOrConnectWithoutEmpresaInput[]
    createMany?: ProductCreateManyEmpresaInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type StockMovementUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<StockMovementCreateWithoutEmpresaInput, StockMovementUncheckedCreateWithoutEmpresaInput> | StockMovementCreateWithoutEmpresaInput[] | StockMovementUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutEmpresaInput | StockMovementCreateOrConnectWithoutEmpresaInput[]
    createMany?: StockMovementCreateManyEmpresaInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<SolicitacaoCreateWithoutEmpresaInput, SolicitacaoUncheckedCreateWithoutEmpresaInput> | SolicitacaoCreateWithoutEmpresaInput[] | SolicitacaoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutEmpresaInput | SolicitacaoCreateOrConnectWithoutEmpresaInput[]
    createMany?: SolicitacaoCreateManyEmpresaInputEnvelope
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
  }

  export type FornecedorUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<FornecedorCreateWithoutEmpresaInput, FornecedorUncheckedCreateWithoutEmpresaInput> | FornecedorCreateWithoutEmpresaInput[] | FornecedorUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: FornecedorCreateOrConnectWithoutEmpresaInput | FornecedorCreateOrConnectWithoutEmpresaInput[]
    createMany?: FornecedorCreateManyEmpresaInputEnvelope
    connect?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
  }

  export type NfeImportUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<NfeImportCreateWithoutEmpresaInput, NfeImportUncheckedCreateWithoutEmpresaInput> | NfeImportCreateWithoutEmpresaInput[] | NfeImportUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutEmpresaInput | NfeImportCreateOrConnectWithoutEmpresaInput[]
    createMany?: NfeImportCreateManyEmpresaInputEnvelope
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserInviteUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UserInviteCreateWithoutEmpresaInput, UserInviteUncheckedCreateWithoutEmpresaInput> | UserInviteCreateWithoutEmpresaInput[] | UserInviteUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserInviteCreateOrConnectWithoutEmpresaInput | UserInviteCreateOrConnectWithoutEmpresaInput[]
    upsert?: UserInviteUpsertWithWhereUniqueWithoutEmpresaInput | UserInviteUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UserInviteCreateManyEmpresaInputEnvelope
    set?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    disconnect?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    delete?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    connect?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    update?: UserInviteUpdateWithWhereUniqueWithoutEmpresaInput | UserInviteUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UserInviteUpdateManyWithWhereWithoutEmpresaInput | UserInviteUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UserInviteScalarWhereInput | UserInviteScalarWhereInput[]
  }

  export type UserUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UserCreateWithoutEmpresaInput, UserUncheckedCreateWithoutEmpresaInput> | UserCreateWithoutEmpresaInput[] | UserUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEmpresaInput | UserCreateOrConnectWithoutEmpresaInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutEmpresaInput | UserUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UserCreateManyEmpresaInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutEmpresaInput | UserUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UserUpdateManyWithWhereWithoutEmpresaInput | UserUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ProductCreateWithoutEmpresaInput, ProductUncheckedCreateWithoutEmpresaInput> | ProductCreateWithoutEmpresaInput[] | ProductUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutEmpresaInput | ProductCreateOrConnectWithoutEmpresaInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutEmpresaInput | ProductUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ProductCreateManyEmpresaInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutEmpresaInput | ProductUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutEmpresaInput | ProductUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type StockMovementUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<StockMovementCreateWithoutEmpresaInput, StockMovementUncheckedCreateWithoutEmpresaInput> | StockMovementCreateWithoutEmpresaInput[] | StockMovementUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutEmpresaInput | StockMovementCreateOrConnectWithoutEmpresaInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutEmpresaInput | StockMovementUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: StockMovementCreateManyEmpresaInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutEmpresaInput | StockMovementUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutEmpresaInput | StockMovementUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type SolicitacaoUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<SolicitacaoCreateWithoutEmpresaInput, SolicitacaoUncheckedCreateWithoutEmpresaInput> | SolicitacaoCreateWithoutEmpresaInput[] | SolicitacaoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutEmpresaInput | SolicitacaoCreateOrConnectWithoutEmpresaInput[]
    upsert?: SolicitacaoUpsertWithWhereUniqueWithoutEmpresaInput | SolicitacaoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: SolicitacaoCreateManyEmpresaInputEnvelope
    set?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    disconnect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    delete?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    update?: SolicitacaoUpdateWithWhereUniqueWithoutEmpresaInput | SolicitacaoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: SolicitacaoUpdateManyWithWhereWithoutEmpresaInput | SolicitacaoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
  }

  export type FornecedorUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<FornecedorCreateWithoutEmpresaInput, FornecedorUncheckedCreateWithoutEmpresaInput> | FornecedorCreateWithoutEmpresaInput[] | FornecedorUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: FornecedorCreateOrConnectWithoutEmpresaInput | FornecedorCreateOrConnectWithoutEmpresaInput[]
    upsert?: FornecedorUpsertWithWhereUniqueWithoutEmpresaInput | FornecedorUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: FornecedorCreateManyEmpresaInputEnvelope
    set?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    disconnect?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    delete?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    connect?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    update?: FornecedorUpdateWithWhereUniqueWithoutEmpresaInput | FornecedorUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: FornecedorUpdateManyWithWhereWithoutEmpresaInput | FornecedorUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: FornecedorScalarWhereInput | FornecedorScalarWhereInput[]
  }

  export type NfeImportUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<NfeImportCreateWithoutEmpresaInput, NfeImportUncheckedCreateWithoutEmpresaInput> | NfeImportCreateWithoutEmpresaInput[] | NfeImportUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutEmpresaInput | NfeImportCreateOrConnectWithoutEmpresaInput[]
    upsert?: NfeImportUpsertWithWhereUniqueWithoutEmpresaInput | NfeImportUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: NfeImportCreateManyEmpresaInputEnvelope
    set?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    disconnect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    delete?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    update?: NfeImportUpdateWithWhereUniqueWithoutEmpresaInput | NfeImportUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: NfeImportUpdateManyWithWhereWithoutEmpresaInput | NfeImportUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: NfeImportScalarWhereInput | NfeImportScalarWhereInput[]
  }

  export type UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UserInviteCreateWithoutEmpresaInput, UserInviteUncheckedCreateWithoutEmpresaInput> | UserInviteCreateWithoutEmpresaInput[] | UserInviteUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserInviteCreateOrConnectWithoutEmpresaInput | UserInviteCreateOrConnectWithoutEmpresaInput[]
    upsert?: UserInviteUpsertWithWhereUniqueWithoutEmpresaInput | UserInviteUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UserInviteCreateManyEmpresaInputEnvelope
    set?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    disconnect?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    delete?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    connect?: UserInviteWhereUniqueInput | UserInviteWhereUniqueInput[]
    update?: UserInviteUpdateWithWhereUniqueWithoutEmpresaInput | UserInviteUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UserInviteUpdateManyWithWhereWithoutEmpresaInput | UserInviteUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UserInviteScalarWhereInput | UserInviteScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UserCreateWithoutEmpresaInput, UserUncheckedCreateWithoutEmpresaInput> | UserCreateWithoutEmpresaInput[] | UserUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEmpresaInput | UserCreateOrConnectWithoutEmpresaInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutEmpresaInput | UserUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UserCreateManyEmpresaInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutEmpresaInput | UserUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UserUpdateManyWithWhereWithoutEmpresaInput | UserUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ProductCreateWithoutEmpresaInput, ProductUncheckedCreateWithoutEmpresaInput> | ProductCreateWithoutEmpresaInput[] | ProductUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutEmpresaInput | ProductCreateOrConnectWithoutEmpresaInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutEmpresaInput | ProductUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ProductCreateManyEmpresaInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutEmpresaInput | ProductUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutEmpresaInput | ProductUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<StockMovementCreateWithoutEmpresaInput, StockMovementUncheckedCreateWithoutEmpresaInput> | StockMovementCreateWithoutEmpresaInput[] | StockMovementUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutEmpresaInput | StockMovementCreateOrConnectWithoutEmpresaInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutEmpresaInput | StockMovementUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: StockMovementCreateManyEmpresaInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutEmpresaInput | StockMovementUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutEmpresaInput | StockMovementUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<SolicitacaoCreateWithoutEmpresaInput, SolicitacaoUncheckedCreateWithoutEmpresaInput> | SolicitacaoCreateWithoutEmpresaInput[] | SolicitacaoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutEmpresaInput | SolicitacaoCreateOrConnectWithoutEmpresaInput[]
    upsert?: SolicitacaoUpsertWithWhereUniqueWithoutEmpresaInput | SolicitacaoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: SolicitacaoCreateManyEmpresaInputEnvelope
    set?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    disconnect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    delete?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    update?: SolicitacaoUpdateWithWhereUniqueWithoutEmpresaInput | SolicitacaoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: SolicitacaoUpdateManyWithWhereWithoutEmpresaInput | SolicitacaoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
  }

  export type FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<FornecedorCreateWithoutEmpresaInput, FornecedorUncheckedCreateWithoutEmpresaInput> | FornecedorCreateWithoutEmpresaInput[] | FornecedorUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: FornecedorCreateOrConnectWithoutEmpresaInput | FornecedorCreateOrConnectWithoutEmpresaInput[]
    upsert?: FornecedorUpsertWithWhereUniqueWithoutEmpresaInput | FornecedorUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: FornecedorCreateManyEmpresaInputEnvelope
    set?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    disconnect?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    delete?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    connect?: FornecedorWhereUniqueInput | FornecedorWhereUniqueInput[]
    update?: FornecedorUpdateWithWhereUniqueWithoutEmpresaInput | FornecedorUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: FornecedorUpdateManyWithWhereWithoutEmpresaInput | FornecedorUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: FornecedorScalarWhereInput | FornecedorScalarWhereInput[]
  }

  export type NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<NfeImportCreateWithoutEmpresaInput, NfeImportUncheckedCreateWithoutEmpresaInput> | NfeImportCreateWithoutEmpresaInput[] | NfeImportUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutEmpresaInput | NfeImportCreateOrConnectWithoutEmpresaInput[]
    upsert?: NfeImportUpsertWithWhereUniqueWithoutEmpresaInput | NfeImportUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: NfeImportCreateManyEmpresaInputEnvelope
    set?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    disconnect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    delete?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    update?: NfeImportUpdateWithWhereUniqueWithoutEmpresaInput | NfeImportUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: NfeImportUpdateManyWithWhereWithoutEmpresaInput | NfeImportUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: NfeImportScalarWhereInput | NfeImportScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutUsuariosInput
    connect?: EmpresaWhereUniqueInput
  }

  export type SolicitacaoCreateNestedManyWithoutUserInput = {
    create?: XOR<SolicitacaoCreateWithoutUserInput, SolicitacaoUncheckedCreateWithoutUserInput> | SolicitacaoCreateWithoutUserInput[] | SolicitacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutUserInput | SolicitacaoCreateOrConnectWithoutUserInput[]
    createMany?: SolicitacaoCreateManyUserInputEnvelope
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
  }

  export type SolicitacaoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SolicitacaoCreateWithoutUserInput, SolicitacaoUncheckedCreateWithoutUserInput> | SolicitacaoCreateWithoutUserInput[] | SolicitacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutUserInput | SolicitacaoCreateOrConnectWithoutUserInput[]
    createMany?: SolicitacaoCreateManyUserInputEnvelope
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
  }

  export type EmpresaUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutUsuariosInput
    upsert?: EmpresaUpsertWithoutUsuariosInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutUsuariosInput, EmpresaUpdateWithoutUsuariosInput>, EmpresaUncheckedUpdateWithoutUsuariosInput>
  }

  export type SolicitacaoUpdateManyWithoutUserNestedInput = {
    create?: XOR<SolicitacaoCreateWithoutUserInput, SolicitacaoUncheckedCreateWithoutUserInput> | SolicitacaoCreateWithoutUserInput[] | SolicitacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutUserInput | SolicitacaoCreateOrConnectWithoutUserInput[]
    upsert?: SolicitacaoUpsertWithWhereUniqueWithoutUserInput | SolicitacaoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SolicitacaoCreateManyUserInputEnvelope
    set?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    disconnect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    delete?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    update?: SolicitacaoUpdateWithWhereUniqueWithoutUserInput | SolicitacaoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SolicitacaoUpdateManyWithWhereWithoutUserInput | SolicitacaoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
  }

  export type SolicitacaoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SolicitacaoCreateWithoutUserInput, SolicitacaoUncheckedCreateWithoutUserInput> | SolicitacaoCreateWithoutUserInput[] | SolicitacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutUserInput | SolicitacaoCreateOrConnectWithoutUserInput[]
    upsert?: SolicitacaoUpsertWithWhereUniqueWithoutUserInput | SolicitacaoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SolicitacaoCreateManyUserInputEnvelope
    set?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    disconnect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    delete?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    update?: SolicitacaoUpdateWithWhereUniqueWithoutUserInput | SolicitacaoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SolicitacaoUpdateManyWithWhereWithoutUserInput | SolicitacaoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutProdutosInput = {
    create?: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutProdutosInput
    connect?: EmpresaWhereUniqueInput
  }

  export type StockMovementCreateNestedManyWithoutProductInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type SolicitacaoCreateNestedManyWithoutProductInput = {
    create?: XOR<SolicitacaoCreateWithoutProductInput, SolicitacaoUncheckedCreateWithoutProductInput> | SolicitacaoCreateWithoutProductInput[] | SolicitacaoUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutProductInput | SolicitacaoCreateOrConnectWithoutProductInput[]
    createMany?: SolicitacaoCreateManyProductInputEnvelope
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
  }

  export type NfeImportItemCreateNestedManyWithoutProductInput = {
    create?: XOR<NfeImportItemCreateWithoutProductInput, NfeImportItemUncheckedCreateWithoutProductInput> | NfeImportItemCreateWithoutProductInput[] | NfeImportItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutProductInput | NfeImportItemCreateOrConnectWithoutProductInput[]
    createMany?: NfeImportItemCreateManyProductInputEnvelope
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
  }

  export type StockMovementUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type SolicitacaoUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SolicitacaoCreateWithoutProductInput, SolicitacaoUncheckedCreateWithoutProductInput> | SolicitacaoCreateWithoutProductInput[] | SolicitacaoUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutProductInput | SolicitacaoCreateOrConnectWithoutProductInput[]
    createMany?: SolicitacaoCreateManyProductInputEnvelope
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
  }

  export type NfeImportItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<NfeImportItemCreateWithoutProductInput, NfeImportItemUncheckedCreateWithoutProductInput> | NfeImportItemCreateWithoutProductInput[] | NfeImportItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutProductInput | NfeImportItemCreateOrConnectWithoutProductInput[]
    createMany?: NfeImportItemCreateManyProductInputEnvelope
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmpresaUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutProdutosInput
    upsert?: EmpresaUpsertWithoutProdutosInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutProdutosInput, EmpresaUpdateWithoutProdutosInput>, EmpresaUncheckedUpdateWithoutProdutosInput>
  }

  export type StockMovementUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutProductInput | StockMovementUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutProductInput | StockMovementUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutProductInput | StockMovementUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type SolicitacaoUpdateManyWithoutProductNestedInput = {
    create?: XOR<SolicitacaoCreateWithoutProductInput, SolicitacaoUncheckedCreateWithoutProductInput> | SolicitacaoCreateWithoutProductInput[] | SolicitacaoUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutProductInput | SolicitacaoCreateOrConnectWithoutProductInput[]
    upsert?: SolicitacaoUpsertWithWhereUniqueWithoutProductInput | SolicitacaoUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SolicitacaoCreateManyProductInputEnvelope
    set?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    disconnect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    delete?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    update?: SolicitacaoUpdateWithWhereUniqueWithoutProductInput | SolicitacaoUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SolicitacaoUpdateManyWithWhereWithoutProductInput | SolicitacaoUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
  }

  export type NfeImportItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<NfeImportItemCreateWithoutProductInput, NfeImportItemUncheckedCreateWithoutProductInput> | NfeImportItemCreateWithoutProductInput[] | NfeImportItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutProductInput | NfeImportItemCreateOrConnectWithoutProductInput[]
    upsert?: NfeImportItemUpsertWithWhereUniqueWithoutProductInput | NfeImportItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: NfeImportItemCreateManyProductInputEnvelope
    set?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    disconnect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    delete?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    update?: NfeImportItemUpdateWithWhereUniqueWithoutProductInput | NfeImportItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: NfeImportItemUpdateManyWithWhereWithoutProductInput | NfeImportItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: NfeImportItemScalarWhereInput | NfeImportItemScalarWhereInput[]
  }

  export type StockMovementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutProductInput | StockMovementUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutProductInput | StockMovementUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutProductInput | StockMovementUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type SolicitacaoUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SolicitacaoCreateWithoutProductInput, SolicitacaoUncheckedCreateWithoutProductInput> | SolicitacaoCreateWithoutProductInput[] | SolicitacaoUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SolicitacaoCreateOrConnectWithoutProductInput | SolicitacaoCreateOrConnectWithoutProductInput[]
    upsert?: SolicitacaoUpsertWithWhereUniqueWithoutProductInput | SolicitacaoUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SolicitacaoCreateManyProductInputEnvelope
    set?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    disconnect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    delete?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    connect?: SolicitacaoWhereUniqueInput | SolicitacaoWhereUniqueInput[]
    update?: SolicitacaoUpdateWithWhereUniqueWithoutProductInput | SolicitacaoUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SolicitacaoUpdateManyWithWhereWithoutProductInput | SolicitacaoUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
  }

  export type NfeImportItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<NfeImportItemCreateWithoutProductInput, NfeImportItemUncheckedCreateWithoutProductInput> | NfeImportItemCreateWithoutProductInput[] | NfeImportItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutProductInput | NfeImportItemCreateOrConnectWithoutProductInput[]
    upsert?: NfeImportItemUpsertWithWhereUniqueWithoutProductInput | NfeImportItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: NfeImportItemCreateManyProductInputEnvelope
    set?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    disconnect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    delete?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    update?: NfeImportItemUpdateWithWhereUniqueWithoutProductInput | NfeImportItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: NfeImportItemUpdateManyWithWhereWithoutProductInput | NfeImportItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: NfeImportItemScalarWhereInput | NfeImportItemScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutMovimentacoesInput = {
    create?: XOR<EmpresaCreateWithoutMovimentacoesInput, EmpresaUncheckedCreateWithoutMovimentacoesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutMovimentacoesInput
    connect?: EmpresaWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutMovementsInput = {
    create?: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMovementsInput
    connect?: ProductWhereUniqueInput
  }

  export type EmpresaUpdateOneRequiredWithoutMovimentacoesNestedInput = {
    create?: XOR<EmpresaCreateWithoutMovimentacoesInput, EmpresaUncheckedCreateWithoutMovimentacoesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutMovimentacoesInput
    upsert?: EmpresaUpsertWithoutMovimentacoesInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutMovimentacoesInput, EmpresaUpdateWithoutMovimentacoesInput>, EmpresaUncheckedUpdateWithoutMovimentacoesInput>
  }

  export type ProductUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMovementsInput
    upsert?: ProductUpsertWithoutMovementsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutMovementsInput, ProductUpdateWithoutMovementsInput>, ProductUncheckedUpdateWithoutMovementsInput>
  }

  export type EmpresaCreateNestedOneWithoutSolicitacoesInput = {
    create?: XOR<EmpresaCreateWithoutSolicitacoesInput, EmpresaUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutSolicitacoesInput
    connect?: EmpresaWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSolicitacoesInput = {
    create?: XOR<UserCreateWithoutSolicitacoesInput, UserUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSolicitacoesInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutSolicitacoesInput = {
    create?: XOR<ProductCreateWithoutSolicitacoesInput, ProductUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSolicitacoesInput
    connect?: ProductWhereUniqueInput
  }

  export type EmpresaUpdateOneRequiredWithoutSolicitacoesNestedInput = {
    create?: XOR<EmpresaCreateWithoutSolicitacoesInput, EmpresaUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutSolicitacoesInput
    upsert?: EmpresaUpsertWithoutSolicitacoesInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutSolicitacoesInput, EmpresaUpdateWithoutSolicitacoesInput>, EmpresaUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type UserUpdateOneRequiredWithoutSolicitacoesNestedInput = {
    create?: XOR<UserCreateWithoutSolicitacoesInput, UserUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSolicitacoesInput
    upsert?: UserUpsertWithoutSolicitacoesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSolicitacoesInput, UserUpdateWithoutSolicitacoesInput>, UserUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type ProductUpdateOneRequiredWithoutSolicitacoesNestedInput = {
    create?: XOR<ProductCreateWithoutSolicitacoesInput, ProductUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSolicitacoesInput
    upsert?: ProductUpsertWithoutSolicitacoesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSolicitacoesInput, ProductUpdateWithoutSolicitacoesInput>, ProductUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type EmpresaCreateNestedOneWithoutFornecedoresInput = {
    create?: XOR<EmpresaCreateWithoutFornecedoresInput, EmpresaUncheckedCreateWithoutFornecedoresInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutFornecedoresInput
    connect?: EmpresaWhereUniqueInput
  }

  export type NfeImportCreateNestedManyWithoutFornecedorRefInput = {
    create?: XOR<NfeImportCreateWithoutFornecedorRefInput, NfeImportUncheckedCreateWithoutFornecedorRefInput> | NfeImportCreateWithoutFornecedorRefInput[] | NfeImportUncheckedCreateWithoutFornecedorRefInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutFornecedorRefInput | NfeImportCreateOrConnectWithoutFornecedorRefInput[]
    createMany?: NfeImportCreateManyFornecedorRefInputEnvelope
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
  }

  export type NfeImportUncheckedCreateNestedManyWithoutFornecedorRefInput = {
    create?: XOR<NfeImportCreateWithoutFornecedorRefInput, NfeImportUncheckedCreateWithoutFornecedorRefInput> | NfeImportCreateWithoutFornecedorRefInput[] | NfeImportUncheckedCreateWithoutFornecedorRefInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutFornecedorRefInput | NfeImportCreateOrConnectWithoutFornecedorRefInput[]
    createMany?: NfeImportCreateManyFornecedorRefInputEnvelope
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
  }

  export type EmpresaUpdateOneRequiredWithoutFornecedoresNestedInput = {
    create?: XOR<EmpresaCreateWithoutFornecedoresInput, EmpresaUncheckedCreateWithoutFornecedoresInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutFornecedoresInput
    upsert?: EmpresaUpsertWithoutFornecedoresInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutFornecedoresInput, EmpresaUpdateWithoutFornecedoresInput>, EmpresaUncheckedUpdateWithoutFornecedoresInput>
  }

  export type NfeImportUpdateManyWithoutFornecedorRefNestedInput = {
    create?: XOR<NfeImportCreateWithoutFornecedorRefInput, NfeImportUncheckedCreateWithoutFornecedorRefInput> | NfeImportCreateWithoutFornecedorRefInput[] | NfeImportUncheckedCreateWithoutFornecedorRefInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutFornecedorRefInput | NfeImportCreateOrConnectWithoutFornecedorRefInput[]
    upsert?: NfeImportUpsertWithWhereUniqueWithoutFornecedorRefInput | NfeImportUpsertWithWhereUniqueWithoutFornecedorRefInput[]
    createMany?: NfeImportCreateManyFornecedorRefInputEnvelope
    set?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    disconnect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    delete?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    update?: NfeImportUpdateWithWhereUniqueWithoutFornecedorRefInput | NfeImportUpdateWithWhereUniqueWithoutFornecedorRefInput[]
    updateMany?: NfeImportUpdateManyWithWhereWithoutFornecedorRefInput | NfeImportUpdateManyWithWhereWithoutFornecedorRefInput[]
    deleteMany?: NfeImportScalarWhereInput | NfeImportScalarWhereInput[]
  }

  export type NfeImportUncheckedUpdateManyWithoutFornecedorRefNestedInput = {
    create?: XOR<NfeImportCreateWithoutFornecedorRefInput, NfeImportUncheckedCreateWithoutFornecedorRefInput> | NfeImportCreateWithoutFornecedorRefInput[] | NfeImportUncheckedCreateWithoutFornecedorRefInput[]
    connectOrCreate?: NfeImportCreateOrConnectWithoutFornecedorRefInput | NfeImportCreateOrConnectWithoutFornecedorRefInput[]
    upsert?: NfeImportUpsertWithWhereUniqueWithoutFornecedorRefInput | NfeImportUpsertWithWhereUniqueWithoutFornecedorRefInput[]
    createMany?: NfeImportCreateManyFornecedorRefInputEnvelope
    set?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    disconnect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    delete?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    connect?: NfeImportWhereUniqueInput | NfeImportWhereUniqueInput[]
    update?: NfeImportUpdateWithWhereUniqueWithoutFornecedorRefInput | NfeImportUpdateWithWhereUniqueWithoutFornecedorRefInput[]
    updateMany?: NfeImportUpdateManyWithWhereWithoutFornecedorRefInput | NfeImportUpdateManyWithWhereWithoutFornecedorRefInput[]
    deleteMany?: NfeImportScalarWhereInput | NfeImportScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutNfeImportsInput = {
    create?: XOR<EmpresaCreateWithoutNfeImportsInput, EmpresaUncheckedCreateWithoutNfeImportsInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutNfeImportsInput
    connect?: EmpresaWhereUniqueInput
  }

  export type FornecedorCreateNestedOneWithoutNotasFiscaisInput = {
    create?: XOR<FornecedorCreateWithoutNotasFiscaisInput, FornecedorUncheckedCreateWithoutNotasFiscaisInput>
    connectOrCreate?: FornecedorCreateOrConnectWithoutNotasFiscaisInput
    connect?: FornecedorWhereUniqueInput
  }

  export type NfeImportItemCreateNestedManyWithoutNfeImportInput = {
    create?: XOR<NfeImportItemCreateWithoutNfeImportInput, NfeImportItemUncheckedCreateWithoutNfeImportInput> | NfeImportItemCreateWithoutNfeImportInput[] | NfeImportItemUncheckedCreateWithoutNfeImportInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutNfeImportInput | NfeImportItemCreateOrConnectWithoutNfeImportInput[]
    createMany?: NfeImportItemCreateManyNfeImportInputEnvelope
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
  }

  export type NfeImportItemUncheckedCreateNestedManyWithoutNfeImportInput = {
    create?: XOR<NfeImportItemCreateWithoutNfeImportInput, NfeImportItemUncheckedCreateWithoutNfeImportInput> | NfeImportItemCreateWithoutNfeImportInput[] | NfeImportItemUncheckedCreateWithoutNfeImportInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutNfeImportInput | NfeImportItemCreateOrConnectWithoutNfeImportInput[]
    createMany?: NfeImportItemCreateManyNfeImportInputEnvelope
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EmpresaUpdateOneRequiredWithoutNfeImportsNestedInput = {
    create?: XOR<EmpresaCreateWithoutNfeImportsInput, EmpresaUncheckedCreateWithoutNfeImportsInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutNfeImportsInput
    upsert?: EmpresaUpsertWithoutNfeImportsInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutNfeImportsInput, EmpresaUpdateWithoutNfeImportsInput>, EmpresaUncheckedUpdateWithoutNfeImportsInput>
  }

  export type FornecedorUpdateOneWithoutNotasFiscaisNestedInput = {
    create?: XOR<FornecedorCreateWithoutNotasFiscaisInput, FornecedorUncheckedCreateWithoutNotasFiscaisInput>
    connectOrCreate?: FornecedorCreateOrConnectWithoutNotasFiscaisInput
    upsert?: FornecedorUpsertWithoutNotasFiscaisInput
    disconnect?: FornecedorWhereInput | boolean
    delete?: FornecedorWhereInput | boolean
    connect?: FornecedorWhereUniqueInput
    update?: XOR<XOR<FornecedorUpdateToOneWithWhereWithoutNotasFiscaisInput, FornecedorUpdateWithoutNotasFiscaisInput>, FornecedorUncheckedUpdateWithoutNotasFiscaisInput>
  }

  export type NfeImportItemUpdateManyWithoutNfeImportNestedInput = {
    create?: XOR<NfeImportItemCreateWithoutNfeImportInput, NfeImportItemUncheckedCreateWithoutNfeImportInput> | NfeImportItemCreateWithoutNfeImportInput[] | NfeImportItemUncheckedCreateWithoutNfeImportInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutNfeImportInput | NfeImportItemCreateOrConnectWithoutNfeImportInput[]
    upsert?: NfeImportItemUpsertWithWhereUniqueWithoutNfeImportInput | NfeImportItemUpsertWithWhereUniqueWithoutNfeImportInput[]
    createMany?: NfeImportItemCreateManyNfeImportInputEnvelope
    set?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    disconnect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    delete?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    update?: NfeImportItemUpdateWithWhereUniqueWithoutNfeImportInput | NfeImportItemUpdateWithWhereUniqueWithoutNfeImportInput[]
    updateMany?: NfeImportItemUpdateManyWithWhereWithoutNfeImportInput | NfeImportItemUpdateManyWithWhereWithoutNfeImportInput[]
    deleteMany?: NfeImportItemScalarWhereInput | NfeImportItemScalarWhereInput[]
  }

  export type NfeImportItemUncheckedUpdateManyWithoutNfeImportNestedInput = {
    create?: XOR<NfeImportItemCreateWithoutNfeImportInput, NfeImportItemUncheckedCreateWithoutNfeImportInput> | NfeImportItemCreateWithoutNfeImportInput[] | NfeImportItemUncheckedCreateWithoutNfeImportInput[]
    connectOrCreate?: NfeImportItemCreateOrConnectWithoutNfeImportInput | NfeImportItemCreateOrConnectWithoutNfeImportInput[]
    upsert?: NfeImportItemUpsertWithWhereUniqueWithoutNfeImportInput | NfeImportItemUpsertWithWhereUniqueWithoutNfeImportInput[]
    createMany?: NfeImportItemCreateManyNfeImportInputEnvelope
    set?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    disconnect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    delete?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    connect?: NfeImportItemWhereUniqueInput | NfeImportItemWhereUniqueInput[]
    update?: NfeImportItemUpdateWithWhereUniqueWithoutNfeImportInput | NfeImportItemUpdateWithWhereUniqueWithoutNfeImportInput[]
    updateMany?: NfeImportItemUpdateManyWithWhereWithoutNfeImportInput | NfeImportItemUpdateManyWithWhereWithoutNfeImportInput[]
    deleteMany?: NfeImportItemScalarWhereInput | NfeImportItemScalarWhereInput[]
  }

  export type NfeImportCreateNestedOneWithoutItensInput = {
    create?: XOR<NfeImportCreateWithoutItensInput, NfeImportUncheckedCreateWithoutItensInput>
    connectOrCreate?: NfeImportCreateOrConnectWithoutItensInput
    connect?: NfeImportWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutNfeItensInput = {
    create?: XOR<ProductCreateWithoutNfeItensInput, ProductUncheckedCreateWithoutNfeItensInput>
    connectOrCreate?: ProductCreateOrConnectWithoutNfeItensInput
    connect?: ProductWhereUniqueInput
  }

  export type NfeImportUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<NfeImportCreateWithoutItensInput, NfeImportUncheckedCreateWithoutItensInput>
    connectOrCreate?: NfeImportCreateOrConnectWithoutItensInput
    upsert?: NfeImportUpsertWithoutItensInput
    connect?: NfeImportWhereUniqueInput
    update?: XOR<XOR<NfeImportUpdateToOneWithWhereWithoutItensInput, NfeImportUpdateWithoutItensInput>, NfeImportUncheckedUpdateWithoutItensInput>
  }

  export type ProductUpdateOneWithoutNfeItensNestedInput = {
    create?: XOR<ProductCreateWithoutNfeItensInput, ProductUncheckedCreateWithoutNfeItensInput>
    connectOrCreate?: ProductCreateOrConnectWithoutNfeItensInput
    upsert?: ProductUpsertWithoutNfeItensInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutNfeItensInput, ProductUpdateWithoutNfeItensInput>, ProductUncheckedUpdateWithoutNfeItensInput>
  }

  export type EmpresaCreateNestedOneWithoutConvitesInput = {
    create?: XOR<EmpresaCreateWithoutConvitesInput, EmpresaUncheckedCreateWithoutConvitesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutConvitesInput
    connect?: EmpresaWhereUniqueInput
  }

  export type EmpresaUpdateOneRequiredWithoutConvitesNestedInput = {
    create?: XOR<EmpresaCreateWithoutConvitesInput, EmpresaUncheckedCreateWithoutConvitesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutConvitesInput
    upsert?: EmpresaUpsertWithoutConvitesInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutConvitesInput, EmpresaUpdateWithoutConvitesInput>, EmpresaUncheckedUpdateWithoutConvitesInput>
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type UserInviteCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    email: string
    role?: string
    token: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type UserInviteUncheckedCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    email: string
    role?: string
    token: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type UserInviteCreateOrConnectWithoutEmpresaInput = {
    where: UserInviteWhereUniqueInput
    create: XOR<UserInviteCreateWithoutEmpresaInput, UserInviteUncheckedCreateWithoutEmpresaInput>
  }

  export type UserInviteCreateManyEmpresaInputEnvelope = {
    data: UserInviteCreateManyEmpresaInput | UserInviteCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
    solicitacoes?: SolicitacaoCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmpresaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmpresaInput, UserUncheckedCreateWithoutEmpresaInput>
  }

  export type UserCreateManyEmpresaInputEnvelope = {
    data: UserCreateManyEmpresaInput | UserCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    movements?: StockMovementCreateNestedManyWithoutProductInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    movements?: StockMovementUncheckedCreateNestedManyWithoutProductInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutEmpresaInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutEmpresaInput, ProductUncheckedCreateWithoutEmpresaInput>
  }

  export type ProductCreateManyEmpresaInputEnvelope = {
    data: ProductCreateManyEmpresaInput | ProductCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type StockMovementCreateWithoutEmpresaInput = {
    id?: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutMovementsInput
  }

  export type StockMovementUncheckedCreateWithoutEmpresaInput = {
    id?: string
    productId: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
  }

  export type StockMovementCreateOrConnectWithoutEmpresaInput = {
    where: StockMovementWhereUniqueInput
    create: XOR<StockMovementCreateWithoutEmpresaInput, StockMovementUncheckedCreateWithoutEmpresaInput>
  }

  export type StockMovementCreateManyEmpresaInputEnvelope = {
    data: StockMovementCreateManyEmpresaInput | StockMovementCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type SolicitacaoCreateWithoutEmpresaInput = {
    id?: string
    quantidade: number
    status?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSolicitacoesInput
    product: ProductCreateNestedOneWithoutSolicitacoesInput
  }

  export type SolicitacaoUncheckedCreateWithoutEmpresaInput = {
    id?: string
    userId: string
    productId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type SolicitacaoCreateOrConnectWithoutEmpresaInput = {
    where: SolicitacaoWhereUniqueInput
    create: XOR<SolicitacaoCreateWithoutEmpresaInput, SolicitacaoUncheckedCreateWithoutEmpresaInput>
  }

  export type SolicitacaoCreateManyEmpresaInputEnvelope = {
    data: SolicitacaoCreateManyEmpresaInput | SolicitacaoCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type FornecedorCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    cnpj: string
    createdAt?: Date | string
    notasFiscais?: NfeImportCreateNestedManyWithoutFornecedorRefInput
  }

  export type FornecedorUncheckedCreateWithoutEmpresaInput = {
    id?: string
    nome: string
    cnpj: string
    createdAt?: Date | string
    notasFiscais?: NfeImportUncheckedCreateNestedManyWithoutFornecedorRefInput
  }

  export type FornecedorCreateOrConnectWithoutEmpresaInput = {
    where: FornecedorWhereUniqueInput
    create: XOR<FornecedorCreateWithoutEmpresaInput, FornecedorUncheckedCreateWithoutEmpresaInput>
  }

  export type FornecedorCreateManyEmpresaInputEnvelope = {
    data: FornecedorCreateManyEmpresaInput | FornecedorCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type NfeImportCreateWithoutEmpresaInput = {
    id?: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
    fornecedorRef?: FornecedorCreateNestedOneWithoutNotasFiscaisInput
    itens?: NfeImportItemCreateNestedManyWithoutNfeImportInput
  }

  export type NfeImportUncheckedCreateWithoutEmpresaInput = {
    id?: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    fornecedorId?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
    itens?: NfeImportItemUncheckedCreateNestedManyWithoutNfeImportInput
  }

  export type NfeImportCreateOrConnectWithoutEmpresaInput = {
    where: NfeImportWhereUniqueInput
    create: XOR<NfeImportCreateWithoutEmpresaInput, NfeImportUncheckedCreateWithoutEmpresaInput>
  }

  export type NfeImportCreateManyEmpresaInputEnvelope = {
    data: NfeImportCreateManyEmpresaInput | NfeImportCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type UserInviteUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: UserInviteWhereUniqueInput
    update: XOR<UserInviteUpdateWithoutEmpresaInput, UserInviteUncheckedUpdateWithoutEmpresaInput>
    create: XOR<UserInviteCreateWithoutEmpresaInput, UserInviteUncheckedCreateWithoutEmpresaInput>
  }

  export type UserInviteUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: UserInviteWhereUniqueInput
    data: XOR<UserInviteUpdateWithoutEmpresaInput, UserInviteUncheckedUpdateWithoutEmpresaInput>
  }

  export type UserInviteUpdateManyWithWhereWithoutEmpresaInput = {
    where: UserInviteScalarWhereInput
    data: XOR<UserInviteUpdateManyMutationInput, UserInviteUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type UserInviteScalarWhereInput = {
    AND?: UserInviteScalarWhereInput | UserInviteScalarWhereInput[]
    OR?: UserInviteScalarWhereInput[]
    NOT?: UserInviteScalarWhereInput | UserInviteScalarWhereInput[]
    id?: StringFilter<"UserInvite"> | string
    empresaId?: StringFilter<"UserInvite"> | string
    nome?: StringFilter<"UserInvite"> | string
    email?: StringFilter<"UserInvite"> | string
    role?: StringFilter<"UserInvite"> | string
    token?: StringFilter<"UserInvite"> | string
    status?: StringFilter<"UserInvite"> | string
    expiresAt?: DateTimeFilter<"UserInvite"> | Date | string
    createdAt?: DateTimeFilter<"UserInvite"> | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutEmpresaInput, UserUncheckedUpdateWithoutEmpresaInput>
    create: XOR<UserCreateWithoutEmpresaInput, UserUncheckedCreateWithoutEmpresaInput>
  }

  export type UserUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutEmpresaInput, UserUncheckedUpdateWithoutEmpresaInput>
  }

  export type UserUpdateManyWithWhereWithoutEmpresaInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    empresaId?: StringFilter<"User"> | string
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutEmpresaInput, ProductUncheckedUpdateWithoutEmpresaInput>
    create: XOR<ProductCreateWithoutEmpresaInput, ProductUncheckedCreateWithoutEmpresaInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutEmpresaInput, ProductUncheckedUpdateWithoutEmpresaInput>
  }

  export type ProductUpdateManyWithWhereWithoutEmpresaInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    empresaId?: StringFilter<"Product"> | string
    nome?: StringFilter<"Product"> | string
    sku?: StringNullableFilter<"Product"> | string | null
    codigoBarras?: StringNullableFilter<"Product"> | string | null
    categoria?: StringNullableFilter<"Product"> | string | null
    custo?: FloatNullableFilter<"Product"> | number | null
    preco?: FloatNullableFilter<"Product"> | number | null
    estoqueAtual?: FloatFilter<"Product"> | number
    estoqueMinimo?: FloatFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type StockMovementUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: StockMovementWhereUniqueInput
    update: XOR<StockMovementUpdateWithoutEmpresaInput, StockMovementUncheckedUpdateWithoutEmpresaInput>
    create: XOR<StockMovementCreateWithoutEmpresaInput, StockMovementUncheckedCreateWithoutEmpresaInput>
  }

  export type StockMovementUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: StockMovementWhereUniqueInput
    data: XOR<StockMovementUpdateWithoutEmpresaInput, StockMovementUncheckedUpdateWithoutEmpresaInput>
  }

  export type StockMovementUpdateManyWithWhereWithoutEmpresaInput = {
    where: StockMovementScalarWhereInput
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type StockMovementScalarWhereInput = {
    AND?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
    OR?: StockMovementScalarWhereInput[]
    NOT?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
    id?: StringFilter<"StockMovement"> | string
    empresaId?: StringFilter<"StockMovement"> | string
    productId?: StringFilter<"StockMovement"> | string
    tipo?: StringFilter<"StockMovement"> | string
    quantidade?: FloatFilter<"StockMovement"> | number
    observacao?: StringNullableFilter<"StockMovement"> | string | null
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
  }

  export type SolicitacaoUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: SolicitacaoWhereUniqueInput
    update: XOR<SolicitacaoUpdateWithoutEmpresaInput, SolicitacaoUncheckedUpdateWithoutEmpresaInput>
    create: XOR<SolicitacaoCreateWithoutEmpresaInput, SolicitacaoUncheckedCreateWithoutEmpresaInput>
  }

  export type SolicitacaoUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: SolicitacaoWhereUniqueInput
    data: XOR<SolicitacaoUpdateWithoutEmpresaInput, SolicitacaoUncheckedUpdateWithoutEmpresaInput>
  }

  export type SolicitacaoUpdateManyWithWhereWithoutEmpresaInput = {
    where: SolicitacaoScalarWhereInput
    data: XOR<SolicitacaoUpdateManyMutationInput, SolicitacaoUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type SolicitacaoScalarWhereInput = {
    AND?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
    OR?: SolicitacaoScalarWhereInput[]
    NOT?: SolicitacaoScalarWhereInput | SolicitacaoScalarWhereInput[]
    id?: StringFilter<"Solicitacao"> | string
    empresaId?: StringFilter<"Solicitacao"> | string
    userId?: StringFilter<"Solicitacao"> | string
    productId?: StringFilter<"Solicitacao"> | string
    quantidade?: FloatFilter<"Solicitacao"> | number
    status?: StringFilter<"Solicitacao"> | string
    createdAt?: DateTimeFilter<"Solicitacao"> | Date | string
  }

  export type FornecedorUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: FornecedorWhereUniqueInput
    update: XOR<FornecedorUpdateWithoutEmpresaInput, FornecedorUncheckedUpdateWithoutEmpresaInput>
    create: XOR<FornecedorCreateWithoutEmpresaInput, FornecedorUncheckedCreateWithoutEmpresaInput>
  }

  export type FornecedorUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: FornecedorWhereUniqueInput
    data: XOR<FornecedorUpdateWithoutEmpresaInput, FornecedorUncheckedUpdateWithoutEmpresaInput>
  }

  export type FornecedorUpdateManyWithWhereWithoutEmpresaInput = {
    where: FornecedorScalarWhereInput
    data: XOR<FornecedorUpdateManyMutationInput, FornecedorUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type FornecedorScalarWhereInput = {
    AND?: FornecedorScalarWhereInput | FornecedorScalarWhereInput[]
    OR?: FornecedorScalarWhereInput[]
    NOT?: FornecedorScalarWhereInput | FornecedorScalarWhereInput[]
    id?: StringFilter<"Fornecedor"> | string
    empresaId?: StringFilter<"Fornecedor"> | string
    nome?: StringFilter<"Fornecedor"> | string
    cnpj?: StringFilter<"Fornecedor"> | string
    createdAt?: DateTimeFilter<"Fornecedor"> | Date | string
  }

  export type NfeImportUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: NfeImportWhereUniqueInput
    update: XOR<NfeImportUpdateWithoutEmpresaInput, NfeImportUncheckedUpdateWithoutEmpresaInput>
    create: XOR<NfeImportCreateWithoutEmpresaInput, NfeImportUncheckedCreateWithoutEmpresaInput>
  }

  export type NfeImportUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: NfeImportWhereUniqueInput
    data: XOR<NfeImportUpdateWithoutEmpresaInput, NfeImportUncheckedUpdateWithoutEmpresaInput>
  }

  export type NfeImportUpdateManyWithWhereWithoutEmpresaInput = {
    where: NfeImportScalarWhereInput
    data: XOR<NfeImportUpdateManyMutationInput, NfeImportUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type NfeImportScalarWhereInput = {
    AND?: NfeImportScalarWhereInput | NfeImportScalarWhereInput[]
    OR?: NfeImportScalarWhereInput[]
    NOT?: NfeImportScalarWhereInput | NfeImportScalarWhereInput[]
    id?: StringFilter<"NfeImport"> | string
    empresaId?: StringFilter<"NfeImport"> | string
    chaveAcesso?: StringFilter<"NfeImport"> | string
    numeroNota?: StringNullableFilter<"NfeImport"> | string | null
    serie?: StringNullableFilter<"NfeImport"> | string | null
    fornecedor?: StringNullableFilter<"NfeImport"> | string | null
    cnpjFornecedor?: StringNullableFilter<"NfeImport"> | string | null
    fornecedorId?: StringNullableFilter<"NfeImport"> | string | null
    dataEmissao?: DateTimeNullableFilter<"NfeImport"> | Date | string | null
    valorTotal?: FloatNullableFilter<"NfeImport"> | number | null
    xmlOriginal?: StringNullableFilter<"NfeImport"> | string | null
    createdAt?: DateTimeFilter<"NfeImport"> | Date | string
  }

  export type EmpresaCreateWithoutUsuariosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteCreateNestedManyWithoutEmpresaInput
    produtos?: ProductCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutUsuariosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProductUncheckedCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementUncheckedCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorUncheckedCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutUsuariosInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
  }

  export type SolicitacaoCreateWithoutUserInput = {
    id?: string
    quantidade: number
    status?: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutSolicitacoesInput
    product: ProductCreateNestedOneWithoutSolicitacoesInput
  }

  export type SolicitacaoUncheckedCreateWithoutUserInput = {
    id?: string
    empresaId: string
    productId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type SolicitacaoCreateOrConnectWithoutUserInput = {
    where: SolicitacaoWhereUniqueInput
    create: XOR<SolicitacaoCreateWithoutUserInput, SolicitacaoUncheckedCreateWithoutUserInput>
  }

  export type SolicitacaoCreateManyUserInputEnvelope = {
    data: SolicitacaoCreateManyUserInput | SolicitacaoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithoutUsuariosInput = {
    update: XOR<EmpresaUpdateWithoutUsuariosInput, EmpresaUncheckedUpdateWithoutUsuariosInput>
    create: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutUsuariosInput, EmpresaUncheckedUpdateWithoutUsuariosInput>
  }

  export type EmpresaUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUncheckedUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type SolicitacaoUpsertWithWhereUniqueWithoutUserInput = {
    where: SolicitacaoWhereUniqueInput
    update: XOR<SolicitacaoUpdateWithoutUserInput, SolicitacaoUncheckedUpdateWithoutUserInput>
    create: XOR<SolicitacaoCreateWithoutUserInput, SolicitacaoUncheckedCreateWithoutUserInput>
  }

  export type SolicitacaoUpdateWithWhereUniqueWithoutUserInput = {
    where: SolicitacaoWhereUniqueInput
    data: XOR<SolicitacaoUpdateWithoutUserInput, SolicitacaoUncheckedUpdateWithoutUserInput>
  }

  export type SolicitacaoUpdateManyWithWhereWithoutUserInput = {
    where: SolicitacaoScalarWhereInput
    data: XOR<SolicitacaoUpdateManyMutationInput, SolicitacaoUncheckedUpdateManyWithoutUserInput>
  }

  export type EmpresaCreateWithoutProdutosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteCreateNestedManyWithoutEmpresaInput
    usuarios?: UserCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutProdutosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteUncheckedCreateNestedManyWithoutEmpresaInput
    usuarios?: UserUncheckedCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementUncheckedCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorUncheckedCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutProdutosInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
  }

  export type StockMovementCreateWithoutProductInput = {
    id?: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutMovimentacoesInput
  }

  export type StockMovementUncheckedCreateWithoutProductInput = {
    id?: string
    empresaId: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
  }

  export type StockMovementCreateOrConnectWithoutProductInput = {
    where: StockMovementWhereUniqueInput
    create: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput>
  }

  export type StockMovementCreateManyProductInputEnvelope = {
    data: StockMovementCreateManyProductInput | StockMovementCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type SolicitacaoCreateWithoutProductInput = {
    id?: string
    quantidade: number
    status?: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutSolicitacoesInput
    user: UserCreateNestedOneWithoutSolicitacoesInput
  }

  export type SolicitacaoUncheckedCreateWithoutProductInput = {
    id?: string
    empresaId: string
    userId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type SolicitacaoCreateOrConnectWithoutProductInput = {
    where: SolicitacaoWhereUniqueInput
    create: XOR<SolicitacaoCreateWithoutProductInput, SolicitacaoUncheckedCreateWithoutProductInput>
  }

  export type SolicitacaoCreateManyProductInputEnvelope = {
    data: SolicitacaoCreateManyProductInput | SolicitacaoCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type NfeImportItemCreateWithoutProductInput = {
    id?: string
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
    nfeImport: NfeImportCreateNestedOneWithoutItensInput
  }

  export type NfeImportItemUncheckedCreateWithoutProductInput = {
    id?: string
    nfeImportId: string
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
  }

  export type NfeImportItemCreateOrConnectWithoutProductInput = {
    where: NfeImportItemWhereUniqueInput
    create: XOR<NfeImportItemCreateWithoutProductInput, NfeImportItemUncheckedCreateWithoutProductInput>
  }

  export type NfeImportItemCreateManyProductInputEnvelope = {
    data: NfeImportItemCreateManyProductInput | NfeImportItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithoutProdutosInput = {
    update: XOR<EmpresaUpdateWithoutProdutosInput, EmpresaUncheckedUpdateWithoutProdutosInput>
    create: XOR<EmpresaCreateWithoutProdutosInput, EmpresaUncheckedCreateWithoutProdutosInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutProdutosInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutProdutosInput, EmpresaUncheckedUpdateWithoutProdutosInput>
  }

  export type EmpresaUpdateWithoutProdutosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutProdutosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUncheckedUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type StockMovementUpsertWithWhereUniqueWithoutProductInput = {
    where: StockMovementWhereUniqueInput
    update: XOR<StockMovementUpdateWithoutProductInput, StockMovementUncheckedUpdateWithoutProductInput>
    create: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput>
  }

  export type StockMovementUpdateWithWhereUniqueWithoutProductInput = {
    where: StockMovementWhereUniqueInput
    data: XOR<StockMovementUpdateWithoutProductInput, StockMovementUncheckedUpdateWithoutProductInput>
  }

  export type StockMovementUpdateManyWithWhereWithoutProductInput = {
    where: StockMovementScalarWhereInput
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyWithoutProductInput>
  }

  export type SolicitacaoUpsertWithWhereUniqueWithoutProductInput = {
    where: SolicitacaoWhereUniqueInput
    update: XOR<SolicitacaoUpdateWithoutProductInput, SolicitacaoUncheckedUpdateWithoutProductInput>
    create: XOR<SolicitacaoCreateWithoutProductInput, SolicitacaoUncheckedCreateWithoutProductInput>
  }

  export type SolicitacaoUpdateWithWhereUniqueWithoutProductInput = {
    where: SolicitacaoWhereUniqueInput
    data: XOR<SolicitacaoUpdateWithoutProductInput, SolicitacaoUncheckedUpdateWithoutProductInput>
  }

  export type SolicitacaoUpdateManyWithWhereWithoutProductInput = {
    where: SolicitacaoScalarWhereInput
    data: XOR<SolicitacaoUpdateManyMutationInput, SolicitacaoUncheckedUpdateManyWithoutProductInput>
  }

  export type NfeImportItemUpsertWithWhereUniqueWithoutProductInput = {
    where: NfeImportItemWhereUniqueInput
    update: XOR<NfeImportItemUpdateWithoutProductInput, NfeImportItemUncheckedUpdateWithoutProductInput>
    create: XOR<NfeImportItemCreateWithoutProductInput, NfeImportItemUncheckedCreateWithoutProductInput>
  }

  export type NfeImportItemUpdateWithWhereUniqueWithoutProductInput = {
    where: NfeImportItemWhereUniqueInput
    data: XOR<NfeImportItemUpdateWithoutProductInput, NfeImportItemUncheckedUpdateWithoutProductInput>
  }

  export type NfeImportItemUpdateManyWithWhereWithoutProductInput = {
    where: NfeImportItemScalarWhereInput
    data: XOR<NfeImportItemUpdateManyMutationInput, NfeImportItemUncheckedUpdateManyWithoutProductInput>
  }

  export type NfeImportItemScalarWhereInput = {
    AND?: NfeImportItemScalarWhereInput | NfeImportItemScalarWhereInput[]
    OR?: NfeImportItemScalarWhereInput[]
    NOT?: NfeImportItemScalarWhereInput | NfeImportItemScalarWhereInput[]
    id?: StringFilter<"NfeImportItem"> | string
    nfeImportId?: StringFilter<"NfeImportItem"> | string
    productId?: StringNullableFilter<"NfeImportItem"> | string | null
    codigo?: StringNullableFilter<"NfeImportItem"> | string | null
    codigoBarras?: StringNullableFilter<"NfeImportItem"> | string | null
    descricao?: StringFilter<"NfeImportItem"> | string
    quantidade?: FloatFilter<"NfeImportItem"> | number
    valorUnitario?: FloatNullableFilter<"NfeImportItem"> | number | null
    ncm?: StringNullableFilter<"NfeImportItem"> | string | null
    cfop?: StringNullableFilter<"NfeImportItem"> | string | null
    unidade?: StringNullableFilter<"NfeImportItem"> | string | null
  }

  export type EmpresaCreateWithoutMovimentacoesInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteCreateNestedManyWithoutEmpresaInput
    usuarios?: UserCreateNestedManyWithoutEmpresaInput
    produtos?: ProductCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutMovimentacoesInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteUncheckedCreateNestedManyWithoutEmpresaInput
    usuarios?: UserUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProductUncheckedCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorUncheckedCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutMovimentacoesInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutMovimentacoesInput, EmpresaUncheckedCreateWithoutMovimentacoesInput>
  }

  export type ProductCreateWithoutMovementsInput = {
    id?: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutProdutosInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutMovementsInput = {
    id?: string
    empresaId: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutMovementsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
  }

  export type EmpresaUpsertWithoutMovimentacoesInput = {
    update: XOR<EmpresaUpdateWithoutMovimentacoesInput, EmpresaUncheckedUpdateWithoutMovimentacoesInput>
    create: XOR<EmpresaCreateWithoutMovimentacoesInput, EmpresaUncheckedCreateWithoutMovimentacoesInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutMovimentacoesInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutMovimentacoesInput, EmpresaUncheckedUpdateWithoutMovimentacoesInput>
  }

  export type EmpresaUpdateWithoutMovimentacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutMovimentacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUncheckedUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type ProductUpsertWithoutMovementsInput = {
    update: XOR<ProductUpdateWithoutMovementsInput, ProductUncheckedUpdateWithoutMovementsInput>
    create: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutMovementsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutMovementsInput, ProductUncheckedUpdateWithoutMovementsInput>
  }

  export type ProductUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutProdutosNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type EmpresaCreateWithoutSolicitacoesInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteCreateNestedManyWithoutEmpresaInput
    usuarios?: UserCreateNestedManyWithoutEmpresaInput
    produtos?: ProductCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutSolicitacoesInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteUncheckedCreateNestedManyWithoutEmpresaInput
    usuarios?: UserUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProductUncheckedCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementUncheckedCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorUncheckedCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutSolicitacoesInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutSolicitacoesInput, EmpresaUncheckedCreateWithoutSolicitacoesInput>
  }

  export type UserCreateWithoutSolicitacoesInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutUsuariosInput
  }

  export type UserUncheckedCreateWithoutSolicitacoesInput = {
    id?: string
    empresaId: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSolicitacoesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSolicitacoesInput, UserUncheckedCreateWithoutSolicitacoesInput>
  }

  export type ProductCreateWithoutSolicitacoesInput = {
    id?: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutProdutosInput
    movements?: StockMovementCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSolicitacoesInput = {
    id?: string
    empresaId: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    movements?: StockMovementUncheckedCreateNestedManyWithoutProductInput
    nfeItens?: NfeImportItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSolicitacoesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSolicitacoesInput, ProductUncheckedCreateWithoutSolicitacoesInput>
  }

  export type EmpresaUpsertWithoutSolicitacoesInput = {
    update: XOR<EmpresaUpdateWithoutSolicitacoesInput, EmpresaUncheckedUpdateWithoutSolicitacoesInput>
    create: XOR<EmpresaCreateWithoutSolicitacoesInput, EmpresaUncheckedCreateWithoutSolicitacoesInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutSolicitacoesInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutSolicitacoesInput, EmpresaUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type EmpresaUpdateWithoutSolicitacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutSolicitacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUncheckedUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type UserUpsertWithoutSolicitacoesInput = {
    update: XOR<UserUpdateWithoutSolicitacoesInput, UserUncheckedUpdateWithoutSolicitacoesInput>
    create: XOR<UserCreateWithoutSolicitacoesInput, UserUncheckedCreateWithoutSolicitacoesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSolicitacoesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSolicitacoesInput, UserUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type UserUpdateWithoutSolicitacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type UserUncheckedUpdateWithoutSolicitacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutSolicitacoesInput = {
    update: XOR<ProductUpdateWithoutSolicitacoesInput, ProductUncheckedUpdateWithoutSolicitacoesInput>
    create: XOR<ProductCreateWithoutSolicitacoesInput, ProductUncheckedCreateWithoutSolicitacoesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSolicitacoesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSolicitacoesInput, ProductUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type ProductUpdateWithoutSolicitacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutProdutosNestedInput
    movements?: StockMovementUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSolicitacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUncheckedUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type EmpresaCreateWithoutFornecedoresInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteCreateNestedManyWithoutEmpresaInput
    usuarios?: UserCreateNestedManyWithoutEmpresaInput
    produtos?: ProductCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutFornecedoresInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteUncheckedCreateNestedManyWithoutEmpresaInput
    usuarios?: UserUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProductUncheckedCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementUncheckedCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutFornecedoresInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutFornecedoresInput, EmpresaUncheckedCreateWithoutFornecedoresInput>
  }

  export type NfeImportCreateWithoutFornecedorRefInput = {
    id?: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutNfeImportsInput
    itens?: NfeImportItemCreateNestedManyWithoutNfeImportInput
  }

  export type NfeImportUncheckedCreateWithoutFornecedorRefInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
    itens?: NfeImportItemUncheckedCreateNestedManyWithoutNfeImportInput
  }

  export type NfeImportCreateOrConnectWithoutFornecedorRefInput = {
    where: NfeImportWhereUniqueInput
    create: XOR<NfeImportCreateWithoutFornecedorRefInput, NfeImportUncheckedCreateWithoutFornecedorRefInput>
  }

  export type NfeImportCreateManyFornecedorRefInputEnvelope = {
    data: NfeImportCreateManyFornecedorRefInput | NfeImportCreateManyFornecedorRefInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithoutFornecedoresInput = {
    update: XOR<EmpresaUpdateWithoutFornecedoresInput, EmpresaUncheckedUpdateWithoutFornecedoresInput>
    create: XOR<EmpresaCreateWithoutFornecedoresInput, EmpresaUncheckedCreateWithoutFornecedoresInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutFornecedoresInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutFornecedoresInput, EmpresaUncheckedUpdateWithoutFornecedoresInput>
  }

  export type EmpresaUpdateWithoutFornecedoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutFornecedoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUncheckedUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type NfeImportUpsertWithWhereUniqueWithoutFornecedorRefInput = {
    where: NfeImportWhereUniqueInput
    update: XOR<NfeImportUpdateWithoutFornecedorRefInput, NfeImportUncheckedUpdateWithoutFornecedorRefInput>
    create: XOR<NfeImportCreateWithoutFornecedorRefInput, NfeImportUncheckedCreateWithoutFornecedorRefInput>
  }

  export type NfeImportUpdateWithWhereUniqueWithoutFornecedorRefInput = {
    where: NfeImportWhereUniqueInput
    data: XOR<NfeImportUpdateWithoutFornecedorRefInput, NfeImportUncheckedUpdateWithoutFornecedorRefInput>
  }

  export type NfeImportUpdateManyWithWhereWithoutFornecedorRefInput = {
    where: NfeImportScalarWhereInput
    data: XOR<NfeImportUpdateManyMutationInput, NfeImportUncheckedUpdateManyWithoutFornecedorRefInput>
  }

  export type EmpresaCreateWithoutNfeImportsInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteCreateNestedManyWithoutEmpresaInput
    usuarios?: UserCreateNestedManyWithoutEmpresaInput
    produtos?: ProductCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutNfeImportsInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    convites?: UserInviteUncheckedCreateNestedManyWithoutEmpresaInput
    usuarios?: UserUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProductUncheckedCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementUncheckedCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutNfeImportsInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutNfeImportsInput, EmpresaUncheckedCreateWithoutNfeImportsInput>
  }

  export type FornecedorCreateWithoutNotasFiscaisInput = {
    id?: string
    nome: string
    cnpj: string
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutFornecedoresInput
  }

  export type FornecedorUncheckedCreateWithoutNotasFiscaisInput = {
    id?: string
    empresaId: string
    nome: string
    cnpj: string
    createdAt?: Date | string
  }

  export type FornecedorCreateOrConnectWithoutNotasFiscaisInput = {
    where: FornecedorWhereUniqueInput
    create: XOR<FornecedorCreateWithoutNotasFiscaisInput, FornecedorUncheckedCreateWithoutNotasFiscaisInput>
  }

  export type NfeImportItemCreateWithoutNfeImportInput = {
    id?: string
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
    product?: ProductCreateNestedOneWithoutNfeItensInput
  }

  export type NfeImportItemUncheckedCreateWithoutNfeImportInput = {
    id?: string
    productId?: string | null
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
  }

  export type NfeImportItemCreateOrConnectWithoutNfeImportInput = {
    where: NfeImportItemWhereUniqueInput
    create: XOR<NfeImportItemCreateWithoutNfeImportInput, NfeImportItemUncheckedCreateWithoutNfeImportInput>
  }

  export type NfeImportItemCreateManyNfeImportInputEnvelope = {
    data: NfeImportItemCreateManyNfeImportInput | NfeImportItemCreateManyNfeImportInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithoutNfeImportsInput = {
    update: XOR<EmpresaUpdateWithoutNfeImportsInput, EmpresaUncheckedUpdateWithoutNfeImportsInput>
    create: XOR<EmpresaCreateWithoutNfeImportsInput, EmpresaUncheckedCreateWithoutNfeImportsInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutNfeImportsInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutNfeImportsInput, EmpresaUncheckedUpdateWithoutNfeImportsInput>
  }

  export type EmpresaUpdateWithoutNfeImportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutNfeImportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convites?: UserInviteUncheckedUpdateManyWithoutEmpresaNestedInput
    usuarios?: UserUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUncheckedUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type FornecedorUpsertWithoutNotasFiscaisInput = {
    update: XOR<FornecedorUpdateWithoutNotasFiscaisInput, FornecedorUncheckedUpdateWithoutNotasFiscaisInput>
    create: XOR<FornecedorCreateWithoutNotasFiscaisInput, FornecedorUncheckedCreateWithoutNotasFiscaisInput>
    where?: FornecedorWhereInput
  }

  export type FornecedorUpdateToOneWithWhereWithoutNotasFiscaisInput = {
    where?: FornecedorWhereInput
    data: XOR<FornecedorUpdateWithoutNotasFiscaisInput, FornecedorUncheckedUpdateWithoutNotasFiscaisInput>
  }

  export type FornecedorUpdateWithoutNotasFiscaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutFornecedoresNestedInput
  }

  export type FornecedorUncheckedUpdateWithoutNotasFiscaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NfeImportItemUpsertWithWhereUniqueWithoutNfeImportInput = {
    where: NfeImportItemWhereUniqueInput
    update: XOR<NfeImportItemUpdateWithoutNfeImportInput, NfeImportItemUncheckedUpdateWithoutNfeImportInput>
    create: XOR<NfeImportItemCreateWithoutNfeImportInput, NfeImportItemUncheckedCreateWithoutNfeImportInput>
  }

  export type NfeImportItemUpdateWithWhereUniqueWithoutNfeImportInput = {
    where: NfeImportItemWhereUniqueInput
    data: XOR<NfeImportItemUpdateWithoutNfeImportInput, NfeImportItemUncheckedUpdateWithoutNfeImportInput>
  }

  export type NfeImportItemUpdateManyWithWhereWithoutNfeImportInput = {
    where: NfeImportItemScalarWhereInput
    data: XOR<NfeImportItemUpdateManyMutationInput, NfeImportItemUncheckedUpdateManyWithoutNfeImportInput>
  }

  export type NfeImportCreateWithoutItensInput = {
    id?: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutNfeImportsInput
    fornecedorRef?: FornecedorCreateNestedOneWithoutNotasFiscaisInput
  }

  export type NfeImportUncheckedCreateWithoutItensInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    fornecedorId?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
  }

  export type NfeImportCreateOrConnectWithoutItensInput = {
    where: NfeImportWhereUniqueInput
    create: XOR<NfeImportCreateWithoutItensInput, NfeImportUncheckedCreateWithoutItensInput>
  }

  export type ProductCreateWithoutNfeItensInput = {
    id?: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutProdutosInput
    movements?: StockMovementCreateNestedManyWithoutProductInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutNfeItensInput = {
    id?: string
    empresaId: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
    movements?: StockMovementUncheckedCreateNestedManyWithoutProductInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutNfeItensInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutNfeItensInput, ProductUncheckedCreateWithoutNfeItensInput>
  }

  export type NfeImportUpsertWithoutItensInput = {
    update: XOR<NfeImportUpdateWithoutItensInput, NfeImportUncheckedUpdateWithoutItensInput>
    create: XOR<NfeImportCreateWithoutItensInput, NfeImportUncheckedCreateWithoutItensInput>
    where?: NfeImportWhereInput
  }

  export type NfeImportUpdateToOneWithWhereWithoutItensInput = {
    where?: NfeImportWhereInput
    data: XOR<NfeImportUpdateWithoutItensInput, NfeImportUncheckedUpdateWithoutItensInput>
  }

  export type NfeImportUpdateWithoutItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutNfeImportsNestedInput
    fornecedorRef?: FornecedorUpdateOneWithoutNotasFiscaisNestedInput
  }

  export type NfeImportUncheckedUpdateWithoutItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedorId?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutNfeItensInput = {
    update: XOR<ProductUpdateWithoutNfeItensInput, ProductUncheckedUpdateWithoutNfeItensInput>
    create: XOR<ProductCreateWithoutNfeItensInput, ProductUncheckedCreateWithoutNfeItensInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutNfeItensInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutNfeItensInput, ProductUncheckedUpdateWithoutNfeItensInput>
  }

  export type ProductUpdateWithoutNfeItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutProdutosNestedInput
    movements?: StockMovementUpdateManyWithoutProductNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutNfeItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUncheckedUpdateManyWithoutProductNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutProductNestedInput
  }

  export type EmpresaCreateWithoutConvitesInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    usuarios?: UserCreateNestedManyWithoutEmpresaInput
    produtos?: ProductCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutConvitesInput = {
    id?: string
    nome: string
    cnpj?: string | null
    createdAt?: Date | string
    usuarios?: UserUncheckedCreateNestedManyWithoutEmpresaInput
    produtos?: ProductUncheckedCreateNestedManyWithoutEmpresaInput
    movimentacoes?: StockMovementUncheckedCreateNestedManyWithoutEmpresaInput
    solicitacoes?: SolicitacaoUncheckedCreateNestedManyWithoutEmpresaInput
    fornecedores?: FornecedorUncheckedCreateNestedManyWithoutEmpresaInput
    nfeImports?: NfeImportUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutConvitesInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutConvitesInput, EmpresaUncheckedCreateWithoutConvitesInput>
  }

  export type EmpresaUpsertWithoutConvitesInput = {
    update: XOR<EmpresaUpdateWithoutConvitesInput, EmpresaUncheckedUpdateWithoutConvitesInput>
    create: XOR<EmpresaCreateWithoutConvitesInput, EmpresaUncheckedCreateWithoutConvitesInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutConvitesInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutConvitesInput, EmpresaUncheckedUpdateWithoutConvitesInput>
  }

  export type EmpresaUpdateWithoutConvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UserUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutConvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UserUncheckedUpdateManyWithoutEmpresaNestedInput
    produtos?: ProductUncheckedUpdateManyWithoutEmpresaNestedInput
    movimentacoes?: StockMovementUncheckedUpdateManyWithoutEmpresaNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutEmpresaNestedInput
    fornecedores?: FornecedorUncheckedUpdateManyWithoutEmpresaNestedInput
    nfeImports?: NfeImportUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type UserInviteCreateManyEmpresaInput = {
    id?: string
    nome: string
    email: string
    role?: string
    token: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type UserCreateManyEmpresaInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    createdAt?: Date | string
  }

  export type ProductCreateManyEmpresaInput = {
    id?: string
    nome: string
    sku?: string | null
    codigoBarras?: string | null
    categoria?: string | null
    custo?: number | null
    preco?: number | null
    estoqueAtual?: number
    estoqueMinimo?: number
    createdAt?: Date | string
  }

  export type StockMovementCreateManyEmpresaInput = {
    id?: string
    productId: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
  }

  export type SolicitacaoCreateManyEmpresaInput = {
    id?: string
    userId: string
    productId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type FornecedorCreateManyEmpresaInput = {
    id?: string
    nome: string
    cnpj: string
    createdAt?: Date | string
  }

  export type NfeImportCreateManyEmpresaInput = {
    id?: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    fornecedorId?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
  }

  export type UserInviteUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInviteUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInviteUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitacoes?: SolicitacaoUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUpdateManyWithoutProductNestedInput
    solicitacoes?: SolicitacaoUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUncheckedUpdateManyWithoutProductNestedInput
    solicitacoes?: SolicitacaoUncheckedUpdateManyWithoutProductNestedInput
    nfeItens?: NfeImportItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    custo?: NullableFloatFieldUpdateOperationsInput | number | null
    preco?: NullableFloatFieldUpdateOperationsInput | number | null
    estoqueAtual?: FloatFieldUpdateOperationsInput | number
    estoqueMinimo?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutMovementsNestedInput
  }

  export type StockMovementUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSolicitacoesNestedInput
    product?: ProductUpdateOneRequiredWithoutSolicitacoesNestedInput
  }

  export type SolicitacaoUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FornecedorUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notasFiscais?: NfeImportUpdateManyWithoutFornecedorRefNestedInput
  }

  export type FornecedorUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notasFiscais?: NfeImportUncheckedUpdateManyWithoutFornecedorRefNestedInput
  }

  export type FornecedorUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NfeImportUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fornecedorRef?: FornecedorUpdateOneWithoutNotasFiscaisNestedInput
    itens?: NfeImportItemUpdateManyWithoutNfeImportNestedInput
  }

  export type NfeImportUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedorId?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itens?: NfeImportItemUncheckedUpdateManyWithoutNfeImportNestedInput
  }

  export type NfeImportUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedorId?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoCreateManyUserInput = {
    id?: string
    empresaId: string
    productId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type SolicitacaoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutSolicitacoesNestedInput
    product?: ProductUpdateOneRequiredWithoutSolicitacoesNestedInput
  }

  export type SolicitacaoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateManyProductInput = {
    id?: string
    empresaId: string
    tipo: string
    quantidade: number
    observacao?: string | null
    createdAt?: Date | string
  }

  export type SolicitacaoCreateManyProductInput = {
    id?: string
    empresaId: string
    userId: string
    quantidade: number
    status?: string
    createdAt?: Date | string
  }

  export type NfeImportItemCreateManyProductInput = {
    id?: string
    nfeImportId: string
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
  }

  export type StockMovementUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutMovimentacoesNestedInput
  }

  export type StockMovementUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutSolicitacoesNestedInput
    user?: UserUpdateOneRequiredWithoutSolicitacoesNestedInput
  }

  export type SolicitacaoUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacaoUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NfeImportItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    nfeImport?: NfeImportUpdateOneRequiredWithoutItensNestedInput
  }

  export type NfeImportItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    nfeImportId?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NfeImportItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    nfeImportId?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NfeImportCreateManyFornecedorRefInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    numeroNota?: string | null
    serie?: string | null
    fornecedor?: string | null
    cnpjFornecedor?: string | null
    dataEmissao?: Date | string | null
    valorTotal?: number | null
    xmlOriginal?: string | null
    createdAt?: Date | string
  }

  export type NfeImportUpdateWithoutFornecedorRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutNfeImportsNestedInput
    itens?: NfeImportItemUpdateManyWithoutNfeImportNestedInput
  }

  export type NfeImportUncheckedUpdateWithoutFornecedorRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itens?: NfeImportItemUncheckedUpdateManyWithoutNfeImportNestedInput
  }

  export type NfeImportUncheckedUpdateManyWithoutFornecedorRefInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    numeroNota?: NullableStringFieldUpdateOperationsInput | string | null
    serie?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjFornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    xmlOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NfeImportItemCreateManyNfeImportInput = {
    id?: string
    productId?: string | null
    codigo?: string | null
    codigoBarras?: string | null
    descricao: string
    quantidade: number
    valorUnitario?: number | null
    ncm?: string | null
    cfop?: string | null
    unidade?: string | null
  }

  export type NfeImportItemUpdateWithoutNfeImportInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneWithoutNfeItensNestedInput
  }

  export type NfeImportItemUncheckedUpdateWithoutNfeImportInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NfeImportItemUncheckedUpdateManyWithoutNfeImportInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    codigoBarras?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: FloatFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    ncm?: NullableStringFieldUpdateOperationsInput | string | null
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
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