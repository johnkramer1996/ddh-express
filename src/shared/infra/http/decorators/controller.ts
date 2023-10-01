export const routesHandlers: { target: Function; method: 'post' | 'get' | 'put' | 'delete'; path: string }[] = []
const meta = Symbol.for('123')

export function Controller(method: 'post' | 'get' | 'put' | 'delete', path: string): ClassDecorator {
  return function (target: Function) {
    routesHandlers.push({ method, path, target })
  }
}

// export function Post(path: string): MethodDecorator {
//   return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//     Reflect.defineMetadata(meta, { method: 'post', path: path,}, target)
//   }
// }
