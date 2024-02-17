defmodule ElixirTrailsWeb.PageController do
  use ElixirTrailsWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def geojson(conn, _params) do
    geojson = ElixirTrails.Tracks.get_geom_as_geojson!()

    json(conn, geojson)
  end
end
