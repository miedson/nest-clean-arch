#!/usr/bin/env node
const program = require("commander");
const pack = require("../../package.json");
import CreateAccount from "../application/usecases/CreateAccount";
import GetAllAccounts from "../application/usecases/GetAllAccounts";
import PgPromise from "../infra/database/PgPromiseAdapter";
import UserRepositorySql from "../infra/repositories/UserRepositorySql";

program.version(pack.version);

const connection = new PgPromise();
const userRository = new UserRepositorySql(connection);
program
  .command("add [username,password,dateOfBirth]")
  .description("Adiciona uma nova conta")
  .action(async (data: string) => {
    const [username, password, dateofbirth] = data.split(",");
    const createAccount = new CreateAccount(userRository);
    await createAccount.execute({
      username,
      password,
      dateofbirth: new Date(dateofbirth),
    });
  });

  program.command("list")
  .description("Lista os usuários")
  .action(async () => {
    const getAllAccounts = new GetAllAccounts(userRository);
    const accounts = await getAllAccounts.execute();
    console.log('Usuários cadastrados:');
    accounts.forEach(account => {
      console.log('');
      console.log(`ID: ${account.id}`);
      console.log(`Username: ${account.username}`);
      console.log(`Data de nascimento: ${account.dateofbirth.toLocaleDateString('pt-br')}`);
    });
  });

program.parse(process.argv);
