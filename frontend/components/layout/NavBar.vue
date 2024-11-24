<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = useState('isDark', () => colorMode.value === 'dark');

const toggleDark = () => {
  isDark.value = !isDark.value;
  colorMode.preference = isDark.value ? 'dark' : 'light';
};

const links = [
  [
    {
      label: 'Register',
      icon: 'i-heroicons-user-plus-solid',
      to: '/',
    },
    {
      label: 'Leads',
      icon: 'i-heroicons-chart-bar',
      to: '/leads',
    },
  ],
  [
    {
      label: '',
      icon: 'i-heroicons-moon-16-solid',
      click: toggleDark,
    },
  ],
]

</script>