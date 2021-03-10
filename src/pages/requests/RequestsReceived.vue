<template>
    <div>
    <base-dialogue :show="!!error" title="Error Occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialogue>
    <section>
        <base-card>
            <header>
                <h2>Request Received</h2>
            </header>
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="hasRequests && !isLoading">
                <request-item
                        v-for="req in receivedRequests"
                        :key="req.id"
                        :email="req.userEmail"
                        :message="req.message"
                ></request-item>
            </ul>
            <h3 v-else>You have not received any requests yet!</h3>
        </base-card>
    </section>
    </div>
</template>

<script>
  import RequestItem from '../../components/requests/RequestItem';

  export default {
    name: 'RequestsReceived',
    components: {
      RequestItem,
    },
    data() {
      return {
        isLoading: false,
        error: null,
      };
    },
    computed: {
      receivedRequests() {
        return this.$store.getters['requests/requests'];
      },
      hasRequests() {
        return this.$store.getters['requests/hasRequests'];
      },
    },
    created() {
      this.loadRequests();
    },
    methods: {
      async loadRequests() {
        this.isLoading = true;
        try {
          await this.$store.dispatch('requests/fetchRequests');
        } catch (err) {
          this.error = err.message || 'Something went wrong.';
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
    }
  };
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>
