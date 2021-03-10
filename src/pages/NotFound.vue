<template>
    <section>
        <base-card>
            <h2>Page not Found</h2>
            <p>
                This page is could not be found!
                <router-link to="/coaches">See coaches page...</router-link>
            </p>
        </base-card>
    </section>
</template>

<script>
  export default {
    name: 'NotFound'
  };
</script>

<style scoped>

</style>
