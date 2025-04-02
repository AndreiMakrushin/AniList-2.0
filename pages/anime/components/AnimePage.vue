<script setup lang="ts">


const getAnimeList = async() =>{
    const config = useRuntimeConfig()
    const list = config.public.animeList

    try {
      const response = await fetch(`${list}1&limit=10`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
        throw new Error('No anime data found in response');
      }
      return responseData.list
}
catch (error) {
      console.error('Error in animeList:', error);
      return null;
    }
}

onMounted(async() => {
    const result = await getAnimeList()
    console.log(result)
})
</script>

<template>
    <div>
cvcv
    </div>
</template>

<style scoped>

</style>