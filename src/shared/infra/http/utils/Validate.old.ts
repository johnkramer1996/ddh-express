import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { transformValidationErrorsToJSON } from './Validate'

function validationFactory<T extends object>(model: { new (...args: any[]): T }, source: 'body' | 'query' | 'params') {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value as Function

    descriptor.value = async function () {
      const [req, res] = arguments
      const plain = req[source]
      const obj = plainToClass(model, plain)
      const errors = await validate(obj)
      if (errors.length > 0) {
        res.status(400).json(transformValidationErrorsToJSON(errors))
        return
      }

      return method.apply(this, arguments)
    }
  }
}

export const ValidateQuery = <T extends object>(dto: { new (...args: any[]): T }) => validationFactory(dto, 'query')
export const ValidateBody = <T extends object>(dto: { new (...args: any[]): T }) => validationFactory(dto, 'body')
export const ValidateParams = <T extends object>(dto: { new (...args: any[]): T }) => validationFactory(dto, 'params')
