<template>
  <div class="pb-5">
    <v-container class="py-1 my-0" fluid style="border-radius: 20px">
      <v-container>
        <v-row class="justify-center">
          <v-col class="my-auto" lg="12">
            <h2 class="text-primary">Settings</h2>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="py-3">
        <v-row>
          <v-col>
            <v-expansion-panels>
              <v-expansion-panel title="Property list">
                <v-expansion-panel-text>
                  <PropertyTable />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel title="All Features and amenities list">
                <v-expansion-panel-text>
                  <FeaturesTable />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel title="All Specifications list">
                <v-expansion-panel-text>
                  <SpecificationsTable />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col> </v-row></v-container
    ></v-container>
  </div>
</template>
<style scoped>
.border-20 {
  border-radius: 20px;
}
</style>
