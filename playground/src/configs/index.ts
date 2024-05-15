const config = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  supabaseKey: import.meta.env.SUPABASE_ANON || '',
  maxSizeUploadAvatar: 1048576 // bytes
}

export default config
