#!/usr/bin/env node
const program = require("commander");
const pack = require("../../package.json");
import CreateAccount from "../application/usecases/CreateAccount";
import PgPromise from "../infra/database/PgPromiseAdapter";
import UserRepositorySql from "../infra/repositories/UserRepositorySql";

program.version(pack.version);

const data = [];
program
  .command("add [username,password,dateOfBirth]")
  .description("Adiciona uma nova conta")
  .action(async (data: string) => {
    const [username, password, dateofbirth] = data.split(",");
    const connection = new PgPromise();
    const userRository = new UserRepositorySql(connection);
    const createAccount = new CreateAccount(userRository);
    const result = await createAccount.execute({
      username,
      password,
      dateofbirth: new Date(dateofbirth),
    });
    if (result) {
      console.log("Created");
    }
  });

program.parse(process.argv);
