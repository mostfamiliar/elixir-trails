defmodule CreateDatabaseGeom do
  def add_geom_to_table(input_dir, tablename \\ "tracks") do
    parent_dir = Path.expand("../", __DIR__)
    file_names = File.ls!("#{parent_dir}/#{input_dir}")

    Enum.each(file_names, fn file ->
      input_file = Path.join([parent_dir, input_dir, file])
      command = "ogr2ogr"
      # require IEx; IEx.pry
      args = [
        "-update",
        "-append",
        "-f",
        "PostgreSQL",
        "PG:host=127.0.0.1 user=postgres dbname=elixir_trails_dev",
        input_file,
        "-nln",
        tablename,
        "-sql",
        "Select * From #{tablename}"
      ]

      case System.cmd(command, args) do
        {"", 0} ->
          IO.puts "Command completed."
        {:error, reason} ->
          IO.puts "Command failed: #{reason}"
      end

      IO.puts("#{file} added to #{tablename}")
    end)
  end
end

CreateDatabaseGeom.add_geom_to_table("gpx")
