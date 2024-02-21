# ElixirTrails

This repo assumes you have the following installed:
  * Elixir v1.16+
  * Phoenix v1.7+
  * Postgres@14
  * PostGIS@3.3.4
  
To install the latest version of phoenix: 
  * `mix archive.install hex phx_new`

To install dependencies:
  * Run `mix deps.get`

To create and migrate the database:
  * Run `mix ecto.create`
  * Run `mix ecto.migrate`

Your dev.exs file should setup the DB with these attributes:
  * username: "postgres",
  * hostname: "localhost",
  * database: "elixir_trails_dev"

To setup the project data: 
  * Run `elixir priv/scripts/create_database_geom.ex` which populates the db with geom

To start your Phoenix server:
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).
