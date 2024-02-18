defmodule ElixirTrailsWeb.TracksLive do
  use ElixirTrailsWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok,
    socket
    |> assign(:geojson, ElixirTrails.Tracks.get_geom_as_geojson!())}
  end
end
