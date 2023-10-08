type Controller = { target: Function; method: 'post' | 'get' | 'patch' | 'delete'; path: string }

export const routes: Controller[] = []

export function Controller(method: 'post' | 'get' | 'patch' | 'delete', path: string): ClassDecorator {
  return function (target: any) {
    routes.push({ method, path, target })
  }
}

export const ControllerGet = (path: string) => Controller('get', path)
export const ControllerPost = (path: string) => Controller('post', path)
export const ControllerPatch = (path: string) => Controller('patch', path)
export const ControllerDelete = (path: string) => Controller('delete', path)
