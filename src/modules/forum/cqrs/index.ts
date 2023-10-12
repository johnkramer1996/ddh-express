type Account = any

class FindAccountByEmailQuery {
  constructor(private email: string) {}

  public Execute(): Account {
    return this.email
  }
}

interface IQueryFactory {
  FindAccountByEmail(email: string): Account
}

class QueryFactory implements IQueryFactory {
  public FindAccountByEmail(email: string): Account {
    return new FindAccountByEmailQuery(email).Execute()
  }
}

class AccountController {
  constructor(private readonly queryFactory: IQueryFactory) {}

  public LogOn(email: string) {
    return this.queryFactory.FindAccountByEmail(email)
  }
}
