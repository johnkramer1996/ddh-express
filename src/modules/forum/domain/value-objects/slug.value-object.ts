import { TextUtils } from '@src/shared/utils/text-utils'
import { ValueObject } from '../../../../shared/domain/value-object.base'
import slug from 'slug'

slug.defaults.mode = 'pretty'
slug.defaults.modes['pretty'] = {
  replacement: '-', // replace spaces with replacement
  symbols: false, // replace unicode symbols or not
  lower: true, // result in lower case
  charmap: slug.charmap, // replace special characters
  multicharmap: slug.multicharmap, // replace multi-characters
}

export interface SlugProps {
  value: string
}

export interface UpdateSlugProps {
  text: Slug
}

export class Slug extends ValueObject<SlugProps> {
  static create(props: SlugProps) {
    props.value = TextUtils.createRandomNumericString(7) + '-' + slug(props.value)

    return new Slug(props)
  }

  get value(): string {
    return this.props.value
  }

  protected validate(props: SlugProps): void {}
}
