import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebookF, faSquareSnapchat, faTwitter } from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookF,faTwitter,faSquareSnapchat);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
