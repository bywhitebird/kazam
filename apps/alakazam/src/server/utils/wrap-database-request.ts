import { Executor } from "edgedb"


interface Options {
  auth?: {
    userId: string
  }
}

/**
 * Wraps a database request in a promise, so the returned value can be used both in query builder parameters and to await the result of the database request.
 * The returned function can also be used to authenticate the database request.
 * 
 * @param fn The function that returns a database request
 * @returns A function that returns a database request wrapped in a promise, with the ability to authenticate the database request
 * @example
 * ```ts
 * export const dbSelectUser = wrapDatabaseRequest(
 *   (id: string) => db.select(db.User, (dbUser) => ({
 *     id: true,
 *     filter_single: db.op(dbUser.id, '=', db.uuid(id)),
 *   }))
 * )
 * 
 * const user = await dbSelectUser('...', { options: {
 *   auth: { userId: '...' }
 * }})
 * 
 * const createNewArticle = wrapDatabaseRequest(
 *   (name: string, userId: string) => db.insert(db.Article, {
 *     name,
 *     author: dbSelectUser(userId),
 *   })
 * )
 * 
 * const newArticle = await createNewArticle('...', '...', { options: {
 *   auth: { userId: '...' }
 * }})
 * 
 * // is equivalent to
 * 
 * const user = await db.select(db.User, (dbUser) => ({
 *   id: true,
 *   filter_single: db.op(dbUser.id, '=', db.uuid(id)),
 * })).run(database.client.withGlobals({ current_user: '...' }))
 * 
 * const newArticle = await db.insert(db.Article, {
 *   name,
 *   author: await db.select(db.User, (dbUser) => ({
 *     id: true,
 *     filter_single: db.op(dbUser.id, '=', db.uuid(id)),
 *   })),
 * }).run(database.client.withGlobals({ current_user: '...' }))
 * ```
 */
export const wrapDatabaseRequest = <
  F extends (...args: any[]) => { run: (cxn: Executor) => Promise<any> },
  R extends ReturnType<F> = ReturnType<F>,
>(fn: F): (
  ...args: [...Parameters<F>, options?: { options: Options }]
) => ReturnType<typeof _wrapDatabaseRequest<R>> => {
  return (
    ...args: [...Parameters<F>, options?: { options: Options }]
  ): ReturnType<typeof _wrapDatabaseRequest<R>> => {
    let options: Options = {}
    const lastArg = args.at(-1)
    if (lastArg !== undefined && typeof lastArg === 'object' && 'options' in lastArg) {
      options = lastArg as Options
      args.pop()
    }

    return _wrapDatabaseRequest(fn(...args) as R, options.auth)
  }
}

const _wrapDatabaseRequest = <
  R extends { run: (cxn: Executor) => Promise<any> }
>(
  databaseRequest: R,
  auth?: {
    userId: string
  },
) => {
    const { run, ...rest } = databaseRequest

    type T = Awaited<ReturnType<R['run']>>
    
    return {
      ...rest,
      catch<TResult = never>(
        onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined,
      ): Promise<T | TResult> {
        return this.then(undefined, onRejected);
      },
      finally(onFinally?: (() => void) | null | undefined): Promise<T> {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          },
        );
      },
      then<TResult1 = T, TResult2 = never>(
        onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
      ): Promise<TResult1 | TResult2> {
        const dbClient = auth !== undefined
          ? db.client.withGlobals({ current_user: auth.userId })
          : db.client

        return run(dbClient).then(onFulfilled, onRejected)
      }
    }
  }
