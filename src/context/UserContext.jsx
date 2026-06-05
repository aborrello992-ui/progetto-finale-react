/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../database/supabase.js'

const UserContext = createContext()

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    async function getProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            console.log(error.message)
            return
        }

        setProfile(data)
    }

    useEffect(() => {
        async function getUserSession() {
            const { data } = await supabase.auth.getSession()

            if (data.session) {
                setUser(data.session.user)
                getProfile(data.session.user.id)
            }
        }

        getUserSession()
    }, [])
    async function updateProfile(newProfileData) {
        if (!user) {
            return
        }

        const { data, error } = await supabase
            .from('profiles')
            .update({
                ...newProfileData,
                updated_at: new Date(),
            })
            .eq('id', user.id)
            .select()
            .single()

        if (error) {
            console.log(error.message)
            return
        }

        setProfile(data)
    }
    const value = {
        user,
        setUser,
        profile,
        setProfile,
        getProfile,
        updateProfile,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}


function useUserContext() {
    return useContext(UserContext)
}

export { UserContextProvider, useUserContext }
