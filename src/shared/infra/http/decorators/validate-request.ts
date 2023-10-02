import { plainToClass } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import { Request, Response } from 'express'

type ValidateRequest = ['body' | 'query' | 'params', { new (...args: any[]): object }]

export const ValidateRequest = (dtos: ValidateRequest[]) => {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value as Function

    descriptor.value = async function (req: Request, res: Response) {
      for (let i = 0; i < dtos.length; i++) {
        const [source, model] = dtos[i]
        const plain = req[source]
        const obj = plainToClass(model, plain)
        const errors = await validate(obj)
        if (errors.length > 0) {
          res.status(400).json(transformValidationErrorsToJSON(errors))
          return
        }
      }

      return method.apply(this, arguments)
    }
  }
}

export function transformValidationErrorsToJSON(errors: ValidationError[]) {
  return errors.reduce((p, c: ValidationError) => {
    if (c.children && c.children.length) p[c.property] = transformValidationErrorsToJSON(c.children)
    else if (c.constraints) p[c.property] = Object.values(c.constraints)
    return p
  }, {} as any)
}
