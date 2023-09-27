import { TodoEntity, TodoProps } from '../../domain/todo.entity'
import { Text } from '../../domain/value-objects/text.value-object'
import { CreateWalletWhenUserIsCreatedDomainEventHandler } from './create-wallet-when-user-is-created.domain-event-handler'

new CreateWalletWhenUserIsCreatedDomainEventHandler()

const text = new Text({ value: 'text' })
const props: TodoProps = { text, completed: false }
new TodoEntity({ id: '1', props })
