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
    const mapCenter = [-121.78611, 45.25549]
    var map = new maplibregl.Map({
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

