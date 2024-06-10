import { supabase } from 'src/utils/supabase'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  async registerAccount(body: { user_name: string; password: string }) {
    const { data, error } = await supabase.from('users').insert([body]).select()

    return {
      data,
      error
    }
  },
  async login(body: { user_name: string; password: string }) {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('user_name', body.user_name)
      .eq('password', body.password)
      .maybeSingle()
    return {
      data,
      error
    }
  },
  async submit(body: any) {
    const { data, error } = await supabase.from('user_problems').insert([body]).select()
    return {
      data,
      error
    }
  },
  async getProblems(userID: string) {
    const { data, error } = await supabase.from('problems').select('*')
    const { data: userProblems, error: userProblemsError } = await supabase
      .from('user_problems')
      .select('*')
      .eq('user_id', userID)

    if (data) {
      data.forEach((problem: any) => {
        const isSubmitted = userProblems?.find((userProblem: any) => userProblem.problem_id === problem.id)
        problem.isSubmitted = !!isSubmitted
      })
    }
    return {
      data,
      error
    }
  }
}

export default authApi
