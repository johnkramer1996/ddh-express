type Controller = { target: Function; method: 'post' | 'get' | 'put' | 'delete'; path: string }

export const routes: Controller[] = []

export function Controller(method: 'post' | 'get' | 'put' | 'delete', path: string): ClassDecorator {
  return function (target: any) {
    routes.push({ method, path, target })
  }
}

export const ControllerGet = (path: string) => Controller('get', path)
export const ControllerPost = (path: string) => Controller('post', path)
export const ControllerPut = (path: string) => Controller('put', path)
export const ControllerDelete = (path: string) => Controller('delete', path)
