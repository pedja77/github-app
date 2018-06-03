<template>
  <v-ons-page>
    <app-toolbar>
      <div slot="left">
        <v-ons-back-button></v-ons-back-button>
      </div>
    </app-toolbar>

    <div class="content">
      <v-ons-card>
        <div class="title">{{ user.name ? user.name : 'Unknown user'}}</div>
        <img :src="user.avatar_url" alt="Users github avatar" width="100%" />
        <div class="content">
          <p>Location: {{ user.location }}</p>
          <p>Followers: {{ user.followers }}</p>
          <p>Following: {{ user.following }}</p>
          <div>
            <v-ons-button modifier="large" @click="toggleList">
              <p>{{ toggleButtonCaption }}</p>
            </v-ons-button>
          </div>
          <div v-if="showNotes">
            <v-ons-input v-model="note" />
            <v-ons-button @click="saveNote" styel="{float: right}">Save</v-ons-button>
            <v-ons-list-title>Notes, so far</v-ons-list-title>
            <v-ons-list>
              <v-ons-list-item v-for="(note, index) in getUserNotes" :key="index">{{ note.body }}</v-ons-list-item>
            </v-ons-list>
          </div>
        </div>
      </v-ons-card>
    </div>

  </v-ons-page>
</template>

<script>
import { gitHub } from "../services/GitHub.js"
import AppToolbar from "./AppToolbar.vue"

export default {
  components: {
    AppToolbar
  },
  data() {
    return {
      user: {},
      notes: [],
      showNotes: false,
      note: ""
    }
  },
  props: {
    username: {
      type: String
    }
  },
  computed: {
    toggleButtonCaption() {
      return this.showNotes ? "Hide Notes" : "Show Notes"
    },
    getUserNotes() {
      return this.notes.filter(note => note.id === this.username)
    }
  },
  methods: {
    toggleList() {
      this.showNotes = !this.showNotes
    },
    saveNote() {
      this.notes.push({
        body: this.note,
        id: this.username
      })
      this.note = ""
      window.localStorage.setItem("notes", JSON.stringify(this.notes))
    }
  },
  created() {
    gitHub.getUserData(this.username).then(({ data }) => {
      this.user = data
    })
    if (!window.localStorage.getItem("notes")) {
      window.localStorage.setItem("notes", JSON.stringify([]))
    }
    this.notes = JSON.parse(window.localStorage.getItem("notes"))
  }
}
</script>
