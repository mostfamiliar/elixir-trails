defmodule ElixirTrailsWeb.TracksLive do
  use ElixirTrailsWeb, :live_view
  alias ElixirTrailsWeb.Tracks

  def mount(_params, _session, socket) do
    {:ok,
    socket
    |> assign(:foo, "bar")}
  end
end
