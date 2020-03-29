<template>
  <v-navigation-drawer v-if="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list dense>
      <template v-for="item in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.model ? item.text : item['text-alt'] }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(child, i) in item.children" :key="i" link>
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-if="child.route"><v-list-item :to="child.route" link>{{ child.text }}</v-list-item></v-list-item-title>       
              <v-list-item-title v-else>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-if="item.route"><v-list-item :to="item.route" link>{{ item.text }}</v-list-item></v-list-item-title>       
            <v-list-item-title v-else>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data: function() {
    return {
      items: [
        { icon: "mdi-view-list", text: "Tasks", route: "/" },
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-chevron-down",
          text: "Less",
          "text-alt": "More",
          model: true,
          children: [
            { icon: "mdi-check", text: "Done", route: "/done" },
            { icon: "mdi-progress-clock", text: "In Progress", route: "/in-progress" },
            { icon: "mdi-delete", text: "Deleted", route: "/deleted" }
          ]
        },
        { icon: "mdi-settings", text: "Settings", route: "/settings" },
        { icon: "mdi-information", text: "About", route: "/about" }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.v-list-item--active {
  color: #1976D2;
}
</style>