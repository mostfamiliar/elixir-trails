// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"
import maplibregl from 'maplibre-gl';

let Hooks = {}
Hooks.MainMap = {
  initMap() {
    const tracks_list = JSON.parse(this.el.dataset.list_tracks);
    console.log(tracks_list)
    const mapCenter = [-121.78611, 45.25549]
    const map = new maplibregl.Map({
      container: 'map', // container id
      style: {
        'version': 8,
        'sources': {
            'raster-tiles': {
                'type': 'raster',
                'tiles': [
                  'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=db6bfeb1836840e9b95634fc96792a43'
                ],
                'tileSize': 256,
              }
            },
            'layers': [
              {
                  'id': 'simple-tiles',
                  'type': 'raster',
                  'source': 'raster-tiles',
                  'minzoom': 0,
                  'maxzoom': 22
              }
          ]
      },
      center: mapCenter, // starting position
      zoom: 8 // starting zoom
    });

    console.log(tracks_list)
    map.on('load', () => {
      map.addSource('trails', {
          'type': 'geojson',
          'data': tracks_list,
      });
      map.addLayer({
        'id': 'trails',
        'type': 'line',
        'source': 'trails',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#556B2F',
            'line-width': 3
        }
      });

      tracks_list.forEach((track) => {
        console.log(track)
      })
      // const marker = new maplibregl.Marker()
      // .setLngLat([12.550343, 55.665957])
      // .addTo(map);

      // Add a layer showing the places.
      map.addLayer({
        'id': 'trail-desc',
        'type': 'symbol',
        'source': 'trails',
        'layout': {
            'icon-image': '{icon}_15',
            'icon-overlap': 'always'
        }
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'trails', (e) => {
        console.log(e)
        const coordinates = Object.values(temp1.lngLat);
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
    });
  },

  mounted() {
    this.initMap();
  }
}

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: {_csrf_token: csrfToken}, hooks: Hooks
})

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

