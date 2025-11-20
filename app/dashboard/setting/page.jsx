"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '@/convex/_generated/api'
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query-mutation'
import { BarLoader } from 'react-spinners'
import { Loader2, User } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const SettingPage = () => {

    const [username, setusername] = useState("")
    const { data, isLoading } = useConvexQuery(api.users.getCurrentUser)
    const { mutate: updateUsername, isLoading: isSubmitting } = useConvexMutation(api.users.updateUsername)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!username.trim()){   // trim(): remove white spaces
            toast.error("Username cannot be empty")  // .error is only to change the color of the tast (here reg)
            return 
        }
        await updateUsername({"username": username.trim() })
        toast.success("Username Successfully Updated!!") // here color: (green)
    }

    if (isLoading) {
        return <BarLoader width={"100%"} color="#D8B4FE" />
    }

    return (
        <div className="space-y-8 p-4 lg:p-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold gradient-text-primary">Settings</h1>
                <p className="text-slate-400 mt-2">
                    Manage your profile and account preferences
                </p>
            </div>

            {/* Username Settings */}
            <Card className="bg-[#101112] max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Username Settings
                    </CardTitle>
                    <CardDescription>
                        Set your unique username for your public profile
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Label>
                            Username
                        </Label>
                        <Input suppressHydrationWarning
                            id="username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            placeholder="Enter your username"
                            className="bg-slate-800 border-slate-600 text-white"
                        />
                        {data?.username && (
                            <div className="text-sm text-slate-400">
                                Current username:{" "}
                                <span className="text-white">@{data.username}</span>
                            </div>
                        )}
                        <div className="text-xs text-slate-500">
                            3-20 characters, letters, numbers, underscores, and hyphens only
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full sm:w-auto"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Username"
                                )}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SettingPage
