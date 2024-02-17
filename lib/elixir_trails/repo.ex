defmodule ElixirTrails.Repo do
  use Ecto.Repo,
    otp_app: :elixir_trails,
    adapter: Ecto.Adapters.Postgres
end
