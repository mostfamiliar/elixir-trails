defmodule ElixirTrails.Tracks do
  @moduledoc """
  The Tracks context.
  """

  import Ecto.Query, warn: false
  alias ElixirTrails.Repo

  alias ElixirTrails.Tracks.Track

  def get_track!(id), do: Repo.get!(Track, id)

  def list_tracks, do: Repo.all(Track)

  def get_geom_as_geojson!() do
    query =
      from(t in Track,
        select: fragment("ST_AsGeoJSON(?)::json", t.geom)
      )

    geo_map = Repo.one!(query)
    Map.delete(geo_map, "crs")
  end
end
