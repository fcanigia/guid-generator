<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-8 text-center">
      <h2 class="text-4xl font-bold mb-4 text-gray-800">404</h2>
      <p class="text-gray-600 mb-4">Oops! The page you are looking for does not exist.</p>
      <p class="text-gray-600 mb-6">
        It might have been removed, or you may have mistyped the address.
      </p>

      <router-link
        to="/"
        class="inline-block mt-4 w-full px-4 py-2 bg-favicon text-white rounded-md hover:bg-faviconDarker focus:outline-none"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
