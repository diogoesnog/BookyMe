<template>
  <div class="col-12" >
    <p class="titles" style="padding-top: 40px; padding-left: 30px">{{$t('storePage.utilInfo')}}</p>

    <l-map style="height: 200px" :zoom="zoom" :center="center">
      <l-tile-layer :url="urlOM"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"/>
    </l-map>
  </div>

</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import {Icon} from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  name: 'StoreMap',
  props: {
    latitude: Number,
    longitude: Number
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  beforeMount() {
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  },

  data () {
    return {
      //urlMapBox: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      urlOM: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 15,
      // TODO: Resolver isto ser dinâmico consoante o ID GET
      center: [41.4290545, -8.4784188],
      markerLatLng: [41.4290545, -8.4784188]
  };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    }
  }
}
</script>

<style scoped>

.titles {
  color: #434343;
  font-weight: 700;
  font-size: 30px;
}

</style>
