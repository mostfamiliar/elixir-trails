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
      from t in Track,
        select: fragment("json_build_object(
                             'type', 'FeatureCollection',
                             'features', json_agg(
                                 json_build_object(
                                     'type', 'Feature',
                                     'properties', json_build_object(
                                         'name', ?
                                     ),
                                     'geometry', ST_AsGeoJSON(?)::json
                                 )
                             )
                           )", t.name, t.geom)

    geojson = ElixirTrails.Repo.one(query)
    # updated_geojson = for n <- geojson, do: Map.delete(n, "crs")
    Poison.encode!(geojson)
  end

  def create_feature_collection!(geometry) do
    # %{
    #   :type => "FeatureCollection",
    #   :features => [
    #   :type => "Feature",
    #   :properties => %{
    #     name: "test"
    #   },
    #   :geometry => geometry
    #   ]
    # }
  end
end
