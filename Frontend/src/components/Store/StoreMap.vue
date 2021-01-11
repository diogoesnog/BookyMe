<template>
  <div class="col-12" >
    <p class="titles" style="padding-top: 20px; padding-left: 30px">{{$t('storePage.utilInfo')}}</p>
    <div>
      <l-map style="height: 200px; margin-bottom: 35px; position: relative" zoom="14" :center="[this.latitude, this.longitude]">
        <l-tile-layer :url="urlOM"></l-tile-layer>
        <l-marker :lat-lng="[this.latitude, this.longitude]"/>
      </l-map>
      <div class="infoAddress">
        <span style="font-weight: 670; font-size: 14px; display: inline-block; vertical-align: middle;">
          {{ this.address.place }}
        </span>
        <span style="font-weight: 350; font-size: 14px; display: inline-block; vertical-align: middle;">
          {{ this.address.zipcode }}, {{ this.address.city }}
        </span>
      </div>
      <div>
      </div>
    </div>
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
    longitude: Number,
    address: Object
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
      zoom: 16,
      // TODO: Resolver isto ser dinâmico consoante o ID GET
      center: [41.3988155, -8.5167904],
      markerLatLng: [41.3988155, -8.5167904]
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

  .infoAddress {
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    position: relative;
    top: 20px;
    height: 70px;
    width: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100px;
    color: #434343;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
  }

  .infoPhone {
    background: linear-gradient(#e9695c, #e03459);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);   
    text-align: center;
    height: 35px;
    border-radius: 20px; 
  }

  .titles {
    color: #434343;
    font-weight: 700;
    font-size: 30px;
  }

  </style>
